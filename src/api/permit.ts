const API_URL = 'http://10.0.2.2:3001';
// const API_URL = 'https://emsystem-backend.onrender.com';


export async function fetchParentDetails(accessToken: string, id: string) {
  const res = await fetch(`${API_URL}/parents/${id}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
  if (
    data.statusCode === 403 ||
    data.statusCode === 401 ||
    data.statusCode === 400
  ) {
    throw new Error(data.message);
  }
  return data;
}

export async function fetchAllTeachers(accessToken: string) {
    const res = await fetch(`${API_URL}/teachers`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    const data = await res.json()
    if (
      data.statusCode === 403 ||
      data.statusCode === 401 ||
      data.statusCode === 400
    ) {
      throw new Error(data.message)
    }
    return data
  }

  
export async function fetchCreatePermit(
  accessToken: string,
  tuitionData: any
) {
  const res = await fetch(`${API_URL}/permits`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(tuitionData),
  })
  const data = await res.json()
  if (
    data.statusCode === 403 ||
    data.statusCode === 401 ||
    data.statusCode === 400 ||
    data.statusCode === 500
  ) {
    throw new Error(data.message)
  }
  return data
}

export async function fetchPermits(accessToken: string) {
  const res = await fetch(`${API_URL}/permits`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })
  const data = await res.json()
  if (
    data.statusCode === 403 ||
    data.statusCode === 401 ||
    data.statusCode === 400
  ) {
    throw new Error(data.message)
  }
  return data
}