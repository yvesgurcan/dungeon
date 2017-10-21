import React from "react"

let MobileScreenBreakpoint = 400
let TabletScreenBreakpoint = 769

let MobileScreen = function() {
    return window.matchMedia( "(max-width: " + MobileScreenBreakpoint + "px)" ).matches
}

let TabletScreen = function() {
    return window.matchMedia( "(max-width: " + TabletScreenBreakpoint + "px)" ).matches
}


export const UtilityAssets = {

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

    // HUD messages
    Messages: {
        Collision: "You can't go there.",
        LockedDoor: "You try to open the door... it's locked.",
        PlayerMissed: "You missed your target!",
        PlayerDead: "Ouch! You are dead.",
        Potion: {
            NoEffect: "The potion had no effect.",
            // Health
            Health1: "You feel a little better.",
            Health2: "Your body regenerates quickly.",
            Health3: "This potion was much needed.",
            // Stamina
            Stamina1: "The potion gave you a small boost of energy.",
            Stamina2: "You're in better shape now.",
            Stamina3: "You feel invigorated.",
            // Mana
            Mana1: "As you drink the potion, a tiny sparkle lights up in your chest.",
            Mana2: "You feel the power of magic.",
            Mana3: "Nice!",
        },
        Spell: {
            UnsufficientLevel: "You have not mastered the secrets of this spell yet."
            ,
            NotEnoughMana: [
                "You can't gather the energy necessary to operate this kind of magic.",
                "Your power is too low to cast this spell.",
                "You position your hands and get ready to cast the spell. Nothing happens."
            ],
            Failed: [
                "As you finish pronouncing the magic words to cast the spell, the energy you focalized dissipates.",
                "Your mind wandered at a critical time that required all your attention. The spell failed.",
                "Darn! The effect of your spell flopped miserably.",
            ],
            NoTarget: "A beautiful ray of magic appears, and crashes on a wall in front of you.",
            NoTargetArea: "A wave of energy emanated from you, but nobody got hit.",
        },
        Food: {
            // random
            Yummy: <span>Crunch crunch... Now <i>that</i> was yummy.</span>,
            Delicious: "Delicious! Totally worth it.",
            Diet: "Look at you. A perfect, healthy diet.",
            NotAsGoodAsMyMom: "Not as good as your mom's, but that will do.",
            // more or less needed
            Rest: "Aaaaaah! That was a good meal. How about a little nap now?",
            More: "Well, you could definitively use some more of that.",
            NotNecessary: "Well, that wasn't really necessary, was it?",
        }

    },
    PartialMessages: {
        Period: ".",
        UnlockDoor: "You unlocked the door with the ",
        MonsterNoticed: " noticed your presence.",
        MonsterAttacking: " is attacking you.",
        MonsterMissed: " tried to attack you and missed their target.",
        MonsterKilled: "You killed ",
        PlayerHit: "You hit ",
        SpellSuccess: "You successfully casted ",
    },

    MaxAbilityScore: 50
    ,
    MaxPlayerLevel: 20
    ,
    MaxSpellLevel: 18
    ,
    MaxEventLogEntries: 5
    ,
    MaxSoundFilesPerFolder: 10
    ,
    DefaultSoundVolume: .3
    ,

    // how much experience does the player need to reach a level
    LevelXP: {
        Level2: 10,
        Level3: 900,
        Level4: 2700,
        Level5: 6500,
        Level6: 14000,
        Level7: 23000,
        Level8: 34000,
        Level9: 48000,
       Level10: 64000,
       Level11: 85000,
       Level12: 100000,
       Level13: 120000,
       Level14: 140000,
       Level15: 165000,
       Level16: 195000,
       Level17: 225000,
       Level18: 265000,
       Level19: 305000,
       Level20: 355000,
    },

    // idiosyncarcies of each race
    Races: {
        Dwarf: {
            Name: "dwarf",
            AbilityBoost: {Constitution: 2},
        },
        Elf: {
            Name: "elf",
            AbilityBoost: {Dexterity: 2},
        },
        Human: {
            Name: "human",
            AbilityBoost: {
                Constitution: 1,
                Strength: 1,
                Intelligence: 1,
            },
        },
        Gnome: {
            Name: "gnome",
            AbilityBoost: {Intelligence: 2},
        },

    },
    
    // idiosyncracies of each class
    Classes: {
        Barbarian: {
            Name: "barbarian",
            MaxHealthBoost: 12,
        },
        Cleric: {
            Name: "cleric",
            MaxHealthBoost: 8,
            
        },
        Fighter: {
            Name: "fighter",
            MaxHealthBoost: 10,
        },
        Paladin: {
            Name: "paladin",
            MaxHealthBoost: 10,
        },
        Ranger: {
            Name: "ranger",
            MaxHealthBoost: 10,
        },
        Wizard: {
            Name: "wizard",
            MaxHealthBoost: 6,
        },
    },

    // map size in terms of elements within the array
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

    // used to move objects based on user-friendly directions
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

    // placeholders for random items in the loot container assets
    GenerateRandomItems: {
        Level1: {
            Level: 1,
            random: true,
        }
    },

    Scrolls: {
        AttackSpell: {
            Type: "scroll",
            image: "scroll_attack",
            Weight: 0.1,
        },
        BonusSpell: {
            Type: "scroll",
            image: "scroll_bonus",
            Weight: 0.1,
        },
        MotionModifierSpell: {
            Type: "scroll",
            image: "scroll_motion_modifier",
            Weight: 0.1,
        },
        OtherSpell: {
            Type: "scroll",
            image: "scroll_other",
            Weight: 0.1,
        },

    },

}

export default UtilityAssets