import kwsak from 'kwsak'
import axios from 'axios'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import config, { api } from "../config"
import Modal from '../components/modal'
import 'isomorphic-unfetch'
import './index.scss'
import Link from 'next/link'
import Home from '../components/Home'
import Module from "../components/Insure/Module";

import insure from "../data/insure.json";


export default class extends React.Component {
    static async getInitialProps({ req }) {

        // const res = await fetch('')
        // const json = await res.json()
        // const data = res.data;
        //kwsak.clear();
        //console.log(json); 
        console.log(config);
        return {
            data: insure.result
        }
    }

    constructor(props) {
        super(props)
    }


    componentDidMount() { }

    componentWillUnmount() { }


    render() {
        const { url, photos, userAgent, data } = this.props

        return (
            <div className='list'>
                
                {
                    data.modules.map((item, index) => (
                        <Module data={item} key={index} />
                    ))
                }

            </div>
        )
    }
}