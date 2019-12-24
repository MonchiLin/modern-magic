import React, {useEffect} from "react";
import axios from 'axios'

function useRequest() {
  // 储存 loading 状态
  const [loading, updateLoading] = React.useState(false)
  // 储存 error 状态
  const [error, updateError] = React.useState()
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

  useEffect(() => {

    doFetch()
  }, [])

  return {
    response,
    loading,
    error
  }
}
