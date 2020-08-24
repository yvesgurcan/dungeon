import React, { Component } from 'react';

import Gameplay from '../GameplayAssets';
import Utilities from '../Utilities';

import Functions from '../Functions';

// Components
import { Text, View, Block } from '../components/Web';
import { ItemImageBlockContainer as ItemImage } from '../components/ItemImage';
import { ActionButtonContainer as Button } from '../components/Button';
import { ToolTipContainer as ToolTip } from '../components/ToolTip';
import {
    ClearFloat,
    ContactContainer as Contact,
    HeaderContainer as Header
} from '../components/Misc';
import {
    TopBackgroundImageContainer as TopBackgroundImage,
    BottomBackgroundImageContainer as BottomBackgroundImage,
    GameStateBackgroundImageContainer as GameStateBackgroundImage
} from '../components/BackgroundImages';

// Containers
import {
    EventLogContainer as EventLog,
    ClearLogContainer as ClearLog
} from '../containers/EventLog';

import { StoryContainer as Story } from '../containers/Story';

import { MapContainer as Map } from '../containers/Map';

import {
    GearContainer as Gear,
    PlayerNameAndWeaponsContainer as PlayerNameAndWeapons
} from '../containers/GearAndWeapons';

import { PlayerVitalsContainer as PlayerVitals } from '../containers/Vitals';

import { DirectionalArrows } from '../containers/DirectionalArrows';

import {
    PlayerAbilitiesContainer as PlayerAbilities,
    PlayerLevelAndArmorContainer as PlayerLevelAndArmor
} from '../containers/Abilities';

import { InventoryContainer as Inventory } from '../containers/Inventory';

import { SpellBookContainer as SpellBook } from '../containers/SpellBook';

import {
    BottomControlsContainer,
    GameStateOptionsContainer as GameStateOptions,
    GameStateBoxContainer as GameStateBox
} from '../containers/SaveAndLoad';

import { VolumeContainer as Volume } from '../containers/Volume';

/* utility */

let Debug =
    process.env.REACT_APP_RELEASE === 'stable' ? false : Utilities.Debug;

/* player actions */

class Rest extends Component {
    render() {
        return (
            <View
                style={this.props.Styles.Rest}
                hidden={this.props.MobileScreen ? this.props.HideStats : false}
            >
                <ToolTip
                    DisabledOnClick
                    ToolTip={Gameplay.Help.Buttons.Rest}
                    style={this.props.Styles.Inline}
                >
                    <Button>
                        <View style={this.props.Styles.RestButton}>Rest</View>
                    </Button>
                </ToolTip>
            </View>
        );
    }
}

class ResponsiveTabSelector extends Component {
    shouldComponentUpdate(NextProps) {
        if (
            NextProps.MobileScreen !== this.props.MobileScreen ||
            NextProps.TabletScreen !== this.props.TabletScreen ||
            NextProps.HideStats !== this.props.HideStats ||
            NextProps.HideInventory !== this.props.HideInventory ||
            NextProps.HideSpellBook !== this.props.HideSpellBook
        ) {
            if (Debug) console.log('re-render: mobile screen tab selector');
            return true;
        }
        return false;
    }

    render() {
        return (
            <View
                style={this.props.Styles.TabSelector}
                hidden={!this.props.MobileScreen}
            >
                <View style={this.props.Styles.FlexBoxContainer}>
                    <View style={this.props.Styles.TabButton}>
                        <ToolTip
                            DisabledOnClick
                            ToolTip={Gameplay.Help.Stats}
                            style={this.props.Styles.Inline}
                        >
                            <Button
                                StayClicked
                                Clicked={!this.props.HideStats}
                                onClick={this.props.ShowStats}
                            >
                                Stats
                            </Button>
                        </ToolTip>
                    </View>
                    <View style={this.props.Styles.TabButton}>
                        <ToolTip
                            DisabledOnClick
                            ToolTip={Gameplay.Help.Backpack}
                            style={this.props.Styles.Inline}
                        >
                            <Button
                                SmallPadding
                                StayClicked
                                Clicked={!this.props.HideInventory}
                                onClick={this.props.ShowInventory}
                            >
                                Backpack
                            </Button>
                        </ToolTip>
                    </View>
                    <View style={this.props.Styles.TabButton}>
                        <ToolTip
                            DisabledOnClick
                            ToolTip={Gameplay.Help.SpellBook}
                            style={this.props.Styles.Inline}
                        >
                            <Button
                                SmallPadding
                                StayClicked
                                Clicked={!this.props.HideSpellBook}
                                onClick={this.props.ShowSpellBook}
                                hidden={!this.props.Player.Class.Spellcaster}
                            >
                                Spells
                            </Button>
                        </ToolTip>
                    </View>
                </View>
            </View>
        );
    }
}

class RepsonsiveStatsContainer extends Component {
    render() {
        return (
            <View
                style={this.props.Styles.ResponsiveStatsContainer}
                hidden={!this.props.MobileScreen}
            ></View>
        );
    }
}

/* player controls */

class Controls extends Component {
    render() {
        return (
            <View style={this.props.Styles.ControlBlock}>
                {this.props.children}
            </View>
        );
    }
}

/* story and events */

// single loot item
class Loot extends Component {
    onClick = () => {
        this.props.TakeSingleLoot(this.props.index, this.props.lootContainerId);
    };

