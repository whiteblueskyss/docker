import { useEffect, useState } from "react";
import { getUsers, createUser } from "./api";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  // load users on mount
  useEffect(() => {
    (async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
        alert("Could not load users. Check API is running.");
      }
    })();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !role.trim()) {
      alert("Name and role are required.");
      return;
    }
    try {
      const newUser = await createUser({ name: name.trim(), role: role.trim() });
      setUsers(prev => [...prev, newUser]);
      setName("");
      setRole("");
    } catch (err) {
      console.error(err);
      alert("Create failed. See console.");
    }
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h2>🏠 Home</h2>
      <p>Backend: <code>{import.meta.env.VITE_API_URL}</code></p>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ padding: 6 }}
        />
        <input
          placeholder="Role"
          value={role}
          onChange={e => setRole(e.target.value)}
          style={{ padding: 6 }}
        />
        <button type="submit" style={{ padding: "6px 12px" }}>Add User</button>
      </form>

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", minWidth: 400 }}>
        <thead>
          <tr>
            <th align="left">ID</th>
            <th align="left">Name</th>
            <th align="left">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="3">No users yet</td></tr>
          ) : (
            users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
