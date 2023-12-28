// const API_URL = 'https://emsystem-backend.onrender.com';
const API_URL = 'http://10.0.2.2:3001';

export async function fetchParent(id: string) {
  const res = await fetch(`${API_URL}/parents/${id}`, {
    method: 'GET',
  });
  const parent = await res.json();
  if (res.ok && parent) {
    return parent;
  } else {
    return null;
  }
}
