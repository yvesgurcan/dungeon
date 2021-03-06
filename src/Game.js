import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import mapStateToProps from './store/mapStateToProps';
import Store from './store/Store';

import World from './WorldAssets';
import Campaign from './LegendsOfTheCatacombs';
import Gameplay from './GameplayAssets';
import Utilities from './Utilities';

import Functions from './Functions';

import CreateCharacter from './views/CreateCharacter';
import Play from './views/Play';

/* utility */

let Debug =
    process.env.REACT_APP_RELEASE === 'stable' ? false : Utilities.Debug;
let SoundDebug =
    process.env.REACT_APP_RELEASE === 'stable' ? false : Utilities.SoundDebug;

const { Wall, Door, LootContainer, Undiscovered, Empty } = Utilities.MapObjects;
let WallMapVisibleRange = { ...Utilities.WallMapVisibleRange };

let MobileScreen = Utilities.ScreenSize.MobileScreen();
let TabletScreen = Utilities.ScreenSize.TabletScreen();

let NextAvailableId = {
    Monsters: 0,
    LootContainers: 0,
    Items: 0
};

let Styles = null;

class Game extends Component {
    /* CSS */

    CalculateStyles = () => {
        MobileScreen = Utilities.ScreenSize.MobileScreen();
        TabletScreen = Utilities.ScreenSize.TabletScreen();

        if (
            MobileScreen !== this.props.MobileScreen ||
            TabletScreen !== this.props.TabletScreen
        ) {
            WallMapVisibleRange = MobileScreen
                ? Utilities.WallMapVisibleRangeMobileScreen
                : Utilities.WallMapVisibleRange;

            /* presets */

            // grid columns
            const FirstColumn = 1;
            const LastColumn = 10;

            // grid rows
            const StoryRowHeight = 245;

            // various
            const px = 'px';

            const HUDPadding = 8;
            const HUDBlockPadding = HUDPadding + px;
            const HUDBlockPadding2 = HUDPadding / 2.5 + px;
            const HUDBorder = '1px solid black';
            const HUDStatBarHeight = '10px';

            const ButtonNormalBackground =
                'linear-gradient(135deg, #ccc 35%, #ddd 70%, #eee 100%)';
            const ButtonHoverBackground =
                'linear-gradient(135deg, #aaa 35%, #ccc 70%, #ccc 100%)';
            const ButtonClickBackground =
                'linear-gradient(135deg, #777 35%, #999 70%, #999 100%)';

            // map
            // tile size (might want to keep these)
            const WallBoxWidth = 15;
            const WallBoxHeight = 15;

            // css borders of walls
            const BorderThickness = 1.5;
            const BorderColor = 'black';
            const WallLine = BorderThickness + 'px solid ' + BorderColor;
            const MapBackgroundColor = 'white';

            // css drawing of pillars
            const PillarBoxWidth = WallBoxWidth - 5;
            const PillarBoxHeight = WallBoxHeight - 5;

            // css drawing of walls
            const WallBoxWidthWithBorder = WallBoxWidth - BorderThickness;
            const WallBoxHeightWithBorder = WallBoxHeight - BorderThickness;
            const WallBoxWidthCentered = WallBoxWidthWithBorder / 2;
            const WallBoxHeightCentered = WallBoxHeightWithBorder / 2;

            // css drawing of doors
            const DoorLine =
                Math.max(1, BorderThickness - BorderThickness / 2) +
                'px solid ' +
                BorderColor;
            const DoorColor = 'lightsteelblue';
            const DoorLongSize = 7;
            const DoorBoxLongSizeCentered = DoorLongSize - 3;

            /* responsiveness */

            // grid rows
            let TitleRow = 1;
            let ContactRow = 2;
            let MessageRow = 3;
            let MainRow = 4;
            let MapRow = MainRow;
            let ControlRow = 5;
            let ControlRow2 = 5;
            let ControlRow3 = null;
            let InventoryRow = 6;
            let SpellBookRow = 7;
            let AccessoriesStartRow = 6;
            let AccessoriesStopRow = 8;
            let BottomControlsRow = 9;
            let VolumeRow = 9;
            let GameStateRow = 10;

            if (MobileScreen) {
                TitleRow = 1;
                ContactRow = 2;
                MessageRow = 3;
                MainRow = 4;
                MapRow = 5;
                ControlRow = 6;
                ControlRow2 = 7;
                ControlRow3 = 8;
                InventoryRow = 9;
                SpellBookRow = 10;
                AccessoriesStartRow = 11;
                AccessoriesStopRow = 12;
                BottomControlsRow = 13;
                VolumeRow = 14;
                GameStateRow = 15;
            }

            // grid columns
            let StoryStartColumn = FirstColumn;
            let StoryEndColumn = 6;
            let MapStartColumn = StoryEndColumn;
            let MapEndColumn = LastColumn;

            let ContactColumnStart = 5;
            let ContactColumnStop = LastColumn;

            let PlayerWeaponStartColumn = FirstColumn;
            let PlayerWeaponStopColumn = 2;
            let PlayerVitalsStartColumn = PlayerWeaponStopColumn;
            let PlayerVitalsStopColumn = 3;
            let DirectionalArrowStartColumn = PlayerVitalsStopColumn;
            let DirectionalArrowStopColumn = 4;
            let PlayerActionStartColumn = DirectionalArrowStopColumn;
            let PlayerActionStopColumn = 6;

            let PlayerStat2StartColumn = PlayerActionStopColumn;
            let PlayerStat2StopColumn = 7;

            let PlayerAttributesStartColumn = PlayerStat2StopColumn;
            let PlayerAttributesBlockSeparation = PlayerAttributesStartColumn;
            let PlayerAttributesStopColumn = LastColumn;

            let InventoryStartColumn = FirstColumn;
            let InventoryStopColumn = 7;

            let SpellBookStartColumn = FirstColumn;
            let SpellBookStopColumn = 7;

            let AccessoriesStartColumn = 7;
            let AccessoriesStopColumn = LastColumn;

            if (MobileScreen) {
                StoryStartColumn = FirstColumn;
                StoryEndColumn = LastColumn;
                MapStartColumn = FirstColumn;
                MapEndColumn = LastColumn;

                ContactColumnStart = FirstColumn;
                ContactColumnStop = LastColumn;

                PlayerWeaponStartColumn = FirstColumn;
                PlayerWeaponStopColumn = 4;
                PlayerVitalsStartColumn = PlayerWeaponStopColumn;
                PlayerVitalsStopColumn = 7;
                DirectionalArrowStartColumn = PlayerVitalsStopColumn;
                DirectionalArrowStopColumn = 9;

                PlayerActionStartColumn = FirstColumn;
                PlayerActionStopColumn = 4;
                PlayerAttributesStartColumn = PlayerActionStopColumn;
                PlayerAttributesStopColumn = 4;
                PlayerAttributesBlockSeparation = 7;
                PlayerAttributesStopColumn = LastColumn;

                InventoryStartColumn = FirstColumn;
                InventoryStopColumn = LastColumn;

                SpellBookStartColumn = FirstColumn;
                SpellBookStopColumn = LastColumn;

                AccessoriesStartColumn = FirstColumn;
                AccessoriesStopColumn = LastColumn;
            } else if (TabletScreen) {
                PlayerVitalsStartColumn = PlayerWeaponStopColumn;
                PlayerVitalsStopColumn = 4;
                DirectionalArrowStartColumn = PlayerVitalsStopColumn;
                DirectionalArrowStopColumn = 5;
                PlayerActionStartColumn = DirectionalArrowStopColumn;
                PlayerActionStopColumn = 6;
                PlayerAttributesStartColumn = PlayerActionStopColumn;
                PlayerAttributesBlockSeparation = 7;
                PlayerAttributesStopColumn = LastColumn;
            }

            /* style object */

            Styles = {
                Hidden: {
                    display: 'none'
                },
                // debug
                Placeholder: {
                    background: 'red',
                    width: WallBoxWidth + px,
                    height: WallBoxHeight + px
                },
                // multi-use
                Paragraph: {
                    display: 'block',
                    paddingBottom: '13px'
                },
                FlexBoxContainer: {
                    display: 'flex',
                    justifyContent: 'center'
                },
                Inline: {
                    display: 'inline'
                },
                // input fields
                // default style
                TextEdit: {
                    border: 'none',
                    padding: '5px',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    width: '120px',
                    background: 'transparent'
                },
                TextEditFocus: {
                    border: 'none',
                    padding: '5px',
                    outline: 'none',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    width: '120px',
                    background: 'transparent'
                },
                // underline when focused
                TextEditUnderline: {
                    border: 'none',
                    padding: '5px',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    width: '120px',
                    background: 'transparent'
                },
                TextEditUnderlineFocus: {
                    border: 'none',
                    padding: '5px',
                    outline: 'none',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    width: '120px',
                    background: 'transparent',
                    textDecoration: 'underline'
                },
                // Create Player Grid
                CreatePlayer: {
                    margin: '0 auto',
                    width: MobileScreen
                        ? '300px'
                        : TabletScreen
                        ? '675px'
                        : '810px',
                    userSelect: 'none',
                    cursor: 'pointer',
                    display: 'grid',
                    gridTemplateColumns: MobileScreen
                        ? // column1-10
                          'repeat(9, 34.4px)'
                        : TabletScreen
                        ? // column1-10
                          'repeat(9, 75px)'
                        : // column1-10
                          'repeat(9, 90px)',
                    gridTemplateRows: 'auto auto auto'
                },
                CharacterHeader: {
                    padding: HUDPadding,
                    gridColumnStart: FirstColumn,
                    gridColumnEnd: LastColumn,
                    gridRowStart: 3
                },
                // Character Name and Vitals
                CharacterCreateName: {
                    padding: HUDPadding,
                    gridColumnStart: FirstColumn,
                    gridColumnEnd: MobileScreen ? LastColumn : 4,
                    gridRowStart: 4,
                    display: 'grid',
                    // subgrid
                    gridTemplateRows: '23px 23px 23px 23px',
                    gridTemplateColumns: MobileScreen
                        ? // column1
                          '100px ' +
                          '130px ' +
                          // column2-10
                          'repeat(8, 31px)'
                        : TabletScreen
                        ? // column1
                          '100px ' +
                          '130px ' +
                          // column2-10
                          'repeat(8, 74.3px)'
                        : // column1
                          '100px ' +
                          '130px ' +
                          // column2-10
                          'repeat(8, 88.6px)'
                },
                CreateCharacterContainer: {
                    gridColumnStart: FirstColumn,
                    gridColumnEnd: LastColumn,
                    gridRowStart: 3,
                    gridRowEnd: 9,
                    backgroundImage: 'url(graphics/hud/parchment.jpg)'
                },
                // Character Ability Scores
                CharacterCreateView: {
                    padding: HUDPadding,
                    gridColumnStart: MobileScreen ? FirstColumn : 4,
                    gridColumnEnd: MobileScreen ? LastColumn : 7,
                    gridRowStart: MobileScreen ? 5 : 4,
                    display: 'grid',
                    // subgrid
                    gridTemplateRows: '23px 23px 23px 23px',
                    gridTemplateColumns: MobileScreen
                        ? // column1
                          '100px ' +
                          '130px ' +
                          // column2-10
                          'repeat(8, 31px)'
                        : TabletScreen
                        ? // column1
                          '100px ' +
                          '130px ' +
                          // column2-10
                          'repeat(8, 74.3px)'
                        : // column1
                          '100px ' +
                          '130px ' +
                          // column2-10
                          'repeat(8, 88.6px)'
                },
                // Character Race and Class
                CharacterCreateBackground: {
                    padding: HUDPadding,
                    gridColumnStart: MobileScreen ? FirstColumn : 6,
                    gridColumnEnd: 10,
                    gridRowStart: MobileScreen ? 6 : 4,
                    display: 'grid',
                    // subgrid
                    gridTemplateRows: '32px 32px 32px',
                    gridTemplateColumns: MobileScreen
                        ? // column1
                          '100px ' +
                          '130px ' +
                          // column2-10
                          'repeat(8, 31px)'
                        : TabletScreen
                        ? // column1
                          '100px ' +
                          '130px ' +
                          // column2-10
                          'repeat(8, 74.3px)'
                        : // column1
                          '100px ' +
                          '130px ' +
                          // column2-10
                          'repeat(8, 88.6px)'
                },
                CreateCharacterDescription: {
                    gridColumnStart: FirstColumn,
                    gridColumnEnd: LastColumn,
                    gridRowStart: MobileScreen ? 7 : 5,
                    padding: HUDPadding,
                    paddingTop: '20px',
                    minHeight: '100px'
                },
                StartGame: {
                    gridColumnStart: FirstColumn,
                    gridColumnEnd: LastColumn,
                    gridRowStart: 8,
                    padding: HUDPadding,
                    textAlign: 'right'
                },
                // Create Character: Label/Value Pairs
                PropertyLabel: {
                    gridColumnStart: FirstColumn,
                    gridColumnEnd: FirstColumn,
                    padding: '2.5px',
                    textAlign: 'right',
                    marginRight: '10px'
                },
                PropertyLabelForInput: {
                    gridColumnStart: FirstColumn,
                    gridColumnEnd: FirstColumn,
                    paddingTop: '5px',
                    textAlign: 'right',
                    marginRight: '10px'
                },
                PropertyField: {
                    gridColumnStart: 2,
                    gridColumnEnd: 2,
                    padding: '2.5px'
                },
                PropertyFieldForInput: {
                    gridColumnStart: 2,
                    gridColumnEnd: 2
                },
                RollAbilities: {
                    gridColumnStart: 2
                },
                // In-Game Grid
                Game: {
                    margin: '0 auto',
                    width: MobileScreen
                        ? '270px'
                        : TabletScreen
                        ? '650px'
                        : '790px',
                    userSelect: 'none',
                    cursor: 'pointer',
                    display: 'grid',
                    gridTemplateColumns: MobileScreen
                        ? // column1-10
                          'repeat(10, 29px)'
                        : TabletScreen
                        ? // column1
                          '110px ' +
                          // column2-4
                          '40px ' +
                          '50px ' +
                          '70px ' +
                          '70px ' +
                          // column5
                          '120px ' +
                          // column 6
                          '35px ' +
                          // column7-10
                          'repeat(3, 89px)'
                        : // column1
                          '110px ' +
                          // column2-6
                          'repeat(4, 91px) ' +
                          // column7
                          '132px ' +
                          // column 8
                          '30px ' +
                          // column9-10
                          'repeat(2, 86px)',
                    gridTemplateRows: this.state.CreateCharacter
                        ? null
                        : // title (row1)
                          'auto ' +
                          // contact (row2)
                          'auto ' +
                          // event log (row3)
                          'auto' +
                          // story/map (row4)
                          (this.state.CreateCharacter
                              ? 'auto'
                              : StoryRowHeight + px) +
                          ' ' +
                          // story (row5)
                          (MobileScreen
                              ? (StoryRowHeight * 1) / 2 + px + ' '
                              : '') +
                          // controls (row6a)
                          'auto ' +
                          // controls2 (row6b)
                          (MobileScreen ? 'auto ' : '') +
                          // controls3 (row6c)
                          (MobileScreen ? 'auto ' : '') +
                          // inventory (row7)
                          'auto ' +
                          // spell book (row8)
                          'auto '
                },
                // page title
                Header: {
                    gridColumnStart: FirstColumn,
                    gridColumnEnd: LastColumn,
                    gridRowStart: TitleRow,
                    textAlign: 'center',
                    fontFamily: 'UnifrakturMaguntia, cursive',
                    color: 'white'
                },
                H1: {
                    margin: '0px',
                    fontStyle: 'italic'
                },
                H2: {
                    margin: '0px'
                },
                H3: {
                    margin: '0px'
                },
                H4: {
                    margin: '0px'
                },
                // links
                Link: {
                    color: 'inherit'
                },
                LinkHover: {
                    color: 'inherit',
                    textDecoration: 'none'
                },
                // Contact info
                Contact: {
                    gridColumnStart: ContactColumnStart,
                    gridColumnEnd: LastColumn,
                    gridRowStart: ContactRow,
                    fontFamily: 'Indie Flower, cursive',
                    textAlign: MobileScreen ? 'center' : 'right',
                    paddingLeft: MobileScreen ? '30px' : null,
                    color: 'white'
                },
                GitHubLogo: {
                    height: '30px',
                    verticalAlign: 'middle',
                    marginLeft: '5px',
                    backgroundColor: 'white',
                    borderRadius: '25px'
                },
                // Game Background images
                TopGameBackgroundImage: {
                    gridColumnStart: FirstColumn,
                    gridColumnEnd: LastColumn,
                    gridRowStart: MessageRow,
                    gridRowEnd: MapRow + 1,
                    backgroundImage: 'url(graphics/hud/parchment.jpg)'
                },
                BottomGameBackgroundImage: {
                    gridColumnStart: FirstColumn,
                    gridColumnEnd: LastColumn,
                    gridRowStart: ControlRow,
                    gridRowEnd: VolumeRow + 1,
                    backgroundImage: 'url(graphics/hud/metal.jpg)'
                },
                GameStateBackgroundImage: {
                    gridColumnStart: FirstColumn,
                    gridColumnEnd: LastColumn,
                    gridRowStart: GameStateRow,
                    backgroundImage: 'url(graphics/hud/parchment.jpg)'
                },
                // Top-screen Messages
                EventLog: {
                    gridColumnStart: FirstColumn,
                    gridColumnEnd: ContactColumnStop,
                    gridRowStart: MessageRow,
                    fontFamily: 'Indie Flower, cursive',
                    fontWeight: 'bold',
                    border: HUDBorder,
                    padding: HUDBlockPadding,
                    height:
                        Number(
                            18.5 *
                                (MobileScreen
                                    ? Utilities.ResponsiveMaxEventLogEntries
                                    : Utilities.MaxEventLogEntries)
                        ) + px
                },
                EventLogContainer: {
                    maxHeight:
                        Number(
                            18.5 *
                                (MobileScreen
                                    ? Utilities.ResponsiveMaxEventLogEntries
                                    : Utilities.MaxEventLogEntries)
                        ) + px,
                    overflow: 'auto',
                    scrollBehavior: 'smooth'
                },
                CustomLogEntryInputContainer: {
                    marginLeft: '42.5px'
                },
                ClearLog: {
                    gridColumnStart: LastColumn - 2,
                    gridColumnEnd: LastColumn,
                    gridRowStart: MessageRow,
                    textAlign: 'right',
                    padding: HUDBlockPadding,
                    paddingRight: '25px',
                    zIndex: '1000',
                    height: '18px'
                },
                // Story
                StoryBlock: {
                    gridColumnStart: StoryStartColumn,
                    gridColumnEnd: StoryEndColumn,
                    gridRowStart: MainRow,
                    fontFamily: 'Indie Flower, cursive',
                    userSelect: 'text',
                    borderRight: HUDBorder,
                    borderLeft: HUDBorder,
                    padding: HUDBlockPadding
                },
                StoryContainer: {
                    maxHeight: MobileScreen
                        ? null
                        : StoryRowHeight - HUDPadding * 2 + px,
                    height: MobileScreen
                        ? (StoryRowHeight * 1) / 2 - HUDPadding * 2 + px
                        : null,
                    overflow: 'auto',
                    scrollBehavior: 'smooth'
                },
                Story: {
                    userSelect: 'text'
                },

                Event: {
                    userSelect: 'text'
                },
                // Map
                Map: {
                    gridColumnStart: MapStartColumn,
                    gridColumnEnd: MapEndColumn,
                    gridRowStart: MapRow,
                    overflow: 'hidden',
                    padding: HUDBlockPadding,
                    borderRight: HUDBorder,
                    borderTop: MobileScreen ? HUDBorder : null,
                    // otherwise, the map will be distorted
                    minWidth: MobileScreen ? null : '300px'
                },
                MapRow: {
                    height: WallBoxHeight + px
                },
                MapObject: {
                    display: 'inline-block',
                    width: WallBoxWidth + px,
                    height: WallBoxHeight + px
                },
                Player: {
                    boxSizing: 'border-box',
                    width: WallBoxWidth + px,
                    height: WallBoxHeight + px,
                    background: 'purple',
                    borderRadius: '50%'
                },
                Loot: {
                    boxSizing: 'border-box',
                    margin: '1.5px',
                    width: WallBoxWidth - 3 + px,
                    height: WallBoxHeight - 3 + px,
                    background: 'orange',
                    borderRadius: '50%'
                },
                Monster: {
                    boxSizing: 'border-box',
                    margin: '1.5px',
                    width: WallBoxWidth - 3 + px,
                    height: WallBoxHeight - 3 + px,
                    background: 'red',
                    borderRadius: '50%'
                },
                Wall: {
                    Pillar: {
                        boxSizing: 'border-box',
                        marginTop: (WallBoxHeight - PillarBoxHeight) / 2 + px,
                        marginRight: (WallBoxWidth - PillarBoxWidth) / 2 + px,
                        marginBottom:
                            (WallBoxHeight - PillarBoxHeight) / 2 + px,
                        marginLeft: (WallBoxWidth - PillarBoxWidth) / 2 + px,
                        width: PillarBoxWidth + px,
                        height: PillarBoxHeight + px,
                        background: 'black'
                    },
                    // Continous Walls
                    NorthToSouth: {
                        boxSizing: 'border-box',
                        borderLeft: WallLine,
                        marginLeft: WallBoxWidthCentered + px,
                        width: BorderThickness + px,
                        height: WallBoxHeight + px
                    },
                    WestToEast: {
                        boxSizing: 'border-box',
                        borderTop: WallLine,
                        marginTop: WallBoxHeightCentered + px,
                        width: WallBoxWidth + px,
                        height: BorderThickness + px
                    },
                    NorthToEast: {
                        boxSizing: 'border-box',
                        borderLeft: WallLine,
                        borderBottom: WallLine,
                        marginLeft: WallBoxHeightCentered + px,
                        width: WallBoxWidthCentered + BorderThickness + px,
                        height: WallBoxHeightCentered + BorderThickness + px
                    },
                    NorthToWest: {
                        boxSizing: 'border-box',
                        borderRight: WallLine,
                        borderBottom: WallLine,
                        marginRight: WallBoxHeightCentered + px,
                        width: WallBoxWidthCentered + BorderThickness + px,
                        height: WallBoxHeightCentered + BorderThickness + px
                    },
                    SouthToEast: {
                        boxSizing: 'border-box',
                        borderLeft: WallLine,
                        borderTop: WallLine,
                        marginTop: WallBoxHeightCentered + px,
                        marginLeft: WallBoxHeightCentered + px,
                        width: WallBoxWidthCentered + BorderThickness + px,
                        height: WallBoxHeightCentered + BorderThickness + px
                    },
                    SouthToWest: {
                        boxSizing: 'border-box',
                        borderRight: WallLine,
                        borderTop: WallLine,
                        marginTop: WallBoxHeightCentered + px,
                        marginRight: WallBoxHeightCentered + px,
                        width: WallBoxWidthCentered + BorderThickness + px,
                        height: WallBoxHeightCentered + BorderThickness + px
                    },
                    // T-shaped walls
                    TShapedWallNSE: {
                        boxSizing: 'border-box',
                        background: BorderColor,
                        marginLeft: WallBoxHeightCentered + px
                    },
                    NorthSouthAndEast: {
                        boxSizing: 'border-box',
                        borderTop:
                            WallBoxWidthCentered +
                            'px solid ' +
                            MapBackgroundColor,
                        borderBottom:
                            WallBoxWidthCentered +
                            'px solid ' +
                            MapBackgroundColor,
                        marginLeft: BorderThickness + px,
                        width: WallBoxWidthCentered + BorderThickness + px,
                        height: WallBoxHeight + px,
                        background: BorderColor
                    },
                    TShapedWallNSW: {
                        boxSizing: 'border-box',
                        background: BorderColor,
                        marginRight: WallBoxHeightCentered + px
                    },
                    NorthSouthAndWest: {
                        boxSizing: 'border-box',
                        borderTop:
                            WallBoxWidthCentered +
                            'px solid ' +
                            MapBackgroundColor,
                        borderBottom:
                            WallBoxWidthCentered +
                            'px solid ' +
                            MapBackgroundColor,
                        width: WallBoxWidthCentered + px,
                        height: WallBoxHeight + px,
                        background: BorderColor
                    }
                },
                Door: {
                    NorthToSouth: {
                        boxSizing: 'border-box',
                        border: DoorLine,
                        marginLeft: DoorBoxLongSizeCentered + px,
                        width: DoorLongSize + px,
                        height: WallBoxHeight + px,
                        background: DoorColor
                    },
                    WestToEast: {
                        boxSizing: 'border-box',
                        border: DoorLine,
                        marginTop: DoorBoxLongSizeCentered + px,
                        width: WallBoxHeight + px,
                        height: DoorLongSize + px,
                        background: DoorColor
                    }
                },
                // Various Player Controls
                ControlBlock: {
                    gridColumnStart: FirstColumn,
                    gridColumnEnd: LastColumn,
                    gridRowStart: ControlRow,
                    gridRowEnd: ControlRow2 + 1,
                    borderTop: HUDBorder
                },
                // Name and Ready Weapons
                PlayerStats0: {
                    gridColumnStart: PlayerWeaponStartColumn,
                    gridColumnEnd: PlayerWeaponStopColumn,
                    gridRowStart: ControlRow,
                    padding: HUDBlockPadding,
                    textAlign: 'center',
                    color: 'white'
                },
                // Player Vital Stats
                PlayerVitals: {
                    gridColumnStart: PlayerVitalsStartColumn,
                    gridColumnEnd: PlayerVitalsStopColumn,
                    gridRowStart: ControlRow,
                    padding: HUDBlockPadding,
                    color: 'white'
                },
                // Directional Arrows
                ArrowContainer: {
                    gridColumnStart: DirectionalArrowStartColumn,
                    gridColumnEnd: DirectionalArrowStopColumn,
                    gridRowStart: ControlRow,
                    textAlign: 'center',
                    padding: HUDBlockPadding,
                    margin: 'auto'
                },
                Rest: {
                    gridColumnStart: PlayerActionStartColumn,
                    gridColumnEnd: PlayerActionStopColumn,
                    gridRowStart: MobileScreen ? ControlRow3 : ControlRow2,
                    padding: HUDBlockPadding,
                    margin: 'auto',
                    marginTop: '25px'
                },
                PlayerAttributesStacked: {
                    gridColumnStart: PlayerAttributesStartColumn,
                    gridColumnEnd: PlayerAttributesStopColumn,
                    gridRowStart: ControlRow2,
                    padding: HUDBlockPadding,
                    color: 'white'
                },
                TabSelector: {
                    gridColumnStart: FirstColumn,
                    gridColumnEnd: LastColumn,
                    gridRowStart: ControlRow2,
                    margin: 'auto'
                },
                TabButton: {
                    flexGrow: '1',
                    flexBasis: 'auto',
                    textAlign: 'center',
                    margin: 'auto'
                },
                ResponsiveStatsContainer: {
                    gridColumnStart: FirstColumn,
                    gridColumnEnd: LastColumn,
                    gridRowStart: ControlRow3
                },
                PlayerStats2Block1: {
                    gridColumnStart: PlayerAttributesStartColumn,
                    gridColumnEnd: PlayerAttributesBlockSeparation,
                    gridRowStart: MobileScreen ? ControlRow3 : ControlRow2,
                    padding: HUDBlockPadding,
                    color: 'white'
                },
                PlayerStats2Block2: {
                    gridColumnStart: PlayerAttributesBlockSeparation,
                    gridColumnEnd: PlayerAttributesStopColumn,
                    gridRowStart: MobileScreen ? ControlRow3 : ControlRow2,
                    padding: HUDBlockPadding,
                    color: 'white'
                },
                PlayerStats3: {
                    gridColumnStart: PlayerStat2StartColumn,
                    gridColumnEnd: PlayerStat2StopColumn,
                    gridRowStart: MobileScreen ? ControlRow3 : ControlRow2,
                    padding: HUDBlockPadding,
                    color: 'white'
                },
                PlayerStat: {
                    paddingBottom: '5px'
                },
                // Weapons At Hand
                ReadyItemBlock: {
                    paddingTop: '8px',
                    height: 'calc(100% - 18px)'
                },
                ReadyItem: {
                    display: 'inline-block'
                },
                // Player Stat Bars
                StatBar: {
                    boxSizing: 'border-box',
                    width: '100%',
                    height: '14px',
                    padding: '1px',
                    border: '1px solid #555',
                    background:
                        'linear-gradient(135deg, dimgray 35%, gray 70%, #aaa 100%)',
                    boxShadow: 'inset 0 0 10px gray'
                },
                HealthBar: {
                    background:
                        'linear-gradient(0deg, red 50%, lightgray 100%)',
                    height: HUDStatBarHeight
                },
                ManaBar: {
                    background:
                        'linear-gradient(0deg, blue 50%, lightgray 100%)',
                    height: HUDStatBarHeight
                },
                StaminaBar: {
                    background:
                        'linear-gradient(0deg, green 50%, lightgray 100%)',
                    height: HUDStatBarHeight
                },
                // Directional Arrows
                ArrowRow: {
                    fontFamily: 'MedievalSharp, cursive',
                    width: '72px'
                },
                ArrowBlock: {
                    display: 'inline-block',
                    width: '32px',
                    height: '21.5px',
                    textAlign: 'center',
                    border: '1px solid #333',
                    paddingTop: '3px',
                    margin: '1px',
                    background: ButtonNormalBackground,
                    boxShadow: 'inset 0 0 10px gray'
                },
                ArrowBlockHover: {
                    display: 'inline-block',
                    width: '32px',
                    height: '21.5px',
                    textAlign: 'center',
                    border: '1px solid #333',
                    paddingTop: '3px',
                    margin: '1px',
                    background: ButtonHoverBackground,
                    boxShadow: 'inset 0 0 10px gray'
                },
                ArrowBlockClick: {
                    display: 'inline-block',
                    width: '32px',
                    height: '21.5px',
                    textAlign: 'center',
                    border: '1px solid #333',
                    paddingTop: '3px',
                    margin: '1px',
                    background: ButtonClickBackground,
                    boxShadow: 'inset 0 0 10px gray'
                },
                // Actions
                ActionButton: {
                    fontFamily: 'MedievalSharp, cursive',
                    display: 'inline-block',
                    textAlign: 'center',
                    border: '1px solid black',
                    padding: '3px 20px 3px 20px',
                    margin: '1px',
                    userSelect: 'none',
                    background: ButtonNormalBackground,
                    boxShadow: 'inset 0 0 10px gray'
                },
                ActionButtonSmallPadding: {
                    fontFamily: 'MedievalSharp, cursive',
                    display: 'inline-block',
                    textAlign: 'center',
                    border: '1px solid black',
                    padding: '3px 10px 3px 10px',
                    margin: '1px',
                    userSelect: 'none',
                    background: ButtonNormalBackground,
                    boxShadow: 'inset 0 0 10px gray'
                },
                ActionButtonHover: {
                    fontFamily: 'MedievalSharp, cursive',
                    display: 'inline-block',
                    textAlign: 'center',
                    border: '1px solid black',
                    padding: '3px 20px 3px 20px',
                    margin: '1px',
                    userSelect: 'none',
                    background: ButtonHoverBackground,
                    boxShadow: 'inset 0 0 10px gray'
                },
                ActionButtonHoverSmallPadding: {
                    fontFamily: 'MedievalSharp, cursive',
                    display: 'inline-block',
                    textAlign: 'center',
                    border: '1px solid black',
                    padding: '3px 10px 3px 10px',
                    margin: '1px',
                    userSelect: 'none',
                    background: ButtonHoverBackground,
                    boxShadow: 'inset 0 0 10px gray'
                },
                ActionButtonClick: {
                    fontFamily: 'MedievalSharp, cursive',
                    display: 'inline-block',
                    textAlign: 'center',
                    border: '1px solid black',
                    padding: '3px 20px 3px 20px',
                    margin: '1px',
                    userSelect: 'none',
                    background: ButtonClickBackground,
                    boxShadow: 'inset 0 0 10px gray'
                },
                ActionButtonClickSmallPadding: {
                    fontFamily: 'MedievalSharp, cursive',
                    display: 'inline-block',
                    textAlign: 'center',
                    border: '1px solid black',
                    padding: '3px 10px 3px 10px',
                    margin: '1px',
                    userSelect: 'none',
                    background: ButtonClickBackground,
                    boxShadow: 'inset 0 0 10px gray'
                },
                // Inventory
                Inventory: {
                    gridColumnStart: InventoryStartColumn,
                    gridColumnEnd: InventoryStopColumn,
                    gridRowStart: InventoryRow,
                    padding: HUDBlockPadding2,
                    color: 'white'
                },

                InventoryLabel: {
                    marginBottom: HUDBlockPadding2
                },
                InventoryWeightLabel: {
                    marginBottom: HUDBlockPadding2
                },
                // SpellBook
                SpellBook: {
                    gridColumnStart: SpellBookStartColumn,
                    gridColumnEnd: SpellBookStopColumn,
                    gridRowStart: SpellBookRow,
                    borderLeft: HUDBorder,
                    padding: HUDBlockPadding2,
                    color: 'white'
                },
                SpellBookLabel: {
                    marginBottom: HUDBlockPadding2
                },
                // Accessories
                Accessories: {
                    gridColumnStart: AccessoriesStartColumn,
                    gridColumnEnd: AccessoriesStopColumn,
                    gridRowStart: AccessoriesStartRow,
                    gridRowEnd: AccessoriesStopRow,
                    padding: HUDBlockPadding
                },
                // Game settings
                BottomControls: {
                    gridColumnStart: FirstColumn,
                    gridColumnEnd: LastColumn,
                    gridRowStart: VolumeRow,
                    padding: HUDBlockPadding
                },
                GameState: {
                    gridColumnStart: FirstColumn,
                    gridColumnEnd: MobileScreen ? LastColumn : 7,
                    gridRowStart: BottomControlsRow,
                    padding: HUDBlockPadding,
                    textAlign: MobileScreen ? 'center' : null
                },
                GameStateBoxContainer: {
                    gridColumnStart: FirstColumn,
                    gridColumnEnd: LastColumn,
                    gridRowStart: GameStateRow,
                    fontFamily: 'Indie Flower, cursive',
                    padding: HUDBlockPadding,
                    borderTop: '1px solid black',
                    color: 'black',
                    fontWeight: 'bold'
                },
                GameStateBox: {
                    fontFamily: 'Indie Flower, cursive',
                    width: '100%',
                    height: '500px',
                    cursor: 'pointer',
                    outline: 'none',
                    background: 'transparent',
                    color: 'white',
                    border: 'none'
                },
                // Volume
                VolumeControl: {
                    gridColumnStart: MobileScreen ? FirstColumn : 7,
                    gridColumnEnd: LastColumn,
                    gridRowStart: VolumeRow,
                    padding: HUDBlockPadding,
                    color: 'white'
                },
                VolumeLabel: {
                    display: 'inline-block',
                    margin: '1px',
                    textAlign: 'right',
                    width: '60px'
                },
                VolumeSlider: {
                    float: 'right',
                    width: '120px'
                },
                // Sliders
                Slider: {
                    display: 'block',
                    height: '22px'
                },
                SliderTrack: {
                    position: 'relative',
                    top: '8px',
                    margin: 'auto',
                    width: 'calc(100% - 4px)',
                    height: '4px',
                    border: '1px solid black',
                    background:
                        'linear-gradient(90deg, lightgray 0%, dimgray 100%)',
                    borderRadius: '2px'
                },
                SliderInside: {
                    position: 'relative',
                    top: '4px',
                    margin: 'auto',
                    width: 'calc(100% - 8px)',
                    height: '2px',
                    background: 'linear-gradient(90deg, #999 0%, #555 100%)',
                    borderRadius: '2px'
                },
                SliderCursor: {
                    position: 'relative',
                    top: '-7.5px',
                    height: '19px',
                    width: '8px',
                    border: '1px solid black',
                    background:
                        'linear-gradient(135deg, dimgray 0%, lightgray 100%)',
                    borderRadius: '4px'
                },
                // Item Image
                ItemImageBlock: {
                    height: '32px',
                    width: '32px',
                    border: '1px solid #666',
                    margin: '1px',
                    textAlign: 'center',
                    float: 'left',
                    background:
                        'linear-gradient(135deg, #999 35%, #aaa 60%, lightgray 100%)',
                    boxShadow: 'inset 0 0 10px gray'
                },
                ItemImageBlockClick: {
                    position: 'fixed',
                    height: '32px',
                    width: '32px',
                    background: '#333',
                    opacity: '0.5'
                },
                ItemImageBlockNumber: {
                    color: 'black',
                    background: 'white',
                    width: '15px',
                    // webkitTextStroke: "0.25px black",
                    fontSize: '10px',
                    position: 'relative',
                    top: -15,
                    right: -16,
                    // webkitTextStroke: "0.5px black",
                    fontFamily: 'VT323, monospace'
                },
                ItemImage: {
                    maxHeight: '30px',
                    // maxWidth: "30px",
                    width: '30px',
                    padding: '1px',
                    // placeholder style when asset is missing
                    overflow: 'hidden',
                    fontSize: '10px'
                },
                ItemDescription: {
                    zIndex: '900',
                    position: 'absolute',
                    background: '#999',
                    border: '1px solid #666',
                    padding: '5px',
                    maxWidth: '200px',
                    textAlign: 'left',
                    opacity: '0.85',
                    color: 'white'
                },
                ItemDescriptionName: {
                    fontWeight: 'bold',
                    textTransform: 'capitalize'
                },
                ItemDescriptionContent: {
                    paddingTop: '5px'
                },
                ItemActions: {
                    zIndex: '800',
                    position: 'absolute',
                    background: '#999',
                    border: '1px solid #666',
                    padding: '5px',
                    minWidth: '90px',
                    textAlign: 'left',
                    opacity: '0.85',
                    color: 'white'
                },
                ItemAction: {
                    paddingTop: '2.5px',
                    paddingBottom: '2.5px',
                    paddingLeft: '2.5px',
                    paddingRight: '2.5px'
                },
                ItemActionHover: {
                    paddingTop: '2.5px',
                    paddingBottom: '2.5px',
                    paddingLeft: '2.5px',
                    paddingRight: '2.5px',
                    background: '#777'
                },
                ToolTipFlexibleWidth: {
                    zIndex: '900',
                    position: 'absolute',
                    background: '#999',
                    border: '1px solid #666',
                    padding: '5px',
                    maxWidth: '200px',
                    textAlign: 'left',
                    opacity: '0.85',
                    color: 'white',
                    fontFamily: 'initial',
                    fontWeight: 'normal'
                },
                ToolTip: {
                    zIndex: '900',
                    position: 'absolute',
                    background: '#999',
                    border: '1px solid #666',
                    padding: '5px',
                    width: '200px',
                    textAlign: 'left',
                    opacity: '0.85',
                    color: 'white',
                    fontFamily: 'initial',
                    fontWeight: 'normal'
                }
            };

            // Odd-shaped walls
            Styles.Wall.NorthWestEastAndNorthWest = Styles.Wall.WestToEast;
            Styles.Wall.NorthSouthEastAndSouthEast = Styles.Wall.NorthToEast;

            this.setState(
                {
                    MobileScreen: MobileScreen,
                    TabletScreen: TabletScreen
                },
                this.forceUpdate()
            );

            this.props.dispatch({
                type: 'UPDATE_SCREEN_SIZE',
                MobileScreen: MobileScreen,
                TabletScreen: TabletScreen
            });
            this.props.dispatch({ type: 'UPDATE_STYLES', Styles });
        }
    };

