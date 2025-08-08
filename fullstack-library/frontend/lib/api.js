export const API = process.env.NEXT_PUBLIC_API || 'http://localhost:4000';

export async function apiFetch(path, opts = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = opts.headers || {};
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch(`${API}${path}`, { ...opts, headers });
  const data = await res.json().catch(()=>null);
  if(!res.ok) throw data || { msg: 'error' };
  return data;
}
