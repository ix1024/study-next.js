import React from 'react'
import Banner from "./Banner";
import 'isomorphic-unfetch'

export default class extends React.Component {

    static async getInitialProps({ req }) {

        const res = await fetch('https://m.test.com/api/insurance-slips/20181116028720/page-info?t=1542362784751')
        const json = await res.json()
        const data = res.data;
        // kwsak.clear();
        // console.log(json);
        return {
            data: data,
            userAgent: req ? req.headers['user-agent'] : navigator.userAgent,
            photos: new Array(4).fill(0).map((v, k) => k + 1)
        }
    }
    render() {
        return (
            <div>
                <Banner />
                Home {JSON.stringify(this.props.data)}
            </div>
        )
    }
}