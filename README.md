# AZERTY CRM with Genesys Cloud Composable Desktop

AZERTY CRM is a responsive demonstration CRM built with plain HTML, CSS and JavaScript. It now contains a **real Genesys Cloud Composable Desktop host integration** for:

- Agent Copilot (`copilot`, default scope)
- Scripts/Scripter (`scripter`, embedded scope)
- After Call Work (`acw`, embedded scope)
- The Genesys Cloud Composable Desktop broker
- Registration, status, locale and interaction messages
- Per-component scope routing
- A broker message log for diagnostics

The CRM data remains fake. The Genesys Cloud component frames and broker integration are real.

## Important prerequisites

Before the embedded components can operate, you need:

1. Access to a valid Genesys Cloud organization.
2. An agent account with the required permissions, licences and product features.
3. An HTTPS-hosted AZERTY CRM site. The official examples specify HTTPS for cross-origin messaging.
4. A Composable Desktop component name approved/whitelisted through the Genesys onboarding process.
5. A component ID chosen for this integration. It can be a stable slug or UUID.
6. A valid active Genesys Cloud interaction ID for component testing.

Copilot, Scripts and ACW only display useful content when the selected organization and interaction support those features. For example, Scripts requires an assigned script, and ACW becomes relevant when the interaction enters after-call work.

## Configuration

You can configure the integration in either of two ways.

### Option 1: Edit `genesys-config.js`

```javascript
window.AZERTY_GENESYS_CONFIG = {
  deploymentDomain: 'apps.mypurecloud.ie',
  componentId: 'azerty-crm-001',
  componentName: 'YOUR_APPROVED_COMPONENT_NAME',
  locale: 'en',
  scopes: {
    scripter: 'azerty-crm-scripter',
    acw: 'azerty-crm-acw'
  },
  autoLoadInteraction: true,
  showBrokerUi: false
};
```

Use the `apps` domain for the region hosting your organization. Do not add `/crm-embeddable-desktop` to the value. The application builds the broker and component paths itself.

### Option 2: Use the CRM configuration panel

1. Open **Genesys Desktop** from the left navigation.
2. Select **Configuration**.
3. Enter the deployment domain, component ID, approved component name and locale.
4. Save the configuration.

Browser-entered values are stored in local storage and override `genesys-config.js`. No access token, client secret or password is stored.

## Run locally

Opening `index.html` directly is enough to inspect the CRM, but not a suitable production test for Composable Desktop. Serve it from HTTPS.

For basic layout testing over HTTP on localhost:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

For real integration testing, deploy the folder to an HTTPS web server or use an HTTPS-capable local development server.

## Interaction flow

The implementation follows the official Genesys examples:

1. Load the regional broker iframe.
2. Send `Genesys.ComposableDesktop.GET_STATUS` with a handshake context.
3. Send `Genesys.ComposableDesktop.REGISTRATION_REQUEST` after the handshake/initial status.
4. Send `Genesys.ComposableDesktop.SET_LOCALE` after registration.
5. Send `Genesys.ComposableDesktop.SET_INTERACTION` to:
   - `scope: "default"` for Copilot
   - `scope: "embedded"` plus the Scripter scope ID
   - `scope: "embedded"` plus the ACW scope ID

The page validates incoming message origins against the configured Genesys Cloud deployment origin and targets outgoing `postMessage` calls to that exact origin.

## Main files

- `index.html`: CRM and Genesys Desktop workspace markup
- `styles.css`: CRM and embedded desktop layout
- `app.js`: fake CRM data and CRM interactions
- `genesys-config.js`: organization-specific Composable Desktop configuration
- `genesys-composable-desktop.js`: real broker and component integration logic

## Public references

- Genesys Cloud Developer Center, Composable Desktop overview: https://developer.genesys.cloud/devapps/composable-desktop/
- Official Genesys examples: https://github.com/MyPureCloud/crm-composable-desktop-examples

## Security notes

- Do not place OAuth client secrets or long-lived access tokens in browser JavaScript.
- Use HTTPS in production.
- Restrict your site with the security headers and content-security policy required by your environment.
- Review allowed frame and connection domains with your security team.
- Interaction IDs are not persisted by this sample.
