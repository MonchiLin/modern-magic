import React from "react";
import axios from 'axios'

class InClassComponentRequest extends React.Component {
  componentDidMount(): void {
    axios({url: ""})
      .then(res => {
        console.log("result", res)
      })
      .catch(err => {
        console.warn("error", err)
      })
  }
}

export default InClassComponentRequest
