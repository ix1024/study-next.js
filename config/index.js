import development from "./evn/development"
import test from "./evn/test"
import production from "./evn/test"
import weixin from "./weixin"
import site from "./site"

const config = {
    port: 3000,
    api: {
        url: 'http://localhost:1985/api/'
    }
};
let evnConfig = {};

switch (process.env.NODE_ENV) {
    case 'development':
        evnConfig = development;
        break;
    case 'test':
        evnConfig = test;
        break;
    case 'production':
        evnConfig = production;
        break;
    default:
        break;
}

const api = config.api
const port = config.port

export { port, api, site, weixin, }

export default Object.assign({}, config, { weixin }, { site }, evnConfig)