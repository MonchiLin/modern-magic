// import { BASE_URL, IS_DEV } from '@/config/runtime.config'
//
// import { camelize, normalize } from '@/utils/common'
//
// export default ({ store, $axios, redirect }, inject) => {
//   $axios.setBaseURL('/apiRemote')
//
//   $axios.onRequest((config) => {
//     if (process.server) {
//       config.baseURL = BASE_URL
//     }
//     // const token = store.state.token
//     // if (token) {
//     //   config.headers.common.Authorization = `Bearer ${token}`
//     // }
//
//     // console.log('Making request to ' + config)
//     return config
//   })
//
//   $axios.onResponse((response) => {
//     response.data = camelize(response.data)
//     response = normalize(response)
//     return response
//   })
//
//   $axios.onError((_) => {
//     // if (process.browser && error.response && error.response.data) {
//     //   const code = error.response.data.code
//     //   if (AUTH_ERRORS.has(code)) {
//     //     vm.$message &&
//     // vm.$message({
//     //   message: AUTH_ERRORS.get(code),
//     //   type: 'error'
//     // })
//     //     store.commit(SET_TOKEN, '')
//     //     store.commit(SET_IDENTITY, 3)
//     //     return
//     //   }
//     //
//     //   if (ERRORS.has(code)) {
//     //     return (
//     //       vm.$message &&
//     //   vm.$message({
//     //     message: ERRORS.get(code),
//     //     type: 'error'
//     //   })
//     //     )
//     //   }
//     //
//     //   throw error
//     // }
//
//     // 如果是开发环境则不跳转至 error 页面，方便调试错误
//     // if (!IS_DEV && process.server) {
//     //   redirect('/error', error)
//     //   // 处理 SSR 过程中的错误
//     // } else {
//     //   // 处理客户端运行中的错误
//     //   throw error
//     // }
//   })
// }
