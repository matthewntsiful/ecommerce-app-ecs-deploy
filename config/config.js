// Configuration settings for the application
const config = {
  // API settings
  api: {
    baseUrl: 'https://api.blakkbrotherinc.com',
    timeout: 5000,
    retryAttempts: 3
  },
  
  // Application settings
  app: {
    name: 'BlakkBrotherInc Marketplace',
    version: '1.0.0',
    environment: 'development' // 'development', 'staging', 'production'
  },
  
  // Feature flags
  features: {
    enableReviews: true,
    enableWishlist: true,
    enableComparisons: false
  },
  
  // Payment gateways
  payment: {
    stripe: {
      publicKey: 'pk_test_example'
    },
    paypal: {
      clientId: 'test_client_id'
    }
  }
};

export default config;