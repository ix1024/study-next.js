import React, { Component } from "react"
import { List, InputItem, Picker, DatePicker } from 'antd-mobile'
import { createForm } from 'rc-form'
import { district, provinceLite } from 'antd-mobile-demo-data';
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class FormType extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = { date: now };
    }
    render() {
        const { data, moneyKeyboardWrapProps } = this.props
        const { getFieldProps } = this.props.form;
        const attributeId = data.attributeId;
        let seasons = [[]];
        const name = data.attribute.name;
        data.attribute.values && data.attribute.values.length && data.attribute.values.forEach((item) => {
            seasons[0].push({ label: item.value, value: item.id })
        })
        let formType = '';
        if (
            attributeId === 1 ||
            attributeId === 11 ||
            attributeId === 26 ||
            attributeId === 29 ||
            attributeId === 257 ||
            attributeId === 258
        ) {
            formType = 'InputItem';
        } else if (
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
                        placeholder={attributeId + ' ' + data.attribute.defaultRemind}
                        clear
                        onChange={(v) => { console.log('onChange', v); }}
                        onBlur={(v) => { console.log('onBlur', v); }}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
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
                            value={this.state.sValue}
                            onChange={v => this.setState({ sValue: v })}
                            onOk={v => this.setState({ sValue: v })}
                        >
                            <List.Item arrow="horizontal">{name}</List.Item>
                        </Picker>
                    </List>
                )

            case 'DatePicker':
                return (
                    <DatePicker
                        mode="date"
                        title={name}
                        extra="Optional"
                        value={this.state.date}
                        onChange={date => this.setState({ date })}
                    >
                        <List.Item arrow="horizontal">{name}</List.Item>
                    </DatePicker>
                )
            default:
                return (
                    <div>  {name}
                    </div>
                )
        }

    }
}
export default createForm()(FormType)