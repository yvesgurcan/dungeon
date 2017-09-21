const HUDBlockPadding = "10px"
const HUDBorder = "1px solid black"

const ButtonNormalBackground = "lightgray"
const ButtonHoverBackground = "darkgray"
const ButtonClickBackground = "gray"

const styles = {
    // Grid
    Game: {
        display: "grid",
        gridTemplateColumns: "repeat(10, 95px)",
        gridTemplateRows:
            // row 1
            "25px " +
            // row 2
            "250px " +
            // row 3
            "auto " +
            // row 4
            "auto "
        ,
        gridGap: "10px",
        userSelect: "none",
        cursor: "pointer",
    },
    // Top-screen Message
    Message: {
        gridColumnStart: "1",
        gridColumnEnd: "10",
        gridRowStart: "1",
        minHeight: "25px",
        fontWeight: "bold",
    },
    // Story
    TextBlock: {
        gridColumnStart: "1",
        gridColumnEnd: "6",
        gridRowStart: "2",
        userSelect: "text",
        border: HUDBorder,
        padding: HUDBlockPadding,
    },
    Text: {
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
        gridColumnEnd: "10",
        gridRowStart: "2",
        border: HUDBorder,
        overflow: "hidden",
        padding: HUDBlockPadding,
        // otherwise, the map will be distorted
        minWidth: "300px",
    },
    MapObject: {
        display: "inline-block",
        width: "15px",
        height: "15px",
    },
    // Lower HUD
    HUDLowerBlock: {
        gridColumnStart: "1",
        gridColumnEnd: "10",
        gridRowStart: "3",
        border: HUDBorder,
    },
    // Player Stats
    PlayerStats1: {
        gridColumnStart: "1",
        gridColumnEnd: "2",
        gridRowStart: "3",
        padding: HUDBlockPadding,
    },
    PlayerStats2: {
        gridColumnStart: "5",
        gridColumnEnd: "6",
        gridRowStart: "3",
        padding: HUDBlockPadding,
    },
    PlayerStat: {
        paddingBottom: "5px",
    },
    // Directional Arrows
    ArrowContainer: {
        gridColumnStart: "2",
        gridColumnEnd: "3",
        gridRowStart: "3",
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
        gridRowStart: "3",
        padding: HUDBlockPadding,
    },
    ActionButton: {
        display: "inline-block",
        textAlign: "center",
        border: "1px solid black",
        padding: "3px",
        margin: "1px 1px 1px 5px",
        userSelect: "none",
        background: ButtonNormalBackground,
    },
    ActionButtonHover: {
        display: "inline-block",
        textAlign: "center",
        border: "1px solid black",
        padding: "3px",
        margin: "1px 1px 1px 5px",
        userSelect: "none",
        background: ButtonHoverBackground,
    },
    ActionButtonClick: {
        display: "inline-block",
        textAlign: "center",
        border: "1px solid black",
        padding: "3px",
        margin: "1px 1px 1px 5px",
        userSelect: "none",
        background: ButtonClickBackground,
    },
    // Inventory
    Inventory: {
        gridColumnStart: "1",
        gridColumnEnd: "10",
        gridRowStart: "4",
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
        fontSize: "10px"
    },
}

export default styles