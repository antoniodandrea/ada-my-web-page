(() => {
  'use strict';

  const STORAGE_KEY = 'azerty-crm.genesys-composable-desktop.v1';
  const MESSAGE_PREFIX = 'Genesys.ComposableDesktop';
  const MAX_LOG_ENTRIES = 80;

  const fileConfig = window.AZERTY_GENESYS_CONFIG || {};
  const defaultConfig = {
    deploymentDomain: 'apps.mypurecloud.de',
    componentId: '',
    componentName: '',
    locale: 'en',
    scopes: {
      scripter: 'azerty-crm-scripter',
      acw: 'azerty-crm-acw'
    },
    autoLoadInteraction: true,
    showBrokerUi: false,
    ...fileConfig,
    scopes: {
      scripter: 'azerty-crm-scripter',
      acw: 'azerty-crm-acw',
      ...(fileConfig.scopes || {})
    }
  };

  const state = {
    config: loadConfig(),
    brokerWindow: null,
    brokerOrigin: '',
    registrationRequested: false,
    registered: false,
    authenticated: false,
    webSocket: false,
    brokerLoaded: false,
    pendingInteraction: '',
    lastInteraction: '',
    started: false
  };

  let dom = {};

  function loadConfig() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return {
        ...defaultConfig,
        ...saved,
        scopes: {
          ...defaultConfig.scopes,
          ...(saved.scopes || {})
        }
      };
    } catch (error) {
      console.warn('[AZERTY CRM] Could not read Genesys configuration.', error);
      return { ...defaultConfig, scopes: { ...defaultConfig.scopes } };
    }
  }

  function saveConfig(config) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }

  function normalizeDomain(value) {
    return String(value || '')
      .trim()
      .replace(/^https?:\/\//i, '')
      .replace(/\/.*$/, '')
      .replace(/\/$/, '');
  }

  function createContextId() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    return `azerty-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function validateConfig(config = state.config) {
    const missing = [];
    if (!normalizeDomain(config.deploymentDomain)) missing.push('deployment domain');
    if (!String(config.componentId || '').trim()) missing.push('component ID');
    if (!String(config.componentName || '').trim()) missing.push('approved component name');
    if (!String(config.locale || '').trim()) missing.push('locale');
    if (!String(config.scopes?.scripter || '').trim()) missing.push('Scripter scope ID');
    if (!String(config.scopes?.acw || '').trim()) missing.push('ACW scope ID');
    return missing;
  }

  function genesysOrigin() {
    return `https://${normalizeDomain(state.config.deploymentDomain)}`;
  }

  function brokerUrl() {
    const query = state.config.showBrokerUi
      ? '?show-broker-ui=true&mini-display-type=true'
      : '';
    return `${genesysOrigin()}/crm-embeddable-desktop/index.html${query}`;
  }

  function componentUrl(component, scope, scopeId) {
    const params = new URLSearchParams({ size: 'small', scope });
    if (scopeId) params.set('scopeId', scopeId);
    return `${genesysOrigin()}/crm-embeddable-desktop/component.html#/${component}?${params.toString()}`;
  }

  function notify(title, message, type = 'success') {
    if (typeof window.toast === 'function') {
      window.toast(title, message, type);
      return;
    }
    console[type === 'error' ? 'error' : 'log'](`[AZERTY CRM] ${title}: ${message}`);
  }

  function setText(element, value) {
    if (element) element.textContent = value;
  }

  function setChip(element, status, label) {
    if (!element) return;
    element.className = `gc-status-chip ${status}`;
    element.innerHTML = `<i></i><span>${escapeText(label)}</span>`;
  }

  function escapeText(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[char]));
  }

  function updateStatus() {
    setChip(dom.brokerStatus, state.brokerLoaded ? 'ready' : state.started ? 'pending' : 'idle', state.brokerLoaded ? 'Broker loaded' : state.started ? 'Broker loading' : 'Not started');
    setChip(dom.registrationStatus, state.registered ? 'ready' : state.registrationRequested ? 'pending' : 'idle', state.registered ? 'Registered' : state.registrationRequested ? 'Registering' : 'Not registered');
    setChip(dom.authenticationStatus, state.authenticated ? 'ready' : state.brokerLoaded ? 'warning' : 'idle', state.authenticated ? 'Authenticated' : 'Not authenticated');
    setChip(dom.socketStatus, state.webSocket ? 'ready' : state.authenticated ? 'warning' : 'idle', state.webSocket ? 'WebSocket ready' : 'WebSocket unavailable');

    const configured = validateConfig().length === 0;
    const actionButtons = [dom.loadAll, dom.loadCopilot, dom.loadScripter, dom.loadAcw, dom.getStatus, dom.setLocale];
    actionButtons.forEach(button => {
      if (button) button.disabled = !configured || !state.brokerLoaded;
    });

    if (dom.connectButton) {
      dom.connectButton.disabled = !configured;
      dom.connectButton.textContent = state.started ? 'Reload Genesys components' : 'Initialize Genesys components';
    }

    if (dom.currentInteraction) {
      dom.currentInteraction.textContent = state.lastInteraction || 'No interaction loaded';
      dom.currentInteraction.title = state.lastInteraction || '';
    }

    const protocolIsSuitable = window.location.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(window.location.hostname);
    if (dom.protocolWarning) {
      dom.protocolWarning.hidden = protocolIsSuitable;
    }
  }

  function logEvent(direction, type, data) {
    if (!dom.eventLog) return;
    const row = document.createElement('div');
    row.className = `gc-log-row ${direction}`;

    const time = document.createElement('time');
    time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const badge = document.createElement('span');
    badge.className = 'gc-log-direction';
    badge.textContent = direction === 'out' ? 'SENT' : direction === 'in' ? 'RECEIVED' : 'INFO';

    const content = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = type;
    const detail = document.createElement('code');
    try {
      detail.textContent = data === undefined ? '' : JSON.stringify(data);
    } catch {
      detail.textContent = String(data);
    }
    content.append(title, detail);
    row.append(time, badge, content);
    dom.eventLog.prepend(row);

    while (dom.eventLog.children.length > MAX_LOG_ENTRIES) {
      dom.eventLog.lastElementChild?.remove();
    }
  }

  function postMessage(type, data = {}) {
    if (!state.brokerWindow || !state.brokerOrigin) {
      notify('Genesys broker unavailable', 'Initialize the Composable Desktop integration first.', 'error');
      return false;
    }
    const payload = { type, data: { componentId: state.config.componentId, contextId: createContextId(), ...data } };
    state.brokerWindow.postMessage(payload, state.brokerOrigin);
    logEvent('out', type, payload.data);
    return true;
  }

  function register() {
    if (state.registrationRequested || state.registered) return;
    const missing = validateConfig();
    if (missing.length) {
      notify('Genesys configuration incomplete', `Provide ${missing.join(', ')}.`, 'error');
      openConfigPanel(true);
      return;
    }
    state.registrationRequested = true;
    updateStatus();
    postMessage(`${MESSAGE_PREFIX}.REGISTRATION_REQUEST`, { name: state.config.componentName });
  }

  function getStatus(contextId = 'manual-status') {
    if (!state.brokerWindow) return;
    const payload = {
      type: `${MESSAGE_PREFIX}.GET_STATUS`,
      data: { componentId: state.config.componentId, contextId }
    };
    state.brokerWindow.postMessage(payload, state.brokerOrigin);
    logEvent('out', payload.type, payload.data);
  }

  function setLocale() {
    postMessage(`${MESSAGE_PREFIX}.SET_LOCALE`, { locale: state.config.locale });
  }

  function getInteractionInput() {
    return String(dom.interactionId?.value || '').trim();
  }

  function setInteraction(scope, scopeId) {
    const interactionId = getInteractionInput();
    if (!interactionId) {
      notify('Interaction ID required', 'Enter a valid Genesys Cloud interaction ID.', 'error');
      dom.interactionId?.focus();
      return false;
    }
    if (!state.registered || !state.authenticated) {
      state.pendingInteraction = interactionId;
      notify('Genesys session not ready', 'The interaction is queued until registration and authentication complete.', 'error');
      return false;
    }
    const data = { scope, interactionId };
    if (scopeId) data.id = scopeId;
    const sent = postMessage(`${MESSAGE_PREFIX}.SET_INTERACTION`, data);
    if (sent) {
      state.lastInteraction = interactionId;
      updateStatus();
    }
    return sent;
  }

  function setInteractionForAll() {
    const interactionId = getInteractionInput();
    if (!interactionId) {
      notify('Interaction ID required', 'Enter a valid Genesys Cloud interaction ID.', 'error');
      dom.interactionId?.focus();
      return;
    }
    if (!state.registered || !state.authenticated) {
      state.pendingInteraction = interactionId;
      notify('Interaction queued', 'It will be sent to Copilot, Scripter and ACW when the Genesys session is ready.');
      return;
    }
    setInteraction('default');
    setInteraction('embedded', state.config.scopes.scripter);
    setInteraction('embedded', state.config.scopes.acw);
    notify('Interaction sent', 'The active interaction was routed to all three Genesys components.');
  }

  function maybeSendPendingInteraction() {
    if (!state.config.autoLoadInteraction || !state.pendingInteraction || !state.registered || !state.authenticated) return;
    if (dom.interactionId) dom.interactionId.value = state.pendingInteraction;
    const pending = state.pendingInteraction;
    state.pendingInteraction = '';
    setInteractionForAll();
    logEvent('info', 'AUTO_LOAD_INTERACTION', { interactionId: pending });
  }

  function parseMessage(data) {
    if (typeof data === 'string') {
      try { return JSON.parse(data); } catch { return null; }
    }
    return data && typeof data === 'object' ? data : null;
  }

  function handleMessage(event) {
    if (!state.brokerOrigin || event.origin !== state.brokerOrigin) return;
    const allowedSources = [dom.broker, dom.copilot, dom.scripter, dom.acw]
      .map(frame => frame?.contentWindow)
      .filter(Boolean);
    if (!allowedSources.includes(event.source)) return;

    const message = parseMessage(event.data);
    if (!message?.type?.startsWith(MESSAGE_PREFIX)) return;

    const { type, data = {} } = message;
    logEvent('in', type, data);

    switch (type) {
      case `${MESSAGE_PREFIX}.REGISTRATION_RESPONSE`:
        state.registered = true;
        state.registrationRequested = false;
        updateStatus();
        setLocale();
        getStatus('post-registration');
        break;

      case `${MESSAGE_PREFIX}.STATUS_UPDATE`:
        state.authenticated = Boolean(data.authenticated);
        state.webSocket = Boolean(data.webSocket);
        if ((data.contextId === 'handshake' || data.contextId === 'initial') && !state.registered) register();
        updateStatus();
        maybeSendPendingInteraction();
        break;

      case `${MESSAGE_PREFIX}.INTERACTION_UPDATE`:
        if (data.interactionId) state.lastInteraction = data.interactionId;
        updateStatus();
        break;

      case `${MESSAGE_PREFIX}.LOCALE_UPDATE`:
        setText(dom.localeFeedback, data.locale ? `Locale: ${data.locale}` : 'Locale acknowledged');
        break;

      default:
        break;
    }
  }

  function resetRuntimeState() {
    state.brokerWindow = null;
    state.brokerOrigin = '';
    state.registrationRequested = false;
    state.registered = false;
    state.authenticated = false;
    state.webSocket = false;
    state.brokerLoaded = false;
    state.started = false;
    state.lastInteraction = '';
    updateStatus();
  }

  function initialize() {
    const missing = validateConfig();
    if (missing.length) {
      notify('Genesys configuration incomplete', `Provide ${missing.join(', ')}.`, 'error');
      openConfigPanel(true);
      return;
    }

    state.config.deploymentDomain = normalizeDomain(state.config.deploymentDomain);
    state.brokerOrigin = genesysOrigin();
    state.registrationRequested = false;
    state.registered = false;
    state.authenticated = false;
    state.webSocket = false;
    state.brokerLoaded = false;
    state.started = true;
    state.pendingInteraction = getInteractionInput();

    dom.broker.style.display = state.config.showBrokerUi ? 'block' : 'none';
    dom.broker.height = state.config.showBrokerUi ? '62' : '0';
    dom.broker.src = brokerUrl();
    dom.copilot.src = componentUrl('copilot', 'default');
    dom.scripter.src = componentUrl('scripter', 'embedded', state.config.scopes.scripter);
    dom.acw.src = componentUrl('acw', 'embedded', state.config.scopes.acw);

    dom.componentShells.forEach(shell => shell.classList.add('loading'));
    setText(dom.hostDomain, state.brokerOrigin);
    setText(dom.localeFeedback, `Locale: ${state.config.locale}`);
    updateStatus();
    logEvent('info', 'INITIALIZE', {
      origin: state.brokerOrigin,
      componentId: state.config.componentId,
      componentName: state.config.componentName
    });
  }

  function handleBrokerLoad() {
    state.brokerWindow = dom.broker.contentWindow;
    state.brokerLoaded = true;
    updateStatus();
    logEvent('info', 'BROKER_LOADED', { origin: state.brokerOrigin });
    getStatus('handshake');
  }

  function handleComponentLoad(event) {
    event.currentTarget.closest('.gc-component-shell')?.classList.remove('loading');
  }

  function openConfigPanel(forceOpen) {
    if (!dom.configPanel) return;
    const shouldOpen = forceOpen === true || dom.configPanel.hidden;
    dom.configPanel.hidden = !shouldOpen;
    dom.configToggle?.setAttribute('aria-expanded', String(shouldOpen));
    if (shouldOpen) dom.configPanel.querySelector('input, select')?.focus();
  }

  function populateConfigForm() {
    dom.configForm.elements.deploymentDomain.value = state.config.deploymentDomain;
    dom.configForm.elements.componentId.value = state.config.componentId;
    dom.configForm.elements.componentName.value = state.config.componentName;
    dom.configForm.elements.locale.value = state.config.locale;
    dom.configForm.elements.scripterScope.value = state.config.scopes.scripter;
    dom.configForm.elements.acwScope.value = state.config.scopes.acw;
    dom.configForm.elements.autoLoadInteraction.checked = Boolean(state.config.autoLoadInteraction);
    dom.configForm.elements.showBrokerUi.checked = Boolean(state.config.showBrokerUi);
  }

  function handleConfigSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextConfig = {
      deploymentDomain: normalizeDomain(form.get('deploymentDomain')),
      componentId: String(form.get('componentId') || '').trim(),
      componentName: String(form.get('componentName') || '').trim(),
      locale: String(form.get('locale') || 'en').trim(),
      scopes: {
        scripter: String(form.get('scripterScope') || '').trim(),
        acw: String(form.get('acwScope') || '').trim()
      },
      autoLoadInteraction: form.get('autoLoadInteraction') === 'on',
      showBrokerUi: form.get('showBrokerUi') === 'on'
    };

    const missing = validateConfig(nextConfig);
    if (missing.length) {
      notify('Configuration not saved', `Provide ${missing.join(', ')}.`, 'error');
      return;
    }

    state.config = nextConfig;
    saveConfig(nextConfig);
    notify('Genesys configuration saved', 'The real Composable Desktop frames are being reloaded.');
    openConfigPanel(false);
    initialize();
    document.dispatchEvent(new CustomEvent('azerty:genesys-config-changed'));
  }

  function resetConfig() {
    localStorage.removeItem(STORAGE_KEY);
    state.config = { ...defaultConfig, scopes: { ...defaultConfig.scopes } };
    populateConfigForm();
    resetRuntimeState();
    dom.broker.removeAttribute('src');
    [dom.copilot, dom.scripter, dom.acw].forEach(frame => frame.removeAttribute('src'));
    notify('Genesys configuration reset', 'Browser overrides were removed. File defaults are active.');
    openConfigPanel(true);
    document.dispatchEvent(new CustomEvent('azerty:genesys-config-changed'));
  }

  function cacheDom() {
    dom = {
      root: document.getElementById('genesys-view'),
      configToggle: document.getElementById('gcConfigToggle'),
      configPanel: document.getElementById('gcConfigPanel'),
      configForm: document.getElementById('gcConfigForm'),
      configReset: document.getElementById('gcConfigReset'),
      connectButton: document.getElementById('gcConnectButton'),
      broker: document.getElementById('gcBroker'),
      copilot: document.getElementById('gcCopilotFrame'),
      scripter: document.getElementById('gcScripterFrame'),
      acw: document.getElementById('gcAcwFrame'),
      interactionId: document.getElementById('gcInteractionId'),
      loadAll: document.getElementById('gcLoadAll'),
      loadCopilot: document.getElementById('gcLoadCopilot'),
      loadScripter: document.getElementById('gcLoadScripter'),
      loadAcw: document.getElementById('gcLoadAcw'),
      getStatus: document.getElementById('gcGetStatus'),
      setLocale: document.getElementById('gcSetLocale'),
      clearLog: document.getElementById('gcClearLog'),
      eventLog: document.getElementById('gcEventLog'),
      brokerStatus: document.getElementById('gcBrokerStatus'),
      registrationStatus: document.getElementById('gcRegistrationStatus'),
      authenticationStatus: document.getElementById('gcAuthenticationStatus'),
      socketStatus: document.getElementById('gcSocketStatus'),
      currentInteraction: document.getElementById('gcCurrentInteraction'),
      hostDomain: document.getElementById('gcHostDomain'),
      localeFeedback: document.getElementById('gcLocaleFeedback'),
      protocolWarning: document.getElementById('gcProtocolWarning'),
      componentShells: [...document.querySelectorAll('.gc-component-shell')]
    };
  }

  function bindEvents() {
    window.addEventListener('message', handleMessage);
    dom.broker.addEventListener('load', handleBrokerLoad);
    [dom.copilot, dom.scripter, dom.acw].forEach(frame => frame.addEventListener('load', handleComponentLoad));
    dom.configToggle.addEventListener('click', () => openConfigPanel());
    dom.configForm.addEventListener('submit', handleConfigSubmit);
    dom.configReset.addEventListener('click', resetConfig);
    dom.connectButton.addEventListener('click', initialize);
    dom.loadAll.addEventListener('click', setInteractionForAll);
    dom.loadCopilot.addEventListener('click', () => setInteraction('default'));
    dom.loadScripter.addEventListener('click', () => setInteraction('embedded', state.config.scopes.scripter));
    dom.loadAcw.addEventListener('click', () => setInteraction('embedded', state.config.scopes.acw));
    dom.getStatus.addEventListener('click', () => getStatus('manual-status'));
    dom.setLocale.addEventListener('click', setLocale);
    dom.clearLog.addEventListener('click', () => { dom.eventLog.innerHTML = ''; });
    dom.interactionId.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        setInteractionForAll();
      }
    });
  }

  function init() {
    cacheDom();
    if (!dom.root) return;
    populateConfigForm();
    bindEvents();
    updateStatus();

    const missing = validateConfig();
    if (missing.length) {
      openConfigPanel(true);
      logEvent('info', 'CONFIGURATION_REQUIRED', { missing });
    } else {
      initialize();
    }
  }

  window.AzertyGenesysDesktop = {
    initialize,
    register,
    getStatus,
    setLocale,
    setInteraction,
    setInteractionForAll,
    getConfig: () => ({ ...state.config, scopes: { ...state.config.scopes } })
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
