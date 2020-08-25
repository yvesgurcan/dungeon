import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../store/mapStateToProps';
import { ToolTipContainer as ToolTip } from './../components/ToolTip';
import { ItemImageBlockContainer as ItemImage } from './../components/ItemImage';
import { View } from './../components/Web';
import Utilities from './../Utilities';
import Gameplay from './../GameplayAssets';

class SpellBook extends Component {
    DisplaySpellBook = () => {
        // let {Player} = this.props
        let Player = { ...this.props.Player };
        let Spells = Player.SpellBook ? Player.SpellBook.Spells : [];

        let SpellSlots = [];

        for (let i = 0; i < Utilities.NumberOfSpells; i++) {
            if (!Spells || Spells.length <= i) {
                SpellSlots.push(<ItemImage key={i} />);
            } else {
                SpellSlots.push(
                    <ItemImage
                        draggable={false}
                        key={i}
                        index={i <= 99 ? ('0' + Number(i + 1)).slice(-2) : i}
                        showIndex
                        image={(Spells[i] && Spells[i].Image) || null}
                        name={(Spells[i] && Spells[i].Name) || null}
                        item={Spells[i]}
                        NoActionMenu
                        onClick={this.props.CastSpell}
                    />
                );
            }
        }

        return SpellSlots;
    };

    render() {
        let { Styles, Player } = { ...this.props };

        if (
            !Player.Class.Spellcaster ||
            !Player.SpellBook ||
            Player.SpellBook.MaxSpells === 0
        ) {
            return null;
        }
        return (
            <View
                style={Styles.SpellBook}
                hidden={
                    this.props.MobileScreen ? this.props.HideSpellBook : false
                }
            >
                <View
                    style={Styles.SpellBookLabel}
                    hidden={this.props.MobileScreen}
                >
                    <ToolTip
                        ToolTip={Gameplay.Help.SpellBook}
                        style={Styles.Inline}
                    >
                        Spellbook
                    </ToolTip>
                </View>
                {this.DisplaySpellBook()}
            </View>
        );
    }
}
export const SpellBookContainer = connect(mapStateToProps)(SpellBook);
