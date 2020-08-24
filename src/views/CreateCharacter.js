import React, { Component } from 'react';

import World from '../WorldAssets';
import Campaign from '../LegendsOfTheCatacombs';
import Gameplay from '../GameplayAssets';

// Components
import {
    Text,
    View,
    Block,
    HeadingContainer as Heading
} from '../components/Web';
import { ItemImageBlockContainer as ItemImage } from '../components/ItemImage';
import { ActionButtonContainer as Button } from '../components/Button';
import { ArrowContainer as Arrow } from '../components/Arrow';
import { ToolTipContainer as ToolTip } from '../components/ToolTip';
import { TextEditContainer as TextEdit } from '../components/Input';
import {
    ContactContainer as Contact,
    HeaderContainer as Header
} from '../components/Misc';

class CreateCharacterHeader extends Component {
    render() {
        return (
            <View style={this.props.Styles.CharacterHeader}>
                <Heading>Create Your Character</Heading>
            </View>
        );
    }
}

class CreateCharacterContainer extends Component {
    render() {
        return <View style={this.props.Styles.CreateCharacterContainer}></View>;
    }
}

class CreateCharacterName extends Component {
    render() {
        // let {Player} = this.props
        let Player = { ...this.props.Player };
        return (
            <View style={this.props.Styles.CharacterCreateName}>
                <Block style={this.props.Styles.PropertyLabelForInput}>
                    <ToolTip
                        DisabledOnClick
                        ToolTip={Gameplay.Help.CharacterName}
                        style={this.props.Styles.Inline}
                    >
                        <Text>Name:</Text>
                    </ToolTip>
                </Block>
                <Block style={this.props.Styles.PropertyFieldForInput}>
                    <ToolTip
                        DisabledOnClick
                        ToolTip={Gameplay.Help.CharacterName}
                        style={this.props.Styles.Inline}
                    >
                        <TextEdit
                            style={this.props.Styles.TextEditUnderline}
                            styleFocus={
                                this.props.Styles.TextEditUnderlineFocus
                            }
                            name="Name"
                            placeholder="Enter your name."
                            value={Player.Name}
                            maxLength={13}
                            onChange={this.props.SavePlayerName}
                        />
                    </ToolTip>
                </Block>
                <Block style={this.props.Styles.PropertyLabel}>
                    <ToolTip
                        DisabledOnClick
                        ToolTip={Gameplay.Help.Vitals.Health}
                        style={this.props.Styles.Inline}
                    >
                        <Text>Health:</Text>
                    </ToolTip>
                </Block>
                <Block style={this.props.Styles.PropertyField}>
                    <ToolTip
                        DisabledOnClick
                        ToolTip={Gameplay.Help.Vitals.Health}
                        style={this.props.Styles.Inline}
                    >
                        <Text>{Player.MaxHealth}</Text>
                    </ToolTip>
                </Block>
                <Block style={this.props.Styles.PropertyLabel}>
                    <ToolTip
                        DisabledOnClick
                        ToolTip={Gameplay.Help.Vitals.Mana}
                        style={this.props.Styles.Inline}
                    >
                        <Text>Mana:</Text>
                    </ToolTip>
                </Block>
                <Block style={this.props.Styles.PropertyField}>
                    <ToolTip
                        DisabledOnClick
                        ToolTip={Gameplay.Help.Vitals.Mana}
                        style={this.props.Styles.Inline}
                    >
                        <Text>{Player.MaxMana}</Text>
                    </ToolTip>
                </Block>
                <Block style={this.props.Styles.PropertyLabel}>
                    <ToolTip
                        DisabledOnClick
                        ToolTip={Gameplay.Help.Vitals.Stamina}
                        style={this.props.Styles.Inline}
                    >
                        <Text>Stamina:</Text>
                    </ToolTip>
                </Block>
                <Block style={this.props.Styles.PropertyField}>
                    <ToolTip
                        DisabledOnClick
                        ToolTip={Gameplay.Help.Vitals.Stamina}
                        style={this.props.Styles.Inline}
                    >
                        <Text>{Player.MaxStamina}</Text>
                    </ToolTip>
                </Block>
            </View>
        );
    }
}

