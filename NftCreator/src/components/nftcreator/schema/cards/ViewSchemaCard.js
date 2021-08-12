
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ViewSchemaCard.css';

export default class CreateSchemaCard extends Component {
    render() {
        return (
            <Link to="/collection/viewschema" className="ViewSchemaCard pdapp_active_btn pdapp_hover_slide pdapp_card pdapp_m1 pdapp_p1 pdapp_bgcolr2">
                <div className="CardBody">
                    <p className="pdapp_colr1 pdapp_text_center">Random</p>
                </div>
            </Link>
        );
    }
}