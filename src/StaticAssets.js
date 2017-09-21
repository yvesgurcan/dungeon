/*
    " ",
    "X",
    "D",
    [" "," "," "," "," "," "," ",],
    ["X","X","X","X","X","X","X"],
*/

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
            accessPoints: [{x: 4, y:2}],
            text: "You hear strange noises."
        },
    ],

    WallMap: [
        [" "," "," ","X"," ","X"," "," ",],
        ["X","X","X","X"," ","X","X","X",],
        ["X"," "," ","D"," "," "," ","X",],
        ["X"," "," ","X","X","X"," "," ",],
        ["X","X"," ","X"," ","X","X","X",],
        [" ","X","X","X"," "," "," "," ",],
    ],

    UniqueItems: {
        IronKey: {
            type: "key",
            name: "iron key",
            doorId: 1,
            image: "key"
        }
    },

    Items: {
        HealthPotion: {
            level: 1,
            type: "potion",
            name: "health potion",
            image: "potion_health"
        },
        ManaPotion: {
            level: 1,
            type: "potion",
            name: "mana potion",
            image: "potion_mana"
        }
    }

}

export default StaticAssets