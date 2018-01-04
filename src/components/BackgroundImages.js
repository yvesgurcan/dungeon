import React, {Component} from "react"
import {connect} from 'react-redux'
import mapStateToProps from "./../mapStateToProps"
import {View} from "./Web"

class TopBackgroundImage extends Component {
    render() {
        let {Styles} = {...this.props}
        return (
            <View style={Styles.TopGameBackgroundImage}/>
        )
    }
}
export const TopBackgroundImageContainer = connect(mapStateToProps)(TopBackgroundImage)
  
class BottomBackgroundImage extends Component {
    render() {
        let {Styles} = {...this.props}
        return (
            <View style={Styles.BottomGameBackgroundImage}/>
        )
    }
}
export const BottomBackgroundImageContainer = connect(mapStateToProps)(BottomBackgroundImage)
  
class GameStateBackgroundImage extends Component {
    render() {
        let {Styles} = {...this.props}
        return (
            <View style={Styles.GameStateBackgroundImage}/>
        )
    }
}
export const GameStateBackgroundImageContainer = connect(mapStateToProps)(GameStateBackgroundImage)