import { connect } from 'react-redux'
import React, { Component } from "react"
import { NavBar, Icon } from 'antd-mobile'
import { setTitle } from "../../action/site"


class myNavBar extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.setTitle(this.props.data)
    }
    back() {
        alert('back');
    }
    render() {
        const { title } = this.props
        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon onClick={this.back} type="left" />}
                    leftContent={this.props.navBarLeftText}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >{title}</NavBar>
            </div>
        )
    }
}



const mapStatesToProps = (state) => {
    const title = state.site.title
    const navBarLeftText = state.site.navBarLeftText
    return { title, navBarLeftText }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTitle: function (data) {
            dispatch(setTitle(data));
        }
    }
}
export default connect(mapStatesToProps, mapDispatchToProps)(myNavBar)