import React, { Component } from 'react';
import SchemaAttributeGroup from '../SchemaAttributeGroup.js';
import './CreateSchemaForm.css';

export default class CreateSchemaForm extends Component {
    render() {
        return (
            <form className="CreateSchemaForm pdapp_section">
                <div className="row">
                    <div className="col-md-3">
                        <div className="pdapp_p1 pdapp_mt1 pdapp_text_center">
                            <p className="Comment pdapp_text_left">Schema Name</p>
                            <input className="pdapp_underline_input pdapp_full_width pdapp_mb1" type="text" placeholder="12 Characters Max" />
                            <input type="submit" className="pdapp_bgcolr1 pdapp_bgcolr1_hover pdapp_colr2 pdapp_active_btn" value="Create Schema"/>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <SchemaAttributeGroup />
                    </div>
                </div>
            </form>
        );
    }
}