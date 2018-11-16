import React from 'react'
import MyError from "../components/Error";

export default class Page extends React.Component {
    static async getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return { statusCode }
    }

    render() {
        return <MyError statusCode={this.props.statusCode} />
    }
}