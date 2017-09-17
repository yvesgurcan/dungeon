export const StaticAssets = {
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

    WallMap: [
        ["X","X","X","X","X","X","X"],
        ["X"," "," ","D"," "," "," "],
        ["X"," "," ","X","X","X"," "],
        ["X","X","X","X"," ","X","X"]
    ],
}

export default StaticAssets