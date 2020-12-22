import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import List from "./pages/List";
import './App.css';
import 'antd/dist/antd.css';
import Detail from "./pages/Detail";

function App() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={List}/>
                <Route exact path="/:id" component={Detail}/>
            </Switch>
        </BrowserRouter>
    )
}

export default App;
