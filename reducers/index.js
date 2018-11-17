import { combineReducers } from 'redux'
import site from "./site"
import insure from "./insure"

const insureApp = combineReducers({
    insure,
    site
})
export default insureApp