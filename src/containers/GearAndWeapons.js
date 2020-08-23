import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './../mapStateToProps';
import { View, Text } from './../components/Web';
import { ItemImageBlockContainer as ItemImage } from './../components/ItemImage';

class Gear extends Component {
    render() {
        let { Styles } = { ...this.props };
        return (
            <View
                style={Styles.Accessories}
                hidden={
                    this.props.MobileScreen ? this.props.HideInventory : false
                }
            ></View>
        );
    }
}
export const GearContainer = connect(mapStateToProps)(Gear);

class WeaponReady extends Component {
    render() {
        let { Styles, Item, Slot } = { ...this.props };
        if (!Item) {
            return (
                <View style={Styles.ReadyItem}>
                    <ItemImage image={null} Slot={Slot} NoActionMenu />
                </View>
            );
        } else {
            return (
                <View style={Styles.ReadyItem}>
                    <ItemImage
                        onClick={this.onClick}
                        image={(Item && Item.image) || null}
                        Slot={Slot}
                        item={Item}
                        Equipped
                        {...this.props}
                    />
                </View>
            );
        }
    }
}
const WeaponReadyContainer = connect(mapStateToProps)(WeaponReady);

class WeaponReadyBlock extends Component {
    render() {
        let Gear = { ...this.props.Player.Gear };
        return (
            <View>
                <WeaponReadyContainer Slot="Left hand" Item={Gear.LeftHand} />
                <WeaponReadyContainer Slot="Right hand" Item={Gear.RightHand} />
            </View>
        );
    }
}
export const WeaponReadyBlockContainer = connect(mapStateToProps)(
    WeaponReadyBlock
);

class PlayerNameAndWeapons extends Component {
    render() {
        let { Player, Styles } = { ...this.props };
        return (
            <View style={Styles.PlayerStats0}>
                <View>
                    <Text>{Player.Name}</Text>
                </View>
                <View style={Styles.ReadyItemBlock}>
                    <WeaponReadyBlockContainer />
                </View>
            </View>
        );
    }
}
export const PlayerNameAndWeaponsContainer = connect(mapStateToProps)(
    PlayerNameAndWeapons
);
