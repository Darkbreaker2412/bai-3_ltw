import axios from 'axios'

export const TOKEN_KEY = 'stayeasy_token'
export const USER_KEY = 'stayeasy_user'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5080/api',
  headers: { 'Content-Type': 'application/json' },
})

// Tự động gắn JWT vào mọi request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Token hết hạn / không hợp lệ -> báo cho AuthContext đăng xuất
axiosClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem(TOKEN_KEY)) {
      window.dispatchEvent(new Event('auth:logout'))
    }
    return Promise.reject(error)
  }
)

// Lấy thông báo lỗi dễ đọc từ response của ASP.NET
export function getErrorMessage(error) {
  const data = error.response?.data
  if (data?.errors) return Object.values(data.errors).flat().join(' ')
  if (data?.message) return data.message
  if (!error.response) return 'Không kết nối được tới máy chủ. Hãy kiểm tra backend đã chạy chưa.'
  return 'Đã có lỗi xảy ra, vui lòng thử lại.'
}

export default axiosClient
