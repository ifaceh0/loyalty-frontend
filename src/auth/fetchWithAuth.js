export const fetchWithAuth = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (response.status === 401 || response.status === 403) {
    localStorage.clear();
    window.location.href = "/signin";
    return;
  }

  return response;
};