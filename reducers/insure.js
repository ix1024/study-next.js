
const insureData = {
    product: {},
    modules: [],
    restricts: []
}
const insure = (state = insureData, action) => {

    switch (action.type) {
        case 'SET_INSURE_VALUE':
            state = action.value
            return { ...state }
        case 'SET_MODULES':
            state.modules = action.modules
            return { ...state }
        default:
            return state
    }
}

export default insure
