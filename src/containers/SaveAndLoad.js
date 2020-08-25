import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../store/mapStateToProps';
import { View } from './../components/Web';
import { ActionButtonContainer as Button } from './../components/Button';
import { ToolTipContainer as ToolTip } from './../components/ToolTip';
import { TextAreaContainer as TextArea } from './../components/Input';
import Gameplay from './../GameplayAssets';

class BottomControls extends Component {
    render() {
        let { Styles } = { ...this.props };
        return <View style={Styles.BottomControls} />;
    }
}
export const BottomControlsContainer = connect(mapStateToProps)(BottomControls);

/* game state manipulations (save/load) */
class GameStateOptions extends Component {
    ToggleSaveGameStateBox = () => {
        this.props.ToggleGameStateBox('Save');
    };

    ToggleLoadGameStateBox = () => {
        this.props.ToggleGameStateBox('Load');
    };

    ToggleCancelGameStateBox = () => {
        this.props.ToggleGameStateBox('Cancel');
    };

    render() {
        let { Styles } = { ...this.props };
        return (
            <View style={Styles.GameState}>
                <ToolTip
                    DisabledOnClick
                    ToolTip={Gameplay.Help.Buttons.NewGame}
                    style={Styles.Inline}
                >
                    <Button onClick={this.props.ShowCharacterScreen}>
                        New Game
                    </Button>
                </ToolTip>
                <ToolTip
                    DisabledOnClick
                    ToolTip={Gameplay.Help.Buttons.SaveGame}
                    style={Styles.Inline}
                >
                    <Button onClick={this.ToggleSaveGameStateBox}>
                        Save Game
                    </Button>
                </ToolTip>
                <ToolTip
                    DisabledOnClick
                    ToolTip={Gameplay.Help.Buttons.LoadGame}
                    style={Styles.Inline}
                >
                    <Button onClick={this.ToggleLoadGameStateBox}>
                        Load Game
                    </Button>
                </ToolTip>
                <Button
                    onClick={this.ToggleCancelGameStateBox}
                    hidden={!this.props.ShowGameStateBox}
                >
                    Close
                </Button>
            </View>
        );
    }
}
export const GameStateOptionsContainer = connect(mapStateToProps)(
    GameStateOptions
);

class GameStateBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IncludeStaticAssets: false,
            GameState: this.GenerateSaveGameState(
                { ...this.props.state },
                false
            )
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ShowGameStateBox === true) {
            if (
                !this.props.EditableGameStateBox &&
                nextProps.EditableGameStateBox
            ) {
                this.props.UpdateGameStateToLoad('');
                this.setState({ GameState: '' });
            } else if (
                !nextProps.EditableGameStateBox &&
                nextProps.state !== this.props.state
            ) {
                this.setState({
                    GameState: this.GenerateSaveGameState({
                        ...nextProps.state
                    })
                });
            }
        }
    }

    GenerateSaveGameState = (GameState, IncludeStaticAssets = null) => {
        if (IncludeStaticAssets === null) {
            IncludeStaticAssets = this.state.IncludeStaticAssets;
        }

        delete GameState.Keystrokes;
        delete GameState.ShowGameStateBox;
        delete GameState.EditableGameStateBox;
        delete GameState.MobileScreen;
        delete GameState.TabletScreen;
        delete GameState.LoadGameError;
        delete GameState.GameStateToLoad;
        delete GameState.CreateCharacter;
        delete GameState.RandomItems;

        // remove debug state
        delete GameState.ShowFullMap;
        delete GameState.NoClip;
        delete GameState.GodMode;
        delete GameState.CastAlwaysSucceeds;

        if (!IncludeStaticAssets) {
            GameState = this.StripStaticAssets(GameState);
        }

        let DisplayState = JSON.stringify(GameState, null, `\t`);

        return DisplayState;
    };

    StripStaticAssets = GameState => {
        // does nothing

        return GameState;
    };

    ToggleSaveStaticAsset = () => {
        let GameState = { ...this.props.state };
        let IncludeStaticAssets = !this.state.IncludeStaticAssets;

        this.setState({
            GameState: this.GenerateSaveGameState(
                GameState,
                IncludeStaticAssets
            ),
            IncludeStaticAssets: IncludeStaticAssets
        });
    };

    onChange = input => {
        if (this.props.EditableGameStateBox) {
            this.props.UpdateGameStateToLoad(input.value);
            this.setState({ GameState: input.value });
        }
    };

    onClick = input => {
        if (!this.props.EditableGameStateBox) {
            input.select();
        }
    };

    render() {
        let { Styles } = { ...this.props };
        return (
            <View
                style={Styles.GameStateBoxContainer}
                hidden={!this.props.ShowGameStateBox}
            >
                <View hidden={!this.props.EditableGameStateBox}>
                    {this.props.LoadGameError}
                </View>
                <View hidden={this.props.EditableGameStateBox}>
                    <input
                        type="checkbox"
                        checked={this.state.IncludeStaticAssets}
                        onChange={this.ToggleSaveStaticAsset}
                    />{' '}
                    include static assets
                </View>
                <ToolTip
                    DisabledOnClick
                    ToolTip={
                        this.props.EditableGameStateBox
                            ? Gameplay.Help.GameStateBox.LoadGame
                            : Gameplay.Help.GameStateBox.SaveGame
                    }
                    style={Styles.Inline}
                >
                    <TextArea
                        readOnly={!this.props.EditableGameStateBox}
                        style={{ ...Styles.GameStateBox }}
                        onChange={this.onChange}
                        onClick={this.onClick}
                        value={this.state.GameState}
                    />
                </ToolTip>
            </View>
        );
    }
}
export const GameStateBoxContainer = connect(mapStateToProps)(GameStateBox);
