import React, {useEffect} from "react";
import {storiesOf} from '@storybook/react';

function App() {
  const refresh = React.useRef(0)

  useEffect(() => {
    console.log("refresh")
  }, [refresh])

  return (
    <div className="App">
      <button onClick={_ => (refresh.current = new Date().getTime())}>refresh</button>
    </div>
  );
}


storiesOf("useEffect", module)
  .add("refresh", () => <App/>)
