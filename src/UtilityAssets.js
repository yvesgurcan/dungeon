export const UtilityAssets = {

    // screen sizes
    MobileScreen: function() {return window.matchMedia( "(max-width: 376px)" ).matches}
    ,
    TabletScreen: function() {return window.matchMedia( "(max-width: 769px)" ).matches}
    ,

    WallMapVisibleRange: {
        x: 10,
        y: 7,
    },

    MapObjects: {
        Wall: "X",
        Door: "D",
        LootContainer: "L",
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

    GenerateRandomItems: {
        Level1: {
            level: 1,
            random: true,
        }
    },

    MonsterTypes: {
        GreenSkin: "green skin",
    },

}

export default UtilityAssets