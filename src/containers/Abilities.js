import React, {Component} from "react"
import {connect} from 'react-redux'
import {View, Text} from "./../components/Web.js"
import {ToolTipContainer as ToolTip} from "./../components/ToolTip.js"
import Gameplay from "./../GameplayAssets.js"

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    ...ownProps,
  }
}

class PlayerAbilities extends Component {

  render() {
    let {Player, Styles, MobileScreen, TabletScreen} = {...this.props}
    return (
      <View style={MobileScreen || TabletScreen ? Styles.PlayerStats2Block2 : Styles.PlayerAttributesStacked} hidden={this.props.MobileScreen ? this.props.HideStats : false}>
        <View style={Styles.PlayerStat}>
          <ToolTip ToolTip={Gameplay.Help.Abilities.Strength} style={Styles.Inline}>
            <Text>{MobileScreen
              ? <Text>STR</Text>
              : <Text>Strength</Text>}: </Text>
            <Text>{Player.Strength}</Text>
          </ToolTip>
        </View>
        <View style={Styles.PlayerStat}>
          <ToolTip ToolTip={Gameplay.Help.Abilities.Constitution} style={Styles.Inline}>
            <Text>{MobileScreen
              ? <Text>CON</Text>
              : <Text>Constitution</Text>}: </Text>
            <Text>{Player.Constitution}</Text>
          </ToolTip>
        </View>
        <View style={Styles.PlayerStat}>
          <ToolTip ToolTip={Gameplay.Help.Abilities.Dexterity} style={Styles.Inline}>
            <Text>{MobileScreen
              ? <Text>DEX</Text>
              : <Text>Dexterity</Text>}: </Text>
            <Text>{Player.Dexterity}</Text>
          </ToolTip>
        </View>
        <View style={Styles.PlayerStat}>
          <ToolTip ToolTip={Gameplay.Help.Abilities.Intelligence} style={Styles.Inline}>
            <Text>{MobileScreen
              ? <Text>INT</Text>
              : <Text>Intelligence</Text>}: </Text>
            <Text>{Player.Intelligence}</Text>
          </ToolTip>
        </View>
      </View>
    )
  }
}
export const PlayerAbilitiesContainer = connect(mapStateToProps)(PlayerAbilities)