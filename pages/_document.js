import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { site } from "../config";
export default class AppDocument extends Document {
    static async getInitialProps() {

        return {}
    }
    render() {
        const { } = this.props
        return (
            <html>
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                    <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
                    <meta httpEquiv="Pragma" content="no-cache" />
                    <meta httpEquiv="Expires" content="0" />
                    <meta httpEquiv="description" content={site.description} />
                    <meta httpEquiv="keywords" content={site.keywords} />
                    <link rel="stylesheet" type="text/css" href="//unpkg.com/antd-mobile@2.0.0-beta.6/dist/antd-mobile.min.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script src="//res.qixin18.com/dc/pv.js"></script>
                </body>
            </html>
        )
    }
}