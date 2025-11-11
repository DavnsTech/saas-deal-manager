// Feature flags to toggle B2B/B2C specific functionality
const FEATURE_FLAGS = {
  B2B_MODE: true,
  B2C_MODE: true,
  SHOW_COMPANY_FIELDS: true,
  SHOW_MULTIPLE_CONTACTS: true,
  ENABLE_UPSELL_ANALYTICS: true,
  // Add more feature flags as needed
};

export const isFeatureEnabled = (feature: keyof typeof FEATURE_FLAGS): boolean => {
  // In production, these could come from a config service
  return FEATURE_FLAGS[feature];
};

// Example usage in components
// if (isFeatureEnabled('SHOW_COMPANY_FIELDS')) { ... }
