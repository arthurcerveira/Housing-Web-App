import { login, logout } from "../../sevices/auth.js";

export function loginAccount(token) {
  login(token);

  const isLoggedIn = true;

  return {
    type: "LOGIN",
    isLoggedIn,
  };
}

export function logoutAccount() {
  logout();
  const isLoggedIn = false;

  return {
    type: "LOGOUT",
    isLoggedIn,
  };
}
