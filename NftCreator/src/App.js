import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { setCurrentUser } from "./actions/authActions";
import NftCreator from './pages/NftCreator.js';
import CreateCollection from './pages/collection/create/CreateCollection.js';
import ViewCollection from './pages/collection/view/ViewColletion.js';
import CreateSchema from './pages/schema/create/CreateSchema.js';
import ViewSchema from './pages/schema/view/ViewSchema.js';
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
                            <Route path="/" exact component={NftCreator} />
                            <Route path="/createcollection" exact component={CreateCollection} />
                            <Route path="/collection" exact component={ViewCollection} />
                            <Route path="/collection/createschema" exact component={CreateSchema} />
                            <Route path="/collection/viewschema" exact component={ViewSchema} />
                            <Route path="/faq" />
                            <Route path="/tos" />
                            <Route path="/help" />
                            <Route path='/waxio' component={() => { window.location = 'https://wallet.wax.io/nfts?collection_name=gpk.topps'; return null; }} />
                        </div>
                        <BottomNavbar />
                    </section>
                </Router>
            </Provider>
        );
    }
}

export default App;
