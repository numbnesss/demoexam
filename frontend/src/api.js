const API_URL = 'http://127.0.0.1:8000/api'

export const request = async (path, method = 'GET', body) => {
    const headers = { 'Content-Type': ' application/json' }
    const token = localStorage.getItem('token')
    if (token) headers.Authorization = `Bearer ${token}`


    const res = await fetch(API_URL + path, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    })

    const data = await res.json()
    if (!res.ok) throw data
    return data
}