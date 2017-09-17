export const assets = {
    Messages: {
        Collision: "You can't go there.",
        LockedDoor: "The door is locked.", 
    },
    Text: [
        {
            accessPoints: [{x: 2, y:1}],
            text: "You entered a very dark room."
        },
        {
            accessPoints: [{x: 4, y:1}],
            text: "You hear strange noises."
        },
    ],
    Player: {
        x: 1,
        y: 1,
    },
    WallMap: [
        ["X","X","X","X","X","X","X"],
        ["X"," "," ","D"," "," "," "],
        ["X"," "," ","X","X","X"," "],
        ["X","X","X","X"," ","X","X"]
    ],
    LockedDoor: [
        {
            x: 3,
            y: 1,
            key: "emerald key",
            unlocked: true,
        },
    ],

}

export default assets