class CreateCharacterAbilities extends Component {
    render() {
        // let {Player} = this.props
        let Player = Object.assign({}, this.props.Player);
        return (
            <View style={this.props.Styles.CharacterCreateView}>
                <Block style={this.props.Styles.PropertyLabel}>
                    <ToolTip
                        DisabledOnClick
                        ToolTip={Gameplay.Help.Abilities.Strength}
                        style={this.props.Styles.Inline}
                    >
                        <Text>Strength:</Text>
                    </ToolTip>
                </Block>
                <Block style={this.props.Styles.PropertyField}>
                    <Text>
                        <ToolTip
                            DisabledOnClick
                            ToolTip={Gameplay.Help.Abilities.Strength}
                            style={this.props.Styles.Inline}
                        >
                            {Player.Strength -
                                (Player.Race.AbilityBoost.Strength || 0)}
                        </ToolTip>
                        <ToolTip
                            DisabledOnClick
                            ToolTip={Gameplay.Help.AbilityBonus}
                            style={this.props.Styles.Inline}
                        >
                            {Player.Race.AbilityBoost.Strength
                                ? ' +' + Player.Race.AbilityBoost.Strength
                                : null}
                        </ToolTip>
                    </Text>
                </Block>
                <Block style={this.props.Styles.PropertyLabel}>
                    <ToolTip
                        DisabledOnClick
                        ToolTip={Gameplay.Help.Abilities.Dexterity}
                        style={this.props.Styles.Inline}
                    >
                        <Text>Dexterity:</Text>
                    </ToolTip>
                </Block>
                <Block style={this.props.Styles.PropertyField}>
                    <Text>
                        <ToolTip
                            DisabledOnClick
                            ToolTip={Gameplay.Help.Abilities.Dexterity}
                            style={this.props.Styles.Inline}
                        >
                            {Player.Dexterity -
                                (Player.Race.AbilityBoost.Dexterity || 0)}
                        </ToolTip>
                        <ToolTip
                            DisabledOnClick
                            ToolTip={Gameplay.Help.AbilityBonus}
                            style={this.props.Styles.Inline}
                        >
                            {Player.Race.AbilityBoost.Dexterity
                                ? ' +' + Player.Race.AbilityBoost.Dexterity
                                : null}
                        </ToolTip>
                    </Text>
                </Block>
                <Block style={this.props.Styles.PropertyLabel}>
                    <ToolTip
                        DisabledOnClick
                        ToolTip={Gameplay.Help.Abilities.Constitution}
                        style={this.props.Styles.Inline}
                    >
                        <Text>Constitution:</Text>
                    </ToolTip>
                </Block>
                <Block style={this.props.Styles.PropertyField}>
                    <Text>
                        <ToolTip
                            DisabledOnClick
                            ToolTip={Gameplay.Help.Abilities.Constitution}
                            style={this.props.Styles.Inline}
                        >
                            {Player.Constitution -
                                (Player.Race.AbilityBoost.Constitution || 0)}
                        </ToolTip>
                        <ToolTip
                            DisabledOnClick
                            ToolTip={Gameplay.Help.AbilityBonus}
                            style={this.props.Styles.Inline}
                        >
                            {Player.Race.AbilityBoost.Constitution
                                ? ' +' + Player.Race.AbilityBoost.Constitution
                                : null}
                        </ToolTip>
                    </Text>
                </Block>
                <Block style={this.props.Styles.PropertyLabel}>
                    <ToolTip
                        DisabledOnClick
                        ToolTip={Gameplay.Help.Abilities.Intelligence}
                        style={this.props.Styles.Inline}
                    >
                        <Text>Intelligence:</Text>
                    </ToolTip>
                </Block>
                <Block style={this.props.Styles.PropertyField}>
                    <Text>
                        <ToolTip
                            DisabledOnClick
                            ToolTip={Gameplay.Help.Abilities.Intelligence}
                            style={this.props.Styles.Inline}
                        >
                            {Player.Intelligence -
                                (Player.Race.AbilityBoost.Intelligence || 0)}
                        </ToolTip>
                        <ToolTip
                            DisabledOnClick
                            ToolTip={Gameplay.Help.AbilityBonus}
                            style={this.props.Styles.Inline}
                        >
                            {Player.Race.AbilityBoost.Intelligence
                                ? ' +' + Player.Race.AbilityBoost.Intelligence
                                : null}
                        </ToolTip>
                    </Text>
                </Block>
                <Block />
                <Block style={this.props.Styles.RollAbilities}>
                    <ToolTip
                        DisabledOnClick
                        ToolTip={Gameplay.Help.Buttons.Reroll}
                        style={this.props.Styles.Inline}
                    >
                        <Button onClick={this.props.GeneratePlayerStats}>
                            Reroll
                        </Button>
                    </ToolTip>
                </Block>
                <Block />
            </View>
        );
    }
}

