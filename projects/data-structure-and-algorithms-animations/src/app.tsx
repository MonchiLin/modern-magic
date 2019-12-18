import * as React from "react";
import {BrowserRouter, Route} from 'react-router-dom'
import {SelectionSort} from '@magic/data-structure-and-algorithms/Algorithms'


const HomePage = () => <div>
</div>;
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

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Route path="/" exact component={HomePage}/>
                <Route path="/users" exact component={UsersPage}/>
            </Layout>
        </BrowserRouter>
    )
};

export {
    App
}

