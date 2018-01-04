import React, {Component} from "react"
import {connect} from 'react-redux'
import mapStateToProps from "./../mapStateToProps"
import {View, Text} from "./../components/Web"
import {ClearFloat} from "./../components/Misc"
import {ItemImageBlockContainer as ItemImage} from "./../components/ItemImage"
import {ToolTipContainer as ToolTip} from "./../components/ToolTip"
import Gameplay from "./../GameplayAssets"

class Inventory extends Component {

  DisplayInventory = () => {

    let {Player} = {...this.props}

    let list = []

    for (let i = 0; i < Player.Backpack.maxItems; i++) {
      if (Player.Backpack.Items && Player.Backpack.Items[i] !== undefined) {
        list.push(Player.Backpack.Items[i])
      }
      else {
        list.push(null)
      }
    }

    let inventory = list.map((item, index) => {
      return (
        <ItemImage
          draggable={true}
          key={index}
          index={item && item.image ? "B" + (index <= 99 ? ("0" + Number(index+1)).slice(-2) : index) : null}
          showIndex
          image={(item && item.image) || null}
          name={(item && item.Name) || null}
          item={item}
          onClick={this.props.UseItem}
          {...this.props}
          />
      )
    })

    return inventory
  }

  render() {
    let {Player, Styles} = {...this.props}
    return (
      <View style={Styles.Inventory} hidden={this.props.MobileScreen ? this.props.HideInventory : false}>
        <View style={Styles.InventoryLabel} hidden={this.props.MobileScreen}>
          <ToolTip ToolTip={Gameplay.Help.Backpack} style={Styles.Inline}>
          Backpack
          </ToolTip>
        </View>
        {this.DisplayInventory()}
        <ClearFloat/>
        <Text style={Styles.InventoryWeightLabel}>
          <ToolTip ToolTip={Gameplay.Help.BackpackWeight} style={Styles.Inline}>
            Weight: {Number(Player.Backpack.Weight.Current).toFixed(2)}
          </ToolTip>
          {' '}/{' '}
          <ToolTip ToolTip={Gameplay.Help.BackpackMaxWeight} style={Styles.Inline}>
            {Player.Backpack.Weight.Max} lbs
          </ToolTip>
        </Text>
      </View>
    )
  }
}
export const InventoryContainer = connect(mapStateToProps)(Inventory)