    /* Global Event Listeners */

    componentWillMount() {
        // keyboard shortcuts
        document.addEventListener('keydown', this.ListenToKeyboard, false);
        // responsiveness
        window.addEventListener('resize', this.CalculateStyles, false);
        this.CalculateStyles();
        this.ShowStats();
    }

    componentDidMount() {
        let State = { ...this.state };
        let DebugEventMessages = [];

        if (Debug) {
            DebugEventMessages.push(Gameplay.Messages.Debug.On);
        }
        if (SoundDebug) {
            DebugEventMessages.push(Gameplay.Messages.SoundDebug.On);
        }
        if (State.ShowFullMap) {
            DebugEventMessages.push(
                Gameplay.Messages.Cheats.ShowFullMap.On +
                    (Debug ? ' ShowFullMap is ON.' : '')
            );
        }
        if (State.NoClip) {
            DebugEventMessages.push(
                Gameplay.Messages.Cheats.NoClip.On +
                    (Debug ? ' NoClip is ON.' : '')
            );
        }
        if (State.GodMode) {
            DebugEventMessages.push(
                Gameplay.Messages.Cheats.GodMode.On +
                    (Debug ? ' GodMode is ON.' : '')
            );
        }
        if (State.CastAlwaysSucceeds) {
            DebugEventMessages.push(
                Gameplay.Messages.Cheats.CastAlwaysSucceeds.On +
                    (Debug ? ' CastAlwaysSucceeds is ON.' : '')
            );
        }
        this.SetText(DebugEventMessages);
    }

