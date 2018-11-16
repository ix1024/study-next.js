import React, { Component } from "react"
import { List, InputItem } from 'antd-mobile'
import { createForm } from 'rc-form'

export default class FormType extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }
    render() {
        const { data, moneyKeyboardWrapProps } = this.props

        switch (data.attributeId) {
            case 1:
                return (
                    <InputItem
                        type="text"
                        placeholder="start from right"
                        clear
                        onChange={(v) => { console.log('onChange', v); }}
                        onBlur={(v) => { console.log('onBlur', v); }}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    >{data.attribute.name}</InputItem>
                )
                break;
            case 2:
                return (
                    <div></div>
                )
                break;
            default:
                return (
                    <div></div>
                )
                break;
        }

    }
}