class CreateCharacterBackground extends Component {
    SelectRace = Input => {
        let Player = { ...this.props.Player };
        let Races = World.Races;
        let RaceName = '';
        let index = 0;

        Object.keys(Races).filter((RaceObjectName, i) => {
            if (RaceObjectName === Player.Race.Id) {
                index = i;
                return true;
            }
            return false;
        });

        if (Input === 'Left') {
            Player.Race =
                Races[
                    Object.keys(Races).filter((RaceObjectName, i) => {
                        if (
                            (index === 0 &&
                                i === Object.keys(Races).length - 1) ||
                            i === index - 1
                        ) {
                            RaceName = RaceObjectName;
                            return true;
                        }
                        return false;
                    })[0]
                ];
        } else {
            Player.Race =
                Races[
                    Object.keys(Races).filter((RaceObjectName, i) => {
                        if (
                            (index + 2 > Object.keys(Races).length &&
                                i === 0) ||
                            i === index + 1
                        ) {
                            RaceName = RaceObjectName;
                            return true;
                        }
                        return false;
                    })[0]
                ];
        }
        this.props.SetRace({ ...Player.Race, Id: RaceName });
    };

    SelectClass = Input => {
        let Player = { ...this.props.Player };
        let Classes = World.Classes;
        let ClassName = '';
        let index = 0;

        Object.keys(Classes).filter((ClassObjectName, i) => {
            if (ClassObjectName === Player.Class.Id) {
                index = i;
                return true;
            }
            return false;
        });

        if (Input === 'Left') {
            Player.Class =
                Classes[
                    Object.keys(Classes).filter((ClassObjectName, i) => {
                        if (
                            (index === 0 &&
                                i === Object.keys(Classes).length - 1) ||
                            i === index - 1
                        ) {
                            ClassName = ClassObjectName;
                            return true;
                        }
                        return false;
                    })[0]
                ];
        } else {
            Player.Class =
                Classes[
                    Object.keys(Classes).filter((ClassObjectName, i) => {
                        if (
                            (index + 2 > Object.keys(Classes).length &&
                                i === 0) ||
                            i === index + 1
                        ) {
                            ClassName = ClassObjectName;
                            return true;
                        }
                        return false;
                    })[0]
                ];
        }
        this.props.SetClass({ ...Player.Class, Id: ClassName });
    };

    SelectFirstSpell = Input => {
        let Player = { ...this.props.Player };
        let Spells = Campaign.AvailableStartSpell;
        let index = 0;

        Spells.filter((Spell, i) => {
            if (Spell === Player.SpellBook.Spells[0]) {
                index = i;
                return true;
            }
            return false;
        });

        if (Input === 'Left') {
            if (index - 1 < 0) {
                Player.SpellBook.Spells[0] = Spells[Spells.length - 1];
            } else {
                Player.SpellBook.Spells[0] = Spells[index - 1];
            }
        } else {
            if (index + 1 > Spells.length - 1) {
                Player.SpellBook.Spells[0] = Spells[0];
            } else {
                Player.SpellBook.Spells[0] = Spells[index + 1];
            }
        }

        this.props.SetFirstSpell(Player.SpellBook);
    };

