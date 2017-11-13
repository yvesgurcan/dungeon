import React, {Component} from "react"
import {connect} from 'react-redux'
import {View} from "./Web.js"

const mapStateToProps = (state, ownProps) => {
    return {
        Styles: {...state.Styles},
        ...ownProps,
    }
}

class HoverToolTip extends Component {
  
  constructor(props) {
    super(props)
    this.state = {HideToolTip: true}
  }

  componentDidMount() {
    this.Mounted = true
  }

  componentWillUnmount() {
    this.Mounted = false
  }

  shouldComponentUpdate(NextProps, NextState) {

    if (NextState.HideToolTip !== this.state.HideToolTip || NextProps.children !== this.props.children) {
      return true
    }
    return false
  }

  RegisterTouch = () => {this.setState({TouchEvent: true})}

  // on click
  ShowToolTipOnClick = (input) => {

    // do not show a tooltip on click
    if (this.props.DisabledOnClick) {
      this.HideToolTipOnClick()
      input.preventDefault()
      return false
    }

    // grab coordinates
    let {pageX, pageY} = {...input}

    input.preventDefault()

    this.setState({
      // show the tooltip
      HideToolTip: false,
      // block the hover event
      PreventHoverEvent: true,
      x: pageX+5,
      y: pageY+5,
    })

    // add event listeners
    document.addEventListener("click", this.HideToolTipOnClick, false)
    document.addEventListener("contextmenu", this.HideToolTipOnClick, false)

  }

  HideToolTipOnClick = () => {

    if (!this.Mounted) return false

    this.setState({
      // hide the tooltip
      HideToolTip: true,
      // release the block on hover events
      PreventHoverEvent: false,
    })

    // remove event listeners
    document.removeEventListener("click", this.HideToolTipOnClick, false)
    document.removeEventListener("contextmenu", this.HideToolTipOnClick, false)

  }

  // hover
  ShowToolTipOnHover = (input) => {

    // do not show description on hover for touch screens
    if (this.state.TouchEvent) return false

    if (
      // hover events are not blocked
      !this.state.PreventHoverEvent
      // the tooltip is hidden
      && this.state.HideToolTip
    ) {

      // the user is hovering the item
      this.setState({HoveredOut: false})

      // grab coordinates
      let {pageX, pageY} = {...input}

      // wait before showing the tooltip
      setTimeout(function() {
        if (
          // the user is still hovering the stats
          !this.state.HoveredOut
          // the tooltip is still hidden
          && this.state.HideToolTip
        ) {

          if (!this.Mounted) return false

          // display tooltip
          this.setState({
            HideToolTip: false,
            x: pageX+5,
            y: pageY+5,
          })

        }
      }.bind(this), 600)
      
    }

  }

  HideToolTipOnHover = () => {

    // hover events are not blocked
    if (!this.state.PreventHoverEvent) {
      this.setState({
        // hide tooltip
        HideToolTip: true,
        // the user is not interested in this stat
        HoveredOut: true
      })
    }
  }

  ShowHoverAfterClick = (input) => {
    this.ShowToolTipOnHover(input)
  }

  // stat tooltip
  ToolTip = () => {
    let {Styles} = {...this.props}
    let Tip = (
      <View hidden={this.state.HideToolTip} style={this.props.FlexibleWidth ? {...Styles.ToolTipFlexibleWidth, left: this.state.x, top: this.state.y} : {...Styles.ToolTip, left: this.state.x, top: this.state.y}}>
        <View>{this.props.ToolTip}</View>
      </View>
    )
    return Tip

  }

  render() {
    if (!this.props.ToolTip || this.props.ToolTip === "") {
      if (!Debug || (Debug && !this.props.ToolTip)) {
        return <View style={this.props.style}>{this.props.children}</View>        
      }
    }
    return (
      <View
        style={this.props.style}
        onClick={this.ShowToolTipOnClick}
        onKeyUp={this.ShowToolTipOnClick}
        onContextMenu={this.ShowToolTipOnClick}
        onMouseEnter={this.ShowToolTipOnHover}
        onMouseLeave={this.HideToolTipOnHover}
        onMouseMove={this.ShowHoverAfterClick}
        onTouchStart={this.RegisterTouch}>
        {this.ToolTip()}
        {this.props.children}
      </View>
    )
  }
}
export const ToolTipContainer = connect(mapStateToProps)(HoverToolTip)