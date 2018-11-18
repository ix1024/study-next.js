import { connect } from 'react-redux'
import React, { Component } from "react"
import Module from "./Module"
import NavBar from "../../components/NavBar";
import insure from "../../data/insure.json"
import { insureUtils } from "../../utils/insure";
import { setInusreValue, setModules } from "../../action/insure";
const _insure = { ...insure }
class insureApp extends Component {
    static async getInitialProps() {
        // const res = await fetch('')
        // const json = await res.json()
        // const data = res.data;
        //kwsak.clear();
        //console.log(json); 
        // console.log(config);
        return {
            //data: insure.result
        }
    }
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setInusreValue(_insure.result)
        setTimeout(() => {
            let info = insureUtils(this.props.modules, '10-3', function (item) {
                return item.productAttrs.map((subItem) => {
                    if (subItem.attribute.type === 0) {
                        console.log(subItem.attribute.name, subItem);
                        subItem.attribute.values = []
                    }
                    return subItem
                })
            })
            console.log(info);
            this.props.setModules(info)
        }, 1000)

        setTimeout(() => {


            let info = insureUtils(this.props.modules, '10-3', function (item) {
                return item.productAttrs.map((subItem) => {
                    if (subItem.attribute.type === 0) {
                        console.log(subItem.attribute.name, subItem);
                        subItem.attribute.values = [{
                            "id": 4,
                            "value": "身份证",
                            "controlValue": 1,
                            "attributeId": 3,
                            "sort": 1,
                            "deleted": 0,
                            "isDefault": 0
                        }]
                    }
                    return subItem
                })
            })
            console.log(info);
            this.props.setModules(info)
        }, 5000)
    }

    componentWillUnmount() { }

    render() {
        const { modules } = this.props
        return (
            <div>
                <NavBar data="投保人信息" />
                {
                    modules.map((item, index) => (
                        <Module data={item} key={index} />
                    ))
                }
            </div>
        )
    }
}
const mapStatesToProps = (state) => {
    const data = state.insure
    const modules = data.modules
    console.log(state, modules)
    return { data, modules }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setInusreValue: function (data) {
            dispatch(setInusreValue(data));
        },
        setModules: function (data) {
            dispatch(setModules(data));
        }
    }
}
export default connect(mapStatesToProps, mapDispatchToProps)(insureApp)