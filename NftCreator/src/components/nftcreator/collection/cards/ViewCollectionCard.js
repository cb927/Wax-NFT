import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ViewCollectionCard.css';

export default class ViewCollectionCard extends Component {
    render() {
        return (
            <Link to="/collection" className="ViewCollectionCard pdapp_active_btn pdapp_hover_slide">
                <div className="CollectionNfts">3 Nfts</div>
                <img className="PhotoImg" src="/img/ViewCollectionPhoto.svg" height="150" alt="Collection" />
                <div className="CollectionName">Collection Name</div>
            </Link>
        );
    }
}