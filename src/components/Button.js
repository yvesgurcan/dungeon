import React, {Component} from "react"
import {connect} from 'react-redux'
import {View} from "./Web.js"

const mapStateToProps = (state, ownProps) => {
    return {
        Styles: {...state.Styles},
        ...ownProps,
    }
}

class ActionButton extends Component {
    constructor(props) {
        super(props)

        let {SmallPadding, StayClicked, Clicked, Styles} = {...this.props}

        if (StayClicked && Clicked) {
            this.state = {
                style: SmallPadding ? Styles.ActionButtonHoverSmallPadding : Styles.ActionButtonHover 
            }
        }
        else {
            this.state = {
                style: SmallPadding ? Styles.ActionButtonSmallPadding : Styles.ActionButton 
            }  
        }
    }

    componentWillReceiveProps(NextProps) {

        let {StayClicked, Clicked, SmallPadding} = {...NextProps}
        let CurrentlyClicked = {...this.props.Clicked}
        let CurrentlySmallPadding = {...this.props.SmallPadding}
        let {Styles} = {...this.props}
        
        if (StayClicked && CurrentlyClicked && !Clicked) {
            let {Styles} = {...this.props}
            this.setState({
                style: SmallPadding ? Styles.ActionButtonSmallPadding : Styles.ActionButton,
            })
        }

        if (!StayClicked && SmallPadding !== CurrentlySmallPadding) {
            this.setState({
                style: SmallPadding ? Styles.ActionButtonSmallPadding : Styles.ActionButton,
            })
        }

    }

    NormalStyle = () => {
        let {SmallPadding, Styles} = {...this.props}
        this.setState({
            style: SmallPadding ? Styles.ActionButtonSmallPadding : Styles.ActionButton
        })
    }

    HoverStyle = () => {
        let {SmallPadding, Styles} = {...this.props}
        this.setState({
            style: SmallPadding ? Styles.ActionButtonHoverSmallPadding : Styles.ActionButtonHover
        })
    }

    onClick = () => {

        let {SmallPadding, Styles} = {...this.props}
        this.setState({
            style: SmallPadding ? Styles.ActionButtonClickSmallPadding : Styles.ActionButtonClick
        })

        let that = this
        setTimeout(function () {
            if (that.state.style === Styles.ActionButtonClick || that.state.style === Styles.ActionButtonClickSmallPadding) {
                that.setState({ style: SmallPadding ? Styles.ActionButtonHoverSmallPadding : Styles.ActionButtonHover })
            }
        }, 50)  

        if (!this.props.onClick) {
            console.warn("This feature is not ready yet :)")
            return null
        }

        this.props.onClick()

    }
    
    render() {

        let {Clicked, StayClicked} = {...this.props}

        return (
            <View
                hidden={this.props.hidden}
                onClick={this.onClick}
                onMouseMove={this.HoverStyle}
                onMouseLeave={Clicked && StayClicked ? null : this.NormalStyle}
                style={this.props.hidden ? {display: "none"} : this.state.style}>
                {this.props.children}
            </View>
        )
    }
}
export const ActionButtonContainer = connect(mapStateToProps)(ActionButton)