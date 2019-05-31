const BASE_URL = "http://localhost:3000/api";

const generateBasicAuthString = (username, password) =>
  window.btoa(unescape(encodeURIComponent(`${username}:${password}`)));

export const fetchApi = async (path, auth, args) => {
  const response = await fetch(`${BASE_URL}/${path}`, {
    method: "POST",
    headers: {
      authorization: auth.token
        ? `Bearer ${auth.token}`
        : `Basic ${generateBasicAuthString(auth.username, auth.password)}`,
      "Content-Type": "application/json"
    },
    body: args ? JSON.stringify(args) : undefined
  });
  if (!response) {
    throw new Error("No response from server");
  }
  if (response.status >= 400) {
    throw new Error((await response.json()).error);
  }
  return response.json();
};
