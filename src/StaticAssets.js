/*
    " ",
    "X",
    "D",
    [" "," "," "," "," "," "," "," "," "," ",],
    ["X","X","X","X","X","X","X"],
*/

export const StaticAssets = {

    WallMap: [
        [" "," "," ","X","D","X"," "," "," "," "," "," "," "," ","X"," ","X"," "," "," "," "," "," ",],
        ["X","X","X","X"," ","X","X","X"," "," "," "," "," "," ","X"," ","X","X"," "," "," "," "," ",],
        ["X"," "," ","D"," "," "," ","X"," "," "," "," "," "," ","X"," "," ","X"," "," "," "," "," ",],
        ["X"," "," ","X","X","X"," ","X"," "," "," "," "," "," ","X"," ","X","X"," "," "," "," "," ",],
        ["X","X"," ","X"," ","X"," ","X","X","X"," "," "," "," ","X","D","X"," "," "," "," "," "," ",],
        [" ","X","X","X"," ","X"," "," "," ","X","X"," ","X","X","X"," ","X","X","X"," "," "," "," ",],
        [" "," "," "," "," ","X","X"," "," "," ","X"," ","X"," "," "," "," "," ","X"," "," "," "," ",],
        [" "," ","X","X","X","X","X"," "," "," ","X","X","X"," ","X"," ","X"," ","X","X","X"," "," ",],
        [" "," ","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","X"," "," ",],
        [" "," ","X","X","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","X"," "," ",],
        [" "," "," "," ","X"," "," "," "," "," ","X","X","X"," ","X"," ","X"," ","X","X","X"," "," ",],
        [" "," "," "," ","X","X"," "," "," ","X","X"," ","X"," "," "," "," "," ","X"," "," "," "," ",],
        [" "," "," "," "," ","X","X"," ","X","X"," "," ","X","X","X"," ","X","X","X"," "," ","X","X",],
        [" "," "," "," "," "," ","X"," ","X"," "," "," "," "," ","X"," ","X"," "," "," ","X","X"," ",],
        [" "," "," "," "," ","X","X"," ","X"," "," "," "," "," ","X"," ","X","X","X","X","X"," "," ",],
        [" "," "," "," "," ","X"," "," ","X"," "," "," "," "," ","X"," "," "," "," "," ","D"," "," ",],
        [" "," "," "," "," ","X"," "," ","X"," "," "," "," "," ","X","X","X","X","X","X","X"," "," ",],
        [" "," "," "," "," ","X","X","X","X"," "," "," "," "," "," "," "," "," "," "," ","X"," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","X","X"," ",],
    ],

    Messages: {
        Collision: "You can't go there.",
        LockedDoor: "The door is locked.",
    },

    PartialMessages: {
        UnlockDoor: "You unlocked the door with the ",
        Period: ".",
    },

    Text: [
        {
            accessPoints: [{x: 2, y: 1}],
            text: "You landed in a very dark room. It is very hard to see what is surrouding you."
        },
        {
            accessPoints: [{x: 4, y: 2}],
            text: "You hear strange noises and unfamiliar voices coming from a distance..."
        },
        {
            accessPoints: [{x: 7, y:5}, {x: 7, y: 14}, {x: 10, y: 8}, {x: 10, y: 9}],
            text: "You notice a table in the middle of the room and various shelves with books on the walls. This must be some sort of living quarters."
        },
        {
            accessPoints: [{x: 15, y: 3}],
            text: "This corridor looks filthy!"
        },
        {
            accessPoints: [{x: 7, y: 15}],
            text: "This alcove seems to be a storage area of some sort, but it is empty. Nothing interesting here!"
        },
    ],

    UniqueItems: {
        IronKey: {
            type: "key",
            Name: "iron key",
            DoorId: 1,
            image: "key",
            Weight: 0.1
        }
    },

    Items: {
        HealthPotion: {
            level: 1,
            type: "potion",
            Name: "health potion",
            image: "potion_health",
            Weight: 0.5,
        },
        ManaPotion: {
            level: 1,
            type: "potion",
            Name: "mana potion",
            image: "potion_mana",
            Weight: 0.5,
        }
    },

    Bestiary: {
        Imp: {
            Name: "imp",
            Level: 1,
            Health: 14,
            Damage: {Min: 2, Max: 5},
        }
    },

}

export default StaticAssets