    /* Init Game State */

    constructor(props) {
        super(props);

        this.state = {
            ...this.InitGameEnvironment(true),
            HideInventory: true,
            HideSpellBook: true,
            HideStats: false
        };
    }

    /* Init Game Environment */

    GenerateFormattedDate = TimeInMilliseconds => {
        return [
            [
                TimeInMilliseconds.getFullYear(),
                TimeInMilliseconds.getMonth() + 1,
                TimeInMilliseconds.getDate()
            ].join('-'),
            [
                this.PadNumber(TimeInMilliseconds.getHours()),
                this.PadNumber(TimeInMilliseconds.getMinutes())
            ].join(':')
        ].join(' ');
    };

    GenerateFormattedTime = TimeInMilliseconds => {
        let Time = new Date(TimeInMilliseconds);
        return [
            this.PadNumber(Time.getMinutes(), 3),
            this.PadNumber(Time.getSeconds(), 3)
        ].join(':');
    };

    PadNumber = NumberToPad => {
        if (NumberToPad < 10) {
            return '0' + NumberToPad;
        } else {
            return NumberToPad;
        }
    };

    GenerateIds = (ArrayToId, IdType) => {
        let ArrayWithIds = [...ArrayToId];
        return ArrayWithIds.map((ArrayElement, index) => {
            if (!NextAvailableId[IdType]) {
                NextAvailableId[IdType] = 0;
            }
            ArrayElement.Id = NextAvailableId[IdType]++;

            return ArrayElement;
        });
    };

