const BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function getUsers() {
  const res = await fetch(`${BASE}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function createUser({ name, role }) {
  const res = await fetch(`${BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, role })
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
}
