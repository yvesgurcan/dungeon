const styles = {
    // Grid
    Game: {
        display: "grid",
        gridTemplateColumns: "repeat(10, 10%)",
        gridTemplateRows: "25px repeat(4, 100px)",
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
        gridRowEnd: "4",
        userSelect: "text",
        border: "1px solid black",
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
        gridRowEnd: "4",
        border: "1px solid black",
    },
    MapObject: {
        display: "inline-block",
        width: "15px",
        height: "15px",
    },
    // Directional Arrows
    ArrowContainer: {
        gridColumnStart: "1",
        gridColumnEnd: "2",
        gridRowStart: "4",
        textAlign: "center",
    },
    ArrowRow: {
        width: "68px",
    },
    ArrowBlock: {
        display: "inline-block",
        width: "30px",
        height: "25px",
        textAlign: "center",
        border: "1px solid black",
        paddingTop: "5px",
        margin: "1px",
    },
    ArrowBlockHover: {
        display: "inline-block",
        width: "30px",
        height: "25px",
        textAlign: "center",
        border: "1px solid black",
        paddingTop: "5px",
        margin: "1px",
        background: "lightgray",
    },
    ArrowBlockClick: {
        display: "inline-block",
        width: "30px",
        height: "25px",
        textAlign: "center",
        border: "1px solid black",
        paddingTop: "5px",
        margin: "1px",
        background: "gray",
    },
}

export default styles