    InitGameEnvironment = (InitPlayer = false) => {
        // Deactivate cheats at startup in production
        let Cheats = { ...Utilities.Cheats };
        if (process.env.REACT_APP_RELEASE === 'stable') {
            Object.keys(Utilities.Cheats).map(Key => {
                Cheats[Key] = false;
                return null;
            });
        }

        // Campaign assets
        let InitState = {
            Player: { ...Campaign.Player },
            Backpack: { ...Campaign.Backpack },
            AvailableStartSpell: [...Campaign.AvailableStartSpell],
            LootContainers: this.GenerateIds(
                [...Campaign.LootContainers],
                'LootContainers'
            ),
            Monsters: this.GenerateIds([...Campaign.Monsters], 'Monsters'),
            Texts: [...Campaign.Text],
            WallMap: [...Campaign.WallMap],
            GameStarted: {
                Milliseconds: Date.now(),
                HumanFriendly: this.GenerateFormattedDate(new Date())
            },
            EnterCustomLogEntry: false,
            Cheats: Cheats
        };

        // let the player go to the main screen if their character is stored in the state already
        if (InitPlayer) {
            InitState.CreateCharacter =
                process.env.REACT_APP_RELEASE === 'stable'
                    ? Campaign.CreateCharacter
                    : Debug
                    ? Utilities.DebugCreateCharacter
                    : Campaign.CreateCharacter;
        }

        // Force startup with an empty backpack
        if (process.env.REACT_APP_RELEASE === 'stable') {
            InitState.Backpack.Items = [];
        }

        // Items
        // create the list of random items to draw from when looting, grouped by level
        InitState.RandomItems = {};

        Object.keys(World.Items).map(itemObjectName => {
            let item = World.Items[itemObjectName];
            if (InitState.RandomItems['Level' + item.Level] === undefined) {
                InitState.RandomItems['Level' + item.Level] = [];
            }
            InitState.RandomItems['Level' + item.Level].push(item);
            return null;
        });

        // Character
        if (InitPlayer) {
            let Player = { ...InitState.Player };
            InitState.Player = this.CreateCharacter(Player);
        }

        // Character's Backpack
        InitState.Backpack = this.CheckInventoryWeightAtStartUp(
            InitState.Backpack
        );
        InitState.Backpack.Items = this.GenerateIds(
            [...InitState.Backpack.Items],
            'Items'
        );
        InitState.Player.Backpack = { ...InitState.Backpack };
        InitState.Player.Backpack.Weight = {
            Current: InitState.Player.Backpack.Weight,
            Max: InitState.Player.MaxWeight
        };
        InitState.Player.Backpack.ItemCount.Current =
            InitState.Player.Backpack.Items.length;

        // Maps
        // create the dynamic "revealed area" map as displayed in the HUD
        InitState.WallMapRevealed = Campaign.WallMap.map(HorizontalLine =>
            HorizontalLine.map(x => ' ')
        );

        // create internal discovery map, given player start position
        InitState.DiscoveryMap = JSON.parse(
            JSON.stringify(
                Campaign.WallMap.map((HorizontalLine, y) =>
                    HorizontalLine.map((MapObject, x) => {
                        if (
                            x >= InitState.Player.x - 1 &&
                            x <= InitState.Player.x + 1 &&
                            y >= InitState.Player.y - 1 &&
                            y <= InitState.Player.y + 1
                        ) {
                            return Empty;
                        } else {
                            return Undiscovered;
                        }
                    })
                )
            )
        );

        // create the internal map of loot containers
        let LootMap = JSON.parse(
            JSON.stringify(
                Campaign.WallMap.map(HorizontalLine =>
                    HorizontalLine.map(x => ' ')
                )
            )
        );

        if (InitState.LootContainers) {
            InitState.LootContainers = InitState.LootContainers.map(
                Container => {
                    if (Container.x && Container.y) {
                        LootMap[Container.y][Container.x] = LootContainer;
                    }
                    // give ids to the loot container items
                    if (Container.items) {
                        Container.items = this.GenerateIds(
                            [...Container.items],
                            'Items'
                        );
                    }
                    return Container;
                }
            );
        }

        InitState.LootMap = LootMap;

        // create the internal map of monster locations
        let MonsterMap = JSON.parse(
            JSON.stringify(
                Campaign.WallMap.map(HorizontalLine =>
                    HorizontalLine.map(x => ' ')
                )
            )
        );

        if (Campaign.Monsters) {
            Campaign.Monsters.map(Monster => {
                MonsterMap[Monster.y][Monster.x] = Monster.Id;
                return null;
            });
        }

        InitState.MonsterMap = MonsterMap;

        // Story
        // these two are deprecated
        InitState.currentText = Campaign.StartText
            ? Campaign.StartText.text
            : null;
        InitState.currentTextImage = null;
        // text displayed at the beginning of the campaign
        InitState.Story = {
            Text: Campaign.StartText ? Campaign.StartText.text : null,
            Image: Campaign.StartText ? Campaign.StartText.image : null
        };

        // Event Log
        InitState.EventLog = ['00:00: ' + Gameplay.Messages.NewGame];

        // Turn
        InitState.Turn = 0;

        // Sound
        if ((Debug || SoundDebug) && Utilities.DebugVolume !== undefined) {
            InitState.Sound = {
                Volume: Utilities.DebugVolume
            };
            InitState.EventLog.push(
                '00:00: Debug volume is ' + Utilities.DebugVolume + '.'
            );
        } else {
            InitState.Sound = {
                Volume: Utilities.DefaultSoundVolume || 0.3
            };
        }

        this.props.dispatch({
            type: 'UPDATE_PLAYER',
            Player: InitState.Player
        });
        this.props.dispatch({
            type: 'UPDATE_MONSTERS',
            Monsters: InitState.Monsters
        });
        this.props.dispatch({
            type: 'UPDATE_CHEATS',
            Cheats: InitState.Cheats
        });
        this.props.dispatch({
            type: 'UPDATE_EVENT_LOG',
            EventLog: InitState.EventLog
        });
        this.props.dispatch({ type: 'UPDATE_STORY', Story: InitState.Story });
        this.props.dispatch({ type: 'UPDATE_TEXTS', Texts: InitState.Texts });
        this.props.dispatch({ type: 'UPDATE_SOUND', Sound: InitState.Sound });
        this.props.dispatch({
            type: 'UPDATE_MAPS',
            WallMap: InitState.WallMap,
            WallMapRevealed: InitState.WallMapRevealed,
            DiscoveryMap: InitState.DiscoveryMap,
            LootMap: InitState.LootMap,
            MonsterMap: InitState.MonsterMap
        });
        this.props.dispatch({
            type: 'UPDATE_LOOT',
            LootContainers: InitState.LootContainers
        });
        this.props.dispatch({ type: 'UPDATE_TURN', Turn: 0 });
        this.props.dispatch({
            type: 'ADD_TIMESTAMP',
            Milliseconds: InitState.GameStarted.Milliseconds,
            HumanFriendly: InitState.GameStarted.HumanFriendly
        });
        this.props.dispatch({
            type: 'UPDATE_DEBUG',
            Debug: Utilities.Debug,
            SoundDebug: Utilities.SoundDebug
        });
        this.props.dispatch({
            type: 'UPDATE_SCREEN_SIZE',
            MobileScreen: MobileScreen,
            TabletScreen: TabletScreen
        });

        return InitState;
    };

    /* Character Creation */

    ShowCharacterScreen = () => {
        this.setState(
            { CreateCharacter: true, GameInBackground: this.state },
            function () {
                let Player = this.CreateCharacter();
                this.setState({ Player }, function () {
                    this.CalculateStyles();
                    this.forceUpdate();
                });
            }
        );
    };

    GeneratePlayerStats = () => {
        let Player = { ...this.state.Player };
        Player = this.CreateCharacter(Player);
        this.setState({ Player });
    };

    CreateCharacter = Player => {
        if (!Player) {
            Player = { ...Campaign.Player };
        }

        if (Campaign.Player.Race) {
            Player.Race = { ...Campaign.Player.Race };
        } else {
            if (!Player.Race) {
                Player.Race = {
                    ...World.Races[Object.keys(World.Races)[2]],
                    Id: Object.keys(World.Races)[2]
                };
            }
        }

        if (Campaign.Player.Class) {
            Player.Class = { ...Campaign.Player.Class };
        } else {
            if (!Player.Class) {
                Player.Class = {
                    ...World.Classes[Object.keys(World.Classes)[3]],
                    Id: Object.keys(World.Classes)[3]
                };
            }
        }

        // Abilities
        // generate and sort random stats for the player
        let Rolls = [];
        for (
            let i = 0;
            i < World.Classes[Player.Class.Id].AbilityPriorities.length;
            i++
        ) {
            // add a bonus die to the 2 first abilities of non-spell casters
            if (!Player.Class.Spellcaster && i <= 1) {
                Rolls.push(this.GeneratePlayerAbilityScore(true));
            } else {
                Rolls.push(this.GeneratePlayerAbilityScore());
            }
        }
        Rolls = Rolls.sort(function (a, b) {
            return a < b;
        });

        let AbilityScores = {};
        for (
            let i = 0;
            i < World.Classes[Player.Class.Id].AbilityPriorities.length;
            i++
        ) {
            AbilityScores[World.Classes[Player.Class.Id].AbilityPriorities[i]] =
                Rolls[i];
        }

        // if stats were pre-determined for the campaign start, use them instead (weird numbers are handled gracefully)
        Player.Constitution =
            Math.max(
                0,
                Math.min(Campaign.Player.Constitution, Gameplay.MaxAbilityScore)
            ) ||
            AbilityScores.Constitution +
                (Player.Race.AbilityBoost.Constitution || 0);
        Player.Strength =
            Math.max(
                0,
                Math.min(Campaign.Player.Strength, Gameplay.MaxAbilityScore)
            ) ||
            AbilityScores.Strength + (Player.Race.AbilityBoost.Strength || 0);
        Player.Dexterity =
            Math.max(
                0,
                Math.min(Campaign.Player.Dexterity, Gameplay.MaxAbilityScore)
            ) ||
            AbilityScores.Dexterity + (Player.Race.AbilityBoost.Dexterity || 0);
        Player.ArmorClass =
            Math.max(0, Campaign.Player.ArmorClass) ||
            10 + this.AbilityModifier(Player.Dexterity);

        // Vitals
        // the interface will take whatever numbers come from the campaign assets and make sense of them (negative values or maximums greater than the current amount are handled gracefully)
        // Health
        Player.MaxHealth =
            Math.max(0, Campaign.Player.MaxHealth || 0) ||
            this.CalculateMaxHealth(Player);
        Player.Health = Math.max(0, Campaign.Player.Health) || Player.MaxHealth;
        if (Player.MaxHealth < Player.Health) Player.MaxHealth = Player.Health;
        // Stamina
        Player.MaxStamina =
            Math.max(0, Campaign.Player.MaxStamina || 0) ||
            this.CalculateMaxStamina(Player);
        Player.Stamina =
            Math.max(0, Campaign.Player.Stamina) || Player.MaxStamina;
        if (Player.MaxStamina < Player.Stamina)
            Player.MaxStamina = Player.Stamina;
        Player.MaxWeight =
            Campaign.Player.MaxWeight || this.CalculateMaxWeight(Player);

        // Intelligence and Mana
        if (Player.Class.Spellcaster) {
            Player.Intelligence =
                Math.max(
                    0,
                    Math.min(
                        Campaign.Player.Intelligence,
                        Gameplay.MaxAbilityScore
                    )
                ) ||
                AbilityScores.Intelligence +
                    (Player.Race.AbilityBoost.Intelligence || 0);
            Player.MaxMana =
                Math.max(0, Campaign.Player.MaxMana || 0) ||
                this.CalculateMaxMana(Player);
            Player.Mana = Math.max(0, Campaign.Player.Mana) || Player.MaxMana;
            if (Player.MaxMana < Player.Mana) Player.MaxMana = Player.Mana;
        } else {
            Player.MaxMana = Player.Mana = 0;
            Player.Intelligence = 5;
        }

        Player.Abilities = {
            Strength: Player.Strength,
            Constitution: Player.Constitution,
            Dexterity: Player.Dexterity,
            Intelligence: Player.Intelligence
        };

        // Spellbook
        if (!Player.Class.Spellcaster) {
            delete Player.SpellBook;
        } else {
            if (!Player.SpellBook || !Player.SpellBook.Spells) {
                if (
                    Campaign.AvailableStartSpell &&
                    Campaign.AvailableStartSpell.length > 0
                ) {
                    Player.SpellBook = {
                        Spells: [Campaign.AvailableStartSpell[0]]
                    };
                }
            }
        }

        // Check player's start coordinates
        if (!Campaign.Player.x && !Campaign.Player.x) {
            Player.x = 0;
            Player.y = 0;
            console.error(
                'Please make sure to assign starting coordinates to the player.'
            );
        }

        Player.Facing = Campaign.Player.Facing || 'North';
        Player.Level = Campaign.Player.Level || 1;
        Player.XP = Campaign.Player.XP || 0;

        return Player;
    };

    // takes the 3 best rolls out of 4d6
    GeneratePlayerAbilityScore = (AbilityDieBonus = false) => {
        let rolls = [];
        let score = 0;
        for (var i = 1; i <= 4 + AbilityDieBonus; i++) {
            let dieScore = this.RollDice(1, 6);
            rolls.push(dieScore);
            score += dieScore;
        }

        score -= Math.min.apply(null, rolls);

        return score;
    };

    CalculateMaxHealth = Player => {
        // level up
        if (Player.MaxHealth) {
            return Math.ceil(Player.Constitution * 2.5 + Player.Strength / 5);
        }
        // new player
        else {
            return Math.ceil(Player.Constitution * 2.5 + Player.Strength / 5);
        }
    };

    CalculateMaxMana = Player => {
        // level up
        if (Player.MaxMana) {
            return Math.ceil(Player.Intelligence * 1.85);
        }
        // new player
        else {
            return Math.ceil(Player.Intelligence * 1.85);
        }
    };

    CalculateMaxStamina = Player => {
        return Math.ceil(Player.Strength * 5);
    };

    CalculateMaxWeight = Player => {
        // level up
        if (Player.MaxWeight) {
            return Math.ceil(Player.Strength * 1.6);
        }
        // new player
        else {
            return Math.ceil(Player.Strength * 1.6);
        }
    };

    SetRace = RaceObject => {
        let Player = { ...this.state.Player };
        Player.Race = { ...RaceObject };
        Player = this.CreateCharacter(Player);
        this.setState({ Player }, function () {});
    };

    SetClass = ClassObject => {
        let Player = { ...this.state.Player };
        Player.Class = { ...ClassObject };
        Player = this.CreateCharacter(Player);
        this.setState({ Player });
    };

    SetFirstSpell = SpellBook => {
        let Player = { ...this.state.Player };
        Player.SpellBook = SpellBook;
        this.setState({ Player });
    };

    SavePlayerName = input => {
        let Player = { ...this.state.Player };
        Player[input.name] = input.value;
        this.setState({ Player });
    };

    StartPlaying = () => {
        this.setState(
            {
                CreateCharacter: false
            },
            function () {
                // reset the environment
                let State = this.InitGameEnvironment();
                // grab the character that the player just created
                State.Player = { ...this.state.Player };
                // keep the volume at its current level
                State.Sound = { ...this.state.Sound };

                this.setState(State);

                this.CalculateStyles();

                this.forceUpdate();
            }
        );
    };

    ResumeGame = () => {
        let GameInBackground = { ...this.state.GameInBackground };
        this.setState(GameInBackground, function () {
            delete this.state.GameInBackground;
            this.CalculateStyles();
            this.forceUpdate();
        });
    };

    /* Save/Load Game */

    ToggleGameStateBox = Operation => {
        let EditableGameStateBox = this.state.EditableGameStateBox;
        let Visibility = !this.state.ShowGameStateBox;
        let Editable = true;

        // can not modify the game state
        if (Operation === 'Save') {
            Editable = false;
        }

        // user has already clicked the save game button
        if (Operation === 'Save' && !EditableGameStateBox) {
            Visibility = true;
        }

        // user has already clicked the load game button
        if (Operation === 'Save' && EditableGameStateBox) {
            Visibility = true;
            this.UpdateGameStateToLoad('');
        }

        // user has already clicked the save game button
        if (Operation === 'Load' && !EditableGameStateBox) {
            Visibility = true;
        }

        // load the state
        if (Operation === 'Load' && EditableGameStateBox) {
            this.LoadGame(this.state.GameStateToLoad);
            return false;
        }

        // close everything
        if (Operation === 'Cancel') {
            Editable = false;
            Visibility = false;
            this.UpdateGameStateToLoad('');
        }

        this.setState({
            EditableGameStateBox: Editable,
            ShowGameStateBox: Visibility,
            LoadGameError: ''
        });
    };

    UpdateGameStateToLoad = GameState => {
        this.setState({ GameStateToLoad: GameState, LoadGameError: '' });
    };

