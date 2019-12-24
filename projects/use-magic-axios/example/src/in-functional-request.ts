import React, {useEffect} from "react";
import axios from 'axios'

const InFunctionalRequest = () => {
  useEffect(() => {
    axios({url: ""})
      .then(res => {
        console.log("result", res)
      })
      .catch(err => {
        console.warn("error", err)
      })
  }, [])
}

export default InFunctionalRequest
