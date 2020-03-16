import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import CountdownService, { CountdownListener } from "../lib/";

const App = () => {
  const [value, updateValue] = useState(0)


  useEffect(() => {
    const countdown = new CountdownService({token: "@qqq"})
    countdown.addListener(updateValue)
    countdown.countdown({
      from: 60,
      to: 0,
      step: 1,
      timeout: 1000,
    })
  }, [])

  return <div>Hello React {value}</div>
}

render(<App />, document.getElementById('app'));