    LoadGame = () => {
        let GameStateToLoad = this.state.GameStateToLoad;

        try {
            GameStateToLoad = JSON.parse(GameStateToLoad);

            delete this.state;

            this.setState(GameStateToLoad, function () {
                this.CalculateStyles();
            });
        } catch (error) {
            // catch JSON parse error
            if (Debug) console.error('Invalid JSON object.', GameStateToLoad);
            this.setState({
                LoadGameError: Gameplay.Messages.LoadGameError.Invalid
            });
        }
    };

    ShowStats = () => {
        this.setState({
            HideStats: false,
            HideInventory: true,
            HideSpellBook: true
        });
    };

    ShowInventory = () => {
        this.setState({
            HideStats: true,
            HideInventory: false,
            HideSpellBook: true
        });
    };

    ShowSpellBook = () => {
        this.setState({
            HideStats: true,
            HideInventory: true,
            HideSpellBook: false
        });
    };

    /* In-Game Keyboard Shortcuts */

    ListenToKeyboard = keypress => {
        let State = { ...this.state };
        let Player = { ...this.props.Player };
        let Keystrokes = this.state.Keystrokes
            ? [...this.state.Keystrokes]
            : [];

        // do not capture key strokes
        if (Player.Dead) return false;
        if (
            keypress.target.tagName.toLowerCase() === 'textarea' ||
            keypress.target.tagName.toLowerCase() === 'input'
        )
            return false;

        // do not absorb function keys
        if (keypress.key.match(/(F[1-9]|F1[0-2])/) === null) {
            keypress.preventDefault();
        }

        if (Debug) console.log('keypress: ', keypress.key);

        // track subsequent key strokes
        let BreakEvent = false;
        if (Keystrokes) Keystrokes.push(keypress.key);
        else Keystrokes = [keypress.key];
        this.setState({ Keystrokes: Keystrokes }, function () {
            // detect two digit numbers between 01 and 99
            if (this.state.Keystrokes.join('').match(/[0-9][1-9]/) !== null) {
                this.CastSpellFromKeyboard(this.state.Keystrokes.join(''));
                this.FlushKeystrokeHistory();
                BreakEvent = true;
            }

            // detect "B" + two digit numbers between 01 and 99
            if (this.state.Keystrokes.join('').match(/b[0-9][1-9]/) !== null) {
                this.UseItemFromKeyboard(this.state.Keystrokes.join(''));
                this.FlushKeystrokeHistory();
                BreakEvent = true;
            }

            // cheats
            if (this.LookForCheats(this.state.Keystrokes.join(''))) {
                BreakEvent = true;
            }
        });

        if (BreakEvent) return true;

        // in-game single-keypress shortcuts
        switch (keypress.key) {
            default:
                break;

            case 'Escape':
            case 'Enter':
                this.FlushKeystrokeHistory();
                break;

            case 'ArrowDown':
                if (State.CreateCharacter) return false;
                this.MovePlayer('South');
                this.onClickArrow(keypress.key);
                this.FlushKeystrokeHistory();
                break;

            case 'ArrowUp':
                if (State.CreateCharacter) return false;
                this.MovePlayer('North');
                this.onClickArrow(keypress.key);
                this.FlushKeystrokeHistory();
                break;

            case 'ArrowLeft':
                if (State.CreateCharacter) return false;
                this.MovePlayer('West');
                this.onClickArrow(keypress.key);
                this.FlushKeystrokeHistory();
                break;

            case 'ArrowRight':
                if (State.CreateCharacter) return false;
                this.MovePlayer('East');
                this.onClickArrow(keypress.key);
                this.FlushKeystrokeHistory();
                break;

            case '+':
                this.props.dispatch({ type: 'INCREASE_VOLUME' });
                this.PlaySound('sound_control');
                break;

            case '-':
                this.props.dispatch({ type: 'DECREASE_VOLUME' });
                this.PlaySound('sound_control');
                break;

            case 'm':
                this.props.dispatch({ type: 'MUTE_VOLUME' });
                break;

            case 't':
                if (State.CreateCharacter) return false;
                this.TakeAllLoot();
                this.FlushKeystrokeHistory();
                break;
        }
    };

    LookForCheats = (Input, Strict = false) => {
        let Cheat = false;
        let State = { ...this.state };
        let Prefix = 'd!';

        // debug
        if (
            (Strict && Input === Prefix + 'debug') ||
            (!Strict && Input.indexOf('debug') > -1)
        ) {
            Debug = !Debug;
            console.log(
                Debug ? Gameplay.Messages.Debug.On : Gameplay.Messages.Debug.Off
            );
            this.SetText(
                Debug ? Gameplay.Messages.Debug.On : Gameplay.Messages.Debug.Off
            );
            this.FlushKeystrokeHistory();
            Cheat = true;
        }
        if (
            (Strict && Input === Prefix + 'sound') ||
            (!Strict && Input.indexOf('sound') > -1)
        ) {
            SoundDebug = !SoundDebug;
            console.log(
                SoundDebug
                    ? Gameplay.Messages.SoundDebug.On
                    : Gameplay.Messages.SoundDebug.Off
            );
            this.SetText(
                SoundDebug
                    ? Gameplay.Messages.SoundDebug.On
                    : Gameplay.Messages.SoundDebug.Off
            );
            this.FlushKeystrokeHistory();
            Cheat = true;
        }

        // actual cheats
        if (
            (Strict && Input === Prefix + 'showmap') ||
            (!Strict && Input.indexOf('showmap') > -1)
        ) {
            this.setState(
                {
                    ShowFullMap:
                        State.ShowFullMap === undefined
                            ? true
                            : !State.ShowFullMap
                },
                function () {
                    this.SetText(
                        this.state.ShowFullMap
                            ? Gameplay.Messages.Cheats.ShowFullMap.On
                            : Gameplay.Messages.Cheats.ShowFullMap.Off
                    );
                }
            );
            this.FlushKeystrokeHistory();
            Cheat = true;
        }
        if (
            (Strict && Input === Prefix + 'noclip') ||
            (!Strict && Input.indexOf('noclip') > -1)
        ) {
            this.setState(
                { NoClip: State.NoClip === undefined ? true : !State.NoClip },
                function () {
                    this.SetText(
                        this.state.NoClip
                            ? Gameplay.Messages.Cheats.NoClip.On
                            : Gameplay.Messages.Cheats.NoClip.Off
                    );
                }
            );
            this.FlushKeystrokeHistory();
            Cheat = true;
        }
        if (
            (Strict && Input === Prefix + 'god') ||
            (!Strict && Input.indexOf('god') > -1)
        ) {
            this.setState(
                {
                    GodMode: State.GodMode === undefined ? true : !State.GodMode
                },
                function () {
                    this.SetText(
                        this.state.GodMode
                            ? Gameplay.Messages.Cheats.GodMode.On
                            : Gameplay.Messages.Cheats.GodMode.Off
                    );
                }
            );
            this.FlushKeystrokeHistory();
            Cheat = true;
        }
        if (
            (Strict && Input === Prefix + 'spell') ||
            (!Strict && Input.indexOf('spell') > -1)
        ) {
            if (State.CreateCharacter) return false;
            this.setState(
                {
                    CastAlwaysSucceeds:
                        State.CastAlwaysSucceeds === undefined
                            ? true
                            : !State.CastAlwaysSucceeds
                },
                function () {
                    this.SetText(
                        this.state.CastAlwaysSucceeds
                            ? Gameplay.Messages.Cheats.CastAlwaysSucceeds.On
                            : Gameplay.Messages.Cheats.CastAlwaysSucceeds.Off
                    );
                }
            );
            this.FlushKeystrokeHistory();
            Cheat = true;
        }

        return Cheat;
    };

    FlushKeystrokeHistory = () => {
        this.setState({ Keystrokes: [] });
    };

    PlaySound = (SoundName, Precedence) => {
        let Sound = { ...this.props.Sound };

        if (!Object.getOwnPropertyNames(Sound).length || Sound.Volume === 0)
            return false;

        const SoundFileExtensions = ['.wav', /*".mp3",*/ '.ogg'];
        const SoundFileFolders = ['', SoundName + '/'];

        let SoundPlaying = false;
        let CountTest = 0;
        let CountErrors = 0;
        let MaxErrorCount =
            SoundFileFolders.length * SoundFileExtensions.length +
            (SoundFileFolders.length - 1) *
                SoundFileExtensions.length *
                Utilities.MaxSoundFilesPerFolder;

        let SoundArray = [];

        let AudioObject = new Audio();

        /* Function to handle single sound */
        let PlaySingleFile = function (AudObj) {
            AudioObject.play()
                .then(function () {
                    if (SoundDebug) {
                        // this.props.SetText("Sound played:", AudObj.src)
                        console.log('Played:', AudObj.src);
                    }

                    AudObj.volume = Sound.Volume;
                    SoundPlaying = true;
                })
                .catch(function () {
                    CountErrors++;

                    // did not find a sound file that matches any extension
                    if (CountErrors === MaxErrorCount) {
                        console.error(
                            ["Sound '", SoundName, "' not found."].join('')
                        );
                    }
                });
        };

        /* Functions to handle random sound selection */
        // on error
        let SoundFileDoesNotExist = function () {
            CountErrors++;
            CountTest++;

            if (CountErrors === MaxErrorCount) {
                console.error(["Sound '", SoundName, "' not found."].join(''));
            }
        };
        // on loaded data
        var that = this;
        let SoundFileExists = function (AudObj, i, x, p) {
            AudObj.onloadeddata = function () {
                if (SoundPlaying) {
                    console.warn(
                        [
                            `Warning: Sound files for the '`,
                            SoundName,
                            `' event were both found in the 'sounds/' folder and in the 'sounds/`,
                            SoundName + '/',
                            `' subfolder.
              \nIf you want to play a randomly selected sound when this event occur, keep the 'sounds/`,
                            SoundName + '/',
                            `' subfolder and delete the '`,
                            SoundName,
                            `' file at the root of the 'sounds/' folder.
              \nIf you want to play the exact same sound every time, delete the 'sounds/`,
                            SoundName + '/',
                            `' subfolder and keep the '`,
                            SoundName,
                            `' file at the root of the 'sounds/' folder.`
                        ].join('')
                    );
                    return null;
                }

                CountTest++;

                SoundArray.push(
                    './sounds/' +
                        SoundFileFolders[i] +
                        SoundName +
                        (p || '') +
                        SoundFileExtensions[x]
                );

                if (CountTest === MaxErrorCount) {
                    let SelectedSound =
                        SoundArray[that.RandomInteger(SoundArray.length)];

                    AudObj = new Audio(SelectedSound);

                    if (SoundDebug)
                        console.log('Random sound options:', SoundArray);

                    AudObj.play()
                        .then(function () {
                            if (SoundDebug) {
                                console.log('Played:', AudObj.src);
                            }

                            AudObj.volume = Sound.Volume;
                            SoundPlaying = true;
                        })
                        .catch(function () {
                            console.error(
                                ["Could not play '", SelectedSound, "'."].join(
                                    ''
                                )
                            );
                        });
                }
            };
        };

        /* Find audio file */
        // Inspect folders
        for (let i = 0; i < SoundFileFolders.length; i++) {
            // Inspect file extensions
            for (let x = 0; x < SoundFileExtensions.length; x++) {
                // Inspect subfolders
                if (SoundFileFolders[i] !== '') {
                    // Try numbered file names (e.g.: /drink_potion/drink_potion1.wav)
                    for (
                        let p = 0;
                        p <= Utilities.MaxSoundFilesPerFolder;
                        p++
                    ) {
                        if (SoundDebug)
                            console.log(
                                'Inspecting:',
                                './sounds/' +
                                    SoundFileFolders[i] +
                                    SoundName +
                                    (p || '') +
                                    SoundFileExtensions[x]
                            );

                        AudioObject = new Audio(
                            './sounds/' +
                                SoundFileFolders[i] +
                                SoundName +
                                (p || '') +
                                SoundFileExtensions[x]
                        );

                        AudioObject.onerror = SoundFileDoesNotExist;

                        SoundFileExists(AudioObject, i, x, p);

                        if (SoundPlaying) {
                            break;
                        }
                    }
                }

                // Inspect root folder
                else {
                    CountTest++;

                    if (SoundDebug)
                        console.log(
                            'Inspecting:',
                            './sounds/' + SoundName + SoundFileExtensions[x]
                        );

                    AudioObject = new Audio(
                        './sounds/' + SoundName + SoundFileExtensions[x]
                    );

                    PlaySingleFile(AudioObject);
                }

                if (SoundPlaying) {
                    console.log('BREAK');
                    break;
                }
            }

            if (SoundPlaying) {
                break;
            }
        }

        this.setState({ Sound: Sound });
    };

    RandomDirection = array => {
        array = array.filter(HorizontalLine => HorizontalLine.length > 0);

        let randomY = Math.floor(Math.random() * array.length);
        let randomX = Math.floor(Math.random() * array[randomY].length);
        return array[randomY][randomX];
    };

    RandomIntegerFromRange = (min, max) => {
        return (
            Math.floor(
                Math.random() * (Math.floor(max) - Math.floor(min) + 1)
            ) + Math.floor(min)
        );
    };

    RandomInteger = (max = 100) => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    RollD20 = () => {
        return this.RandomIntegerFromRange(1, 20);
    };

    RollDice = (dice, sides) => {
        let result = 0;
        for (let i = 1; i <= dice; i++) {
            result += this.RandomIntegerFromRange(1, sides);
        }
        return result;
    };

    AbilityModifier = Ability => {
        if (Ability <= 1) {
            return -5;
        }
        if (Ability <= 3) {
            return -4;
        }
        if (Ability <= 5) {
            return -3;
        }
        if (Ability <= 7) {
            return -2;
        }
        if (Ability <= 9) {
            return -1;
        }
        if (Ability <= 11) {
            return 0;
        }
        if (Ability <= 13) {
            return 1;
        }
        if (Ability <= 15) {
            return 2;
        }
        if (Ability <= 17) {
            return 3;
        }
        if (Ability <= 19) {
            return 4;
        }
        if (Ability <= 21) {
            return 5;
        }
        if (Ability <= 23) {
            return 6;
        }
        if (Ability <= 25) {
            return 7;
        }
        if (Ability <= 27) {
            return 8;
        }
        if (Ability <= 29) {
            return 9;
        }
        return 10;
    };

    GetUnlucky = Luck => {
        return this.RandomInteger() + Luck <= 60;
    };

    SetMessage = Message => {
        if (Message) {
            this.setState({ currentMessage: Message });
        }
    };

