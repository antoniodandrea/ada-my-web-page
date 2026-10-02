const state = {
  activeView: 'dashboard',
  contacts: [
    { id: 1, name: 'Emma Laurent', title: 'Procurement Director', company: 'Acme Europe', status: 'Customer', email: 'emma.laurent@acme.example', phone: '+33 6 42 18 90 21', owner: 'Paul Martin', lastActivity: '12 min ago', avatar: 'EL', color: 'avatar-blue' },
    { id: 2, name: 'Thomas Moreau', title: 'VP Operations', company: 'Lumina Systems', status: 'Prospect', email: 'thomas.moreau@lumina.example', phone: '+33 7 19 52 03 74', owner: 'Sophie Bernard', lastActivity: '1 hour ago', avatar: 'TM', color: 'avatar-purple' },
    { id: 3, name: 'Chloé Petit', title: 'Head of Customer Success', company: 'Nova Retail', status: 'Customer', email: 'chloe.petit@nova.example', phone: '+33 6 21 35 88 10', owner: 'Paul Martin', lastActivity: 'Today, 11:25', avatar: 'CP', color: 'avatar-green' },
    { id: 4, name: 'Lucas Robert', title: 'Chief Technology Officer', company: 'Orion Labs', status: 'Lead', email: 'lucas.robert@orion.example', phone: '+33 7 48 11 26 39', owner: 'Liam Dubois', lastActivity: 'Yesterday', avatar: 'LR', color: 'avatar-orange' },
    { id: 5, name: 'Sarah Michel', title: 'Finance Manager', company: 'Vertex Consulting', status: 'Prospect', email: 'sarah.michel@vertex.example', phone: '+33 6 73 09 44 82', owner: 'Sophie Bernard', lastActivity: 'Yesterday', avatar: 'SM', color: 'avatar-rose' },
    { id: 6, name: 'Hugo Richard', title: 'Commercial Director', company: 'Atlas Mobility', status: 'Customer', email: 'hugo.richard@atlas.example', phone: '+33 7 02 65 18 91', owner: 'Paul Martin', lastActivity: '18 Jul 2026', avatar: 'HR', color: 'avatar-slate' },
    { id: 7, name: 'Manon Durand', title: 'IT Programme Manager', company: 'Greenfield Energy', status: 'Lead', email: 'manon.durand@greenfield.example', phone: '+33 6 93 44 17 20', owner: 'Liam Dubois', lastActivity: '17 Jul 2026', avatar: 'MD', color: 'avatar-blue' },
    { id: 8, name: 'Nathan Leroy', title: 'Founder', company: 'Studio North', status: 'Prospect', email: 'nathan.leroy@studionorth.example', phone: '+33 7 55 28 61 06', owner: 'Sophie Bernard', lastActivity: '15 Jul 2026', avatar: 'NL', color: 'avatar-purple' }
  ],
  companies: [
    { id: 1, name: 'Acme Europe', industry: 'Enterprise software', website: 'acme.example', employees: 1280, value: 128400, contacts: 6, health: 'good', owner: 'Paul Martin' },
    { id: 2, name: 'Lumina Systems', industry: 'Cloud infrastructure', website: 'lumina.example', employees: 640, value: 84200, contacts: 4, health: 'good', owner: 'Sophie Bernard' },
    { id: 3, name: 'Nova Retail', industry: 'Retail technology', website: 'nova.example', employees: 890, value: 61500, contacts: 7, health: 'watch', owner: 'Paul Martin' },
    { id: 4, name: 'Orion Labs', industry: 'Artificial intelligence', website: 'orion.example', employees: 210, value: 46900, contacts: 3, health: 'good', owner: 'Liam Dubois' },
    { id: 5, name: 'Vertex Consulting', industry: 'Professional services', website: 'vertex.example', employees: 320, value: 38800, contacts: 5, health: 'watch', owner: 'Sophie Bernard' },
    { id: 6, name: 'Atlas Mobility', industry: 'Transportation', website: 'atlas.example', employees: 1700, value: 116000, contacts: 8, health: 'good', owner: 'Paul Martin' }
  ],
  deals: [
    { id: 1, name: 'European licence renewal', company: 'Acme Europe', stage: 'negotiation', value: 68000, closeDate: '2026-07-28', owner: 'Paul Martin' },
    { id: 2, name: 'Cloud migration programme', company: 'Lumina Systems', stage: 'proposal', value: 54000, closeDate: '2026-08-04', owner: 'Sophie Bernard' },
    { id: 3, name: 'Retail analytics rollout', company: 'Nova Retail', stage: 'qualified', value: 42500, closeDate: '2026-08-15', owner: 'Paul Martin' },
    { id: 4, name: 'AI service desk pilot', company: 'Orion Labs', stage: 'lead', value: 28000, closeDate: '2026-09-02', owner: 'Liam Dubois' },
    { id: 5, name: 'Advisory framework', company: 'Vertex Consulting', stage: 'proposal', value: 36700, closeDate: '2026-08-19', owner: 'Sophie Bernard' },
    { id: 6, name: 'Mobility operations suite', company: 'Atlas Mobility', stage: 'negotiation', value: 73000, closeDate: '2026-07-31', owner: 'Paul Martin' },
    { id: 7, name: 'Customer data platform', company: 'Greenfield Energy', stage: 'qualified', value: 49600, closeDate: '2026-09-10', owner: 'Liam Dubois' },
    { id: 8, name: 'Agency collaboration portal', company: 'Studio North', stage: 'lead', value: 18500, closeDate: '2026-08-27', owner: 'Sophie Bernard' },
    { id: 9, name: 'Security compliance package', company: 'Acme Europe', stage: 'qualified', value: 32500, closeDate: '2026-08-08', owner: 'Paul Martin' },
    { id: 10, name: 'Knowledge automation', company: 'Lumina Systems', stage: 'proposal', value: 68100, closeDate: '2026-08-22', owner: 'Sophie Bernard' },
    { id: 11, name: 'Store workforce pilot', company: 'Nova Retail', stage: 'lead', value: 24100, closeDate: '2026-09-15', owner: 'Paul Martin' },
    { id: 12, name: 'Executive reporting hub', company: 'Vertex Consulting', stage: 'negotiation', value: 42000, closeDate: '2026-08-03', owner: 'Sophie Bernard' }
  ],
  tasks: [
    { id: 1, title: 'Call Emma about renewal terms', type: 'Call', priority: 'High', dueDate: '2026-07-22', related: 'Acme Europe', owner: 'Paul Martin', completed: false, time: '14:30' },
    { id: 2, title: 'Send revised proposal', type: 'Email', priority: 'High', dueDate: '2026-07-22', related: 'Lumina Systems', owner: 'Paul Martin', completed: false, time: '16:00' },
    { id: 3, title: 'Prepare discovery workshop', type: 'Meeting', priority: 'Normal', dueDate: '2026-07-23', related: 'Orion Labs', owner: 'Paul Martin', completed: false, time: '10:00' },
    { id: 4, title: 'Review account health notes', type: 'To-do', priority: 'Low', dueDate: '2026-07-24', related: 'Nova Retail', owner: 'Paul Martin', completed: false, time: '11:00' },
    { id: 5, title: 'Confirm legal review completion', type: 'Call', priority: 'Normal', dueDate: '2026-07-22', related: 'Atlas Mobility', owner: 'Paul Martin', completed: false, time: '17:15' },
    { id: 6, title: 'Update Q3 forecast', type: 'To-do', priority: 'Normal', dueDate: '2026-07-21', related: 'Internal', owner: 'Paul Martin', completed: true, time: '09:00' },
    { id: 7, title: 'Share onboarding resources', type: 'Email', priority: 'Low', dueDate: '2026-07-20', related: 'Greenfield Energy', owner: 'Paul Martin', completed: true, time: '13:30' }
  ],
  activities: [
    { id: 1, type: 'deal', icon: '◇', text: '<strong>Sophie Bernard</strong> moved <strong>Cloud migration programme</strong> to Proposal', detail: 'Lumina Systems', time: '8 min ago' },
    { id: 2, type: 'contact', icon: '◎', text: '<strong>Paul Martin</strong> added a note to <strong>Emma Laurent</strong>', detail: 'Renewal scope confirmed for 1,200 seats', time: '24 min ago' },
    { id: 3, type: 'task', icon: '✓', text: '<strong>Liam Dubois</strong> completed <strong>Technical discovery call</strong>', detail: 'Orion Labs', time: '1 hour ago' },
    { id: 4, type: 'note', icon: '✎', text: '<strong>Chloé Petit</strong> replied to the onboarding email', detail: 'Nova Retail', time: '2 hours ago' },
    { id: 5, type: 'deal', icon: '€', text: '<strong>Paul Martin</strong> updated the value of <strong>Mobility operations suite</strong>', detail: 'New value: €73,000', time: 'Yesterday' },
    { id: 6, type: 'contact', icon: '◎', text: '<strong>Sophie Bernard</strong> created contact <strong>Nathan Leroy</strong>', detail: 'Studio North', time: 'Yesterday' }
  ],
  selectedContacts: new Set(),
  contactSort: { field: 'name', direction: 1 },
  currentTaskFilter: 'all',
  currentActivityFilter: 'all'
};

