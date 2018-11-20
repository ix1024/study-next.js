import { connect } from 'react-redux'
import React, { Component } from "react"
import { List, InputItem, Picker, DatePicker } from 'antd-mobile'
import { setModules } from "../../../action/insure";
import insureData from "../../../data/insure";
import { setModulesValueById, Restricts } from "../../../utils/insure";
import { createForm } from 'rc-form'
import { setTimeout } from 'timers';
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class FormType extends Component {
    constructor(props) {
        super(props)
        this.state = { date: now, error: false }
    }
    onChange(val, id) {
        console.clear()
        clearTimeout(this.changeLock)
        this.changeLock = setTimeout(() => {

            this.props.setModuels(setModulesValueById(this.props.modules, id, val))
            this.restricts()
        }, 1000)

    }
    onBlur() {
        //console.log(arguments)
    }

    restricts() {
        let restricts = new Restricts({
            modules: this.props.modules,
            restricts: this.props.restricts
        })

        this.props.setModuels(restricts.cale(0))

    }
    componentDidMount() {
       
    }
    render() {

        const { data, moneyKeyboardWrapProps, error } = this.props
        //const { getFieldProps } = this.props.form

        const itemData = data.item
        const attribute = itemData.attribute
        const keyCode = (attribute.keyCode || '').toLowerCase()
        const regex = attribute.regex
        const hideItem = attribute.hideItem
        const defaultValue = attribute.defaultValue
        const mData = data.mData


        const attributeId = itemData.attributeId
        const _id = mData.id + '-' + attributeId
        const name = itemData.attribute.name

        let seasons = [[]]



        itemData.attribute.values && itemData.attribute.values.length && itemData.attribute.values.forEach((item) => {
            seasons[0].push({ label: item.value, value: item.controlValue })
        })

        let formType = ''
        let inputType = 'text'
        let inputLength = 50
        let editable = true

        if (keyCode === 'moblie') {
            inputType = 'phone'
        } else if (keyCode === 'urgencyContactPhone'.toLowerCase()) {
            inputType = 'phone'
        }

        switch (itemData.attribute.type) {
            case 0: //下拉框
                formType = 'Picker'
                break
            case 1: //日历控件
                formType = 'DatePicker'
                break
            case 2: //同时出现下拉框和日历控件区间 ?todo
                break
            case 3: //文本框                
                formType = 'InputItem'
                break
            case 4: //地区控件
                formType = 'Picker'
                break
            case 5: //职业控件
                formType = 'Picker'
                break
            case 6: //密码控件
                inputType = "password"
                break
            case 7: //文本?todo
                formType = 'Text'
                editable = false
                break
            case 8: //对话框                
                break
            case 9: //单选
                formType = 'Picker'
                break
            case 10: //多选                
                break
        }
        switch (formType) {
            case 'Text':
                return (
                    <div></div>
                )
            case 'InputItem':
                return (
                    <InputItem
                        className={hideItem}
                        type={inputType}
                        placeholder={attributeId + ' ' + itemData.attribute.defaultRemind}
                        clear
                        onChange={(v) => {/** this.onChange(v, _id, this) */ }}
                        onBlur={(v) => { this.onChange(v, _id, this) }}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                        _id={_id}
                        error={error}
                        editable={editable}
                        pattern={regex}
                        defaultValue={defaultValue}
                        maxLength={inputLength}
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
                            value={defaultValue}
                            onChange={(v) => { this.onChange(v, _id, this, 'picker') }}
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
                        onChange={date => { this.setState({ date }); this.onChange(date, _id, this, 'picker') }}
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
    const restricts = state.insure.restricts
    return { modules, restricts }
}
const setDispatchToProps = (dispatch) => {
    return { setModuels: (value) => { dispatch(setModules(value)) } }
}
export default connect(setStateToProps, setDispatchToProps)(createForm()(FormType))