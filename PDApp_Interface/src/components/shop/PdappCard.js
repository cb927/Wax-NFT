import React, { Component } from 'react';
import './PdappCard.css';

export default class PdappCard extends Component {
    render() {
        return (
            <div className="PdappCard">
                <div className="row">
                    <div className="col-sm-4 pdappcard_img">
                        <img src="/img/FoodFightPackArt_WinterCon.png" width="100%" alt="Pdapp Card" />
                    </div>
                    <div className="col-sm-8 pdappcard_data">
                        <div className="pdappcard_row">
                            <div className="key">Packs:</div>
                            <div className="value">Food Fight! WinterCon 2021 Day 1 Pack</div>
                        </div>
                        <div className="pdappcard_row">
                            <div className="key">Series:</div>
                            <div className="value"></div>
                        </div>
                        <div className="pdappcard_row">
                            <div className="key">Release Date:</div>
                            <div className="value">Feb 26, 2021</div>
                        </div>
                        <div className="pdappcard_row">
                            <div className="key">Contains:</div>
                            <div className="value">3 Cards</div>
                        </div>
                        <div className="pdappcard_desc">
                            <div className="desc_row">59.83% chance at a Base Card</div>
                            <div className="desc_row">26.58% chance at a Prism Card</div>
                            <div className="desc_row">11.67% chance at a Sketch Card</div>
                            <div className="desc_row">1.83% chance at a Artist Signature Card</div>
                            <div className="desc_row">0.08% chance at a Golden Card</div>
                        </div>
                        <button className="btn btn-block btn-danger" disabled>Sold Out (2500/2500)</button>
                    </div>
                </div>
            </div>
        );
    }
}