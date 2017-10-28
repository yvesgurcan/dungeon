import React from "react"

export const GameplayAssets = {

    Messages: {
        NewGame: "Ready for adventure!",
        LoadGameError: {
            Invalid: "The game state you entered is not valid.",
        },
        Collision: "You can't go there.",
        LockedDoor: "You try to open the door... it's locked.",
        PlayerMissed: "You missed your target!",
        PlayerDead: "Ouch! You are dead.",
        Loot: {
            Gathered: "You gathered all the loot in your backpack.",
            TooHeavy: "The loot is too heavy.",
            TooMuch: "You can not take all the loot.",
        },
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
            CanNotCast: "You have not studied the arcane of magic. You can not cast spells."
            ,
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
        SpellSuccess: "You successfully cast ",
    },

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

    MaxPlayerLevel: 20,
    MaxAbilityScore: 50,

}

export default GameplayAssets