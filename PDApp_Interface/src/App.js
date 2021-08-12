import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import { setCurrentUser } from "./actions/authActions";
import Shop from './pages/shop/Shop.js';
import Unpack from './pages/unpack/Unpack.js';
import BottomNavbar from './components/common/BottomNavbar.js';
import store from "./store";

import "./App.css";

// Check for waxAccount
if (localStorage.waxAccount) {
    const waxAccount = localStorage.waxAccount;
    store.dispatch(setCurrentUser(waxAccount));
}

class App extends Component {
    
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <section>
                        <div id="main">
                            <Switch>
                                <Route path="/unpack" exact component={Unpack} />
                                <Route path="/login" exact component={Shop} />
                                <Route path="/faq" />
                                <Route path="/tos" />
                                <Route path="/help" />
                                <Route path='/waxio' component={() => { window.location = 'https://wallet.wax.io/nfts?collection_name=gpk.topps'; return null; }} />
                                <Route path="/" exact component={Shop} />
                                <Redirect to="/"/>
                            </Switch>
                        </div>
                        <BottomNavbar />
                    </section>
                </Router>
            </Provider>
        );
    }
}

export default App;
