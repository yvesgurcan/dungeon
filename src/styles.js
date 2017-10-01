import UtilityAssets from "./UtilityAssets.js"

let {MobileScreen, TabletScreen} = UtilityAssets

console.log(
    "MobileScreen", MobileScreen,
    "TabletScreen", TabletScreen,
)

// grid rows
let TitleRow = 1
let MessageRow = 2
let ContactRow = 2
let MainRow = 3
let MapRow = MainRow
let ControlRow = 4
let ControlRow2 = 4
let InventoryRow = 5

if (MobileScreen) {
    TitleRow = 1
    ContactRow = 2
    MessageRow = 3
    MainRow = 4
    MapRow = 5
    ControlRow = 6
    ControlRow2 = 7
    InventoryRow = 8
}

// grid columns
const FirstColumn = 1
const LastColumn = 10

let StoryStartColumn = FirstColumn
let StoryEndColumn = 6
let MapStartColumn = StoryEndColumn
let MapEndColumn = LastColumn

let ContactColumnStart = 7
let ContactColumnStop = LastColumn

let PlayerWeaponStartColumn = FirstColumn
let PlayerWeaponStopColumn = 2
let PlayerVitalStartColumn = PlayerWeaponStopColumn
let PlayerVitalStopColumn = 3
let DirectionalArrowStartColumn = PlayerVitalStopColumn
let DirectionalArrowStopColumn = 4
let PlayerActionStartColumn = DirectionalArrowStopColumn
let PlayerActionStopColumn = 6

let PlayerStat2StartColumn = PlayerActionStopColumn
let PlayerStat2StopColumn = 7

let PlayerStatStartColumn = PlayerStat2StopColumn
let PlayerStatBlockSeparation = PlayerStatStartColumn
let PlayerStatStopColumn = LastColumn



if (MobileScreen) {

    StoryStartColumn = FirstColumn
    StoryEndColumn = LastColumn
    MapStartColumn = FirstColumn
    MapEndColumn = LastColumn

    ContactColumnStart = FirstColumn
    ContactColumnStop = LastColumn

    PlayerWeaponStartColumn = FirstColumn
    PlayerWeaponStopColumn = 4
    PlayerVitalStartColumn = PlayerWeaponStopColumn
    PlayerVitalStopColumn = 7
    DirectionalArrowStartColumn = PlayerVitalStopColumn
    DirectionalArrowStopColumn = 9

    PlayerActionStartColumn = FirstColumn
    PlayerActionStopColumn = 4
    PlayerStatStartColumn = PlayerActionStopColumn
    PlayerStatBlockSeparation = 7
    PlayerStatStopColumn = 10

}
else if (TabletScreen) {
    PlayerVitalStartColumn = PlayerWeaponStopColumn
    PlayerVitalStopColumn = 4
    DirectionalArrowStartColumn = PlayerVitalStopColumn
    DirectionalArrowStopColumn = 5
    PlayerActionStartColumn = DirectionalArrowStopColumn
    PlayerActionStopColumn = 7
    PlayerStatStartColumn = PlayerActionStopColumn
    PlayerStatStopColumn = LastColumn
}


// presets

const px = "px"

const HUDBlockPadding = "10px"
const HUDBorder = "1px solid black"
const HUDStatBarHeight = "10px"

const ButtonNormalBackground = "lightgray"
const ButtonHoverBackground = "darkgray"
const ButtonClickBackground = "gray"

const MapBackgroundColor = "white"

const BorderThickness = 1.5
const BorderColor = "black"
const WallLine = BorderThickness + "px solid " + BorderColor

const WallBoxWidth = 15
const WallBoxHeight = 15

const WallBoxWidthWithBorder = WallBoxWidth - BorderThickness
const WallBoxHeightWithBorder = WallBoxHeight - BorderThickness

const PillarBoxWidth = WallBoxWidth - 5
const PillarBoxHeight = WallBoxHeight - 5

const WallBoxWidthCentered = WallBoxWidthWithBorder/2
const WallBoxHeightCentered = WallBoxHeightWithBorder/2

const DoorLine = Math.max(1,BorderThickness-BorderThickness/2) + "px solid " + BorderColor
const DoorColor = "lightsteelblue"
const DoorLongSize = 7
const DoorBoxLongSizeCentered = DoorLongSize-3

