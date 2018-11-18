import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import 'isomorphic-unfetch'
import kwsak from 'kwsak'
import config, { api } from "../config"
import insureApp from "../reducers"
import Insure from "../components/Insure";
import './index.scss'
const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

const crashReporter = store => next => action => {
    try {
        return next(action)
    } catch (err) {
        console.error('Caught an exception!', err)
        Raven.captureException(err, {
            extra: {
                action,
                state: store.getState()
            }
        })
        throw err
    }
}
const store = createStore(
    insureApp,
    applyMiddleware(logger, crashReporter)
)

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