import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { setPage } from '../../actions/authActions.js';
import './Unpack.css';

class Unpack extends Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        this.props.setPage('unbox');
    }
    render() {
        return (
            <div className="Unpack">
                <div className="unpack_body">
                    <p>To continue, please login:</p>
                    <hr></hr>
                    <Button variant="danger" href="/login">LOG IN</Button>
                </div>
            </div>
        );
    }
}
Unpack.propTypes = {
    setPage: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { setPage }
)(Unpack);