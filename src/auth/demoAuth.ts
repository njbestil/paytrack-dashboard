const AUTH_TOKEN_KEY = "paytrackAuthToken";
const DEMO_AUTH_TOKEN = "demo-paytrack-token";

export const demoUser = {
  name: "Admin User",
  email: "admin@paytrack.com",
  password: "password123",
};

export function loginWithDemoCredentials(email: string, password: string) {
  const emailMatches = email.trim().toLowerCase() === demoUser.email;
  const passwordMatches = password === demoUser.password;

  if (!emailMatches || !passwordMatches) {
    return false;
  }

  localStorage.setItem(AUTH_TOKEN_KEY, DEMO_AUTH_TOKEN);
  return true;
}

export function logoutDemoUser() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function isDemoUserLoggedIn() {
  return localStorage.getItem(AUTH_TOKEN_KEY) === DEMO_AUTH_TOKEN;
}
