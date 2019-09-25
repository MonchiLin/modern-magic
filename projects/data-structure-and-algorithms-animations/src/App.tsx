import * as React from "react";
import {BrowserRouter, Route, NavLink} from 'react-router-dom'

const HomePage = () => <div>Home Page</div>;
const UsersPage = () => <div>Users Page</div>;

const Layout = (props) => {

    return (
        <div className="contains">

            <header>
                我们的 react router 4
            </header>

            <main>
                {props.children}
            </main>


        </div>
    )
};

class App extends React.Component {
    render() {
        return <BrowserRouter>
            <Layout>
                <Route path="/" exact component={HomePage}/>
                <Route path="/users" exact component={UsersPage}/>
            </Layout>
        </BrowserRouter>
    }
}

export {
    App
}

