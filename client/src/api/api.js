import { getToken } from '../utils/auth';

const BASE_URL = "http://localhost:5000/api"; // Change to your deployed backend if needed

export async function apiFetch(endpoint, method = "GET", body) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error((await res.json()).message || "Error");
  return res.json();
}
