const API_BASE = '/api';

export async function getEmployees() {
  const res = await fetch(`${API_BASE}/employees`);
  if (!res.ok) throw new Error(await res.json().then((d) => d.error || 'Failed to fetch'));
  return res.json();
}

export async function createEmployee(data) {
  const res = await fetch(`${API_BASE}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.json().then((d) => d.error || 'Failed to create'));
  return res.json();
}

export async function updateEmployee(id, data) {
  const res = await fetch(`${API_BASE}/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.json().then((d) => d.error || 'Failed to update'));
  return res.json();
}

export async function deleteEmployee(id) {
  const res = await fetch(`${API_BASE}/employees/${id}`, { method: 'DELETE' });
  if (!res.ok && res.status !== 204) throw new Error(await res.json().then((d) => d.error || 'Failed to delete'));
}
