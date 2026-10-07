import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ccl_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle auth errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('ccl_token')
      localStorage.removeItem('ccl_user')
    }
    return Promise.reject(err)
  }
)

export const getCCLs = () => api.get('/ccls')
export const getCCL = (slug) => api.get(`/ccls/${slug}`)
export const getStories = (params = {}) => api.get('/stories', { params })
export const getStory = (id) => api.get(`/stories/${id}`)
export const getSurveys = (params = {}) => api.get('/surveys', { params })
export const submitContact = (data) => api.post('/contacts', data)
export const getContacts = (params = {}) => api.get('/contacts', { params })
export const updateContactStatus = (id, status) => api.put(`/contacts/${id}/status`, { status })
export const login = (credentials) => api.post('/auth/login', credentials)
export const getMe = () => api.get('/auth/me')

export default api
