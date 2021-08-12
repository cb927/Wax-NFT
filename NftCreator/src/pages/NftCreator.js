import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { setPage } from '../actions/authActions.js';
import CreateCollectionCard from '../components/nftcreator/collection/cards/CreateCollectionCard.js';
import ViewCollectionCard from '../components/nftcreator/collection/cards/ViewCollectionCard.js';
import './NftCreator.css';

class NftCreator extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.setPage('home');
    }

    render() {
        return (
            <div className="NftCreator">
                <div className="pdapp_waxaccount" onClick={this.onLogin}>{this.props.auth.waxAccount}</div>
                <div className="NftCreatorLabel">
                    <h1>My Collections</h1>
                    <p>All NFTs live within collections.They are like groups for NFTs that are of similar theme.</p>
                </div>
                <div className="CollectionCards pdapp_part_width">
                    <CreateCollectionCard />
                    <ViewCollectionCard />
                    <ViewCollectionCard />
                    <ViewCollectionCard />
                    <ViewCollectionCard />
                    <ViewCollectionCard />
                </div>
            </div>
        );
    }
}

NftCreator.propTypes = {
    setPage: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(
    mapStateToProps,
    { setPage }
)(NftCreator);