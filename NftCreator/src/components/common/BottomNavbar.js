import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import './BottomNavbar.css';

class BottomNavbar extends Component {
    render() {
        const page = this.props.auth.currentPage;
        return (
            <div className="BottomNavbar">
                <img alt="Pdapp Logo" />
                <div className="items">
                    <BottomNavbarItem to="/" pagename="home" currentpage={page}>HOME</BottomNavbarItem>
                    <BottomNavbarItem to="/createcollection" pagename="createcollection" currentpage={page}>Create Collection</BottomNavbarItem>
                </div>
            </div>
        );
    }
}

export class BottomNavbarItem extends Component {
    render() {
        const { currentpage, pagename } = this.props;
        return (
            currentpage === pagename ?
            <Link className={`BottomNavbarItem active`} {...this.props} />:
            <Link className={`BottomNavbarItem`} {...this.props} />
        );
    }
}

BottomNavbar.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(
    mapStateToProps,
)(BottomNavbar);