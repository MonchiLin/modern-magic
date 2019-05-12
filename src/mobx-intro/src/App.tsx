import React from 'react';
import logo from './logo.svg';
import './App.css';
import {observer, inject, Provider} from 'mobx-react'
import store from './mobx-store'
import Home from './home'
class App extends React.Component {

    constructor(props) {
        super(props);
    }


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Provider mobxStore={store}>
                <Home/>
            </Provider>
        )
    }
}

export default App;
