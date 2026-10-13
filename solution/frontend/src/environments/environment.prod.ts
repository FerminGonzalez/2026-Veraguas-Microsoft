import type { Environment } from './environment';

export const environment: Environment = {
  production: true,
  apiBaseUrl: 'https://copa-team13-api.azurewebsites.net',
  services: {
    INFORMATION_ENDPOINT_URL: '/api/information',
    SERVICE_ENDPOINT_URL: '/api/services'
  }
};