    render() {
        let Player = { ...this.props.Player };

        let FirstSpell = null;
        if (Player.SpellBook && Player.SpellBook.Spells) {
            FirstSpell = { ...Player.SpellBook.Spells[0] };
        }

        return (
            <View style={this.props.Styles.CharacterCreateBackground}>
                <Block
                    style={{
                        ...this.props.Styles.PropertyLabel,
                        paddingTop: '8px'
                    }}
                >
                    <ToolTip
                        DisabledOnClick
                        FlexibleWidth
                        ToolTip={Gameplay.Help.Race}
                        style={this.props.Styles.Inline}
                    >
                        <Text>Race:</Text>
                    </ToolTip>
                </Block>
                <Block style={this.props.Styles.PropertyField}>
                    <Block style={this.props.Styles.FlexBoxContainer}>
                        <ToolTip
                            DisabledOnClick
                            FlexibleWidth
                            ToolTip={Gameplay.Help.Arrows.Race}
                            style={this.props.Styles.Inline}
                        >
                            <Arrow
                                {...this.props}
                                onClick={this.SelectRace}
                                arrow="Left"
                            >
                                ←
                            </Arrow>
                        </ToolTip>

                        <Block
                            style={{
                                flexGrow: '1',
                                flexBasis: 'auto',
                                textAlign: 'center',
                                margin: 'auto'
                            }}
                        >
                            <ToolTip
                                DisabledOnClick
                                FlexibleWidth
                                ToolTip={Gameplay.Help.Race}
                                style={this.props.Styles.Inline}
                            >
                                <Text>{Player.Race.Name}</Text>
                            </ToolTip>
                        </Block>
                        <ToolTip
                            DisabledOnClick
                            FlexibleWidth
                            ToolTip={Gameplay.Help.Arrows.Race}
                            style={this.props.Styles.Inline}
                        >
                            <Arrow
                                {...this.props}
                                onClick={this.SelectRace}
                                arrow="Right"
                            >
                                →
                            </Arrow>
                        </ToolTip>
                    </Block>
                </Block>
                <Block
                    style={{
                        ...this.props.Styles.PropertyLabel,
                        paddingTop: '8px'
                    }}
                >
                    <ToolTip
                        DisabledOnClick
                        FlexibleWidth
                        ToolTip={Gameplay.Help.Class}
                        style={this.props.Styles.Inline}
                    >
                        <Text>Class:</Text>
                    </ToolTip>
                </Block>
                <Block style={this.props.Styles.PropertyField}>
                    <Block style={this.props.Styles.FlexBoxContainer}>
                        <ToolTip
                            DisabledOnClick
                            FlexibleWidth
                            ToolTip={Gameplay.Help.Arrows.Class}
                            style={this.props.Styles.Inline}
                        >
                            <Arrow
                                {...this.props}
                                onClick={this.SelectClass}
                                arrow="Left"
                            >
                                ←
                            </Arrow>
                        </ToolTip>
                        <Block
                            style={{
                                flexGrow: '1',
                                flexBasis: 'auto',
                                textAlign: 'center',
                                margin: 'auto'
                            }}
                        >
                            <Text>
                                <ToolTip
                                    DisabledOnClick
                                    FlexibleWidth
                                    ToolTip={Gameplay.Help.Class}
                                    style={this.props.Styles.Inline}
                                >
                                    {Player.Class.Name}
                                </ToolTip>
                            </Text>
                        </Block>
                        <ToolTip
                            DisabledOnClick
                            FlexibleWidth
                            ToolTip={Gameplay.Help.Arrows.Class}
                            style={this.props.Styles.Inline}
                        >
                            <Arrow
                                {...this.props}
                                onClick={this.SelectClass}
                                arrow="Right"
                            >
                                →
                            </Arrow>
                        </ToolTip>
                    </Block>
                </Block>
                <Block
                    style={{
                        ...this.props.Styles.PropertyLabel,
                        paddingTop: '10px'
                    }}
                    hidden={
                        !Player.Class.Spellcaster ||
                        !Campaign.AvailableStartSpell
                    }
                >
                    <ToolTip
                        DisabledOnClick
                        FlexibleWidth
                        ToolTip={Gameplay.Help.FirstSpell}
                        style={this.props.Styles.Inline}
                    >
                        <Text>Spell:</Text>
                    </ToolTip>
                </Block>
                <Block
                    style={this.props.Styles.PropertyField}
                    hidden={
                        !Player.Class.Spellcaster ||
                        !Campaign.AvailableStartSpell
                    }
                >
                    <Block style={this.props.Styles.FlexBoxContainer}>
                        <ToolTip
                            DisabledOnClick
                            FlexibleWidth
                            ToolTip={Gameplay.Help.Arrows.Spell}
                            style={this.props.Styles.Inline}
                        >
                            <Block style={{ marginTop: '3px' }}>
                                <Arrow
                                    {...this.props}
                                    onClick={this.SelectFirstSpell}
                                    arrow="Left"
                                >
                                    ←
                                </Arrow>
                            </Block>
                        </ToolTip>
                        <Block
                            style={{
                                flexGrow: '1',
                                flexBasis: 'auto',
                                marginLeft: '8px'
                            }}
                        >
                            <ItemImage
                                draggable={false}
                                image={(FirstSpell && FirstSpell.Image) || null}
                                name={(FirstSpell && FirstSpell.Name) || null}
                                item={FirstSpell}
                                NoActionMenu
                                onClick={null}
                            />
                        </Block>
                        <ToolTip
                            DisabledOnClick
                            FlexibleWidth
                            ToolTip={Gameplay.Help.Arrows.Spell}
                            style={this.props.Styles.Inline}
                        >
                            <Block style={{ marginTop: '3px' }}>
                                <Arrow
                                    {...this.props}
                                    onClick={this.SelectFirstSpell}
                                    arrow="Right"
                                >
                                    →
                                </Arrow>
                            </Block>
                        </ToolTip>
                    </Block>
                </Block>
            </View>
        );
    }
}

