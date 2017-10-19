import UtilityAssets from "./UtilityAssets.js"

const Heal = "Heal"
const Surrounding = "Surrounding"
const Facing = "Facing"
const Adjacent = "Adjacent"
const Attack = "Attack"
const Motion = "Motion"
const Bonus = "Bonus"

export const StaticAssets = {

    UniqueItems: {
        // Keys
        IronKey: {
            type: "key",
            Name: "iron key",
            DoorId: 1,
            image: "key_iron",
            Weight: 0.1
        },
        BrassKey: {
            type: "key",
            Name: "brass key",
            image: "key_brass",
        },
        OrnateKey: {
            type: "key",
            Name: "ornate key",
            image: "key_ornate",
        },
    },

    Items: {

        // Backpacks  
        BagOfHolding: {
            Type: "backpack",
            MaxItems: 28,
        },
        TravelerBag: {
            Type: "backpack",
            MaxItems: 5,
        },
        
        // Miscellani
        Rock: {
            Level: 1,
            Type: "misc",
            Name: "rock",
            image: "rock",
            Weight: 2,
        },
        
        // Potions
        HealthPotion: {
            Level: 1,
            Type: "potion",
            Name: "health potion",
            image: "potion_health",
            Heal: "Health",
            Strength: 12,
            Action: "DrinkPotion",
            Weight: 0.5,
        },
        ManaPotion: {
            Level: 1,
            Type: "potion",
            Name: "mana potion",
            image: "potion_mana",
            Heal: "Mana",
            Strength: 8,
            Action: "DrinkPotion",
            Weight: 0.5,
        },
        StaminaPotion: {
            Level: 1,
            Type: "potion",
            Name: "potion of vigor",
            image: "potion_stamina",
            Heal: "Stamina",
            Strength: 30,
            Action: "DrinkPotion",
            Weight: 0.5,
        },

        // Weapons
        // Swords
        EmeraldDagger: {
            Level: 2,
            Name: "emerald dagger",
            Type: "weapon",
            image: "weapon_dagger_emerald",
            Damage: {Min: 3, Max: 7},
            Weight: 3,
        },
        Sword: {
            Name: "sword",
            Type: "weapon",
            image: "weapon_sword"
        },
        // Bows
        Bow: {
            Type: "weapon",
            Name: "bow",
            image: "weapon_bow",
        },
        // Staff
        SimpleStaff: {
            Name: "simple staff",
            Type: "weapon",
            image: "weapon_staff",
        },
        // Shield
        Shield: {
            Name: "simple staff",
            Type: "shield",
            image: "shield",
        },

        // Accesories
        // Necklaces
        AmuletOfMagic: {
            Name: "amulet of magic",
            Type: "necklace",
            image: "amulet_magic",
        },
        SkullAmulet: {
            Name: "skull amulet",
            Type: "necklace",
            image: "amulet_skull",
        },

        // Food
        Leaf: {
            Name: "leaf",
            Type: "food",
            image: "food_leaf",
            RestoreStamina: 2,
            Action: "ConsumeFood",
            Weight: 0.1,
        },
        Apple: {
            Name: "apple",
            Type: "food",
            image: "food_apple",
            RestoreStamina: 3,
            Action: "ConsumeFood",
            Weight: 0.3,
        },
        Berries: {
            Name: "berries",
            Type: "food",
            image: "food_berries",
            RestoreStamina: 3,
            Action: "ConsumeFood",
            Weight: 0.2,
        },
        Grapes: {
            Name: "grapes",
            Type: "food",
            image: "food_grapes",
            RestoreStamina: 3,
            Action: "ConsumeFood",
            Weight: 0.4,
        },
        Bread: {
            Name: "bread",
            Type: "food",
            image: "food_bread",
            RestoreStamina: 5,
            Action: "ConsumeFood",
            Weight: 0.5,
        },
        Chicken: {
            Name: "chicken",
            Type: "food",
            image: "food_chicken",
            RestoreStamina: 7,
            Action: "ConsumeFood",
            Weight: 0.4,
        },
        Sausage: {
            Name: "sausage",
            Type: "food",
            image: "food_sausage",
            RestoreStamina: 7,
            Action: "ConsumeFood",
            Weight: 0.3,
        },

        // Scrolls
        // Attack
        MagicArrowScroll: {
            Name: "scroll of magic arrow",
            Spell: "MagicArrow",
            ...UtilityAssets.Scrolls.AttackSpell,
        },
        ColdTouchScroll: {
            Name: "scroll of cold touch",
            Spell: "ColdTouch",
            ...UtilityAssets.Scrolls.AttackSpell,
        },
        FireballScroll: {
            Name: "scroll of fireball",
            Spell: "Fireball",
            ...UtilityAssets.Scrolls.AttackSpell,
        },
        VampiricTouchScroll: {
            Name: "scroll of vampiric touch",
            Spell: "VampiricTouch",
            ...UtilityAssets.Scrolls.AttackSpell,
        },
        ChainLightningScroll: {
            Name: "scroll of chain lightning",
            Spell: "ChainLightning",
            ...UtilityAssets.Scrolls.AttackSpell,
        },
        CircleOfDeathScroll: {
            Name: "scroll of circle of death",
            Spell: "CircleOfDeath",
            ...UtilityAssets.Scrolls.AttackSpell,
        },
        MoonbeamScroll: {
            Name: "scroll of moonbeam",
            Spell: "Moonbeam",
            ...UtilityAssets.Scrolls.AttackSpell,
        },
        // Heal
        FirstAidScroll: {
            Name: "scroll of first aid",
            Spell: "FirstAid",
            ...UtilityAssets.Scrolls.BonusSpell,
        },
        AlertnessScroll: {
            Name: "scroll of alertness",
            Spell: "Alertness",
            ...UtilityAssets.Scrolls.BonusSpell,
        },
        HealWoundsScroll: {
            Name: "scroll of heal wounds",
            Spell: "HealWounds",
            ...UtilityAssets.Scrolls.BonusSpell,
        },
        RegenerateScroll: {
            Name: "scroll of regenerate",
            Spell: "Regenerate",
            ...UtilityAssets.Scrolls.BonusSpell,
        },
        // Bonus
        TrueStrikeScroll: {
            Name: "scroll of true strike",
            Spell: "TrueStrike",
            ...UtilityAssets.Scrolls.BonusSpell,
        },
        BarkSkinScroll: {
            Name: "scroll of bark sin",
            Spell: "BarkSkin",
            ...UtilityAssets.Scrolls.BonusSpell,
        },
        StoneSkinScroll: {
            Name: "scroll of stone skin",
            Spell: "StoneSkin",
            ...UtilityAssets.Scrolls.BonusSpell,
        },
        BlessScroll: {
            Name: "scroll of bless",
            Spell: "Bless",
            ...UtilityAssets.Scrolls.BonusSpell,
        },
        BlurScroll: {
            Name: "scroll of blur",
            Spell: "Blur",
            ...UtilityAssets.Scrolls.BonusSpell,
        },
        MirrorShieldScroll: {
            Name: "scroll of mirror shield",
            Spell: "MirrorShield",
            ...UtilityAssets.Scrolls.BonusSpell,
        },
        BerserkScroll: {
            Name: "scroll of berserk",
            Spell: "Berserk",
            ...UtilityAssets.Scrolls.BonusSpell,
        },
        // Motion Modifiers
        ConfusionScroll: {
            Name: "scroll of confusion",
            Spell: "Confusion",
            ...UtilityAssets.Scrolls.MotionModifierSpell,
        },
        EntangleScroll: {
            Name: "scroll of entangle",
            Spell: "Entangle",
            ...UtilityAssets.Scrolls.MotionModifierSpell,
        },
        ShockingGraspScroll: {
            Name: "scroll of shocking grasp",
            Spell: "ShockingGrasp",
            ...UtilityAssets.Scrolls.MotionModifierSpell,
        },
        EarthquakeScroll: {
            Name: "scroll of earthquake",
            Spell: "Earthquake",
            ...UtilityAssets.Scrolls.MotionModifierSpell,
        },
        // Other
        CreateFoodScroll: {
            Name: "scroll of create food",
            Spell: "CreateFood",
            ...UtilityAssets.Scrolls.OtherSpell,
        },
        DetectMonsterScroll: {
            Name: "scroll of detect monster",
            Spell: "DetectMonster",
            ...UtilityAssets.Scrolls.OtherSpell,
        },
        FindTrapsScroll: {
            Name: "scroll of find traps",
            Spell: "FindTraps",
            ...UtilityAssets.Scrolls.OtherSpell,
        },
        MistyStepScroll: {
            Name: "scroll of misty step",
            Spell: "MistyStep",
            ...UtilityAssets.Scrolls.OtherSpell,
        },
        InvisibilityScroll: {
            Name: "scroll of invisibility",
            Spell: "Invisibility",
            ...UtilityAssets.Scrolls.OtherSpell,
        },
        GlobeOfInvulnerabilityScroll: {
            Name: "scroll of globe of invulnerability",
            Spell: "GlobeOfInvulnerability",
            ...UtilityAssets.Scrolls.OtherSpell,
        },
    },

    // Spells
    Spells: {

        // Attack
        MagicArrow: {
            Level: 1,
            ManaCost: 3,
            Name: "magic arrow",
            Image: "spell_magic_arrow",
            Type: Attack,
            // Cumulated Damage Range: 1-5
            Damage: {Min: 1, Max: 5},
            Duration: 1,
        },
        ColdTouch: {
            Level: 3,
            ManaCost: 7,
            Name: "cold touch",
            Image: "spell_cold_touch",
            Type: Attack,
            // Cumulated Damage Range: 4-8
            Damage: {Min: 2, Max: 4},
            Duration: 2,
        },
        Fireball: {
            Level: 5,
            ManaCost: 11,
            Name: "fireball",
            Image: "spell_fireball",
            Type: Attack,
            // Cumulated Damage Range: 6-12
            Damage: {Min: 6, Max: 12},
            Duration: 1,
        },
        VampiricTouch: {
            Level: 8,
            ManaCost: 16,
            Name: "vampiric touch",
            Image: "spell_vampiric_touch",
            Type: Attack,
            // Cumulated Damage Range: 4-10
            Damage: {Min: 4, Max: 10},
            // Cumulated Health Restored Range: 4-10
            Vampiric: true,
            Duration: 1,       
        },
        ChainLightning: {
            Level: 12,
            ManaCost: 26,
            Name: "chain lightning",
            Image: "spell_chain_lightning",
            Type: Attack,
            // Cumulated Damage Range: 3-45 (1-15 * 3)
            Damage: {Min: 1, Max: 15},
            Duration: 1,
            Target: Adjacent,
            MaxTargets: 3,
        },
        CircleOfDeath: {
            Level: 16,
            ManaCost: 59,
            Name: "circle of death",
            Image: "spell_circle_of_death",
            Type: Attack,
            // Cumulated Damage Range: 40-80 (5-10 * 8)
            Damage: {Min: 5, Max: 10},
            Duration: 1,
            Target: Surrounding,
        },
        Moonbeam: {
            Level: 18,
            ManaCost: 79,
            Name: "moonbeam",
            Image: "spell_moonbeam",
            Type: Attack,
            // Cumulated Damage Range: 30-120 (6-24 * 5)
            Damage: {Min: 3, Max: 12},
            Duration: 2,
            Target: Surrounding,
            MaxTargets: 5,
        },

        // Heal
        FirstAid: {
            Level: 1,
            ManaCost: 4,
            Name: "first aid",
            Image: "spell_first_aid",
            Type: Heal,
            // Cumulated Health Restored Range: 4-9
            Heal: {
                Property: "Health",
                Min: 4,
                Max: 9,
            },
            Duration: 1,
        },
        Alertness: {
            Level: 3,
            ManaCost: 6,
            Name: "alertness",
            Image: "spell_alertness",
            Type: Heal,
            // Cumulated Stamina Restored Range: 24-48
            Heal: {
                Property: "Stamina",
                Min: 8,
                Max: 16,
            },
            Duration: 3,     
        },
        HealWounds: {
            Level: 6,
            ManaCost: 8,
            Name: "heal wounds",
            Image: "spell_heal_wounds",
            Type: Heal,
            // Cumulated Health Restored Range: 6-16
            Heal: {
                Property: "Health",
                Min: 6,
                Max: 16,
            },
            Duration: 1,
        },
        Regenerate: {
            Level: 11,
            ManaCost: 19,
            Name: "regenerate",
            Image: "spell_regenerate",
            Type: Heal,
            // Cumulated Health Restored Range: 18-33
            Heal: {
                Property: "Health",
                Min: 6,
                Max: 11,
            },
            Duration: 3,
        },

        // Bonus
        TrueStrike: {
            Level: 4,
            ManaCost: 7,
            Name: "true strike",
            Image: "spell_true_strike",
            Type: Bonus,
            Boost: {
                Property: "Damage",
                Type: "Fixed",
                Fixed: 2,
            },
            Duration: 5, 
        },
        BarkSkin: {
            Level: 2,
            ManaCost: 11,
            Name: "bark skin",
            Image: "spell_bark_skin",
            Type: Bonus,
            Boost: {
                Property: "Armor",
                Type: "Percentage",
                Percentage: 15,
            },
            Duration: 10, 
        },
        StoneSkin: {
            Level: 5,
            ManaCost: 19,
            Name: "stone skin",
            Image: "spell_stone_skin",
            Type: Bonus,
            Boost: {
                Property: "Armor",
                Type: "Percentage",
                Percentage: 40,
            },
            Duration: 15, 
        },
        Bless: {
            Level: 3,
            ManaCost: 13,
            Name: "bless",
            Image: "spell_bless",
            Type: Bonus,
            Boost: {
                Property: "Damage",
                Type: "Max",
            },
            Duration: 8, 
        },
        Blur: {
            Level: 6,
            ManaCost: 20,
            Name: "blur",
            Image: "spell_blur",
            Type: Bonus,
            Boost: {
                Property: "Damage",
                Type: "Min",
            },
            Target: Facing,
            Duration: 6, 
        },
        MirrorShield: {
            Level: 10,
            ManaCost: 36,
            Name: "mirror shield",
            Image: "spell_mirror_shield",
            Type: Bonus,
            Damage: {
                Type: "Percentage",
                Percentage: 20,
            },
            Target: Surrounding,
            Duration: 5, 
        },
        Berserk: {
            Level: 15,
            ManaCost: 41,
            Name: "berserk",
            Image: "spell_berserk",
            Type: Bonus,
            Boost: {
                Property: "Strength",
                Type: "Absolute",
                Amount: 10,
            },
            Duration: 5, 
        },

        // Motion Modifiers
        Confusion: {
            Level: 5,
            ManaCost: 17,
            Name: "confusion",
            Image: "spell_confusion",
            Type: Motion,
            Effect: "Random",
            Duration: 3, 
        },
        Entangle: {
            Level: 9,
            ManaCost: 18,
            Name: "entangle",
            Image: "spell_entangle",
            Type: Motion,
            Effect: "Immobilize",
            Duration: 5, 
        },
        ShockingGrasp: {
            Level: 13,
            ManaCost: 25,
            Name: "shocking grasp",
            Image: "spell_shocking_grasp",
            Type: Motion,
            Effect: "Immobilize",
            Damage: {Min: 3, max: 5},
            Duration: 2, 
        },
        Earthquake: {
            Level: 16,
            ManaCost: 69,
            Name: "earthquake",
            Image: "spell_earthquake",
            Type: Motion,
            Effect: "Immobilize",
            Target: Surrounding,
            Duration: 3, 
        },

        // Other
        CreateFood: {
            Level: 3,
            ManaCost: 9,
            Name: "create food",
            Image: "spell_create_food",
            Effect: "CreateFood",
        },
        DetectMonster: {
            Level: 4,
            ManaCost: 12,
            Name: "detect monster",
            Image: "spell_detect_monster",
            Effect: "DetectMonster",
        },
        FindTraps: {
            Level: 7,
            ManaCost: 14,
            Name: "Find traps",
            Image: "spell_find_traps",
            Effect: "FindTraps",
        },
        MistyStep: {
            Level: 11,
            ManaCost: 23,
            Name: "misty step",
            Image: "spell_misty_step",
            Effect: "MistyStep",
        },
        Invisibility: {
            Level: 14,
            ManaCost: 78,
            Name: "invisibility",
            Image: "spell_invisibility",
            Effect: "Invisibility",
            Duration: 12,
        },
        GlobeOfInvulnerability: {
            Level: 17,
            ManaCost: 89,
            Name: "globe of invulnerability",
            Image: "spell_globe_of_invulnerability",
            Effect: "Invulnerability",
            Duration: 5,
        },

    },

    Bestiary: {
        // Forest
        WinterWolf: {
        },
        Hyena: {
        },
        PoisonousSnake: {
        },
        Boar: {
        },
        BlackBear: {
        },
        SwarmOfWasps: {
        },
        Kobold: {
        },
        Gnoll: {
        },
        Dryad: {
        },
        
        // Subterranean
        Bullywug: {
        },
        Lizard:{
        },
        
        
        // Undead
        Imp: {
            Name: "imp",
            Level: 1,
            Health: 14,
            Damage: {Min: 2, Max: 5},
        },
        // Green Skins
        Goblin: {
            Name: "goblin",
            Type: "Green Skin",
            Level: 1,
            XP: 15,
            Health: 7,
            Damage: {Min: 1, Max: 4},
        },
        Hobgoblin: {
            Name: "hobgoblin",
            Type: "Green Skin",
            Level: 1,
            XP: 20,
            Health: 11,
            Damage: {Min: 2, Max: 6},
        },
        Orc: {
            Name: "orc",
            Type: "Green Skin",
            Level: 1,
            XP: 20,
            Health: 15,
            Damage: {Min: 4, Max: 7},
        },
    },

}

export default StaticAssets
