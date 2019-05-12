import * as React from "react";
import {connect} from 'react-redux'
import {decrement, increment} from "./action";

const mapStateToProps = state => {
    return {count: state.count}
}

const mapDispatchToProps = dispatch => {
    return {
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement()),
    }
}

const Counter = ({count, increment, decrement}) => {
    return (
        <div>
            <h2>Counter</h2>
            <div>
                <button onClick={decrement}>-</button>
                <span>{count}</span>
                <button onClick={increment}>+</button>
            </div>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter)