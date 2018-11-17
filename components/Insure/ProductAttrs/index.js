import React, { Component } from "react"
import { List, InputItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import FormType from "../FormType";
export default class ProductAttrs extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { data, moneyKeyboardWrapProps } = this.props

        return (
            <FormType data={data} />
        )

    }
}