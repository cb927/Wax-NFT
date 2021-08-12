import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import './BottomNavbar.css';

function BottomNavbar(props) {
    const page = props.auth.currentPage;
    return (
        <div className="BottomNavbar">
            <img alt="Pdapp Logo" />
            <div className="items">
                <BottomNavbarItem to="/" pagename="home" currentpage={page}>HOME</BottomNavbarItem>
                <BottomNavbarItem to="/unpack" pagename="unbox" currentpage={page}>UNBOX</BottomNavbarItem>
                <BottomNavbarItem to="/waxio" pagename="inventory" currentpage={page}>INVENTORY</BottomNavbarItem>
                <BottomNavbarItem to="/faq" pagename="faq" currentpage={page}>FAQ</BottomNavbarItem>
                <BottomNavbarItem to="/tos" pagename="tos" currentpage={page}>TOS</BottomNavbarItem>
                <BottomNavbarItem to="/help" pagename="help" currentpage={page}>Help</BottomNavbarItem>
            </div>
        </div>
    );
}

export function BottomNavbarItem(props) {
    const { currentpage, pagename } = props;
    return (
        currentpage === pagename ?
            <Link className={`BottomNavbarItem active`} {...props} /> :
            <Link className={`BottomNavbarItem`} {...props} />
    );
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