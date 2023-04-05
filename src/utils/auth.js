const AUTH_TOKEN_ID = "auth-token";

export const gettoken = () => {
  const token = localStorage.getItem(AUTH_TOKEN_ID);

  if (!token) {
    throw new Error("El usuario no ha iniciado sesion.");
  }

  return token;
};

export const settoken = (token) => {
  localStorage.setItem(AUTH_TOKEN_ID, token);
};
