import React, { Component } from 'react'
import Error from 'next/error'
import "./index"

export default class MyError extends Component {


    render() {
        return (
            <div>
                <Error statusCode={this.props.statusCode} />
            </div>
        )
    }
}