class CreateCharacterDescription extends Component {
    render() {
        let Player = { ...this.props.Player };
        return (
            <View style={this.props.Styles.CreateCharacterDescription}>
                <Block style={this.props.Styles.Paragraph}>
                    <ToolTip
                        DisabledOnClick
                        FlexibleWidth
                        ToolTip={Gameplay.Help.Race}
                        style={this.props.Styles.Inline}
                    >
                        {Player.Race.Description}
                    </ToolTip>
                </Block>
                <Block style={this.props.Styles.Paragraph}>
                    <ToolTip
                        DisabledOnClick
                        FlexibleWidth
                        ToolTip={Gameplay.Help.Race}
                        style={this.props.Styles.Inline}
                    >
                        {Player.Class.Description}
                    </ToolTip>
                </Block>
            </View>
        );
    }
}

class StartGame extends Component {
    render() {
        return (
            <View style={this.props.Styles.StartGame}>
                <ToolTip
                    DisabledOnClick
                    ToolTip={Gameplay.Help.Buttons.ResumeGame}
                    style={this.props.Styles.Inline}
                >
                    <Button
                        onClick={this.props.ResumeGame}
                        hidden={!this.props.GameInBackground}
                    >
                        Resume Game
                    </Button>
                </ToolTip>
                <ToolTip
                    DisabledOnClick
                    ToolTip={Gameplay.Help.Buttons.PlayGame}
                    style={this.props.Styles.Inline}
                >
                    <Button onClick={this.props.StartPlaying}>
                        Let's play
                    </Button>
                </ToolTip>
            </View>
        );
    }
}

export default props => {
    return (
        <View style={props.Styles.CreatePlayer}>
            {/* row 1 */}
            <Header />
            {/* row 2 */}
            <Contact />
            {/* container */}
            <CreateCharacterContainer {...props} />
            {/* row 3 */}
            <CreateCharacterHeader {...props} />
            {/* row 4 */}
            <CreateCharacterName {...props} />
            <CreateCharacterAbilities {...props} />
            <CreateCharacterBackground {...props} />
            <CreateCharacterDescription {...props} />
            {/* row 6 */}
            <StartGame {...props} />
        </View>
    );
};
