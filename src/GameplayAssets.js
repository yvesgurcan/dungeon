import React from "react"

export const GameplayAssets = {

    Messages: {
        NewGame: "Ready for adventure!",
        Debug: {On: "Debug is ON.", Off: "Debug is OFF."},
        SoundDebug: {On: "Sound debug is ON.", Off: "Sound debug is OFF."},
        Cheats: {
            ShowFullMap: {On: "You can sense your surroundings very clearly.", Off: "Your akin sense of perception dissipates."},
            NoClip: {On: "Your essence is transformed. Your body becomes immaterial.", Off: "You cease floating into the air. Your feet are now anchored to the ground again."},
            GodMode: {On: "You feel almighty and invincible.", Off: "Your godly powers leave your body."},
            CastAlwaysSucceeds: {On: "Your concentration is at its highest.", Off: "You're not sure your next spell will succeed anymore."},
        },
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
            ItemTooHeavy: "This item is too heavy.",
            BackpackFull: "Your backpack is full.",
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

    Help: {
        // Player stats and controls + Character creation
        Vitals: {
            Health: "Your health determines how much damage you can take before you fall unconscious.",
            Mana: "Mana is a pool of energy that is necessary to cast spells.",
            Stamina: "As your stamina decreases, you are more likely to fail at your actions.",
        },
        Arrows: {
            Race: "Click here to choose a different race.",
            Class: "Click here to choose a different class.",
            Spell: "Click here to choose a different spell.",
            North: "Click here to go north.",
            West: "Click here to go west.",
            East: "Click here to go east.",
            South: "Click here to go south.",
        },
        Stats: "Your stats define the kind of adventurer you are.", // only shows on small screens
        Abilities: {
            Strength: "Strength dictates the force of your attacks.",
            Constitution: "Your constitution determines how much effort you can sustain and how good you are at taking damage.",
            Dexterity: "Dexterity influences how able you are to hit your target.",
            Intelligence: "Your intelligence affects your ability to successfully cast spells.",
        },
        Level: "Your level represents how seasoned you are. Every time you level up, you become more able. If you are a spellcaster, you also learn new spells.",
        LevelSpellcaster: "Your level represents how seasoned you are. Every time you level up, you become more able and you learn new spells.",
        LevelNotSpellcaster: "Your level represents how seasoned you are. Every time you level up, you become more able.",
        XP: "You gain experience points as you progress in your adventure. When you reach a certain amount, you level up.",
        ArmorClass: "Your Armor Class (AC) shows how well protected you are against the attacks of enemies",
        // Backpack
        Backpack: "You can carry items that are not equipped in your backpack. Depending on the type of backpack you own, you can travel with more or less items.",
        BackpackWeight: "This is the current weight of your backpack and your equipment.",
        BackpackMaxWeight: "This is the maximum weight you can hold without being immobilized. The stronger you are, the more weight you can bear.",
        // Spellbook
        Spellbook: "Your spellbook contains all the spells that you can cast.",
        // Action buttons
        Buttons: {
            Reroll: "Generate a new set of numbers.",
            PlayGame: "Ready? Let's get started!",
            ResumeGame: "Changed your mind? Click here to stop the creation of a new character and resume your adventure where you left it.",
            NewGame: "Start a game with a different character.",
            SaveGame: "Copy the current state of your game.",
            LoadGame: "Insert a game state to resume playing.",
            ClearLog: "Remove all log entries until now.",
            Rest: "Take a long rest to restore your health, your mana, and your stamina. Be careful, enemies might attack you in your sleep!",
            Take: "Put the loot in your backpack.",
        },
        // Save/Load game
        GameStateBox: {
            SaveGame: "Copy this text and store it in a file in order to resume your game later.",
            LoadGame: "Copy here a previously saved game to keep playing it.",
        },
        // Specific to character creation
        CharacterName: "Enter the name of your character.",
        AbilityBonus: "The race you selected has a bonus for this ability.",
        Race: "Each race has slightly different natural traits.",
        Class: "A class determines what your talent are and what type of combat you trained for.",
        FirstSpell: "Choose the first spell that will go into your spellbook.",

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
