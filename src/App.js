import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Login } from './components/Login';
import { Georeferencias } from './components/Georeferencias/Georeferencias';
import {IndexEstados} from './components/Estados/IndexEstados';
import {IndexUsuarios} from './components/Usuario/IndexUsuarios';
import {NotFound} from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.css';
import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/Georefs' component={Georeferencias} />
            <Route exact path='/Usuarios' component={IndexUsuarios} />
            <Route exact path='/Estados' component={IndexEstados} />
            <Route component={NotFound} />
          </Switch>
        );
    }
}