    SetText = (Message = '', Image = null) => {
        if (Message || Image) {
            let EventLogEntries = [...this.state.EventLog];
            let GameStarted = this.state.GameStarted.Milliseconds;

            if (!EventLogEntries) {
                EventLogEntries = [];
            }

            if (Array.isArray(Message)) {
                let Messages = [...Message];
                EventLogEntries = [
                    ...EventLogEntries,
                    ...Messages.map(Msg => {
                        return [
                            this.GenerateFormattedTime(
                                Date.now() - GameStarted
                            ),
                            Msg
                        ].join(': ');
                    })
                ];
            } else {
                EventLogEntries.push(
                    [
                        this.GenerateFormattedTime(Date.now() - GameStarted),
                        Message
                    ].join(': ')
                );
            }

            // FIXME: It looks like sometimes setState is not called when the event log get updated with multiple messages in separate functions.

            this.setState({ EventLog: EventLogEntries }, function () {
                this.ScrollToBottom('EventLog');
                let { EnterCustomLogEntry } = this.state;
                if (EnterCustomLogEntry) {
                    this.setState({
                        EnterCustomLogEntry: false,
                        CustomLogEntry: ''
                    });
                }
            });
        }
    };

    ScrollToBottom = ElementId => {
        if (document.getElementById(ElementId)) {
            let HtmlElement = document.getElementById(ElementId);
            HtmlElement.scrollTop = HtmlElement.scrollHeight;
        }
    };

    ScrollToTop = ElementId => {
        console.log('go');
        if (document.getElementById(ElementId)) {
            let HtmlElement = document.getElementById(ElementId);
            HtmlElement.scrollTop = 0;
        }
    };

    Scroll = (ElementId, Direction) => {
        if (document.getElementById(ElementId)) {
            let HtmlElement = document.getElementById(ElementId);
            HtmlElement.scrollTop =
                HtmlElement.scrollTop +
                HtmlElement.clientHeight * Direction -
                (18 + Direction) * Direction;
        }
    };

    ClearLog = () => {
        this.setState({
            EventLog: [],
            EnterCustomLogEntry: false,
            CustomLogEntry: ''
        });
    };

    DisplayCustomLogEntryInput = input => {
        let {
            EnterCustomLogEntry,
            CustomLogEntry,
            CustomLogEntryInputRecentlyClosed
        } = this.state;

        if (!EnterCustomLogEntry && !CustomLogEntryInputRecentlyClosed) {
            this.setState({ EnterCustomLogEntry: true }, function () {
                this.ScrollToBottom('EventLog');
            });
        }
        if (CustomLogEntryInputRecentlyClosed) {
            this.setState({ CustomLogEntryInputRecentlyClosed: false });
        }
        if (EnterCustomLogEntry && (CustomLogEntry === '' || !CustomLogEntry)) {
            if (input.target.name !== 'CustomLogEntry') {
                this.setState({ EnterCustomLogEntry: false });
            }
        }
    };

    StoreCustomLogEntryInput = LogEntry => {
        this.setState({ CustomLogEntry: LogEntry.value });
    };

    SaveCustomLogEntryInput = input => {
        let NewLogEntry = this.state.CustomLogEntry;
        this.SetText(NewLogEntry);
        this.LookForCheats(NewLogEntry, true);
        if (this.state.EnterCustomLogEntry) {
            this.setState({
                EnterCustomLogEntry: false,
                CustomLogEntry: '',
                CustomLogEntryInputRecentlyClosed: true
            });
        }
    };

    onClickArrow = key => {
        let arrowStyle = {};
        arrowStyle[key] = Styles.ArrowBlockClick;
        this.setState({ arrowStyle }, function () {
            this.ResetArrowStyle();
        });
    };

    ResetArrowStyle = () => {
        if (this.state.arrowStyle !== null) {
            setTimeout(
                function () {
                    this.setState({ arrowStyle: null });
                }.bind(this),
                50
            );
        }
    };

    UpdateText = ({ x, y }) => {
        let currentText = this.state.currentText;
        let currentTextImage = this.state.currentTextImage;
        let StoryTexts = [...this.state.Texts];

        let matchTextAccessPoint = false;

        if (StoryTexts) {
            StoryTexts.map((text, index) => {
                if (text.Used) return null;
                return !text.accessPoints
                    ? null
                    : text.accessPoints.filter(accessPoint => {
                          if (accessPoint.x === x && accessPoint.y === y) {
                              matchTextAccessPoint = true;
                              currentText = text.text;
                              currentTextImage = text.image || null;
                              StoryTexts[index].Used = true;
                              return true;
                          } else {
                              return false;
                          }
                      });
            });

            if (currentText !== this.state.currentText) {
                this.ScrollToTop('Story');
            }

            this.setState({
                currentText: currentText,
                currentTextImage: currentTextImage,
                Text: StoryTexts
            });
        }

        return matchTextAccessPoint;
    };

    AbilityCheck = (AbilityScore, Modifier) => {
        if (
            this.RandomInteger() >=
            100 -
                (AbilityScore / Gameplay.MaxAbilityScore) * 100 -
                (Modifier || 0)
        ) {
            return true;
        }

        return false;
    };

    FindMonsterById = MonsterId => {
        // let {Monsters} = this.state
        let Monsters = Object.assign([], this.state.Monsters);

        return Monsters.filter(Monster => {
            return Monster.Id === MonsterId;
        });
    };

    FindSingleMonsterInSurroundings = Actor => {
        // let {MonsterMap} = this.state
        let MonsterMap = Object.assign([], this.state.MonsterMap);

        let Targets = []
            .concat(
                MonsterMap[Actor.y - 1].slice(Actor.x - 1, Actor.x + 2),
                MonsterMap[Actor.y].slice(Actor.x - 1, Actor.x + 2),
                MonsterMap[Actor.y + 1].slice(Actor.x - 1, Actor.x + 2)
            )
            .filter(MapObject => {
                return MapObject !== Empty;
            });

        if (Targets.length > 0) {
            return this.FindMonsterById(Targets[0]);
        }

        return false;
    };

    CastSpellFromKeyboard = SpellNumber => {
        let Player = { ...this.state.Player };

        if (!Player.Class.Spellcaster || !Player.SpellBook) return false;

        let FindSpell = Player.SpellBook.Spells.filter((Item, index) => {
            if (index === Number(SpellNumber - 1)) {
                return true;
            }
            return false;
        });

        if (!FindSpell.length) return false;

        this.CastSpell(FindSpell[0]);
    };

    CastSpell = (Spell, Caster) => {
        let Player = { ...this.props.Player };
        let Monsters = [...this.state.Monsters];
        let MonsterMap = [...this.state.MonsterMap];
        let Turn = this.state.Turn;
        let CastAlwaysSucceeds = this.state.CastAlwaysSucceeds;

        let CasterIsPlayer = false;
        let UpdateEventLog = true;

        if (!Caster) {
            Caster = Player;
            CasterIsPlayer = true;

            if (Player.Dead) return false;
        }

        // enough mana
        if (!Spell.ManaCost || Caster.Mana >= Spell.ManaCost) {
            // not enough XP
            if (Spell.Level > Caster.Level) {
                if (CasterIsPlayer) {
                    this.SetText(Gameplay.Messages.Spell.UnsufficientLevel);
                }

                return false;
            }

            // ability score spell-level modifier
            let Modifier = 0;
            if (Caster.Intelligence <= 5) {
                this.SetText(Gameplay.Messages.Spell.CanNotCast);
                return false;
            } else if (Caster.Intelligence <= 10) {
                Modifier = Utilities.MaxSpellLevel / Spell.Level / 4;
            } else {
                Modifier = Utilities.MaxSpellLevel / Spell.Level;
            }

            // attempt to cast the spell
            if (
                this.AbilityCheck(Caster.Intelligence, Modifier) ||
                CastAlwaysSucceeds
            ) {
                if (Spell.Sound) {
                    this.PlaySound(Spell.Sound);
                }

                // Heal
                if (Spell.Type === 'Heal') {
                    Caster[Spell.Heal.Property] += Math.min(
                        this.RandomIntegerFromRange(
                            Spell.Heal.Min,
                            Spell.Heal.Max
                        ),
                        Caster['Max' + Spell.Heal.Property]
                    );
                }

                // Attack
                else if (Spell.Type === 'Attack') {
                    // Default Target: whatever monster is in front of the caster
                    // and Adjacent Targets: whatever monster is in front of the caster and then an monster adjacent to this monster (and so on, until the max number of targets is reached)
                    if (!Spell.Target || Spell.Target === 'Adjacent') {
                        let targetCoordinates = {
                            x:
                                Caster.x +
                                Utilities.DirectionsOffset[Caster.Facing].x,
                            y:
                                Caster.y +
                                Utilities.DirectionsOffset[Caster.Facing].y
                        };

                        // find target
                        let TargetMonster = Monsters.filter(
                            (Monster, index) => {
                                if (
                                    Monster.x === targetCoordinates.x &&
                                    Monster.y === targetCoordinates.y
                                ) {
                                    return true;
                                }
                                return false;
                            }
                        );

                        if (TargetMonster.length === 0) {
                            if (CasterIsPlayer) {
                                this.SetText(Gameplay.Messages.Spell.NoTarget);
                                UpdateEventLog = false;
                            }
                        } else {
                            let Damage = this.RandomIntegerFromRange(
                                Spell.Damage.Min,
                                Spell.Damage.Max
                            );

                            if (
                                !this.MonsterTakeDamage(
                                    TargetMonster[0],
                                    Damage
                                )
                            ) {
                            }

                            if (Spell.Vampiric) {
                                Caster.Health += Damage;
                            }

                            // adjacent-spell only
                            if (Spell.Target === 'Adjacent') {
                                if (Spell.MaxTargets) {
                                    let MonsterInCenter = TargetMonster[0];
                                    let TargetHit = 0;

                                    while (
                                        TargetHit < Spell.MaxTargets - 1 &&
                                        MonsterInCenter
                                    ) {
                                        let Target = this.FindSingleMonsterInSurroundings(
                                            MonsterInCenter
                                        );

                                        console.log(
                                            'target hit:',
                                            TargetHit,
                                            '\nmonster in center:',
                                            MonsterInCenter,
                                            '\nnew target:',
                                            Target
                                        );

                                        if (Target) {
                                            this.MonsterTakeDamage(
                                                Target[0],
                                                this.RandomIntegerFromRange(
                                                    Spell.Damage.Min,
                                                    Spell.Damage.Max
                                                )
                                            );

                                            TargetHit++;
                                        }

                                        MonsterInCenter = Target[0];
                                    }
                                }
                            }
                        }
                    }

                    // Target Area: whatever monsters are surrounding the caster (until the maximum number of targets has been reached)
                    else if (Spell.Target === 'Surrounding') {
                        let Targets = []
                            .concat(
                                MonsterMap[Caster.y - 1].slice(
                                    Caster.x - 1,
                                    Caster.x + 2
                                ),
                                MonsterMap[Caster.y].slice(
                                    Caster.x - 1,
                                    Caster.x + 2
                                ),
                                MonsterMap[Caster.y + 1].slice(
                                    Caster.x - 1,
                                    Caster.x + 2
                                )
                            )
                            .filter(MapObject => {
                                return MapObject !== Empty;
                            });

                        let TargetHit = 0;

                        while (
                            TargetHit <
                            Math.min(Spell.MaxTargets || 8, Targets.length)
                        ) {
                            let Target = this.FindMonsterById(
                                Targets[TargetHit]
                            );

                            this.MonsterTakeDamage(
                                Target[0],
                                this.RandomIntegerFromRange(
                                    Spell.Damage.Min,
                                    Spell.Damage.Max
                                )
                            );

                            TargetHit++;
                        }

                        if (TargetHit === 0) {
                            if (CasterIsPlayer) {
                                this.SetText(
                                    Gameplay.Messages.Spell.NoTargetArea
                                );
                            }
                        }
                    }
                }

                // update player state and message
                if (CasterIsPlayer) {
                    Turn++;
                    Caster.Stamina--;
                    Caster.Mana -= Spell.ManaCost || 0;
                    Caster.SpellActionUsed = true;

                    if (UpdateEventLog) {
                        this.SetText(
                            Gameplay.PartialMessages.SpellSuccess +
                                Spell.Name +
                                Gameplay.PartialMessages.Period
                        );
                    }

                    this.setState(
                        {
                            Player: Caster,
                            Turn: Turn
                        },
                        function () {
                            this.MoveMonsters();
                        }
                    );
                    this.props.dispatch({
                        type: 'UPDATE_PLAYER',
                        Player: Caster
                    });
                }

                return true;
            }
            // cast failed
            else {
                this.PlaySound('spell_failed');

                if (CasterIsPlayer) {
                    Caster.Mana -= Spell.ManaCost || 0;
                    this.setState({ Player: Caster });
                    this.props.dispatch({
                        type: 'UPDATE_PLAYER',
                        Player: Caster
                    });

                    this.SetText(
                        Gameplay.Messages.Spell.Failed[
                            this.RandomInteger(
                                Gameplay.Messages.Spell.Failed.length
                            )
                        ]
                    );
                }
            }
        }
        // caster does not have required mana amount
        else {
            if (CasterIsPlayer) {
                this.SetText(
                    Gameplay.Messages.Spell.NotEnoughMana[
                        this.RandomInteger(
                            Gameplay.Messages.Spell.NotEnoughMana.length
                        )
                    ]
                );
            }
        }

        return false;
    };

    MovePlayer = Direction => {
        let Player = { ...this.props.Player };
        let WallMap = [...this.state.WallMap];
        let MonsterMap = [...this.state.MonsterMap];
        let NoClip = this.state.NoClip;

        let FullStateUpdate = true;

        if (Player.Dead) return false;

        // get the target coordinates
        let targetCoordinates = this.MoveObject(
            { x: Player.x, y: Player.y },
            Direction
        );

        // out of range
        if (
            targetCoordinates.y > WallMap.length - 1 ||
            targetCoordinates.y < 0 ||
            targetCoordinates.x > WallMap[targetCoordinates.y].length - 1 ||
            targetCoordinates.x < 0
        ) {
            this.SetText(Gameplay.Messages.Collision);
            this.PlaySound('cant_go_there');

            return;
        }

        // check if there is a locked door in the way
        let Door = this.CheckLockedDoors(targetCoordinates);
        if (Door.Locked && !NoClip) {
            let LockedDoor = this.UnlockDoor(Door.Object);
            if (LockedDoor.Unlocked) {
                let UnlockMessage =
                    Gameplay.PartialMessages.UnlockDoor +
                    LockedDoor.Key +
                    Gameplay.PartialMessages.Period;
                this.setState({
                    currentText: UnlockMessage,
                    currentTextImage: null
                });
            } else {
                this.setState({
                    currentText: Gameplay.Messages.LockedDoor,
                    currentTextImage: null
                });
                return;
            }
        }

        // player is attacking a monster
        if (MonsterMap[targetCoordinates.y][targetCoordinates.x] !== Empty) {
            FullStateUpdate = false;
            this.AttackMonster(targetCoordinates);
            // player is not moving
            targetCoordinates.x = Player.x;
            targetCoordinates.y = Player.y;
        } else {
            // the player can not go there (there is a wall/door in the way)
            if (!this.DetectCollision(targetCoordinates)) {
                this.SetText(Gameplay.Messages.Collision);
                this.PlaySound('cant_go_there');

                return;
            }
        }

        // the monsters get to move now
        this.MoveMonsters(targetCoordinates);

        // wake up any monster in the vicinity of the player
        this.WakeUpMonster(targetCoordinates);

        // let {Turn, DiscoveryMap, currentEvent, currentText, currentTextImage} = this.state
        let Turn = this.state.Turn;
        let DiscoveryMap = Object.assign([], this.state.DiscoveryMap);
        let currentEvent = Object.assign([], this.state.currentEvent);
        let currentText = this.state.currentText;
        let currentTextImage = this.state.currentTextImage;

        // update the state partially
        Player.Facing = Direction;

        // update various parts of the state
        if (FullStateUpdate) {
            // update which parts of the map were revealed
            DiscoveryMap = this.UpdateDiscoveryMap(targetCoordinates);

            // add loot containers to the list of events if applicable
            currentEvent = this.CheckLootContainers(targetCoordinates);

            // reset messages when an event occur (loot container)
            if (currentEvent.length > 0) {
                currentText = '';
                currentTextImage = null;
            }

            // save the new coordinates
            Player.x = targetCoordinates.x;
            Player.y = targetCoordinates.y;

            Player.Stationary = false;
        }

        // update player stats
        if (Player.Stamina > 1) {
            Player.Stamina--;
        }

        // add 1 turn to the game state
        Turn++;

        // catch up with other state mutations
        let PlayerCoordinates = { x: Player.x, y: Player.y };
        if (Player !== this.state.Player) {
            let NewPlayerState = this.state.Player;
            if (NewPlayerState.Health !== Player.Health) {
                Player.Health = NewPlayerState.Health;
                Player.Dead = NewPlayerState.Dead;
            }

            // keep the coordinates
            Player.x = PlayerCoordinates.x;
            Player.y = PlayerCoordinates.y;
        }

        this.setState({
            Player,
            Turn,
            currentEvent,
            currentText,
            currentTextImage,
            DiscoveryMap
        });

        // update story text
        this.UpdateText(targetCoordinates);
    };