const styles = {
    // 
    Hidden: {
        display: "none",
    },
    // Grid
    Game: {
        display: "grid",
        gridTemplateColumns:
            (
                MobileScreen ?
                // column-10
                "repeat(10, 31px)"
                :
                TabletScreen ?
                // column1
                "110px " +
                // column2-4
                "55px " +
                "55px " +
                "70px " +
                "70px " +
                // column5
                "120px " +
                // column 6
                "35px " + 
                // column7-10
                "repeat(3, 76.8px)"
                :
                // column1
                "110px " +
                // column2-4
                "repeat(4, 95px) " +
                // column5
                "130px " +
                // column 6
                "25px " + 
                // column7-10
                "repeat(3, 76.8px)"
            )
        ,
        gridTemplateRows:
            // title (row1)
            "auto " +
            // message (row2)
            (MobileScreen ? "25px " : "") +
            "25px " +
            // story/map (row3)
            "245px " +
            // story (row4)
            (MobileScreen ? "245px " : "") +
            // controls (row5)
            "auto " +
            // controls2 (row5b)
            (MobileScreen ? "auto " : "") +
            // inventory
            "auto "
        ,
        gridGap: "10px",
        userSelect: "none",
        cursor: "pointer",
    },
    // page title
    Header: {
        gridColumnStart: FirstColumn,
        gridColumnEnd: LastColumn,
        gridRowStart: TitleRow,
        textAlign: "center",
    },
    H1: {
        margin: "0px",
        fontStyle: "italic",

    },
    H2: {
        margin: "0px",
    },
    // links
    Link: {
        color: "inherit",
    },
    LinkHover: {
        color: "inherit",
        textDecoration: "none",
    },
    // Top-screen Message
    Message: {
        gridColumnStart: FirstColumn,
        gridColumnEnd: ContactColumnStop,
        gridRowStart: MessageRow,
        minHeight: "25px",
        fontWeight: "bold",
    },
    // Contact info
    Contact: {
        gridColumnStart: ContactColumnStart,
        gridColumnEnd: LastColumn,
        gridRowStart: ContactRow,
        textAlign: (MobileScreen ? "center" : "right"),
        paddingLeft: (MobileScreen ? "30px" : null),
    },
    GitHubLogo: {
        height: "30px",
        verticalAlign: "middle",
        marginLeft: "2px",
    },
    // Story
    StoryBlock: {
        gridColumnStart: StoryStartColumn,
        gridColumnEnd: StoryEndColumn,
        gridRowStart: MainRow,
        userSelect: "text",
        border: HUDBorder,
        padding: HUDBlockPadding,
    },
    Story: {
        userSelect: "text",
        minHeight: "25px",
    },

    Event: {
        userSelect: "text",
        minHeight: "25px",
    },
    // Map
    Map: {
        gridColumnStart: MapStartColumn,
        gridColumnEnd: MapEndColumn,
        gridRowStart: MapRow,
        border: HUDBorder,
        overflow: "hidden",
        padding: HUDBlockPadding,
        // otherwise, the map will be distorted
        minWidth: "300px",
    },
    MapRow: {
        height: WallBoxHeight + px,
    },
    MapObject: {
        display: "inline-block",
        width: WallBoxWidth + px,
        height: WallBoxHeight + px,
    },
    Player: {
        boxSizing: "border-box",
        width: WallBoxWidth + px,
        height: WallBoxHeight  + px,
        background: "purple",
        borderRadius: "50%",
    },
    Loot: {
        boxSizing: "border-box",
        margin: "1.5px",
        width: WallBoxWidth - 3 + px,
        height: WallBoxHeight - 3 + px,
        background: "orange",
        borderRadius: "50%",
    },
    Monster: {
        boxSizing: "border-box",
        margin: "1.5px",
        width: WallBoxWidth - 3 + px,
        height: WallBoxHeight - 3 + px,
        background: "red",
        borderRadius: "50%",
    },
    Wall: {
        // debug
        Placeholder: {
            background: "red",
            width: WallBoxWidth + px,
            height: WallBoxHeight + px,
        },
        Pillar: {
            boxSizing: "border-box",
            marginTop: (WallBoxHeight - PillarBoxHeight)/2 + px,
            marginRight: (WallBoxWidth - PillarBoxWidth)/2 + px,
            marginBottom: (WallBoxHeight - PillarBoxHeight)/2 + px,
            marginLeft: (WallBoxWidth - PillarBoxWidth)/2 + px,
            width: PillarBoxWidth + px,
            height: PillarBoxHeight + px,
            background: "black",
        },
        // Continous Walls
        NorthToSouth: {
            boxSizing: "border-box",
            borderLeft: WallLine,
            marginLeft: WallBoxWidthCentered + px,
            width: BorderThickness + px,
            height: WallBoxHeight + px,
        },
        WestToEast: {
            boxSizing: "border-box",
            borderTop: WallLine,
            marginTop: WallBoxHeightCentered + px,
            width: WallBoxWidth + px,
            height: BorderThickness + px,

        },
        NorthToEast: {
            boxSizing: "border-box",
            borderLeft: WallLine,
            borderBottom: WallLine,
            marginLeft:  WallBoxHeightCentered + px,
            width: WallBoxWidthCentered + BorderThickness + px,
            height: WallBoxHeightCentered + BorderThickness + px,
        },
        NorthToWest: {
            boxSizing: "border-box",
            borderRight: WallLine,
            borderBottom: WallLine,
            marginRight:  WallBoxHeightCentered + px,
            width: WallBoxWidthCentered + BorderThickness + px,
            height: WallBoxHeightCentered + BorderThickness + px,
        },
        SouthToEast: {
            boxSizing: "border-box",
            borderLeft: WallLine,
            borderTop: WallLine,
            marginTop:  WallBoxHeightCentered + px,
            marginLeft:  WallBoxHeightCentered + px,
            width: WallBoxWidthCentered + BorderThickness + px,
            height: WallBoxHeightCentered + BorderThickness + px,
        },
        SouthToWest: {
            boxSizing: "border-box",
            borderRight: WallLine,
            borderTop: WallLine,
            marginTop:  WallBoxHeightCentered + px,
            marginRight:  WallBoxHeightCentered + px,
            width: WallBoxWidthCentered + BorderThickness + px,
            height: WallBoxHeightCentered + BorderThickness + px,
        },
        // T-shaped walls
        TShapedWallNSE: {
            boxSizing: "border-box",
            background: BorderColor,
            marginLeft: WallBoxHeightCentered + px
        },
        NorthSouthAndEast: {
            boxSizing: "border-box",
            borderTop: WallBoxWidthCentered + "px solid " + MapBackgroundColor,
            borderBottom: WallBoxWidthCentered + "px solid " + MapBackgroundColor,
            marginLeft: BorderThickness + px,
            width: WallBoxWidthCentered + BorderThickness + px,
            height: WallBoxHeight + px,
            background: BorderColor,
        },
        TShapedWallNSW: {
            boxSizing: "border-box",
            background: BorderColor,
            marginRight: WallBoxHeightCentered + px
        },
        NorthSouthAndWest: {
            boxSizing: "border-box",
            borderTop: WallBoxWidthCentered + "px solid " + MapBackgroundColor,
            borderBottom: WallBoxWidthCentered + "px solid " + MapBackgroundColor,
            width: WallBoxWidthCentered + px,
            height: WallBoxHeight + px,
            background: BorderColor,
        },
    },
    Door: {
        NorthToSouth: {
            boxSizing: "border-box",
            border: DoorLine,
            marginLeft: DoorBoxLongSizeCentered + px,
            width: DoorLongSize + px,
            height: WallBoxHeight + px,
            background: DoorColor,
        },
        WestToEast: {
            boxSizing: "border-box",
            border: DoorLine,
            marginTop: DoorBoxLongSizeCentered + px,
            width: WallBoxHeight + px,
            height: DoorLongSize + px,
            background: DoorColor,
        },
    },
    // Various Player Controls
    ControlBlock: {
        gridColumnStart: FirstColumn,
        gridColumnEnd: LastColumn,
        gridRowStart: ControlRow,
        gridRowEnd: InventoryRow,
        border: HUDBorder,
    },
    // Player Stats
    PlayerStats0: {
        gridColumnStart: PlayerWeaponStartColumn,
        gridColumnEnd: PlayerWeaponStopColumn,
        gridRowStart: ControlRow,
        padding: HUDBlockPadding,
        textAlign: "center",
    },
    PlayerStats1: {
        gridColumnStart: PlayerVitalStartColumn,
        gridColumnEnd: PlayerVitalStopColumn,
        gridRowStart: ControlRow,
        padding: HUDBlockPadding,
    },
    ArrowContainer: {
        gridColumnStart: DirectionalArrowStartColumn,
        gridColumnEnd: DirectionalArrowStopColumn,
        gridRowStart: ControlRow,
        textAlign: "center",
        padding: HUDBlockPadding,
        margin: "auto",
    },
    Actions: {
        gridColumnStart: PlayerActionStartColumn,
        gridColumnEnd: PlayerActionStopColumn,
        gridRowStart: ControlRow2,
        padding: HUDBlockPadding,
    },
    PlayerStats2: {
        gridColumnStart: PlayerStatStartColumn,
        gridColumnEnd: PlayerStatStopColumn,
        gridRowStart: ControlRow2,
        padding: HUDBlockPadding,
    },
    PlayerStats2Block1: {
        gridColumnStart: PlayerStatStartColumn,
        gridColumnEnd: PlayerStatBlockSeparation,
        gridRowStart: ControlRow2,
        padding: HUDBlockPadding,
    },
    PlayerStats2Block2: {
        gridColumnStart: PlayerStatBlockSeparation,
        gridColumnEnd: PlayerStatStopColumn,
        gridRowStart: ControlRow2,
        padding: HUDBlockPadding,
    },
    PlayerStats3: {
        gridColumnStart: PlayerStat2StartColumn,
        gridColumnEnd: PlayerStat2StopColumn,
        gridRowStart: ControlRow2,
        padding: HUDBlockPadding,
    },
    PlayerStat: {
        paddingBottom: "5px",
    },
    // Weapons At Hand and Prepared Spells
    ReadyItemBlock: {
        paddingTop: "10px",
        height: "calc(100% - 18px)",
    },
    ReadyItem: {
        display: "inline-block",
    },
    // Player Stat Bars
    StatBar: {
        boxSizing: "border-box",
        width: "100%",
        height: "14px",
        padding: "1px",
        border: "1px solid gray",
    },
    HealthBar: {
        background: "red",
        height: HUDStatBarHeight,
    },
    ManaBar: {
        background: "blue",
        height: HUDStatBarHeight,
    },
    StaminaBar: {
        background: "green",
        height: HUDStatBarHeight,
    },
    // Directional Arrows
    ArrowRow: {
        width: "72px",
    },
    ArrowBlock: {
        display: "inline-block",
        width: "32px",
        height: "23px",
        textAlign: "center",
        border: "1px solid black",
        paddingTop: "3px",
        margin: "1px",
        background: ButtonNormalBackground,
    },
    ArrowBlockHover: {
        display: "inline-block",
        width: "32px",
        height: "23px",
        textAlign: "center",
        border: "1px solid black",
        paddingTop: "3px",
        margin: "1px",
        background: ButtonHoverBackground,
    },
    ArrowBlockClick: {
        display: "inline-block",
        width: "32px",
        height: "23px",
        textAlign: "center",
        border: "1px solid black",
        paddingTop: "3px",
        margin: "1px",
        background: ButtonClickBackground,
    },
    // Actions
    ActionButton: {
        display: "inline-block",
        textAlign: "center",
        border: "1px solid black",
        padding: "3px",
        margin: "1px",
        userSelect: "none",
        background: ButtonNormalBackground,
    },
    ActionButtonHover: {
        display: "inline-block",
        textAlign: "center",
        border: "1px solid black",
        padding: "3px",
        margin: "1px",
        userSelect: "none",
        background: ButtonHoverBackground,
    },
    ActionButtonClick: {
        display: "inline-block",
        textAlign: "center",
        border: "1px solid black",
        padding: "3px",
        margin: "1px",
        userSelect: "none",
        background: ButtonClickBackground,
    },
    // Inventory
    Inventory: {
        gridColumnStart: FirstColumn,
        gridColumnEnd: LastColumn,
        gridRowStart: InventoryRow,
        border: HUDBorder,
    },
    // Item Image
    ItemImageBlock: {
        height: "32px",
        width: "32px",
        border: "1px solid gray",
        margin: "1px",
        textAlign: "center",
        float: "left",
    },
    ItemImage: {
        maxHeight: "30px",
        maxWidth: "30px",
        padding: "1px",
        // placeholder style when asset is missing
        overflow: "hidden",
        fontSize: "10px",
    },
    ItemImagePlaceholder: {
        height: "30px",
        width: "30px",
        border: "1px solid gray",
        padding: "1px",
        margin: "1px"
    },
}

// Odd-shaped walls

styles.Wall.NorthWestEastAndNorthWest = styles.Wall.WestToEast
styles.Wall.NorthSouthEastAndSouthEast = styles.Wall.NorthToEast

export default styles