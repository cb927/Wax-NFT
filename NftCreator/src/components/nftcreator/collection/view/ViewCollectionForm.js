import React, { Component } from 'react';
import './ViewCollectionForm.css';

export default class ViewCollectionForm extends Component {
    render() {
        return (
            <form className="ViewCollectionForm pdapp_section">
                <div className="row">
                    <div className="col-md-3">
                        <div className="CollectionPhoto">
                            <img className="PhotoImg" src="/img/ViewCollectionPhoto.svg" height="115px" alt="Collection" />
                            <div className="CollectionName">Collection Name</div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="CollectionInfo">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Display Name</label><br />
                                    <label className="fontlg">Display Name</label>
                                </div>
                                <div className="col-sm-6">
                                    <label>Collection Description</label><br />
                                    <label className="fontmd">This is a simple description. Just ignore it!</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Website URL</label><br />
                                    <label className="fontmd">Website URL</label>
                                </div>
                                <div className="col-sm-6">
                                    <label>Market Fee</label><br />
                                    <label className="fontmd">Market Fee</label>
                                </div>
                            </div>
                            <div className="SubmitSection">
                                <input type="submit" value="Edit Collection" className="pdapp_active_btn" onClick={this.props.onSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}