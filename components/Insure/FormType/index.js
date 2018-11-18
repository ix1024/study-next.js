import { connect } from 'react-redux'
import React, { Component } from "react"
import { List, InputItem, Picker, DatePicker } from 'antd-mobile'
import { createForm } from 'rc-form'
import { district, provinceLite } from 'antd-mobile-demo-data'
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class FormType extends Component {
    constructor(props) {
        super(props)
        this.state = { date: now };
    }
    render() {
        const { data, moneyKeyboardWrapProps } = this.props
        //console.log(1, this.props)

        const itemData = data.item
        const mData = data.mData
        const { getFieldProps } = this.props.form
        const attributeId = itemData.attributeId
        let seasons = [[]];
        const _id = mData.id + '-' + attributeId
        const name = itemData.attribute.name;
        itemData.attribute.values && itemData.attribute.values.length && itemData.attribute.values.forEach((item) => {
            seasons[0].push({ label: item.value, value: item.controlValue })
        })
        //console.log('seasons', _id, name, seasons)
        let formType = '';
        //文本类型
        if (
            attributeId === 1 ||
            attributeId === 11 ||
            attributeId === 26 ||
            attributeId === 29 ||
            attributeId === 257 ||
            attributeId === 258
        ) {
            formType = 'InputItem';
        }
        //
        else if (
            attributeId === 3 ||
            attributeId === 32 ||
            attributeId === 14
        ) {
            formType = 'Picker';
        } else if (
            attributeId === 13 ||
            attributeId === 259
        ) {
            formType = 'DatePicker'
        } else {

        }
        switch (formType) {

            case 'InputItem':
                return (
                    <InputItem
                        type="text"
                        placeholder={attributeId + ' ' + itemData.attribute.defaultRemind}
                        clear
                        onChange={(v) => { console.log('onChange', v); }}
                        onBlur={(v) => { console.log('onBlur', v); }}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                        _id={_id}
                    >{name}</InputItem>
                )

            case 'Picker':
                return (
                    <List style={{ backgroundColor: 'white' }} className="picker-list">
                        <Picker
                            data={seasons}
                            title={name}
                            cascade={false}
                            extra="请选择"
                            _id={_id}
                            key={_id}
                            value={this.state.sValue}
                            onChange={v => console.log('onchange', v, this.props.modules)}
                            onOk={v => this.setState({ sValue: v })}
                        >
                            <List.Item arrow="horizontal">{name}</List.Item>
                        </Picker>
                    </List >
                )

            case 'DatePicker':
                return (
                    <DatePicker
                        mode="date"
                        title={name}
                        extra="Optional"
                        _id={_id}
                        value={this.state.date}
                        onChange={date => this.setState({ date })}
                    >
                        <List.Item arrow="horizontal">{name}</List.Item>
                    </DatePicker>
                )
            default:
                return (
                    <div>
                        {name}{_id}
                    </div>
                )
        }

    }
}
const setStateToProps = (state) => {
    const modules = state.insure.modules
    return { modules }
}
export default connect(setStateToProps)(createForm()(FormType))