    MoveObject = (originalCoordinates, Direction) => {
        // grab the object's current position
        let targetCoordinates = {
            x: originalCoordinates.x,
            y: originalCoordinates.y
        };

        // calculate target coordinates
        if (Direction === 'West') {
            targetCoordinates.x -= 1;
        }
        if (Direction === 'East') {
            targetCoordinates.x += 1;
        }
        if (Direction === 'North') {
            targetCoordinates.y -= 1;
        }
        if (Direction === 'South') {
            targetCoordinates.y += 1;
        }

        return targetCoordinates;
    };

    DetectCollision = ({ x, y }) => {
        // let {WallMap, MonsterMap, NoClip} = this.state
        let WallMap = Object.assign([], this.state.WallMap);
        let MonsterMap = Object.assign([], this.state.MonsterMap);
        let NoClip = this.state.NoClip;

        if (NoClip) {
            return true;
        }

        // can not get out of the map boundaries
        if (y < 0 || x < 0 || y >= WallMap.length || x >= WallMap[y].length) {
            return false;
        }

        // target is a monster
        if (MonsterMap[y][x] !== Empty) {
            return false;
        }

        // target is empty or non-blocking
        if (WallMap[y][x] === Empty) {
            return true;
        }

        // target is a door
        if (WallMap[y][x] === Door) {
            // check if the door is locked
            let Door = this.CheckLockedDoors({ x, y });
            if (Door.Locked) {
                return false;
            } else {
                return true;
            }
        }

        return false;
    };

    UpdateDiscoveryMap = ({ x, y }) => {
        // let {DiscoveryMap} = this.state
        let DiscoveryMap = Object.assign([], this.state.DiscoveryMap);

        let NewDiscoveryMap = DiscoveryMap.map((HorizontalLine, MapY) => {
            return HorizontalLine.map((MapObject, MapX) => {
                if (
                    MapY >= y - 1 &&
                    MapY <= y + 1 &&
                    MapX >= x - 1 &&
                    MapX <= x + 1
                ) {
                    return Empty;
                } else {
                    return MapObject;
                }
            });
        });

        return NewDiscoveryMap;
    };

    CheckLockedDoors = ({ x, y }) => {
        // let {LockedDoors} = this.state
        let LockedDoors = Object.assign([], this.state.LockedDoors);

        if (LockedDoors) {
            let matchLockedDoor = LockedDoors.filter(object => {
                return object.x === x && object.y === y && !object.Unlocked;
            });

            return {
                Locked: matchLockedDoor.length > 0,
                Object: matchLockedDoor.length > 0 ? matchLockedDoor[0] : null
            };
        }

        return {
            Locked: false,
            Object: null
        };
    };

    UnlockDoor = Door => {
        // let {Backpack} = this.state
        let Backpack = Object.assign({}, this.state.Backpack);

        let matchKey = Backpack.Items.filter(Item => {
            return Item.DoorId === Door.Id;
        });

        if (matchKey.length > 0) {
            Door.Unlocked = true;
            this.setState({ Backpack: Backpack });
        }

        return {
            Unlocked: matchKey.length > 0,
            Key: matchKey.length > 0 ? matchKey[0].Name : null
        };
    };

    CheckLootContainers = ({ x, y }) => {
        let LootContainers = [...this.state.LootContainers];

        if (LootContainers) {
            let matchLootContainer = LootContainers.filter(object => {
                if (object.items) {
                    object.items = object.items
                        .map(item => {
                            return this.GenerateRandomLoot(item);
                        })
                        .filter(item => {
                            return item !== null;
                        });
                }
                return object.x === x && object.y === y;
            });

            matchLootContainer = matchLootContainer.map(loot => {
                loot.eventType = 'loot';
                return loot;
            });

            return matchLootContainer;
        }

        return [];
    };

    GenerateRandomLoot = item => {
        // let {RandomItems} = this.state
        let RandomItems = Object.assign({}, this.state.RandomItems);

        if (item && item.random) {
            if (!this.GetUnlucky(10)) {
                item =
                    RandomItems['Level' + item.Level][
                        this.RandomIntegerFromRange(
                            0,
                            RandomItems['Level' + item.Level].length - 1
                        )
                    ];
            } else {
                return null;
            }
        }
        return item;
    };

    TakeAllLoot = () => {
        if (!this.state.currentEvent) return false;

        let currentEvent = [...this.state.currentEvent];

        if (currentEvent.length === 0) return false;

        let Player = { ...this.props.Player };
        let Backpack = { ...this.state.Backpack };

        if (Player.Dead) return false;

        let loot = [];
        let LootCount = 0;
        let FreeSlots =
            Backpack.maxItems - (Backpack.Items ? Backpack.Items.length : 0);

        let LootEvents = currentEvent.filter(event => {
            if (event.eventType === 'loot') {
                if (event.items) {
                    LootCount += event.items.length;
                    return true;
                }
            }
            return false;
        });

        if (LootEvents.length === 0) return false;

        LootEvents.map(event => {
            if (event.eventType === 'loot') {
                if (event.items) {
                    loot = loot.concat(event.items);
                }
            }
            return null;
        });

        if (FreeSlots >= LootCount && loot.length > 0) {
            if (this.CheckInventoryWeight(loot)) {
                currentEvent.map(event => {
                    if (event.eventType === 'loot') {
                        if (event.items) {
                            event.items = [];
                        }
                    }
                    return null;
                });

                Backpack.Items = Backpack.Items
                    ? Backpack.Items.concat(loot)
                    : [...loot];
                Backpack.Weight = this.CheckInventoryWeight(loot, true);
                Player.Stationary = true;

                this.setState({ Backpack, Player });

                this.SetText(Gameplay.Messages.Loot.Gathered);
                this.PlaySound('take_loot');
            } else {
                this.SetText(Gameplay.Messages.Loot.TooHeavy);
            }
        } else if (loot.length > 0) {
            this.SetText(Gameplay.Messages.Loot.TooMuch);
        }
    };

    TakeSingleLoot = (lootIndex, containerId) => {
        let LootContainers = [...this.state.LootContainers];
        let Backpack = { ...this.props.Player.Backpack };
        let Player = { ...this.props.Player };

        if (Player.Dead) return false;

        let FreeSlots =
            Backpack.maxItems - (Backpack.Items ? Backpack.Items.length : 0);

        let matchLootContainer = LootContainers.filter(lootContainer => {
            return lootContainer.Id === containerId;
        })[0];

        if (FreeSlots > 0) {
            if (
                this.CheckInventoryWeight([matchLootContainer.items[lootIndex]])
            ) {
                if (Backpack.Items) {
                    Backpack.Items.push(matchLootContainer.items[lootIndex]);
                } else {
                    Backpack.Items = [];
                    Backpack.Items.push(matchLootContainer.items[lootIndex]);
                }

                Backpack.Weight = this.CheckInventoryWeight(
                    matchLootContainer.items[lootIndex],
                    true
                );

                this.setState({ Backpack: Backpack }, function () {
                    matchLootContainer.items.splice(lootIndex, 1);
                    Player.Stationary = true;
                    this.setState({
                        currentEvent: this.state.currentEvent,
                        Player
                    });
                });
            } else {
                this.SetText(Gameplay.Messages.Loot.ItemTooHeavy);
            }
        } else {
            this.SetText(Gameplay.Messages.Loot.BackpackFull);
        }
    };

    DropItem = () => {
        console.log('drop');
    };

    CheckInventoryWeight = (Loot, Save) => {
        // let {Backpack, Player} = this.state
        let Backpack = Object.assign({}, this.state.Backpack);
        let Player = Object.assign({}, this.state.Player);

        let BackpackWeight = 0;

        if (Backpack.Items && Backpack.Items.length > 0) {
            BackpackWeight = Backpack.Items.map(Item => {
                return Item !== null ? Item.Weight || 0 : 0;
            }).reduce((sum, val) => sum + val);
        } else {
            BackpackWeight = 0;
        }

        if (Loot && Loot.length > 0) {
            let LootWeight = Loot.map(Item => {
                return Item !== null ? Item.Weight || 0 : 0;
            }).reduce((sum, val) => sum + val);

            BackpackWeight += LootWeight;
        }

        if (BackpackWeight <= Player.MaxWeight) {
            if (Save) {
                return BackpackWeight;
            }
            return true;
        }

        return false;
    };

    CheckInventoryWeightAtStartUp = Backpack => {
        let BackpackWeight = 0;

        if (Backpack.Items && Backpack.Items.length > 0) {
            BackpackWeight = Backpack.Items.map(Item => {
                return Item !== null ? Item.Weight || 0 : 0;
            }).reduce((sum, val) => sum + val);
        } else {
            BackpackWeight = 0;
        }

        Backpack.Weight = BackpackWeight;

        return Backpack;
    };

    WakeUpMonster = ({ x, y }) => {
        let Monsters = [...this.state.Monsters];
        let PlaySound = false;

        if (Monsters) {
            let MonsterList = Monsters.map(Monster => {
                if (
                    Monster.x >= x - 1 &&
                    Monster.x <= x + 1 &&
                    Monster.y >= y - 1 &&
                    Monster.y <= y + 1 &&
                    !Monster.ChasePlayer
                ) {
                    PlaySound = true;

                    Monster.ChasePlayer = true;
                    Monster.Stationary = false;
                    this.SetText(
                        Functions.IndefiniteArticle(Monster.Name, true) +
                            ' ' +
                            Monster.Name +
                            Gameplay.PartialMessages.MonsterNoticed
                    );
                }
                return Monster;
            });

            this.setState({ Monsters: MonsterList });

            if (PlaySound) {
                this.PlaySound('player_noticed');
            }
        }
    };

    MoveMonsters = PlayerNewCoordinates => {
        let Monsters = [...this.state.Monsters];
        let Player = { ...this.state.Player };

        if (Monsters) {
            let MovingMonsters = Monsters.filter(Monster => {
                return (
                    !Monster.Dead &&
                    (Monster.ChasePlayer || !Monster.Stationary)
                );
            });

            MovingMonsters.map(Monster => {
                if (Monster.ChasePlayer) {
                    return this.ChasePlayer(
                        Monster,
                        PlayerNewCoordinates || { x: Player.x, y: Player.y }
                    );
                } else {
                    return this.Patrol(Monster);
                }
            });
        }
    };

    Patrol = Monster => {
        // let {MonsterMap} = this.state
        let MonsterMap = Object.assign([], this.state.MonsterMap);

        let Surroundings = this.GetSurroundingWalls({
            x: Monster.x,
            y: Monster.y
        });

        // indicate coordinates in the array
        Surroundings = Surroundings.map((HorizontalLine, y) => {
            return HorizontalLine.map((MapObject, x) => {
                if (MapObject === Empty) {
                    // do not let monsters move diagonally
                    if (
                        (x === 0 && y === 0) ||
                        (x === 2 && y === 2) ||
                        (x === 2 && y === 0) ||
                        (x === 0 && y === 2)
                    ) {
                        return Wall;
                    }
                    return { x: x - 1, y: y - 1 };
                } else {
                    return MapObject;
                }
            });
        });

        // filter out walls and doors to only give valid choices
        Surroundings = Surroundings.map((HorizontalLine, y) => {
            return HorizontalLine.filter(x => {
                return x !== Wall && x !== Door;
            });
        });

        let Direction = this.RandomDirection(Surroundings);

        MonsterMap[Monster.y][Monster.x] = Empty;
        MonsterMap[Monster.y + Direction.y][Monster.x + Direction.x] =
            Monster.Id;

        Monster.x = Monster.x + Direction.x;
        Monster.y = Monster.y + Direction.y;

        return Monster;
    };

