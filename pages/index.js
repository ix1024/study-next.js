import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import 'isomorphic-unfetch'
import kwsak from 'kwsak'
import config, { api } from "../config"
import insureApp from "../reducers"
import Insure from "../components/Insure";
import './index.scss'

const store = createStore(insureApp)

export default class extends Component {
    static async getInitialProps() {
        // const res = await fetch('')
        // const json = await res.json()
        // const data = res.data;
        //kwsak.clear();
        //console.log(json); 
        // console.log(config);
        return {
            // data: insure.result
        }
    }

    constructor(props) {
        super(props)
    }


    componentDidMount() { }

    componentWillUnmount() { }


    render() {
        return (
            <div>
                <Provider store={store}>
                    <Insure></Insure>
                </Provider>
            </div>
        )
    }
}