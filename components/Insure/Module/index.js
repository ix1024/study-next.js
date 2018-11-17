import React, { Component } from "react"
import { List, Switch, WhiteSpace } from 'antd-mobile'

import { createForm } from 'rc-form'
import ProductAttrs from '../ProductAttrs'
class Module extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            checked1: true,
        };
    }
    render() {
        const { data } = this.props
        let checked = false
        const { getFieldProps, key } = this.props.form;
        return (
            <div className="moduel-item">
                <WhiteSpace />
                <h3>{data.name}</h3>

                {
                    data.productAttrs.map((item, index) => (
                        <ProductAttrs data={{ mData: data, item }} key={key + '' + index} />
                    ))
                }
                <List
                    renderHeader={() => data.name}
                >

                    <List.Item
                        extra={<Switch
                            {...getFieldProps('Switch7', {
                                initialValue: true,
                                valuePropName: 'checked',
                            })}
                            platform="ios"
                        />}
                    >保存为常用联系人</List.Item>

                </List>
            </div>
        )
    }
}
export default createForm()(Module)