import WorldAssets from "./WorldAssets.js"

const Debug = false

const MobileScreenBreakpoint = 400
const TabletScreenBreakpoint = 769

const MobileScreen = function() {
    return window.matchMedia( "(max-width: " + MobileScreenBreakpoint + "px)" ).matches
}
const TabletScreen = function() {
    return window.matchMedia( "(max-width: " + TabletScreenBreakpoint + "px)" ).matches
}

export const Utilities = {

    // debug
    ShowFullMap: Debug || false
    ,
    NoClip: false // Debug || false
    ,
    GodMode: Debug || false
    ,
    Debug: Debug
    ,

    // responsiveness
    ScreenSize: {
        MobileScreen: MobileScreen
        ,
        TabletScreen: TabletScreen
    },
    ScreenBreakpoints: {
        MobileScreen: MobileScreenBreakpoint,
        TabletScreen: TabletScreenBreakpoint,
    },

    // max
    MaxEventLogEntries: 5
    ,
    MaxSoundFilesPerFolder: 10
    ,
    DefaultSoundVolume: .3
    ,
    // TODO: The value below should be calculated from the WorldAssets' list of spells instead of being hardcoded.
    MaxSpellLevel: 18
    ,
    NumberOfSpells: Object.keys(WorldAssets.Spells).length
    ,

    // determines how many elements fit on the map
    WallMapVisibleRange: {
        x: 10,
        y: 7,
    },
    WallMapVisibleRangeMobileScreen: {
        x: 7,
        y: 7,
    },

    // internal symbols used for map objects
    MapObjects: {
        Wall: "X",
        Door: "D",
        LootContainer: "L",
        Undiscovered: "U",
        Empty: " ",
    },

    // used to move objects in a specific direction within a 3x3 square (absolute coordinates)
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

    // used to move objects based on the object's current position (relative coordinates)
    DirectionsOffset: {
        North: {
            x: 0,
            y: -1,
        },
        South: {
            x: 0,
            y: 1,
        },
        West: {
            x: -1,
            y: 0,
        },
        East: {
            x: 1,
            y: 0,
        },
    },
}


export default Utilities