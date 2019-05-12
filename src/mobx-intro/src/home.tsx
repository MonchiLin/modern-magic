import * as React from "react";
import {inject, observer} from "mobx-react";

@inject("mobxStore")
@observer
export default class Home extends React.Component {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        // @ts-ignore
        const {name, greeting, setName} = this.props.mobxStore

        return (
            <div>
                <p>name: {name}</p>
                <p>greeting: {greeting}</p>
                <button onClick={() => setName("test")}>setName -> test</button>
                <button onClick={() => setName("name")}>setName -> name</button>
            </div>
        )
    }
}