import React, {useEffect} from "react";
import axios from 'axios'

function useRequest() {
  const [loading, updateLoading] = React.useState(false)
  const [response, updateResponse] = React.useState()

  useEffect(() => {
    async function doFetch() {
      updateLoading(true)
      try {
        updateResponse(await axios({url: ""}))
      } catch (e) {

      } finally {
        updateLoading(true)
      }
    }

    doFetch()
  }, [])

  return {
    response,
    loading
  }
}
