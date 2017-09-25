const TitleRow = 1
const MessageRow = 2
const MainRow = 3
const ControlRow = 4
const InventoryRow = 5

const FirstColumn = 1
const LastColumn = 10

const HUDBlockPadding = "10px"
const HUDBorder = "1px solid black"

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

const px = "px"

const styles = {
    // Grid
    Game: {
        display: "grid",
        gridTemplateColumns:
            // column1-4
            "repeat(4, 95px) " +
            // column5
            "130px " + 
            // column6-10
            "repeat(5, 76.8px)"

        ,
        gridTemplateRows:
            // row1
            "auto " +
            // row2
            "25px " +
            // row3
            "245px " +
            // row4
            "auto " +
            // row5
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
    // Contact info
    Contact: {
        gridColumnStart: "7",
        gridColumnEnd: LastColumn,
        gridRowStart: MessageRow,
        textAlign: "right",
    },
    GitHubLogo: {
        height: "30px",
        verticalAlign: "middle",
        marginLeft: "2px",
    },
    // Top-screen Message
    Message: {
        gridColumnStart: FirstColumn,
        gridColumnEnd: "7",
        gridRowStart: MessageRow,
        minHeight: "25px",
        fontWeight: "bold",
    },
    // Story
    StoryBlock: {
        gridColumnStart: FirstColumn,
        gridColumnEnd: "6",
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
        gridColumnStart: "6",
        gridColumnEnd: LastColumn,
        gridRowStart: MainRow,
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
    Wall: {
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
        Placeholder: {
            background: "red",
            width: WallBoxWidth + px,
            height: WallBoxHeight + px,
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
    // Various Player Controls
    ControlBlock: {
        gridColumnStart: FirstColumn,
        gridColumnEnd: LastColumn,
        gridRowStart: ControlRow,
        border: HUDBorder,
    },
    // Player Stats
    PlayerStats1: {
        gridColumnStart: FirstColumn,
        gridColumnEnd: "2",
        gridRowStart: ControlRow,
        padding: HUDBlockPadding,
    },
    PlayerStats2: {
        gridColumnStart: "5",
        gridColumnEnd: "6",
        gridRowStart: ControlRow,
        padding: HUDBlockPadding,
    },
    PlayerStat: {
        paddingBottom: "5px",
    },
    // Directional Arrows
    ArrowContainer: {
        gridColumnStart: "2",
        gridColumnEnd: "3",
        gridRowStart: ControlRow,
        textAlign: "center",
        padding: HUDBlockPadding,
        margin: "auto",
    },
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
    Actions: {
        gridColumnStart: "3",
        gridColumnEnd: "5",
        gridRowStart: ControlRow,
        padding: HUDBlockPadding,
    },
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
}

// Odd-shaped walls

styles.Wall.NorthWestEastAndNorthWest = styles.Wall.WestToEast
styles.Wall.NorthSouthEastAndSouthEast = styles.Wall.NorthToEast

export default styles