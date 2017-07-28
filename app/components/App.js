import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Popular from './Popular';
import Home from './Home';
import Battle from './Battle';
import Nav from './Nav';

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Nav/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/battle" component={Battle}/>
                        <Route path="/popular" component={Popular}/>
                        <Route render={ () => <h1>Not Found</h1> }/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}