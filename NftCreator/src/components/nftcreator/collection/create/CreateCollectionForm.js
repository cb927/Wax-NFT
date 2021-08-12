import React, { Component } from 'react';
import './CreateCollectionForm.css';

export default class CreateCollectionForm extends Component {

    onChoose = e => {
        this.refs.photoInput.click();
    }

    onChange = e => {
        if (!e.target.value) {
            this.refs.photoImg.src = "/img/CollectionPhoto.svg";
            return;
        }
        var file = e.target.files[0], reader = new FileReader();
        reader.onload = this.onImageLoad;
        reader.readAsDataURL(file);
    }

    onImageLoad = e => {
        this.refs.photoImg.src = e.target.result;
        // var imageSize = atob(decodeURI(e.target.result).replace(/^.*base64,/, '')).length;
        // this.setState({ sizeExceeded: imageSize > 1024 * 1000 });
        // if (this.state.sizeExceeded /* || bad image */) {
        //     this.setPlaceholderImage();
        // } else {
        //     this.setState({ profileImageData: e.target.result });
        // }
    }

    render() {
        return (
            <form className="CreateCollectionForm pdapp_section">
                <div className="row">
                    <div className="col-md-3">
                        <div className="CollectionPhoto pdapp_active_btn pdapp_hover_slide" onClick={this.onChoose}>
                            <input ref="photoInput" type="file" accept="image/*" style={{ display: "none" }} onInput={this.onChange} />
                            <img ref="photoImg" className="PhotoImg" src="/img/CreateCollectionPhoto.svg" height="115px" alt="Collection" />
                            <p className="Comment">Add a collection photo</p>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="CollectionInfo">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Collection Name<br />cccA</label>
                                    <input type="text" required />
                                    <label>Display Name<br />cccA</label>
                                    <input type="text" />
                                    <label>Website URL</label>
                                    <input type="text" />
                                </div>
                                <div className="col-sm-6">
                                    <label>Collection Description</label>
                                    <textarea />
                                    <label>Market Fee(0%-15%)</label>
                                    <input type="text" />
                                </div>
                            </div>
                            <div className="SubmitSection">
                                <input type="submit" value="Create Collection" className="pdapp_active_btn" onClick={this.props.onSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}