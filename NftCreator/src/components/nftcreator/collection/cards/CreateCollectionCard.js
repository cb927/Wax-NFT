import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CreateCollectionCard.css';

export default class CreateCollectionCard extends Component {
    render() {
        return (
            <Link to="/createcollection" className="CreateCollectionCard pdapp_active_btn pdapp_hover_slide">
                <div className="CardBody">
                    <div className="PlusSign"></div>
                    <p className="Comment">Create New Collection</p>
                </div>
            </Link>
        );
    }
}