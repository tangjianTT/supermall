import axios from 'axios'



export function request(config) {
  // 1.创建axios是咧
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000,

  })

  // 2.axios拦截器 请求
  instance.interceptors.request.use(
    config => {
      // console.log(config);
      // 2.1请求拦截的作用
      // 1.比如config中的一些信息不符合服务器的要求 添加一些header

      // 2.比如每次发送请求的时候,都希望在界面上显示一个请求图标

      // 3.某些网络请求(比如登录(token)),必须携带一些特殊的符号
      return config
    }, err => {
      console.log(err);
    }
  )

  //  3. 响应
  instance.interceptors.response.use(res => {
      console.log(res);
      return res
    },
    err => {
      console.log(err);

    })


  // 3.发送真正的网络请求
  return instance(config)
}
