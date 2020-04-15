import api from "./api";

export const TOKEN_KEY = "@housing-Token";

export const isAuthenticated = () => {
  if (localStorage.getItem(TOKEN_KEY) !== null) return verifyAuthentication();
  else return false;
};
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const verifyAuthentication = async () => {
  const res = await api.get(`/api/logged`);

  if (res.data.error) logout();

  return !res.data.error;
};
