import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';

import PdappCard from '../../components/shop/PdappCard.js';
import { setPage, loginUser } from '../../actions/authActions.js';
// import * as waxjs from '@waxio/waxjs/dist';
import './Shop.css';

// const wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false);

class Shop extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.setPage('home');
    }

    onLogin = e => {
        e.preventDefault();
        this.props.auth.isAuthenticated ? this.props.loginUser() : this.props.loginUser("waxAccount");
        // wax.login()
        // .then(res => {
        //     this.props.loginUser(res);
        // })
        // .catch(err => {
        //     console.log(err);
        // });
    }

    render() {
        return (
            <div className="Shop">
                <Navbar>
                    <Navbar.Brand className="Navbar_Brand" to="#home">
                        <img alt="Pdapp Logo" />
                    </Navbar.Brand>
                    <button className="btn btn-dark" style={{ fontFamily: 'Arial', borderRadius: '.75rem', fontSize: '.9rem', fontWeight: '600' }}>Past Pdapps sales</button>
                    {this.props.auth.isAuthenticated ?
                        <div className="pdapp_waxaccount" onClick={this.onLogin}>{this.props.auth.waxAccount}</div> :
                        <div className="pdapp_waxaccount" onClick={this.onLogin}>Log in</div>}
                </Navbar>
                <section className="title_section">
                    <h1>PDApp Shop</h1>
                    <p>After you purchase your PDApp pack, you can open up the pack to reveal your cards.</p>
                </section>
                <section className="card_section">
                    <PdappCard />
                    <PdappCard />
                    <PdappCard />
                    <PdappCard />
                </section>
                <section className="buy_section">
                    <p>
                        Did you miss out? You can buy and sell nfts on secondary marketplaces such as
                    </p>
                    <a className="btn btn-danger" href="https://wax.atomichub.io/market?collection_name=gpk.topps">AtomicHub</a>{' '}
                    <a className="btn btn-danger" href="https://nfthive.io/market?collection=gpk.topps">NFTHive</a>
                </section>
                <section className="copyright_section">
                    <p>&copy; WAX.io 2021, All rights reserved.</p>
                    <p>&reg; &amp; &copy; 2021 THE TOPPS COMPANY, INC. ALL RIGHTS RESERVED. WWW.TOPPS.COM CODE# CMP047990</p>
                </section>
            </div>
        );
    }
}

Shop.propTypes = {
    setPage: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(
    mapStateToProps,
    { setPage, loginUser }
)(Shop);