import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './login'
import ToDoList from './ToDoList';

const Main = () => {
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/todoapp/" component={ToDoList} />
        </Switch>

    );
}
export default Main