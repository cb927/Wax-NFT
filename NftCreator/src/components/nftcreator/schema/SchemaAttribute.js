import React, { Component } from 'react';

export default class SchemaAttribute extends Component {
    
    componentDidMount() {
        this.refs.name.value = this.props.name;
        this.refs.value.selectedIndex = this.props.value;
    }

    componentDidUpdate() {
        this.refs.name.value = this.props.name;
        this.refs.value.selectedIndex = this.props.value;
    }

    render() {
        return (
            <div className="row">
                <div className="col-6">
                    <input ref="name" className="pdapp_br1 pdapp_text_center pdapp_bgcolr3 pdapp_colr1 pdapp_p1 pdapp_full_width" type="text" placeholder="Attribute Name" onChange={this.props.nameHandler}/>
                </div>
                <div className="col-6">
                    <select ref="value" className="pdapp_br1 pdapp_text_center pdapp_bgcolr3 pdapp_colr1 pdapp_p1 pdapp_full_width" onChange={this.props.valueHandler}>
                        <option>Integer Number</option>
                        <option>Floating Point Number</option>
                        <option>Text</option>
                        <option>Image</option>
                        <option>IPFS Hash</option>
                        <option>Boolean</option>
                    </select>
                </div>
                <div className="col-12">
                    <div className="pdapp_br1 pdapp_mt1 pdapp_mb1 pdapp_mla pdapp_bgcolr1 pdapp_bgcolr1_hover pdapp_colr2 pdapp_fit_width pdapp_pr1 pdapp_pl1 pdapp_btn" onClick={this.props.removeHandler}>Remove Above</div>
                </div>
            </div>
        );
    }
}