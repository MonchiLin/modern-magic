import React from 'react';
import {render} from 'react-dom'
import Counter from './counter'
import {Provider} from 'react-redux'
import store from './store'


const App = () => (
    <Provider store={store}>
        <div>
            <Counter/>
        </div>
    </Provider>
)


export default App;
