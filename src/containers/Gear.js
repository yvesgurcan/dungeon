import React, {Component} from "react"
import {connect} from 'react-redux'
import {View} from "./../components/Web.js"

const mapStateToProps = (state, ownProps) => {
    return {
        ...state,
      ...ownProps,
    }
  }

class Gear extends Component {
  render() {
    let {Styles} = {...this.props}
    return (
      <View style={Styles.Accessories} hidden={this.props.MobileScreen ? this.props.HideInventory : false}>

      </View>
    )
  }
}
export const GearContainer = connect(mapStateToProps)(Gear)