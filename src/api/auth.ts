import {ICredentials} from '../types/credentials';

// const API_URL = 'https://emsystem-backend.onrender.com';
const API_URL = 'http://10.0.2.2:3001';

async function getAuth(authData: ICredentials) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });
  const user = await res.json();
  if (res.ok && user) {
    return user;
  } else {
    return null;
  }
}


export default getAuth;
