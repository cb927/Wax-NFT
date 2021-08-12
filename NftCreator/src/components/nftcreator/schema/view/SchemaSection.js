import React, { Component } from 'react';
import CreateSchemaCard from '../cards/CreateSchemaCard.js';
import ViewSchemaCard from '../cards/ViewSchemaCard.js';
import './SchemaSection.css';

export default class SchemaSection extends Component {
    render() {
        return (
            <div className="SchemaSection pdapp_section">
                <CreateSchemaCard />
                <ViewSchemaCard />
            </div>
        );
    }
}