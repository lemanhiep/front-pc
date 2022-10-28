export const getToken = () => {
  return localStorage.getItem("token");
};
export const setToken = (token: string) => {
  return localStorage.setItem("token", token);
};
export const getAdmin = () => {
  return localStorage.getItem("isAdmin");
};
export const setAdmin = (data: string) => {
  return localStorage.setItem("isAdmin", data);
};

export const getDrawer = () => {
  return localStorage.getItem("isDrawer");
};
export const setDrawer = (data: string) => {
  return localStorage.setItem("isDrawer", data);
};

export const getIdAccount = () => {
  return localStorage.getItem("isAccount");
};
export const setIdAccount = (data: string) => {
  return localStorage.setItem("isAccount", data);
};
