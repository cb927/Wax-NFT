import React, { Component } from 'react';
import SchemaAttribute from './SchemaAttribute.js';

export default class SchemaAttributeGroup extends Component {
    scrollFlag = false;
    newSchemaAttrList = [];

    constructor() {
        super();
        this.state = {
            SchemaAttrList: []
        };
    }

    componentDidUpdate() {
        this.scrollFlag && this.refs.addAttrBtn.scrollIntoView();
    }

    onAddAttr = e => {
        e.preventDefault();
        this.newSchemaAttrList.push({ name: "", value: 0 });
        this.setState({ SchemaAttrList: this.newSchemaAttrList });
        this.scrollFlag = true;
    }

    onRemove = (e, idx) => {
        e.preventDefault();
        this.newSchemaAttrList.splice(idx, 1);
        this.scrollFlag = false;
        this.setState({ SchemaAttrList: this.newSchemaAttrList });
    }

    onNameChange = (e, idx) => {
        e.preventDefault();
        this.newSchemaAttrList[idx].name = e.target.value;
    }

    onValueChange = (e, idx) => {
        e.preventDefault();
        this.newSchemaAttrList[idx].value = e.target.selectedIndex;
    }

    render() {
        return (
            <div className="pdapp_bgcolr2 pdapp_card pdapp_p1 pdapp_mt1 pdapp_mb1">
                <div className="row pdapp_mb1">
                    <div className="col-6">
                        <div className="pdapp_text_center">Attribute Name</div>
                    </div>
                    <div className="col-6">
                        <div className="pdapp_text_center">Attribute Type</div>
                    </div>
                </div>
                <div className="row pdapp_mb1">
                    <div className="col-6">
                        <div className="pdapp_br1 pdapp_text_center pdapp_bgcolr3 pdapp_colr1 pdapp_p1">name</div>
                    </div>
                    <div className="col-6">
                        <div className="pdapp_br1 pdapp_text_center pdapp_bgcolr3 pdapp_colr1 pdapp_p1">Text</div>
                    </div>
                </div>
                <div className="row pdapp_mb1">
                    <div className="col-6">
                        <div className="pdapp_br1 pdapp_text_center pdapp_bgcolr3 pdapp_colr1 pdapp_p1">img</div>
                    </div>
                    <div className="col-6">
                        <div className="pdapp_br1 pdapp_text_center pdapp_bgcolr3 pdapp_colr1 pdapp_p1">Image</div>
                    </div>
                </div>
                <hr className="pdapp_bgcolr1" />
                {this.state.SchemaAttrList.map((data, idx) => (
                    <SchemaAttribute key={idx} ref={`attr${idx}`} name={data.name} value={data.value} removeHandler={e => this.onRemove(e, idx)} nameHandler={e => this.onNameChange(e, idx)} valueHandler={e => this.onValueChange(e, idx)} />
                ))}
                <div ref="addAttrBtn" className="pdapp_bgcolr1 pdapp_bgcolr1_hover pdapp_colr2 pdapp_text_center pdapp_fit_width pdapp_ma pdapp_p1 pdapp_br1 pdapp_active_btn" onClick={this.onAddAttr}>Add New Attribute</div>
            </div>
        );
    }
}