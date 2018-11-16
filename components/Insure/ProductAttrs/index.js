import React, { Component } from "react"
import { List, InputItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import FormType from "../FormType";
export default class ProductAttrs extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }
    render() {
        const { data, moneyKeyboardWrapProps } = this.props

        return (
            <div>
                <h3>{data.attributeId}</h3>
                <FormType data={data} />
            </div>
        )

    }
}