const stages = [
  { key: 'lead', label: 'Lead', color: '#4770e9' },
  { key: 'qualified', label: 'Qualified', color: '#7659dd' },
  { key: 'proposal', label: 'Proposal', color: '#2aa879' },
  { key: 'negotiation', label: 'Negotiation', color: '#f5a623' }
];

const ownerMeta = {
  'Paul Martin': { initials: 'PM', color: 'avatar-purple' },
  'Sophie Bernard': { initials: 'SB', color: 'avatar-blue' },
  'Liam Dubois': { initials: 'LD', color: 'avatar-green' }
};

const fmtCurrency = (value, compact = false) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, notation: compact ? 'compact' : 'standard' }).format(value);
const fmtDate = (date) => new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${date}T12:00:00`));
const escapeHtml = (value = '') => value.replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
const initials = (name) => name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase();

function navigate(view) {
  state.activeView = view;
  document.querySelectorAll('.view').forEach(el => el.classList.toggle('active', el.id === `${view}-view`));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.view === view));
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('mobileOverlay').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderRevenueChart(period = 'month') {
  const sets = {
    month: [
      ['Jan', 84, 92], ['Feb', 76, 88], ['Mar', 102, 96], ['Apr', 94, 104], ['May', 118, 110], ['Jun', 111, 116], ['Jul', 138, 124], ['Aug', 122, 128], ['Sep', 147, 136], ['Oct', 153, 142], ['Nov', 166, 150], ['Dec', 184, 162]
    ],
    quarter: [['Q1', 262, 276], ['Q2', 323, 330], ['Q3', 407, 388], ['Q4', 503, 454]],
    year: [['2022', 850, 900], ['2023', 1090, 1050], ['2024', 1320, 1250], ['2025', 1580, 1475], ['2026', 1840, 1690]]
  };
  const data = sets[period];
  const max = Math.max(...data.flatMap(d => d.slice(1)));
  document.getElementById('revenueChart').innerHTML = data.map(([label, actual, target]) => `
    <div class="bar-column" data-tooltip="${label}: ${fmtCurrency(actual * 1000, true)}">
      <div class="bars"><i class="target" style="height:${(target / max) * 100}%"></i><i class="actual" style="height:${(actual / max) * 100}%"></i></div>
      <span>${label}</span>
    </div>`).join('');
}

function renderRecentDeals() {
  const stageMap = Object.fromEntries(stages.map(s => [s.key, s.label]));
  document.getElementById('recentDealsBody').innerHTML = state.deals.slice(0, 5).map(deal => {
    const owner = ownerMeta[deal.owner];
    return `<tr>
      <td><div class="deal-name"><span class="deal-icon">◇</span><div><span class="cell-main">${escapeHtml(deal.name)}</span><span class="cell-sub">Updated recently</span></div></div></td>
      <td>${escapeHtml(deal.company)}</td>
      <td><span class="badge ${deal.stage}">${stageMap[deal.stage]}</span></td>
      <td><strong>${fmtCurrency(deal.value)}</strong></td>
      <td>${fmtDate(deal.closeDate)}</td>
      <td><div class="owner-cell"><span class="avatar ${owner.color}">${owner.initials}</span>${escapeHtml(deal.owner.split(' ')[0])}</div></td>
    </tr>`;
  }).join('');
}

function renderDashboardTasks() {
  const list = state.tasks.filter(t => !t.completed).slice(0, 5);
  document.getElementById('dashboardTaskList').innerHTML = list.map(task => `
    <label class="task-row ${task.completed ? 'completed' : ''}">
      <input class="task-check" type="checkbox" data-task-id="${task.id}" ${task.completed ? 'checked' : ''} />
      <span class="task-content"><strong>${escapeHtml(task.title)}</strong><span>${escapeHtml(task.type)} · ${escapeHtml(task.related)}</span></span>
      <span class="task-time">${task.dueDate === '2026-07-22' ? task.time : fmtDate(task.dueDate)}</span>
    </label>`).join('') || '<div class="empty-state"><strong>No tasks due</strong><span>Your future self is suspiciously organised.</span></div>';
}

function renderActivities() {
  const filtered = state.currentActivityFilter === 'all' ? state.activities : state.activities.filter(a => a.type === state.currentActivityFilter);
  const html = filtered.map(activity => `
    <div class="timeline-item">
      <span class="timeline-icon ${activity.type}">${activity.icon}</span>
      <div class="timeline-copy"><p>${activity.text}</p><span>${escapeHtml(activity.detail)}</span></div>
      <span class="timeline-time">${escapeHtml(activity.time)}</span>
    </div>`).join('');
  document.getElementById('activityTimeline').innerHTML = state.activities.slice(0, 5).map(activity => `
    <div class="timeline-item"><span class="timeline-icon ${activity.type}">${activity.icon}</span><div class="timeline-copy"><p>${activity.text}</p><span>${escapeHtml(activity.detail)}</span></div><span class="timeline-time">${escapeHtml(activity.time)}</span></div>`).join('');
  document.getElementById('fullActivityTimeline').innerHTML = html || '<div class="empty-state"><strong>No matching activity</strong></div>';
}

function renderLeaderboard() {
  const leaders = [
    { name: 'Paul Martin', role: 'Sales Manager', value: 68400, delta: '+18%' },
    { name: 'Sophie Bernard', role: 'Account Executive', value: 59200, delta: '+12%' },
    { name: 'Liam Dubois', role: 'Account Executive', value: 41700, delta: '+7%' },
    { name: 'Alice Fontaine', role: 'Sales Development', value: 28900, delta: '+4%' }
  ];
  document.getElementById('leaderboardList').innerHTML = leaders.map((leader, index) => {
    const meta = ownerMeta[leader.name] || { initials: 'AF', color: 'avatar-orange' };
    return `<div class="leader-row"><span class="rank">${index + 1}</span><span class="avatar ${meta.color}">${meta.initials}</span><div class="leader-copy"><strong>${leader.name}</strong><span>${leader.role}</span></div><div class="leader-value"><strong>${fmtCurrency(leader.value)}</strong><span>${leader.delta}</span></div></div>`;
  }).join('');
}

function getFilteredContacts() {
  const term = document.getElementById('contactSearch')?.value.toLowerCase().trim() || '';
  const status = document.getElementById('contactStatusFilter')?.value || 'all';
  const owner = document.getElementById('contactOwnerFilter')?.value || 'all';
  return [...state.contacts]
    .filter(c => !term || [c.name, c.company, c.email, c.phone].some(v => v.toLowerCase().includes(term)))
    .filter(c => status === 'all' || c.status === status)
    .filter(c => owner === 'all' || c.owner === owner)
    .sort((a, b) => a[state.contactSort.field].localeCompare(b[state.contactSort.field]) * state.contactSort.direction);
}

function renderContacts() {
  const contacts = getFilteredContacts();
  document.getElementById('contactsTableBody').innerHTML = contacts.map(contact => {
    const owner = ownerMeta[contact.owner];
    return `<tr>
      <td><input type="checkbox" class="contact-select" data-contact-id="${contact.id}" ${state.selectedContacts.has(contact.id) ? 'checked' : ''} aria-label="Select ${escapeHtml(contact.name)}" /></td>
      <td><div class="contact-cell"><span class="avatar ${contact.color}">${contact.avatar}</span><div><span class="cell-main">${escapeHtml(contact.name)}</span><span class="cell-sub">${escapeHtml(contact.title)}</span></div></div></td>
      <td>${escapeHtml(contact.company)}</td>
      <td><span class="badge ${contact.status.toLowerCase()}">${contact.status}</span></td>
      <td><a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a></td>
      <td>${escapeHtml(contact.phone)}</td>
      <td><div class="owner-cell"><span class="avatar ${owner.color}">${owner.initials}</span>${escapeHtml(contact.owner)}</div></td>
      <td>${escapeHtml(contact.lastActivity)}</td>
      <td><button class="row-action" data-contact-action="${contact.id}">⋮</button></td>
    </tr>`;
  }).join('') || '<tr><td colspan="9"><div class="empty-state"><strong>No contacts found</strong><span>Try a less ambitious filter.</span></div></td></tr>';
  document.getElementById('contactResultCount').textContent = `Showing ${contacts.length} contact${contacts.length === 1 ? '' : 's'}`;
  document.getElementById('contactNavCount').textContent = state.contacts.length;
  updateContactBulkBar();
}

function updateContactBulkBar() {
  const count = state.selectedContacts.size;
  document.getElementById('contactBulkBar').classList.toggle('hidden', count === 0);
  document.getElementById('selectedContactCount').textContent = `${count} selected`;
  const visible = getFilteredContacts();
  document.getElementById('selectAllContacts').checked = visible.length > 0 && visible.every(c => state.selectedContacts.has(c.id));
}

function renderCompanies() {
  document.getElementById('companyGrid').innerHTML = state.companies.map(company => `
    <article class="company-card">
      <div class="company-card-top"><span class="company-logo">${initials(company.name)}</span><button class="row-action" data-company-action="${company.id}">⋮</button></div>
      <h2>${escapeHtml(company.name)}</h2><p>${escapeHtml(company.industry)} · ${escapeHtml(company.website)}</p>
      <div class="company-meta"><div><span>Pipeline value</span><strong>${fmtCurrency(company.value)}</strong></div><div><span>Employees</span><strong>${company.employees.toLocaleString()}</strong></div><div><span>Contacts</span><strong>${company.contacts}</strong></div><div><span>Owner</span><strong>${escapeHtml(company.owner.split(' ')[0])}</strong></div></div>
      <div class="company-footer"><span class="health ${company.health}"><i></i>${company.health === 'good' ? 'Healthy account' : 'Needs attention'}</span><button class="text-btn" data-company-open="${company.id}">View account →</button></div>
    </article>`).join('');
}

function renderPipeline() {
  const ownerFilter = document.getElementById('pipelineOwnerFilter')?.value || 'all';
  const deals = state.deals.filter(deal => ownerFilter === 'all' || deal.owner === ownerFilter);
  document.getElementById('pipelineSummaryStrip').innerHTML = stages.map(stage => {
    const stageDeals = deals.filter(d => d.stage === stage.key);
    return `<div class="stage-summary"><div><span>${stage.label}</span><strong>${fmtCurrency(stageDeals.reduce((sum, d) => sum + d.value, 0), true)}</strong></div><em>${stageDeals.length} deals</em></div>`;
  }).join('');
  document.getElementById('kanbanBoard').innerHTML = stages.map(stage => {
    const stageDeals = deals.filter(d => d.stage === stage.key);
    return `<section class="kanban-column" data-stage="${stage.key}">
      <div class="kanban-header"><div class="kanban-title"><i class="stage-color" style="background:${stage.color}"></i><h3>${stage.label}</h3><span class="kanban-count">${stageDeals.length}</span></div><span class="kanban-total">${fmtCurrency(stageDeals.reduce((s,d)=>s+d.value,0), true)}</span></div>
      <div class="kanban-cards">${stageDeals.map(deal => {
        const owner = ownerMeta[deal.owner];
        return `<article class="deal-card" draggable="true" data-deal-id="${deal.id}"><h4>${escapeHtml(deal.name)}</h4><span class="company-name">${escapeHtml(deal.company)}</span><strong class="deal-value">${fmtCurrency(deal.value)}</strong><div class="deal-card-footer"><span>Close ${fmtDate(deal.closeDate)}</span><span class="avatar ${owner.color}" title="${escapeHtml(deal.owner)}">${owner.initials}</span></div></article>`;
      }).join('')}</div>
      <button class="add-stage-card" data-add-deal-stage="${stage.key}">＋ Add deal</button>
    </section>`;
  }).join('');
  setupDragAndDrop();
}

function setupDragAndDrop() {
  let draggedId = null;
  document.querySelectorAll('.deal-card').forEach(card => {
    card.addEventListener('dragstart', () => { draggedId = Number(card.dataset.dealId); card.classList.add('dragging'); });
    card.addEventListener('dragend', () => { card.classList.remove('dragging'); document.querySelectorAll('.kanban-column').forEach(c => c.classList.remove('drag-over')); });
  });
  document.querySelectorAll('.kanban-column').forEach(column => {
    column.addEventListener('dragover', event => { event.preventDefault(); column.classList.add('drag-over'); });
    column.addEventListener('dragleave', event => { if (!column.contains(event.relatedTarget)) column.classList.remove('drag-over'); });
    column.addEventListener('drop', event => {
      event.preventDefault();
      const deal = state.deals.find(d => d.id === draggedId);
      if (deal && deal.stage !== column.dataset.stage) {
        const oldStage = stages.find(s => s.key === deal.stage)?.label;
        deal.stage = column.dataset.stage;
        state.activities.unshift({ id: Date.now(), type: 'deal', icon: '◇', text: `<strong>Paul Martin</strong> moved <strong>${escapeHtml(deal.name)}</strong> to ${stages.find(s => s.key === deal.stage).label}`, detail: `${oldStage} → ${stages.find(s => s.key === deal.stage).label}`, time: 'Just now' });
        renderPipeline(); renderRecentDeals(); renderActivities();
        toast('Deal moved', `${deal.name} is now in ${stages.find(s => s.key === deal.stage).label}.`);
      }
    });
  });
}

function renderTasks() {
  const filtered = state.tasks.filter(task => {
    if (state.currentTaskFilter === 'today') return task.dueDate === '2026-07-22' && !task.completed;
    if (state.currentTaskFilter === 'upcoming') return task.dueDate > '2026-07-22' && !task.completed;
    if (state.currentTaskFilter === 'completed') return task.completed;
    return true;
  });
  document.getElementById('taskPageList').innerHTML = filtered.map(task => `
    <label class="task-page-item ${task.completed ? 'completed' : ''}">
      <input class="task-check" type="checkbox" data-task-id="${task.id}" ${task.completed ? 'checked' : ''} />
      <span class="task-page-copy"><strong>${escapeHtml(task.title)}</strong><span>${escapeHtml(task.type)} · ${escapeHtml(task.related)} · ${escapeHtml(task.owner)}</span></span>
      <span class="badge ${task.priority.toLowerCase()}">${task.priority}</span>
      <span class="task-page-date">${fmtDate(task.dueDate)} · ${task.time}</span>
    </label>`).join('') || '<div class="empty-state"><strong>No tasks here</strong><span>One tiny corner of civilisation has achieved order.</span></div>';
  const dueToday = state.tasks.filter(t => t.dueDate === '2026-07-22' && !t.completed).length;
  const upcoming = state.tasks.filter(t => t.dueDate > '2026-07-22' && !t.completed).length;
  const completed = state.tasks.filter(t => t.completed).length;
  document.getElementById('dueTodayCount').textContent = dueToday;
  document.getElementById('upcomingCount').textContent = upcoming;
  document.getElementById('completedCount').textContent = completed;
  document.getElementById('taskNavCount').textContent = dueToday;
}

function getGenesysConfigurationStatus() {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem('azerty-crm.genesys-composable-desktop.v1') || '{}'); } catch { saved = {}; }
  const fileConfig = window.AZERTY_GENESYS_CONFIG || {};
  const config = { ...fileConfig, ...saved };
  return Boolean(config.componentId && config.componentName && config.deploymentDomain);
}

function renderIntegrations() {
  const genesysConfigured = getGenesysConfigurationStatus();
  const integrations = [
    { name: 'Microsoft 365', logo: 'M', description: 'Sync mail, calendars and contacts with your workspace.', connected: true },
    { name: 'Slack', logo: '#', description: 'Send deal alerts and activity updates to team channels.', connected: true },
    { name: 'Genesys Cloud', logo: 'G', description: 'Open the real Composable Desktop workspace with Copilot, Scripts and ACW.', connected: genesysConfigured, action: 'genesys' },
    { name: 'Google Workspace', logo: 'G', description: 'Connect Gmail, Calendar and shared documents.', connected: false },
    { name: 'Stripe', logo: 'S', description: 'View customer payments, subscriptions and invoice status.', connected: false },
    { name: 'Zapier', logo: '✦', description: 'Automate workflows across thousands of business apps.', connected: false }
  ];
  document.getElementById('integrationGrid').innerHTML = integrations.map(item => `
    <article class="integration-card"><div class="integration-top"><span class="integration-logo">${item.logo}</span><span class="connection-status ${item.connected ? 'connected' : 'available'}">${item.action === 'genesys' ? (item.connected ? 'Configured' : 'Setup required') : (item.connected ? 'Connected' : 'Available')}</span></div><h2>${item.name}</h2><p>${item.description}</p><button class="secondary-btn integration-toggle" data-integration="${item.name}" data-connected="${item.connected}" data-action="${item.action || 'toggle'}">${item.action === 'genesys' ? 'Open desktop' : (item.connected ? 'Manage connection' : 'Connect')}</button></article>`).join('');
}

function renderSettings() {
  const notifications = [
    ['Deal stage changes', 'Notify me when a deal moves between pipeline stages', true],
    ['Task reminders', 'Remind me before assigned tasks become due', true],
    ['New contact assignments', 'Notify me when a contact is assigned to me', true],
    ['Weekly performance digest', 'Send a summary every Monday morning', false]
  ];
  document.getElementById('notificationSettings').innerHTML = notifications.map(([title, desc, checked], i) => `<div class="toggle-row"><div><strong>${title}</strong><span>${desc}</span></div><label class="switch"><input type="checkbox" ${checked ? 'checked' : ''} data-setting-toggle="${i}" /><i></i></label></div>`).join('');
  document.getElementById('stageSettings').innerHTML = stages.map((stage, i) => `<div class="stage-setting"><i class="stage-color" style="background:${stage.color}"></i><strong>${stage.label}</strong><span>${state.deals.filter(d=>d.stage===stage.key).length} active deals</span><button class="row-action">⋮</button></div>`).join('');
  const team = [
    ['Paul Martin', 'Sales Manager', 'PM', 'avatar-purple'], ['Sophie Bernard', 'Account Executive', 'SB', 'avatar-blue'], ['Liam Dubois', 'Account Executive', 'LD', 'avatar-green'], ['Alice Fontaine', 'Sales Development', 'AF', 'avatar-orange']
  ];
  document.getElementById('teamSettings').innerHTML = team.map(([name, role, avatar, color]) => `<div class="team-setting"><span class="avatar ${color}">${avatar}</span><strong>${name}</strong><span>${role}</span><button class="row-action">⋮</button></div>`).join('');
}

function renderNotifications() {
  const notifications = [
    ['◇', 'Acme Europe renewal moved to Negotiation', '8 minutes ago', true],
    ['✓', 'Task “Send revised proposal” is due at 16:00', '22 minutes ago', true],
    ['◎', 'Sophie assigned Thomas Moreau to you', '1 hour ago', false],
    ['€', 'Monthly revenue is now 92% of target', 'Today, 09:12', false]
  ];
  document.getElementById('notificationList').innerHTML = notifications.map(([icon,text,time,unread]) => `<div class="notification-item ${unread ? 'unread' : ''}"><span class="timeline-icon deal">${icon}</span><div><p>${text}</p><span>${time}</span></div></div>`).join('');
}

function openModal(type, defaults = {}) {
  const config = {
    contact: { title: 'New contact', kicker: 'Relationship', template: 'contactFormTemplate', submit: 'Create contact' },
    deal: { title: 'New deal', kicker: 'Opportunity', template: 'dealFormTemplate', submit: 'Create deal' },
    task: { title: 'New task', kicker: 'Follow-up', template: 'taskFormTemplate', submit: 'Create task' },
    company: { title: 'New company', kicker: 'Account', template: 'companyFormTemplate', submit: 'Create company' },
    activity: { title: 'Log activity', kicker: 'Timeline', template: 'activityFormTemplate', submit: 'Save activity' }
  }[type];
  const template = document.getElementById(config.template);
  document.getElementById('modalTitle').textContent = config.title;
  document.getElementById('modalKicker').textContent = config.kicker;
  document.getElementById('modalSubmit').textContent = config.submit;
  document.getElementById('modalBody').innerHTML = '';
  document.getElementById('modalBody').appendChild(template.content.cloneNode(true));
  document.getElementById('modalForm').dataset.type = type;
  Object.entries(defaults).forEach(([key, value]) => {
    const field = document.querySelector(`#modalBody [name="${key}"]`);
    if (field) field.value = value;
  });
  if (type === 'task' && !defaults.dueDate) document.querySelector('#modalBody [name="dueDate"]').value = '2026-07-22';
  if (type === 'deal' && !defaults.closeDate) document.querySelector('#modalBody [name="closeDate"]').value = '2026-08-22';
  document.getElementById('modalBackdrop').classList.add('open');
  document.getElementById('modalBackdrop').setAttribute('aria-hidden', 'false');
  setTimeout(() => document.querySelector('#modalBody input, #modalBody select, #modalBody textarea')?.focus(), 50);
}