    ChasePlayer = (Monster, PlayerNewCoordinates) => {
        let MonsterMap = [...this.state.MonsterMap];
        let Monsters = [...this.state.Monsters];
        let WallMap = [...this.state.WallMap];

        let originalMonsterCoordinates = { x: Monster.x, y: Monster.y };
        let HorizontalDistance = PlayerNewCoordinates.x - Monster.x;
        let VerticalDistance = PlayerNewCoordinates.y - Monster.y;

        let index = null;
        Monsters.filter((Monst, i) => {
            if (Monst.Id === Monster.Id) {
                index = i;
                return true;
            }
            return false;
        });

        // player is north of the monster
        if (
            VerticalDistance < 0 &&
            WallMap[Monster.y - 1][Monster.x] === Empty &&
            MonsterMap[Monster.y - 1][Monster.x] === Empty &&
            Monster.y - 1 !== PlayerNewCoordinates.y
        ) {
            Monster.y -= 1;
        }
        // player is south of the monster
        else if (
            VerticalDistance > 0 &&
            WallMap[Monster.y + 1][Monster.x] === Empty &&
            MonsterMap[Monster.y + 1][Monster.x] === Empty &&
            Monster.y + 1 !== PlayerNewCoordinates.y
        ) {
            Monster.y += 1;
        }
        // player is west of the monster
        else if (
            HorizontalDistance < 0 &&
            WallMap[Monster.y][Monster.x - 1] === Empty &&
            MonsterMap[Monster.y][Monster.x - 1] === Empty &&
            Monster.x - 1 !== PlayerNewCoordinates.x
        ) {
            Monster.x -= 1;
        } else if (
            // player is east of the monster
            HorizontalDistance > 0 &&
            WallMap[Monster.y][Monster.x + 1] === Empty &&
            MonsterMap[Monster.y][Monster.x + 1] === Empty &&
            Monster.x + 1 !== PlayerNewCoordinates.x
        ) {
            Monster.x += 1;
        }
        // player is north-west of the monster and north is not blocked
        else if (
            VerticalDistance < 0 &&
            HorizontalDistance < 0 &&
            WallMap[Monster.y - 1][Monster.x] === Empty &&
            MonsterMap[Monster.y - 1][Monster.x] === Empty &&
            (Monster.y - 1 !== PlayerNewCoordinates.y ||
                (Monster.y - 1 === PlayerNewCoordinates.y &&
                    Monster.x !== PlayerNewCoordinates.x))
        ) {
            Monster.y -= 1;
        }
        // player is north-west of the monster and west is not blocked
        else if (
            VerticalDistance < 0 &&
            HorizontalDistance < 0 &&
            WallMap[Monster.y][Monster.x - 1] === Empty &&
            MonsterMap[Monster.y][Monster.x - 1] === Empty &&
            (Monster.x - 1 !== PlayerNewCoordinates.x ||
                (Monster.x - 1 === PlayerNewCoordinates.x &&
                    Monster.y !== PlayerNewCoordinates.y))
        ) {
            Monster.x -= 1;
        }
        // player is north-east of the monster and north is not blocked
        else if (
            VerticalDistance < 0 &&
            HorizontalDistance > 0 &&
            WallMap[Monster.y - 1][Monster.x] === Empty &&
            MonsterMap[Monster.y - 1][Monster.x] === Empty &&
            (Monster.y - 1 !== PlayerNewCoordinates.y ||
                (Monster.y - 1 === PlayerNewCoordinates.y &&
                    Monster.x !== PlayerNewCoordinates.x))
        ) {
            Monster.y -= 1;
        }
        // player is north-east of the monster and east is not blocked
        else if (
            VerticalDistance < 0 &&
            HorizontalDistance > 0 &&
            WallMap[Monster.y][Monster.x + 1] === Empty &&
            MonsterMap[Monster.y][Monster.x + 1] === Empty &&
            (Monster.x + 1 !== PlayerNewCoordinates.x ||
                (Monster.x + 1 === PlayerNewCoordinates.x &&
                    Monster.y !== PlayerNewCoordinates.y))
        ) {
            Monster.x += 1;
        }
        // player is south-west of the monster and south is not blocked
        else if (
            VerticalDistance > 0 &&
            HorizontalDistance < 0 &&
            WallMap[Monster.y + 1][Monster.x] === Empty &&
            MonsterMap[Monster.y + 1][Monster.x] === Empty &&
            (Monster.y + 1 !== PlayerNewCoordinates.y ||
                (Monster.y + 1 === PlayerNewCoordinates.y &&
                    Monster.x !== PlayerNewCoordinates.x))
        ) {
            Monster.y += 1;
        }
        // player is south-west of the monster and west is not blocked
        else if (
            VerticalDistance > 0 &&
            HorizontalDistance < 0 &&
            WallMap[Monster.y][Monster.x - 1] === Empty &&
            MonsterMap[Monster.y][Monster.x - 1] === Empty &&
            (Monster.x - 1 !== PlayerNewCoordinates.x ||
                (Monster.x - 1 === PlayerNewCoordinates.x &&
                    Monster.y !== PlayerNewCoordinates.y))
        ) {
            Monster.x -= 1;
        }
        // player is south-east of the monster and south is not blocked
        else if (
            VerticalDistance > 0 &&
            HorizontalDistance > 0 &&
            WallMap[Monster.y + 1][Monster.x] === Empty &&
            MonsterMap[Monster.y + 1][Monster.x] === Empty &&
            (Monster.y + 1 !== PlayerNewCoordinates.y ||
                (Monster.y + 1 === PlayerNewCoordinates.y &&
                    Monster.x !== PlayerNewCoordinates.x))
        ) {
            Monster.y += 1;
        }
        // player is south-east of the monster and east is not blocked
        else if (
            VerticalDistance > 0 &&
            HorizontalDistance > 0 &&
            WallMap[Monster.y][Monster.x + 1] === Empty &&
            MonsterMap[Monster.y][Monster.x + 1] === Empty &&
            (Monster.x + 1 !== PlayerNewCoordinates.x ||
                (Monster.x + 1 === PlayerNewCoordinates.x &&
                    Monster.y !== PlayerNewCoordinates.y))
        ) {
            Monster.x += 1;
        }

        // recalculate distance for attack after move
        HorizontalDistance = PlayerNewCoordinates.x - Monster.x;
        VerticalDistance = PlayerNewCoordinates.y - Monster.y;

        if (
            (HorizontalDistance === 0 &&
                (VerticalDistance === 1 || VerticalDistance === -1)) ||
            (VerticalDistance === 0 &&
                (HorizontalDistance === 1 || HorizontalDistance === -1)) ||
            (HorizontalDistance === 0 && VerticalDistance === 0)
        ) {
            this.AttackPlayer(Monster);
        }

        MonsterMap[originalMonsterCoordinates.y][
            originalMonsterCoordinates.x
        ] = Empty;
        MonsterMap[Monster.y][Monster.x] = Monster.Id;

        Monsters[index] = Monster;
        this.setState({ MonsterMap: MonsterMap, Monsters: Monsters });
    };

    AttackPlayer = Monster => {
        let Player = { ...this.props.Player };

        if (Player.Dead) return false;

        if (this.RandomInteger(100) >= Player.Dexterity) {
            let Damage = this.RandomIntegerFromRange(
                Monster.Damage.Min,
                Monster.Damage.Max
            );

            this.PlaySound('attack_hit');

            this.SetText(
                Functions.IndefiniteArticle(Monster.Name, true) +
                    ' ' +
                    Monster.Name +
                    Gameplay.PartialMessages.MonsterAttacking
            );

            this.PlayerTakeDamage(Damage);
        } else {
            this.PlaySound('attack_missed');

            this.SetText(
                Functions.IndefiniteArticle(Monster.Name, true) +
                    ' ' +
                    Monster.Name +
                    Gameplay.PartialMessages.MonsterMissed
            );
        }
    };

    AttackMonster = MonsterCoordinates => {
        let Player = { ...this.state.Player };
        let Gear = { ...this.props.Player.Gear };
        let Monsters = Object.assign([], this.state.Monsters);
        let index = 0;

        if (this.RandomInteger(100) >= Player.Dexterity) {
            let Monster = Monsters.filter((Enemy, i) => {
                if (
                    Enemy.x === MonsterCoordinates.x &&
                    Enemy.y === MonsterCoordinates.y
                ) {
                    index = i;
                    return true;
                } else {
                    return false;
                }
            });

            if (Monster.length > 0) {
                Monster = Monster[0];

                let Damage = this.RandomIntegerFromRange(
                    Gear.LeftHand.Damage.Min +
                        this.AbilityModifier(Player.Strength),
                    Gear.LeftHand.Damage.Max +
                        this.AbilityModifier(Player.Strength)
                );

                this.PlaySound('attack_hit');

                this.SetText(
                    Gameplay.PartialMessages.PlayerHit +
                        Functions.IndefiniteArticle(Monster.Name) +
                        ' ' +
                        Monster.Name +
                        Gameplay.PartialMessages.Period
                );

                this.MonsterTakeDamage(Monster, Damage, index);
            }
        } else {
            this.PlaySound('attack_missed');

            this.SetText(Gameplay.Messages.PlayerMissed);
        }
    };

    PlayerTakeDamage = Damage => {
        let Player = { ...this.props.Player };
        const GodMode = this.props.Cheats.GodMode;

        if (!GodMode) {
            Player.Health = Math.max(0, Player.Health - Damage);

            if (Player.Health <= 0) {
                Player.Dead = true;
                this.SetText(Gameplay.Messages.PlayerDead);
            }

            this.props.dispatch({
                type: 'UPDATE_PLAYER',
                Player
            });
        }
    };

    MonsterTakeDamage = (Monster, Damage, index = null) => {
        // let {MonsterMap} = this.state
        let MonsterMap = Object.assign([], this.state.MonsterMap);
        let Monsters = [...this.state.Monsters];

        Monster.Health = Math.max(0, Monster.Health - Damage);

        if (Monster.Health <= 0) {
            Monster.Dead = true;
            MonsterMap[Monster.y][Monster.x] = Empty;
            this.SetText(
                Gameplay.PartialMessages.MonsterKilled +
                    Functions.IndefiniteArticle(Monster.Name) +
                    ' ' +
                    Monster.Name +
                    Gameplay.PartialMessages.Period
            );
            this.DistributeXP(Monster);

            if (index !== null) {
                Monsters.splice(index, 1);
            }

            this.setState({ Monsters: Monsters });

            return false;
        }

        return true;
    };

    GetSurroundingWalls = ({ x, y }) => {
        // let {WallMap} = this.state
        let WallMap = Object.assign([], this.state.WallMap);

        let Surroundings = [
            y - 1 >= 0
                ? WallMap[y - 1].slice(x - 1, x + 2)
                : [Wall, Wall, Wall],
            WallMap[y].slice(x - 1, x + 2),
            y + 1 < WallMap.length
                ? WallMap[y + 1].slice(x - 1, x + 2)
                : [Wall, Wall, Wall]
        ];

        // if horizontally out of range, block the object from moving outside with walls
        if (x === 0) {
            Surroundings = [
                [Wall, WallMap[y - 1][x], WallMap[y - 1][x + 1]],
                [Wall, WallMap[y][x], WallMap[y][x + 1]],
                [Wall, WallMap[y + 1][x], WallMap[y + 1][x + 1]]
            ];
        } else if (x === WallMap[y].length - 1) {
            Surroundings = [
                [WallMap[y - 1][x - 1], WallMap[y - 1][x], Wall],
                [WallMap[y - 1][x - 1], WallMap[y][x], Wall],
                [WallMap[y - 1][x - 1], WallMap[y + 1][x], Wall]
            ];
        }

        return Surroundings;
    };

    UseItemFromKeyboard = ItemNumber => {
        let Backpack = { ...this.state.Backpack };

        let FindItem = Backpack.Items.filter((Item, index) => {
            if (index === Number(ItemNumber.replace('b', '') - 1)) {
                return true;
            }
            return false;
        });

        if (FindItem.length === 0) return false;

        this.UseItem(FindItem[0]);
    };

    UseItem = (Item, Action) => {
        console.log(Action, Item);

        if (this[Item.Action]) {
            this[Item.Action](Item);
        }
    };

    DrinkPotion = Item => {
        let Player = { ...this.state.Player };
        let Backpack = { ...this.state.Backpack };

        let Message = null;

        // Healing potion
        if (Player[Item.Heal]) {
            let NewHealedProperty = Math.min(
                Player['Max' + Item.Heal],
                Player[Item.Heal] +
                    Item.Strength +
                    Functions.RandomIntegerFromRange(-2, 3)
            );

            if (NewHealedProperty - Player[Item.Heal] === 0) {
                Message = Gameplay.Messages.Potion.NoEffect;
            } else if (NewHealedProperty - Player[Item.Heal] <= 5) {
                Message = Gameplay.Messages.Potion[Item.Heal + '1'];
            } else if (NewHealedProperty - Player[Item.Heal] <= 10) {
                Message = Gameplay.Messages.Potion[Item.Heal + '2'];
            } else {
                Message = Gameplay.Messages.Potion[Item.Heal + '3'];
            }

            Player[Item.Heal] = NewHealedProperty;
        } else {
            Message = Gameplay.Messages.Potion.NoEffect;
        }

        Backpack.Items = this.RemoveItemFromInventory(Item);

        this.PlaySound('drink_potion', 999);

        if (Message) {
            this.SetText(Message);
        }

        this.setState({ Player, Backpack }, function () {
            Backpack = { ...this.state.Backpack };
            Backpack.Weight = this.CheckInventoryWeight(null, true);
            this.setState({ Backpack: Backpack });
        });
    };

    ConsumeFood = Item => {
        // let {Player, Backpack} = this.state
        let Player = Object.assign({}, this.state.Player);
        let Backpack = Object.assign({}, this.state.Backpack);

        let RestoreStamina = Number(Item.RestoreStamina);
        let Bonus =
            RestoreStamina +
            this.RandomIntegerFromRange(
                Math.floor(RestoreStamina / -4),
                Math.ceil(RestoreStamina / 4)
            );

        Player.Stamina = Math.min(Player.MaxStamina, Player.Stamina + Bonus);

        Backpack.Items = this.RemoveItemFromInventory(Item);

        let Messages = [
            Gameplay.Messages.Food.Yummy,
            Gameplay.Messages.Food.Delicious,
            Gameplay.Messages.Food.Diet,
            Gameplay.Messages.Food.NotAsGoodAsMyMom
        ];

        if (Player.Stamina / Player.MaxStamina < 0.4) {
            Messages.push(Gameplay.Messages.Food.Rest);
        }

        if (Player.Stamina / Player.MaxStamina < 0.7) {
            Messages.push(Gameplay.Messages.Food.More);
        } else if (Player.Stamina / Player.MaxStamina > 0.9) {
            Messages.push(Gameplay.Messages.Food.NotNecessary);
        }

        this.SetText(Messages[this.RandomInteger(Messages.length)]);

        this.setState({ Player, Backpack }, function () {
            Backpack = { ...this.state.Backpack };
            Backpack.Weight = this.CheckInventoryWeight(null, true);
            this.setState({ Backpack });
        });
    };

    RemoveItemFromInventory = Item => {
        let Backpack = { ...this.state.Backpack };

        let UpdatedBackpackItems = [];

        Backpack.Items.map((BackpackItem, index) => {
            if (
                BackpackItem.Id !== Item.Id ||
                typeof BackpackItem.Id === undefined
            ) {
                UpdatedBackpackItems.push(BackpackItem);
            }
            return null;
        });

        return UpdatedBackpackItems;
    };

    DistributeXP = Source => {
        if (!Source) return false;

        // let {Player} = this.state
        let Player = Object.assign({}, this.state.Player);

        if (Source.XP) {
            Player.XP += Source.XP;

            if (
                Player.Level < Gameplay.MaxPlayerLevel &&
                Player.XP > Gameplay.LevelXP['Level' + Number(Player.Level + 1)]
            ) {
                Player.Level++;
            }

            this.setState({ Player });
        }
    };

    render() {
        // create character mode
        if (this.state.CreateCharacter) {
            return (
                <CreateCharacter {...this} {...this.state} Styles={Styles} />
            );
        }

        return <Play {...this} {...this.state} Styles={Styles} />;
    }
}
const GameContainer = connect(mapStateToProps)(Game);

class GameStore extends Component {
    render() {
        return (
            <Provider store={Store}>
                <GameContainer />
            </Provider>
        );
    }
}

export default GameStore;
