
const siteDefault = {
    title: '',
    description: '',
    keywords: '',
    navBarLeftText: 'Back'
}
const site = (state = siteDefault, action) => {
    console.log(action)
    switch (action.type) {
        case 'SET_TITLE':
            state.title = action.value
            return state
        default:
            return state
    }
}

export default site
