import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { setPage } from '../../../actions/authActions.js';
import CreateCollectionForm from '../../../components/nftcreator/collection/create/CreateCollectionForm';
import './CreateCollection.css';

class CreateCollection extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.setPage('createcollection');
    }

    onSubmit = e => {
        //e.preventDefault();
        //this.props.history.push("/");
    }

    render() {
        return (
            <div className="CreateCollection">
                <div className="pdapp_waxaccount" onClick={this.onLogin}>{this.props.auth.waxAccount}</div>
                <div className="CreateCollectionLabel" style={{width:"100%"}}>
                    <h1>Create New Collection</h1>
                </div>
                <div className="pdapp_part_width">
                    <CreateCollectionForm onSubmit={this.onSubmit} />
                </div>
            </div>
            
        );
    }
}

CreateCollection.propTypes = {
    setPage: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(
    mapStateToProps,
    { setPage }
)(CreateCollection);