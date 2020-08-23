import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './../mapStateToProps';
import { View, Text } from './Web';
import { Graphics } from './Misc';
import Utilities from './../Utilities';
import update from 'immutability-helper'; // experimental

const itemPath = './graphics/items/';
const imgExt = '.png';

class ItemImage extends Component {
    render() {
        let Styles = { ...this.props.Styles };
        return (
            <Text>
                <Graphics
                    draggable={this.props.draggable}
                    src={
                        this.props.image
                            ? itemPath + this.props.image + imgExt
                            : null
                    }
                    style={Styles.ItemImage}
                />
            </Text>
        );
    }
}

class ItemSingleAction extends Component {
    constructor(props) {
        super(props);
        let Styles = { ...this.props.Styles };
        this.state = { style: Styles.ItemAction };
    }

    HoverStyle = () => {
        let Styles = { ...this.props.Styles };
        this.setState({ style: Styles.ItemActionHover });
    };

    NormalStyle = () => {
        let Styles = { ...this.props.Styles };
        this.setState({ style: Styles.ItemAction });
    };

    UseItem = () => {
        this.props.onClick(this.props.ItemAction);
    };

    render() {
        return (
            <View
                style={this.state.style}
                onMouseMove={this.HoverStyle}
                onMouseLeave={this.NormalStyle}
                onClick={this.UseItem}
            >
                {this.props.ItemAction.Name}
            </View>
        );
    }
}

class ItemImageBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HideItemDescription: true,
            HideItemActions: true,
            Id: Math.floor(Math.random() * 99999999999)
        };
    }

    componentDidMount() {
        this.Mounted = true;
    }

    componentWillUnmount() {
        this.Mounted = false;
    }

    RegisterTouch = () => {
        // there is no item
        let Item = { ...this.props.item };
        if (!Object.getOwnPropertyNames(Item).length) return null;

        this.setState({ TouchEvent: true });
    };

    // right click
    ToggleItemActions = input => {
        // there is no item
        let Item = { ...this.props.item };
        let { Slot } = { ...this.props };
        if (!Object.getOwnPropertyNames(Item).length && !Slot) return null;

        let grabInput = { ...input };
        input.preventDefault();

        // this item does not have an action menu
        if (this.props.NoActionMenu) {
            // show the item description instead
            if (this.state.HideItemDescription) {
                this.ShowItemDescription(grabInput);
            }
            // hide the item description if it is already displayed
            else {
                this.HideItemDescription();
            }
            return false;
        }

        // get the coordinates where the action menu will be displayed
        let { pageX, pageY } = { ...grabInput };

        this.setState(
            {
                // toggle the action menu
                HideItemActions: !this.state.HideItemActions,
                // hide the item description that may have appeared when hovering
                HideItemDescription: true,
                // block hover events so that the description does not re-appear until the user has moved out of the element
                PreventHoverEvent: true,
                x: pageX + 5,
                y: pageY + 5
            },
            function () {
                // attach event listeners to hide the menu when the user clicks away
                document.addEventListener('click', this.HideItemActions, false);
                document.addEventListener(
                    'contextmenu',
                    this.HideItemActions,
                    false
                );
            }
        );
    };

    // right click -- event listener
    HideItemActions = () => {
        if (!this.Mounted) return false;

        if (this.state.DescriptionAsAction) {
            // add item description event listener
            document.addEventListener('click', this.HideItemDescription, false);
            document.addEventListener(
                'contextmenu',
                this.HideItemDescription,
                false
            );
            this.setState({
                // toggle the block on this event listener
                DescriptionAsAction: false,
                // let the item description event listeners remove themselves once they executed
                CleanupDescriptionEventListener: true
            });
            // do not execute the rest of the code to keep preventing hover events
            return false;
        }

        this.setState({
            // hide the action menu
            HideItemActions: true,
            // release the block on hover events so that when the user moves back to the item, the description will appear again
            PreventHoverEvent: false
        });

        // get rid of the event listeners
        document.removeEventListener('click', this.HideItemActions, false);
        document.removeEventListener(
            'contextmenu',
            this.HideItemActions,
            false
        );
    };

    // action menu click
    ShowItemDescription = input => {
        // there is no item
        let Item = { ...this.props.item };
        let { Slot } = { ...this.props };
        if (!Object.getOwnPropertyNames(Item).length && !Slot) return null;

        // grab coordinates
        let { pageX, pageY } = { ...input };

        // the item description was called from the action menu
        if (input === null) {
            pageX = this.state.x - 5;
            pageY = this.state.y - 5;
            this.setState({ DescriptionAsAction: true });
        }

        this.setState({
            // hide the action menu
            HideItemActions: true,
            // show the description
            HideItemDescription: false,
            // block the hover event
            PreventHoverEvent: true,
            x: pageX + 5,
            y: pageY + 5
        });

        // add listeners for the item description if there is no action menu so that when the user clicks away it hides the description
        if (this.props.NoActionMenu) {
            document.addEventListener('click', this.HideItemDescription, false);
            document.addEventListener(
                'contextmenu',
                this.HideItemDescription,
                false
            );
            return false;
        }

        // add listeners so that when the user clicks away it hides the action menu
        document.addEventListener('click', this.HideItemActions, false);
        document.addEventListener('contextmenu', this.HideItemActions, false);
    };

    // no action menu -- event listener
    HideItemDescription = () => {
        if (!this.Mounted) return false;

        this.setState({
            // hide the description
            HideItemDescription: true,
            // release the block on hover events
            PreventHoverEvent: false
        });

        // remove item description listeners
        if (
            this.props.NoActionMenu ||
            this.state.CleanupDescriptionEventListener
        ) {
            document.removeEventListener(
                'click',
                this.HideItemDescription,
                false
            );
            document.removeEventListener(
                'contextmenu',
                this.HideItemDescription,
                false
            );

            // toggle the clean up of event listeners corresponding to the item description showing as an action
            if (this.state.CleanupDescriptionEventListener) {
                this.setState({ CleanupDescriptionEventListener: false });
            }
        }
    };

    // hover
    ShowItemDescriptionOnHover = input => {
        // there is no item
        let Item = { ...this.props.item };
        let { Slot } = { ...this.props };
        if (!Object.getOwnPropertyNames(Item).length && !Slot) return null;

        // do not show description on hover for touch screens
        if (this.state.TouchEvent) return false;

        if (
            // hover events are not blocked
            !this.state.PreventHoverEvent &&
            // the action menu is hidden
            this.state.HideItemActions &&
            // the item description is hidden
            this.state.HideItemDescription
        ) {
            // the user is hovering the item
            this.setState({ HoveredOut: false });

            // grab coordinates
            let { pageX, pageY } = { ...input };

            // wait before showing the item description
            setTimeout(
                function () {
                    if (
                        // the user is still hovering the item
                        !this.state.HoveredOut &&
                        // the action menu is still hidden
                        this.state.HideItemActions &&
                        // the item description is still hidden
                        this.state.HideItemDescription
                    ) {
                        if (!this.Mounted) return false;

                        // display description
                        this.setState({
                            HideItemDescription: false,
                            x: pageX + 5,
                            y: pageY + 5
                        });
                    }
                }.bind(this),
                600
            );
        }
    };

    HideItemDescriptionOnHover = () => {
        // hover events are not blocked
        if (!this.state.PreventHoverEvent) {
            this.setState({
                // hide item description
                HideItemDescription: true,
                // the user is not interested in this item anymore
                HoveredOut: true
            });
        }
    };

    ShowHoverForItemAfterClick = input => {
        if (this.state.ResetHover) {
            this.ShowItemDescriptionOnHover(input);
            this.setState({ ResetHover: false });
        }
    };

    // item description
    ItemDescription = () => {
        let Item = { ...this.props.item };
        let { Slot, Styles } = { ...this.props };
        if (!Object.getOwnPropertyNames(Item).length && !Slot) return null;

        let Description = (
            <View
                hidden={this.state.HideItemDescription}
                style={{
                    ...Styles.ItemDescription,
                    left: this.state.x,
                    top: this.state.y
                }}
            >
                <View style={Styles.ItemDescriptionName}>
                    {Slot ? Slot + ': ' + (Item.Name || 'Empty') : Item.Name}
                </View>
                <View
                    style={Styles.ItemDescriptionContent}
                    hidden={!Item.Description}
                >
                    {Item.Description}
                </View>
            </View>
        );
        return Description;
    };

    // action menu
    ItemActions = () => {
        let Item = { ...this.props.item };
        let { Slot, Styles } = { ...this.props };
        if (!Object.getOwnPropertyNames(Item).length && !Slot) return null;
        let Action = (
            <View
                hidden={this.state.HideItemActions}
                style={{
                    ...Styles.ItemActions,
                    left: this.state.x,
                    top: this.state.y
                }}
            >
                <View style={Styles.ItemDescriptionName}>
                    {Slot ? Slot + ': ' + (Item.Name || 'Empty') : Item.Name}
                </View>
                {this.AvailableActions().map(ItemAction => {
                    return (
                        <ItemSingleAction
                            key={ItemAction.Name}
                            onClick={this.UseItem}
                            ItemAction={ItemAction}
                        />
                    );
                })}
            </View>
        );
        return Action;
    };

    // discriminate actions that are available for this item
    AvailableActions = () => {
        let Item = { ...this.props.Item };
        let Equipped = this.props.Equipped;
        let Loot = this.props.Loot;

        if (Item) {
            let Type = Item.Type;

            let AvailableActions = [
                {
                    Name: 'Description',
                    onClick: 'ShowItemDescription',
                    BuiltInComponent: true
                }
            ];

            if (Loot) {
                AvailableActions.push({
                    Name: 'Take',
                    onClick: 'TakeSingleLoot',
                    MainAction: true
                });
            }

            if (Type === 'potion') {
                AvailableActions.push({
                    Name: 'Drink',
                    onClick: 'DrinkPotion',
                    MainAction: !Loot
                });
            }

            if (Type === 'food') {
                AvailableActions.push({
                    Name: 'Eat',
                    onClick: 'ConsumeFood',
                    MainAction: !Loot
                });
            }

            if (Type === 'scroll') {
                AvailableActions.push({
                    Name: 'Cast Spell',
                    onClick: 'UseScroll',
                    MainAction: !Loot
                });
            }

            if (!Equipped && Utilities.Equipable.indexOf(Type) > -1) {
                AvailableActions.push({ Name: 'Equip', onClick: 'EquipItem' });
            }

            if (Equipped) {
                AvailableActions.push({
                    Name: 'Unequip',
                    onClick: 'UnequipItem'
                });
            }

            if (!Loot) {
                AvailableActions.push({ Name: 'Drop', onClick: 'DropItem' });
            }

            return AvailableActions;
        }

        return [];
    };

    // item action selected from action menu
    UseItem = Action => {
        if (Action.onClick === 'ShowItemDescription') {
            this.ShowItemDescription(null);
            return false;
        }

        this.setState({ Clicked: true });
        setTimeout(
            function () {
                this.setState({ Clicked: false, ResetHover: true });
                if (Action.MainAction) {
                    this.props.onClick(this.props.item);
                    return false;
                }
                this.props.UseItem(this.props.item, Action.onClick);
            }.bind(this),
            50
        );
    };

    // direct click on item image
    onClick = () => {
        let Item = { ...this.props.item };
        if (!Object.getOwnPropertyNames(Item).length) return null;

        // TODO: experimenting with reducers.....
        // copy the prop to prevent mutating it
        let Player = update(this.props.Player, { $merge: {} });
        // do mutation of the copied prop
        Player = update(Player, {
            $merge: {
                Health: {
                    ...Player.Health,
                    Current: 2
                }
            }
        });

        console.log(this.props.Player, Player);
        // put the new object in the state
        this.props.dispatch({
            type: 'USE_ITEM',
            Item: this.props.Player.Backpack.Items[0]
        });

        if (!this.props.onClick) {
            console.warn('This feature is not ready yet :)');
            return null;
        }

        this.setState({ Clicked: true });
        setTimeout(
            function () {
                this.setState({ Clicked: false, ResetHover: true });
                this.props.onClick(this.props.item);
                this.HideItemActions();
                this.HideItemDescription();
            }.bind(this),
            50
        );
    };

    render() {
        let Styles = { ...this.props.Styles };
        return (
            <View
                id={this.state.Id}
                style={Styles.ItemImageBlock}
                onContextMenu={this.ToggleItemActions}
                onMouseEnter={this.ShowItemDescriptionOnHover}
                onMouseLeave={this.HideItemDescriptionOnHover}
                onMouseMove={this.ShowHoverForItemAfterClick}
                onTouchStart={this.RegisterTouch}
            >
                {this.ItemDescription()}
                {this.ItemActions()}
                <View>
                    <View
                        hidden={!this.state.Clicked}
                        style={
                            this.props.Loot
                                ? {
                                      ...Styles.ItemImageBlockClick,
                                      top: document.getElementById(
                                          this.state.Id
                                      )
                                          ? document
                                                .getElementById(this.state.Id)
                                                .getBoundingClientRect().y + 1
                                          : null,
                                      left: document.getElementById(
                                          this.state.Id
                                      )
                                          ? document
                                                .getElementById(this.state.Id)
                                                .getBoundingClientRect().x + 1
                                          : null
                                  }
                                : {
                                      ...Styles.ItemImageBlockClick,
                                      top: document.getElementById(
                                          this.state.Id
                                      )
                                          ? document
                                                .getElementById(this.state.Id)
                                                .getBoundingClientRect().y + 1
                                          : null,
                                      left: document.getElementById(
                                          this.state.Id
                                      )
                                          ? document
                                                .getElementById(this.state.Id)
                                                .getBoundingClientRect().x +
                                            1 -
                                            document.getElementById(
                                                this.state.Id
                                            ).scrollLeft
                                          : null
                                  }
                        }
                    />
                    <View onClick={this.onClick}>
                        <ItemImage {...this} {...this.props} />
                    </View>
                    <View
                        style={Styles.ItemImageBlockNumber}
                        hidden={!this.props.showIndex}
                    >
                        {this.props.index}
                    </View>
                </View>
            </View>
        );
    }
}
export const ItemImageBlockContainer = connect(mapStateToProps)(ItemImageBlock);
