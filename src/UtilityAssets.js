export const UtilityAssets = {

    GenerateRandomItems: {
        Level1: {
            level: 1,
            random: true,
        }
    },

    WallMapVisibleRange: {
        x: 10,
        y: 7,
    },

    MapObjects: {
        Wall: "X",
        Door: "D",
        LootContainer: "L",
        Enemy: "M",
        Undiscovered: "U",
        Empty: " ",
    },

    Directions: {
        North: {
            x: 1,
            y: 0,
        },
        South: {
            x: 1,
            y: 2,
        },
        West: {
            x: 0,
            y: 1,
        },
        East: {
            x: 2,
            y: 1,
        },
    },

    DirectionX: {
        North: 1,
        West: 0,
        East: 2,
        South: 1,
    },

    DirectionY: {
        North: 0,
        West: 1,
        East: 1,
        South: 2,
    }

}

export default UtilityAssets