function closeModal() {
  document.getElementById('modalBackdrop').classList.remove('open');
  document.getElementById('modalBackdrop').setAttribute('aria-hidden', 'true');
}

function handleModalSubmit(event) {
  event.preventDefault();
  const type = event.currentTarget.dataset.type;
  const data = Object.fromEntries(new FormData(event.currentTarget));
  if (type === 'contact') {
    const name = `${data.firstName} ${data.lastName}`.trim();
    state.contacts.unshift({ id: Date.now(), name, title: 'New contact', company: data.company || 'Independent', status: data.status, email: data.email, phone: data.phone || 'Not provided', owner: data.owner, lastActivity: 'Just now', avatar: initials(name), color: 'avatar-blue' });
    state.activities.unshift({ id: Date.now()+1, type: 'contact', icon: '◎', text: `<strong>Paul Martin</strong> created contact <strong>${escapeHtml(name)}</strong>`, detail: data.company || 'Independent', time: 'Just now' });
    renderContacts(); renderActivities();
    toast('Contact created', `${name} was added to AZERTY CRM.`);
  } else if (type === 'deal') {
    state.deals.unshift({ id: Date.now(), name: data.name, company: data.company, stage: data.stage, value: Number(data.value), closeDate: data.closeDate, owner: data.owner });
    state.activities.unshift({ id: Date.now()+1, type: 'deal', icon: '◇', text: `<strong>Paul Martin</strong> created deal <strong>${escapeHtml(data.name)}</strong>`, detail: `${data.company} · ${fmtCurrency(Number(data.value))}`, time: 'Just now' });
    renderPipeline(); renderRecentDeals(); renderActivities();
    toast('Deal created', `${data.name} entered the pipeline.`);
  } else if (type === 'task') {
    state.tasks.unshift({ id: Date.now(), title: data.title, type: data.type, priority: data.priority, dueDate: data.dueDate, related: data.related || 'No relation', owner: data.owner, completed: false, time: '09:00' });
    renderTasks(); renderDashboardTasks();
    toast('Task created', `${data.title} was added to your list.`);
  } else if (type === 'company') {
    state.companies.unshift({ id: Date.now(), name: data.name, industry: data.industry || 'Other', website: data.website || 'No website', employees: Number(data.employees || 0), value: 0, contacts: 0, health: 'good', owner: data.owner });
    renderCompanies();
    toast('Company created', `${data.name} was added to your accounts.`);
  } else if (type === 'activity') {
    const iconMap = { Call: '☎', Email: '✉', Meeting: '▣', Note: '✎' };
    state.activities.unshift({ id: Date.now(), type: 'note', icon: iconMap[data.type], text: `<strong>Paul Martin</strong> logged a ${escapeHtml(data.type.toLowerCase())} with <strong>${escapeHtml(data.related)}</strong>`, detail: data.summary, time: 'Just now' });
    renderActivities();
    toast('Activity logged', 'The customer timeline has been updated.');
  }
  closeModal();
}

