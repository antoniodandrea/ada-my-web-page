export class ComposableDesktopClient {
  constructor({ brokerIframe, genesysOrigin, componentId, componentName, onEvent }) {
    if (!(brokerIframe instanceof HTMLIFrameElement)) {
      throw new TypeError("brokerIframe must be an iframe element");
    }

    this.brokerIframe = brokerIframe;
    this.genesysOrigin = normalizeOrigin(genesysOrigin);
    this.componentId = requiredText(componentId, "componentId");
    this.componentName = requiredText(componentName, "componentName");
    this.onEvent = typeof onEvent === "function" ? onEvent : () => {};

    this.registered = false;
    this.registrationRequested = false;
    this.authenticated = false;
    this.started = false;
    this.boundMessageHandler = this.handleMessage.bind(this);
  }

  async start() {
    if (this.started) return;
    this.started = true;

    window.addEventListener("message", this.boundMessageHandler);
    this.brokerIframe.src = `${this.genesysOrigin}/crm-embeddable-desktop/index.html`;

    await waitForIframeLoad(this.brokerIframe);
    this.emit("CLIENT_READY", { genesysOrigin: this.genesysOrigin });
    this.getStatus("handshake");
  }

  stop() {
    window.removeEventListener("message", this.boundMessageHandler);
    this.started = false;
  }

  get ready() {
    return this.registered && this.authenticated;
  }

  getStatus(contextId = createContextId()) {
    this.send("Genesys.ComposableDesktop.GET_STATUS", {
      componentId: this.componentId,
      contextId,
    });
  }

  register() {
    if (this.registrationRequested) return;
    this.registrationRequested = true;

    this.send("Genesys.ComposableDesktop.REGISTRATION_REQUEST", {
      componentId: this.componentId,
      contextId: createContextId(),
      name: this.componentName,
    });
  }

  setInteraction(interactionId, { scope = "default", id } = {}) {
    const data = {
      componentId: this.componentId,
      contextId: createContextId(),
      scope,
      interactionId: requiredText(interactionId, "interactionId"),
    };

    if (id) data.id = id;
    this.send("Genesys.ComposableDesktop.SET_INTERACTION", data);
  }

  setLocale(locale) {
    this.send("Genesys.ComposableDesktop.SET_LOCALE", {
      componentId: this.componentId,
      contextId: createContextId(),
      locale: requiredText(locale, "locale"),
    });
  }

  componentUrl(component, { size = "small", scope = "default", scopeId } = {}) {
    const query = new URLSearchParams({ size, scope });
    if (scopeId) query.set("scopeId", scopeId);

    return `${this.genesysOrigin}/crm-embeddable-desktop/component.html#/${encodeURIComponent(
      component
    )}?${query.toString()}`;
  }

  send(type, data) {
    const target = this.brokerIframe.contentWindow;
    if (!target) throw new Error("Broker iframe is not ready");

    const message = { type, data };
  
    target.postMessage(message, this.genesysOrigin);
    this.emit("OUTBOUND", message);
  }

  handleMessage(event) {
    if (event.origin !== this.genesysOrigin) return;
    if (event.source !== this.brokerIframe.contentWindow) return;

    const message = parseMessage(event.data);
    if (!message?.type?.startsWith("Genesys.ComposableDesktop")) return;

    this.emit("INBOUND", message);

    switch (message.type) {
      case "Genesys.ComposableDesktop.STATUS_UPDATE":
        this.authenticated = Boolean(message.data?.authenticated);

        if (
          message.data?.contextId === "handshake" ||
          message.data?.contextId === "initial"
        ) {
          this.register();
        }
        break;

      case "Genesys.ComposableDesktop.REGISTRATION_RESPONSE":
        this.registered = true;
        this.getStatus("post-registration");
        break;

      default:
        break;
    }

    this.emit("STATE", {
      registered: this.registered,
      authenticated: this.authenticated,
      ready: this.ready,
    });
  }

  emit(kind, payload) {
    this.onEvent({ kind, payload, timestamp: new Date().toISOString() });
  }
}

function normalizeOrigin(value) {
  const url = new URL(requiredText(value, "genesysOrigin"));
  if (url.protocol !== "https:") {
    throw new Error("Genesys origin must use HTTPS");
  }
  return url.origin;
}

function requiredText(value, name) {
  const text = String(value ?? "").trim();
  if (!text) throw new Error(`${name} is required`);
  return text;
}

function parseMessage(value) {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function createContextId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `ctx-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function waitForIframeLoad(iframe) {
  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      reject(new Error("Timed out while loading the Genesys broker iframe"));
    }, 20000);

    iframe.addEventListener(
      "load",
      () => {
        window.clearTimeout(timeoutId);
        resolve();
      },
      { once: true }
    );
  });
}
