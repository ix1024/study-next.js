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
export default class extends React.Component {
    static async getInitialProps({ req }) {

        //const res = await axios(api.url + 'article')
        //const json = await res.json()
        //const data = res.data;
        kwsak.clear();
        console.log(config);
        return {
            //data: JSON.stringify(data),
            userAgent: req ? req.headers['user-agent'] : navigator.userAgent,
            photos: new Array(4).fill(0).map((v, k) => k + 1)
        }
    }

    constructor(props) {
        super(props)
        this.onKeyDown = this.onKeyDown.bind(this)
    }

    // handling escape close
    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown)
    }

    onKeyDown(e) {
        if (!this.props.url.query.photoId) return
        if (e.keyCode === 27) {
            this.props.url.back()
        }
    }

    dismissModal() {
        Router.push('/')
    }

    showPhoto(e, id) {
        e.preventDefault()
        Router.push(`/?photoId=${id}`, `/photo?id=${id}`)
    }

    render() {
        const { url, photos, userAgent, data } = this.props

        return (
            <div className='list'>
                <Link href="/about" >asdfasdf</Link>
                {data}
                {
                    url.query.photoId &&
                    <Modal
                        id={url.query.photoId}
                        onDismiss={() => this.dismissModal()}
                    />
                }
                {
                    photos.map((id) => (
                        <div key={id} className='photo'>
                            <a
                                className='photoLink'
                                href={`/photo?id=${id}`}
                                onClick={(e) => this.showPhoto(e, id)}
                            >
                                {id}
                            </a>
                        </div>
                    ))
                }
                <style jsx>{`
          .list {
            padding: 50px;
            text-align: center;
          }
          .photo {
            display: inline-block;
          }
          .photoLink {
            color: #333;
            verticalAlign: middle;
            cursor: pointer;
            background: #eee;
            display: inline-block;
            width: 250px;
            height: 250px;
            line-height: 250px;
            margin: 10px;
            border: 2px solid transparent;
          }
          .photoLink:hover {
            borderColor: blue;
          }
        `}</style>
            </div>
        )
    }
}