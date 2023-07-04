// 对axios增强
import axios from 'axios'
// 引入elementui的Message
import { Message } from 'element-ui'
// 引入路由实例对象
import router from '@/router'

// 配置服务器地址
axios.defaults.baseURL = 'http://127.0.0.1:5000'
// 超时时间(你的请求从发送到结果返回，超出了这个时间，请求就会停止，并且可以给提示)
axios.defaults.timeout = 30000

// 请求拦截器（每个请求都会被请求拦截器所拦截）
axios.interceptors.request.use(config => {
    // 可以在请求发送出去之前做一些操作
    let token = localStorage.getItem('token')
    if (token) {
        config.headers.authorization = 'Bearer ' + token
    }
    // 如果不返回，就无法把请求发送到服务器
    return config
}, err => {
    return Promise.reject()
})

// 响应拦截器（每个响应都会被响应拦截器所拦截）
// res:就是服务器响应的数据
axios.interceptors.response.use(res => {
    let { data: { code, msg } } = res
    if (code === 0) {
        Message.success(msg)
    } else if (code === 1) {
        Message.error(msg)
    }
    // 必须返回，否则你的接口无法拿到服务器返回的数据
    return res
}, err => {
    // 接口报错,就会走err
    if (err.response.data && err.response.data.code === 401) {
        // 跳转登录
        router.push('/login')
    }
    return Promise.reject()
})

export default axios