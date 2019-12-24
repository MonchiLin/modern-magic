import React, {useEffect} from "react";
import axios from 'axios'

function useRequest() {
  // 储存 loading 状态
  const [loading, updateLoading] = React.useState(false)
  // 储存 error 状态
  const [error, updateError] = React.useState()
  // 储存 retry 状态
  const [refreshToken, updateRefreshToken] = React.useState(-1)

  const [response, updateResponse] = React.useState()

  async function doFetch() {
    // 请求之前将 loading 设置 true
    updateLoading(true)
    try {
      updateResponse(await axios({url: ""}))
    } catch (e) {
      // 发生异常时将异常储存下来
      updateError(error)

    } finally {
      // 请求结束后将 loading 设置为 false
      updateLoading(true)
    }
  }

  function retry() {
    // 通过更新 refreshToken 触发下面的 effect, 从而调用 doFetch 方法
    updateRefreshToken(new Date().getTime())
  }

  useEffect(() => {
    // 初始触发忽略掉
    if (refreshToken === -1) {
      return
    }

    doFetch()
  }, [refreshToken])

  useEffect(() => {
    doFetch()
  }, [])


  return {
    response,
    loading,
    error,
    retry
  }
}
