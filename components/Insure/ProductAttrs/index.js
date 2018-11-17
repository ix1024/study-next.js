import { connect } from 'react-redux'
import React, { Component } from "react"
import { List, InputItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import FormType from "../FormType";

class ProductAttrs extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { data } = this.props

        return (
            <FormType data={data} />
        )

    }
}

export default connect()(ProductAttrs)