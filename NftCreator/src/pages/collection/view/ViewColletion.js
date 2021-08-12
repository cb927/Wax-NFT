import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { setPage } from '../../../actions/authActions.js';
import ViewCollectionForm from '../../../components/nftcreator/collection/view/ViewCollectionForm.js';
import SchemaSection from '../../../components/nftcreator/schema/view/SchemaSection.js';
import './ViewCollection.css';

class ViewCollection extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.setPage('nftcreator');
    }

    onSubmit = e => {
        //e.preventDefault();
        //this.props.history.push("/");
    }

    render() {
        return (
            <div className="ViewCollection">
                <div className="pdapp_waxaccount" onClick={this.onLogin}>{this.props.auth.waxAccount}</div>
                <div className="pdapp_part_width">
                    <h1 className="">Collection: Collection Name</h1>
                    <ViewCollectionForm onSubmit={this.onSubmit} />
                    <h3 className="pdapp_mt1 pdapp_ml2">Schemas</h3>
                    <SchemaSection />
                </div>
            </div>
            
        );
    }
}

ViewCollection.propTypes = {
    setPage: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(
    mapStateToProps,
    { setPage }
)(ViewCollection);