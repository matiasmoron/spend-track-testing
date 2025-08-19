export const testConfig = {
  baseUrl: process.env.APP_URL || 'https://expense-tracker-app-smoky-seven.vercel.app',
  routes: {
    login: '/login',
    groups: '/groups',
    register: '/register',
  },
  testCredentials: {
    email: process.env.TEST_EMAIL || 'fedegastos@gmail.com',
    password: process.env.TEST_PASSWORD || 'supersegura123',
  },
};

export const selectors = {
  login: {
    emailInput: 'textbox[name="Email"]',
    passwordInput: 'textbox[name="Password"]',
    loginButton: 'button:has-text("Login")',
    togglePasswordButton: 'button[aria-label*="Toggle password"]',
    registerLink: 'link[href="/register"]',
  },
};
