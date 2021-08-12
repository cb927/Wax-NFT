import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { setPage } from '../../../actions/authActions.js';
import CreateSchemaForm from '../../../components/nftcreator/schema/create/CreateSchemaForm.js';
import './CreateSchema.css';

class CreateSchema extends Component {
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
            <div className="CreateSchema">
                <div className="pdapp_waxaccount" onClick={this.onLogin}>{this.props.auth.waxAccount}</div>
                <div className="CreateSchemaLabel" style={{width:"100%"}}>
                    <h1>Create New Schema</h1>
                </div>
                <div className="pdapp_part_width">
                    <CreateSchemaForm onSubmit={this.onSubmit} />
                </div>
            </div>
            
        );
    }
}

CreateSchema.propTypes = {
    setPage: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(
    mapStateToProps,
    { setPage }
)(CreateSchema);