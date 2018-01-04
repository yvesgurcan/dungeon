import React, {Component} from "react"
import {connect} from 'react-redux'
import mapStateToProps from "./../mapStateToProps"
import {View, Text} from "./../components/Web"
import {ToolTipContainer as ToolTip} from "./../components/ToolTip"
import Gameplay from "./../GameplayAssets"

class PlayerLevelAndArmor extends Component {

  render() {
    let {Player, Styles, MobileScreen, TabletScreen} = {...this.props}
    return (
      <View style={MobileScreen || TabletScreen ? Styles.PlayerStats2Block1 : Styles.PlayerStats3} hidden={this.props.MobileScreen ? this.props.HideStats : false}>
        <View style={Styles.PlayerStat}>
          <ToolTip ToolTip={Player.Class.Spellcaster ? Gameplay.Help.LevelSpellcaster : Gameplay.Help.LevelNotSpellcaster} style={Styles.Inline}>
            <Text>{MobileScreen ? <Text>LVL</Text> : <Text>Level</Text>}: </Text><Text>{Player.Level}</Text>
          </ToolTip>
        </View>
        <View style={Styles.PlayerStat}>
          <ToolTip ToolTip={Gameplay.Help.XP} style={Styles.Inline}>
            <Text>XP: </Text><Text>{Player.XP}</Text>
          </ToolTip>
        </View>
        <View style={Styles.PlayerStat}>
          <ToolTip ToolTip={Gameplay.Help.ArmorClass} style={Styles.Inline}>
            <Text>AC: </Text><Text>{Player.ArmorClass}</Text>
          </ToolTip>
        </View>
      </View>
    )
  }
}
export const PlayerLevelAndArmorContainer = connect(mapStateToProps)(PlayerLevelAndArmor)

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