export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:3000";
export async function api(path, options = {}) {
  return fetch(`${API_BASE}${path}`, options);
}
