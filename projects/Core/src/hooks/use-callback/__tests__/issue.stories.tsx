import React from "react";
import {storiesOf} from '@storybook/react';

class ClassProfilePage extends React.Component<any, any> {
  showMessage = () => {
    alert('From Class ' + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Class Style user: {this.props.user}</button>;
  }
}

export function FunctionProfilePage(props) {
  const showMessage = () => {
    alert('From Functional ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };


  return (
    <button onClick={handleClick}>Functional user: {props.user}</button>
  );
}


function App() {
  const [state, setState] = React.useState(1);
  return (
    <div className="App">
      <button onClick={() => {
        setState(x => x + x);
      }}>double
      </button>
      <div>state:{state}</div>
      <FunctionProfilePage user={state}/> // 点击始终显示的是快照值
      <br/>
      <ClassProfilePage user={state}/> // 点击始终显示的是最新值
    </div>
  );
}


storiesOf("useCallbackIssue", module)
  .add("issue", () => <App/>)
