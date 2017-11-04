import WorldAssets from "./WorldAssets.js"

const Debug = false
const SoundDebug = false
const Cheats = false

const MobileScreenBreakpoint = 400
const TabletScreenBreakpoint = 769

const MobileScreen = function() {
    return window.matchMedia( "(max-width: " + MobileScreenBreakpoint + "px)" ).matches
}
const TabletScreen = function() {
    return window.matchMedia( "(max-width: " + TabletScreenBreakpoint + "px)" ).matches
}

export const Utilities = {

    Version: {
        Stage: "pre-alpha",
        Number: "0.6.1",
        Release: "dev",
    },

    // debug and cheats
    ShowFullMap: Cheats || false
    ,
    NoClip: Cheats || false
    ,
    GodMode: Cheats || false
    ,
    CastAlwaysSucceeds : Cheats || false
    ,
    Debug: Debug
    ,
    SoundDebug: SoundDebug
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
    ResponsiveMaxEventLogEntries: 3
    ,
    MaxSoundFilesPerFolder: 10
    ,
    // default
    StartMaxItems: 5,
    DefaultSoundVolume: .3
    ,
    // TODO: The value below should be calculated from the WorldAssets' list of spells instead of being hardcoded.
    MaxSpellLevel: 18
    ,
    NumberOfSpells: Object.keys(WorldAssets.Spells).length
    ,

    // Item types that can be equipped by the player
    Equipable: [
        "weapon",
        "shield",
        "helmet",
        "necklace",
        "ring",
        "armor",
        "boots",
        "projectile",
    ],
    
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
