/**
 * AZERTY CRM - Genesys Cloud Composable Desktop configuration
 *
 * You can configure the integration here, or use the configuration panel
 * inside AZERTY CRM. Values saved in the browser override this file.
 *
 * No OAuth client secret or access token is required in this file.
 */
window.AZERTY_GENESYS_CONFIG = {
  // Apps domain for the Genesys Cloud region that hosts your organization.
  // Examples: apps.mypurecloud.com, apps.mypurecloud.ie, apps.mypurecloud.de
  deploymentDomain: 'apps.mypurecloud.com',

  // Unique identifier chosen for this CRM component. A UUID or stable slug works.
  componentId: '',

  // Component name approved/whitelisted during Composable Desktop onboarding.
  componentName: '',

  locale: 'en',

  // Scope IDs must be stable and unique within the host application.
  scopes: {
    scripter: 'azerty-crm-scripter',
    acw: 'azerty-crm-acw'
  },

  // When true, an interaction typed before authentication is sent automatically
  // after the broker reports an authenticated state.
  autoLoadInteraction: true,

  // Enable only for diagnostics. The production broker normally stays hidden.
  showBrokerUi: false
};
