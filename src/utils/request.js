// axios基础的封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
const request = axios.create({
  baseURL: 'https://apifoxmock.com/m1/4022804-3659542-default',
  timeout: 5000, // 设置请求超时时间
});

request.interceptors.request.use(
  config => {
    // const userStore = useUserStore()
    // // 检查用户是否已登录
    // if (!userStore.userInfo) {
    //   console.log('用户未登录')
    //   const router = useRouter()
    //   // 跳转到登录页面
    //   router.push('/login')
    // }
    // console.log(config.url)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// axios 响应拦截器
request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.error(error)
    useErrorHandler(error)
    return Promise.reject(error)
  }
)

// 错误处理函数
export function useErrorHandler(error) {
  // 使用 provide/inject 在应用中全局注册这个函数
  ElMessage({
    type: 'warning',
    message: error.response?.data?.message || '网络错误,请重试'
  })
}

export default request;
