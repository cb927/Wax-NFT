import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CreateSchemaCard.css';

export default class CreateSchemaCard extends Component {
    render() {
        return (
            <Link to="/collection/createschema" className="CreateSchemaCard pdapp_active_btn pdapp_hover_slide pdapp_card">
                <div className="CardBody">
                    <div className="PlusSign"></div>
                    <p className="Comment">Create New Schema</p>
                </div>
            </Link>
        );
    }
}