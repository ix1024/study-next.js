import { connect } from 'react-redux'
import React, { Component } from "react"
//import { Toast } from 'antd-mobile'
import Module from "./Module"
import NavBar from "../../components/NavBar"
import insure from "../../data/insure.json"
import { Restricts } from "../../utils/insure/restricts"
import { setInusreValue, setModules } from "../../action/insure"
import { store } from "../../utils/storage";
const _insure = { ...insure }

class insureApp extends Component {
    static async getInitialProps() {
        // const res = await fetch('')
        // const json = await res.json()
        // const data = res.data; 
        return {}
    }
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let defaultModules
        this.props.setInusreValue(_insure.result)

        const restricts = new Restricts({
            modules: insure.result.modules,
            restricts: insure.result.restricts
        });
        defaultModules = restricts.cale(1)
        store.set('modules', defaultModules)

        this.props.setModules(defaultModules)
        window.store = store
    }
    componentDidUpdate() { }
    componentWillUpdate() { }

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