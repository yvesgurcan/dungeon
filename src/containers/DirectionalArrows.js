import React, {Component} from "react"
import {connect} from 'react-redux'
import mapStateToProps from "./../mapStateToProps"
import {View} from "./../components/Web"
import {ArrowContainer as Arrow} from "./../components/Arrow"
import {ToolTipContainer as ToolTip} from "./../components/ToolTip"
import Gameplay from "./../GameplayAssets"

class GoNorth extends Component {
  MovePlayer = () => {
    let {MovePlayer} = this.props
    MovePlayer("North")
  }
  render() {
    return <Arrow {... this.props} onClick={this.MovePlayer} arrow="ArrowUp">↑</Arrow>
  }
}

class GoWest extends Component {
  MovePlayer = () => {
    let {MovePlayer} = this.props
    MovePlayer("West")
  }
  render() {
    return <Arrow {... this.props} onClick={this.MovePlayer} arrow="ArrowLeft">←</Arrow>
  }
}

class GoEast extends Component {
  MovePlayer = () => {
    let {MovePlayer} = this.props
    MovePlayer("East")
  }
  render() {
    return <Arrow {... this.props} onClick={this.MovePlayer} arrow="ArrowRight">→</Arrow>
  }
}
class GoSouth extends Component {
  MovePlayer = () => {
    let {MovePlayer} = this.props
    MovePlayer("South")
  }
  render() {
    return <Arrow {... this.props} onClick={this.MovePlayer} arrow="ArrowDown">↓</Arrow>
  }
}

class Arrows extends Component {

  render() {
    let {Styles} = {...this.props}
    return (
      <View style={Styles.ArrowContainer}>
        <View style={Styles.ArrowRow}>
          <ToolTip DisabledOnClick FlexibleWidth ToolTip={Gameplay.Help.Arrows.North} style={Styles.Inline}>
            <GoNorth {... this.props} />
          </ToolTip>
        </View>
        <View style={Styles.ArrowRow}>
          <ToolTip DisabledOnClick FlexibleWidth ToolTip={Gameplay.Help.Arrows.West} style={Styles.Inline}>
            <GoWest {... this.props} />
          </ToolTip>
          <ToolTip DisabledOnClick FlexibleWidth ToolTip={Gameplay.Help.Arrows.East} style={Styles.Inline}>
            <GoEast {... this.props} />
          </ToolTip>
        </View>
        <View style={Styles.ArrowRow}>
          <ToolTip DisabledOnClick FlexibleWidth ToolTip={Gameplay.Help.Arrows.South} style={Styles.Inline}>
            <GoSouth {... this.props} />
          </ToolTip>
        </View>
      </View>
    )
  }
}
export const DirectionalArrows = connect(mapStateToProps)(Arrows)