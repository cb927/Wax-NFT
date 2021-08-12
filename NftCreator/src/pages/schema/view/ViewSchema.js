import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { setPage } from '../../../actions/authActions.js';
import SchemaAttributeGroup from '../../../components/nftcreator/schema/SchemaAttributeGroup.js';
import './ViewSchema.css';

class ViewSchema extends Component {
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
            <div className="ViewSchema">
                <div className="pdapp_waxaccount" onClick={this.onLogin}>{this.props.auth.waxAccount}</div>
                <div className="pdapp_part_width">
                    <h1>Schema: Random</h1>
                    <SchemaAttributeGroup />
                </div>
            </div>
        );
    }
}

ViewSchema.propTypes = {
    setPage: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(
    mapStateToProps,
    { setPage }
)(ViewSchema);