function toggleTask(id, checked) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;
  task.completed = checked;
  renderTasks(); renderDashboardTasks();
  toast(checked ? 'Task completed' : 'Task reopened', task.title);
}

function toast(title, message, type = 'success') {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span class="toast-symbol">${type === 'success' ? '✓' : '!'}</span><div><strong>${escapeHtml(title)}</strong><span>${escapeHtml(message)}</span></div>`;
  document.getElementById('toastContainer').appendChild(el);
  setTimeout(() => el.remove(), 3600);
}

function exportDashboard() {
  const rows = [['Metric','Value'], ['Total revenue','€184,240'], ['Open deals','48'], ['Conversion rate','24.8%'], ['Average deal cycle','31 days']];
  const csv = rows.map(row => row.map(cell => `"${cell.replaceAll('"','""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'azerty-crm-dashboard.csv'; a.click();
  URL.revokeObjectURL(url);
  toast('Dashboard exported', 'A CSV file was generated locally.');
}

function setupEventListeners() {
  document.querySelectorAll('.nav-item').forEach(button => button.addEventListener('click', () => navigate(button.dataset.view)));
  document.querySelectorAll('[data-view-link]').forEach(button => button.addEventListener('click', () => navigate(button.dataset.viewLink)));
  document.getElementById('menuToggle').addEventListener('click', () => { document.getElementById('sidebar').classList.add('open'); document.getElementById('mobileOverlay').classList.add('open'); });
  document.getElementById('sidebarClose').addEventListener('click', () => { document.getElementById('sidebar').classList.remove('open'); document.getElementById('mobileOverlay').classList.remove('open'); });
  document.getElementById('mobileOverlay').addEventListener('click', () => { document.getElementById('sidebar').classList.remove('open'); document.getElementById('mobileOverlay').classList.remove('open'); });

  document.getElementById('dashboardPeriod').addEventListener('change', event => { renderRevenueChart(event.target.value); toast('Dashboard updated', `Showing ${event.target.options[event.target.selectedIndex].text.toLowerCase()}.`); });
  document.getElementById('exportDashboard').addEventListener('click', exportDashboard);

  document.getElementById('notificationBtn').addEventListener('click', event => { event.stopPropagation(); document.getElementById('notificationsPanel').classList.toggle('open'); document.getElementById('quickCreatePanel').classList.remove('open'); });
  document.getElementById('quickCreateBtn').addEventListener('click', event => { event.stopPropagation(); document.getElementById('quickCreatePanel').classList.toggle('open'); document.getElementById('notificationsPanel').classList.remove('open'); });
  document.addEventListener('click', event => { if (!event.target.closest('.dropdown-panel')) document.querySelectorAll('.dropdown-panel').forEach(p => p.classList.remove('open')); });
  document.getElementById('markAllRead').addEventListener('click', () => { document.querySelectorAll('.notification-item').forEach(n => n.classList.remove('unread')); document.querySelector('.notification-dot').style.display = 'none'; toast('Notifications cleared', 'Everything has been marked as read.'); });
  document.querySelectorAll('[data-quick-action]').forEach(button => button.addEventListener('click', () => { document.getElementById('quickCreatePanel').classList.remove('open'); openModal(button.dataset.quickAction); }));

  document.getElementById('addContactBtn').addEventListener('click', () => openModal('contact'));
  document.getElementById('addDealBtn').addEventListener('click', () => openModal('deal'));
  document.getElementById('addTaskBtn').addEventListener('click', () => openModal('task'));
  document.getElementById('addTaskPageBtn').addEventListener('click', () => openModal('task'));
  document.getElementById('addCompanyBtn').addEventListener('click', () => openModal('company'));
  document.getElementById('logActivityBtn').addEventListener('click', () => openModal('activity'));
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCancel').addEventListener('click', closeModal);
  document.getElementById('modalBackdrop').addEventListener('click', event => { if (event.target === event.currentTarget) closeModal(); });
  document.getElementById('modalForm').addEventListener('submit', handleModalSubmit);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { closeModal(); document.querySelectorAll('.dropdown-panel').forEach(p => p.classList.remove('open')); }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); document.getElementById('globalSearch').focus(); }
  });

  document.getElementById('contactSearch').addEventListener('input', renderContacts);
  document.getElementById('contactStatusFilter').addEventListener('change', renderContacts);
  document.getElementById('contactOwnerFilter').addEventListener('change', renderContacts);
  document.getElementById('clearContactFilters').addEventListener('click', () => { document.getElementById('contactSearch').value = ''; document.getElementById('contactStatusFilter').value = 'all'; document.getElementById('contactOwnerFilter').value = 'all'; renderContacts(); });
  document.querySelectorAll('#contacts-view th[data-sort]').forEach(th => th.addEventListener('click', () => { const field = th.dataset.sort; state.contactSort.direction = state.contactSort.field === field ? -state.contactSort.direction : 1; state.contactSort.field = field; renderContacts(); }));
  document.getElementById('selectAllContacts').addEventListener('change', event => { getFilteredContacts().forEach(c => event.target.checked ? state.selectedContacts.add(c.id) : state.selectedContacts.delete(c.id)); renderContacts(); });
  document.getElementById('contactsTableBody').addEventListener('change', event => { if (event.target.matches('.contact-select')) { const id = Number(event.target.dataset.contactId); event.target.checked ? state.selectedContacts.add(id) : state.selectedContacts.delete(id); updateContactBulkBar(); } });
  document.getElementById('deleteSelected').addEventListener('click', () => { const count = state.selectedContacts.size; state.contacts = state.contacts.filter(c => !state.selectedContacts.has(c.id)); state.selectedContacts.clear(); renderContacts(); toast('Contacts deleted', `${count} contact${count===1?'':'s'} removed.`); });
  document.getElementById('emailSelected').addEventListener('click', () => { const emails = state.contacts.filter(c=>state.selectedContacts.has(c.id)).map(c=>c.email); window.location.href = `mailto:${emails.join(',')}`; });

  document.getElementById('pipelineOwnerFilter').addEventListener('change', renderPipeline);
  document.getElementById('kanbanBoard').addEventListener('click', event => { const btn = event.target.closest('[data-add-deal-stage]'); if (btn) openModal('deal', { stage: btn.dataset.addDealStage }); });
  document.getElementById('dashboardTaskList').addEventListener('change', event => { if (event.target.matches('[data-task-id]')) toggleTask(Number(event.target.dataset.taskId), event.target.checked); });
  document.getElementById('taskPageList').addEventListener('change', event => { if (event.target.matches('[data-task-id]')) toggleTask(Number(event.target.dataset.taskId), event.target.checked); });
  document.querySelectorAll('[data-task-filter]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-task-filter]').forEach(b=>b.classList.remove('active')); button.classList.add('active'); state.currentTaskFilter = button.dataset.taskFilter; renderTasks(); }));
  document.querySelectorAll('[data-activity-filter]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-activity-filter]').forEach(b=>b.classList.remove('active')); button.classList.add('active'); state.currentActivityFilter = button.dataset.activityFilter; renderActivities(); }));

  document.getElementById('integrationGrid').addEventListener('click', event => { const button = event.target.closest('.integration-toggle'); if (!button) return; if (button.dataset.action === 'genesys') { navigate('genesys'); return; } const connected = button.dataset.connected === 'true'; button.dataset.connected = String(!connected); button.textContent = connected ? 'Connect' : 'Manage connection'; const status = button.closest('.integration-card').querySelector('.connection-status'); status.textContent = connected ? 'Available' : 'Connected'; status.className = `connection-status ${connected ? 'available' : 'connected'}`; toast(connected ? 'Integration disconnected' : 'Integration connected', `${button.dataset.integration} settings were updated.`); });
  document.addEventListener('azerty:genesys-config-changed', renderIntegrations);
  document.querySelectorAll('[data-settings-tab]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-settings-tab]').forEach(b=>b.classList.remove('active')); document.querySelectorAll('.settings-tab').forEach(tab=>tab.classList.remove('active')); button.classList.add('active'); document.getElementById(`settings-${button.dataset.settingsTab}`).classList.add('active'); }));
  document.getElementById('workspaceForm').addEventListener('submit', event => { event.preventDefault(); toast('Settings saved', 'Workspace preferences have been updated.'); });
  document.getElementById('notificationSettings').addEventListener('change', () => toast('Preference updated', 'Notification settings were saved.'));

  document.getElementById('globalSearch').addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    const term = event.target.value.trim();
    if (!term) return;
    navigate('contacts');
    document.getElementById('contactSearch').value = term;
    renderContacts();
    event.target.value = '';
  });

  document.getElementById('openAutomation').addEventListener('click', () => toast('Automation demo', 'Workflow automation is represented as a simulated feature in this prototype.'));
  document.getElementById('createReportBtn').addEventListener('click', () => toast('Report builder', 'A custom report draft was created.'));
  document.querySelectorAll('.report-open').forEach(button => button.addEventListener('click', () => toast('Report opened', `${button.dataset.report} is ready for review.`)));
}

function init() {
  renderRevenueChart();
  renderRecentDeals();
  renderDashboardTasks();
  renderActivities();
  renderLeaderboard();
  renderContacts();
  renderCompanies();
  renderPipeline();
  renderTasks();
  renderIntegrations();
  renderSettings();
  renderNotifications();
  setupEventListeners();
}

init();
