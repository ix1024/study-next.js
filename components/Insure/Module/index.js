import React, { Component } from "react"
import { List, InputItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import ProductAttrs from '../ProductAttrs'

export default class Module extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { data } = this.props
        return (
            <div>
                <h3>{data.name}</h3>
                Module
                {
                    data.productAttrs.map((item) => (
                        <ProductAttrs data={item} />
                    ))
                }
            </div>
        )
    }
}