    render() {
        // let {item} = this.props
        let item = Object.assign({}, this.props.item);

        return (
            <ItemImage
                onClick={this.onClick}
                image={(item && item.image) || null}
                name={(item && item.Name) || null}
                item={item}
                Loot
                {...this.props}
            />
        );
    }
}

// the loot found by the player
class LootList extends Component {
    render() {
        return (
            <View>
                <Block>
                    {this.props.items &&
                        this.props.items.map((item, index) => {
                            return (
                                <Loot
                                    key={index}
                                    index={index}
                                    item={item}
                                    lootContainerId={this.props.lootContainerId}
                                    TakeSingleLoot={this.props.TakeSingleLoot}
                                />
                            );
                        })}
                </Block>
            </View>
        );
    }
}

// some text that describes an event that has just occurred ("you found a chest")
class Event extends Component {
    // no need to re-render event if it has not changed and the player has not taken the loot yet
    shouldComponentUpdate(nextProps) {
        if (
            nextProps.MobileScreen !== this.props.MobileScreen ||
            nextProps.TabletScreen !== this.props.TabletScreen ||
            nextProps.currentEvent !== this.props.currentEvent ||
            nextProps.Player !== this.props.Player
        ) {
            if (Debug) console.log('re-render: event');
            return true;
        }
        return false;
    }

    GenerateEventText = () => {
        // let {currentEvent, Player} = this.props
        let currentEvent = Object.assign([], this.props.currentEvent);
        let Player = Object.assign({}, this.props.Player);

        let loot = false;
        let lootIsEmpty = true;
        let lootCount = 0;

        let eventText = currentEvent.map((event, index) => {
            if (event.eventType === 'loot') {
                loot = true;

                if (event.items.length === 0) {
                    if (!Player.Stationary) {
                        event.Name =
                            'empty ' + event.Name.replace('empty ', '');
                    }
                } else {
                    lootIsEmpty = false;
                }

                if (Player.Stationary && event.items.length === 0) {
                    return (
                        <Text key={index}>
                            <Text>The </Text>
                            <Text>{event.Name.replace('empty', '')}</Text>
                            <Text> is empty.</Text>
                            <ClearFloat />
                        </Text>
                    );
                } else {
                    lootCount += event.items.length;
                    return (
                        <Text key={index}>
                            <Text>You found </Text>
                            <Text>
                                {Functions.IndefiniteArticle(event.Name)}
                            </Text>
                            <Text> </Text>
                            <Text>{event.Name}</Text>
                            <Text>.</Text>
                            <LootList
                                items={event.items}
                                lootContainerId={event.Id}
                                {...this.props}
                            />
                            <ClearFloat />
                        </Text>
                    );
                }
            } else {
                console.warn('Unknown type of event.', event);
            }
            return null;
        });

        if (loot && !lootIsEmpty) {
            if (lootCount === 1) {
                eventText.push(
                    <Block key="Take">
                        <ToolTip
                            DisabledOnClick
                            ToolTip={Gameplay.Help.Buttons.Take}
                            style={this.props.Styles.Inline}
                        >
                            <Button onClick={this.props.TakeAllLoot}>
                                Take
                            </Button>
                        </ToolTip>
                    </Block>
                );
            } else {
                eventText.push(
                    <Block key="TakeAll">
                        <ToolTip
                            DisabledOnClick
                            ToolTip={Gameplay.Help.Buttons.Take}
                            style={this.props.Styles.Inline}
                        >
                            <Button onClick={this.props.TakeAllLoot}>
                                Take All
                            </Button>
                        </ToolTip>
                    </Block>
                );
            }
        }

        return eventText;
    };

    render() {
        return (
            <View style={this.props.Styles.Event}>
                {this.GenerateEventText()}
            </View>
        );
    }
}

class StoryBlock extends Component {
    onClick = input => {
        let HtmlElement = document.getElementById('Story');
        let SeparatingLine = (HtmlElement.clientHeight / 10) * 4;
        let Direction = 1;
        if (
            input.clientY - HtmlElement.getBoundingClientRect().y <
            SeparatingLine
        ) {
            Direction = -1;
        }
        this.props.Scroll('Story', Direction);
    };

    render() {
        return (
            <View style={this.props.Styles.StoryBlock}>
                <Block
                    id="Story"
                    style={this.props.Styles.StoryContainer}
                    onClick={this.onClick}
                >
                    {this.props.children}
                </Block>
            </View>
        );
    }
}

export default props => {
    return (
        <View style={props.Styles.Game}>
            {/* row 1 */}
            <Header />
            {/* row 2 */}
            <Contact />
            <TopBackgroundImage />
            <EventLog {...props} />
            <ClearLog {...props} />
            {/* row 3 */}
            <StoryBlock {...props}>
                <Story />
                <Event {...props} />
            </StoryBlock>
            <Map {...props} />
            {/* row 4 */}
            <BottomBackgroundImage />
            <Controls {...props} />
            <PlayerNameAndWeapons />
            <PlayerVitals />
            <DirectionalArrows {...props} />
            <ResponsiveTabSelector {...props} />
            <RepsonsiveStatsContainer {...props} />
            <Rest {...props} />
            <PlayerLevelAndArmor />
            <PlayerAbilities />
            <Inventory />
            <SpellBook {...props} />
            <Gear />
            <BottomControlsContainer />
            <GameStateBackgroundImage />
            <GameStateOptions {...props} />
            <GameStateBox {...props} />
            <Volume />
        </View>
    );
};
