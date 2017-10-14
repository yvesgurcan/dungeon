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
        },
        TravelerBag: {
            Type: "backpack",
        },
        // Miscellani
        Rock: {
            Level: 1,
            Type: "misc",
            Name: "Rock",
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
        AntidotePotion: {
            Level: 1,
            Type: "potion",
            Name: "antidote",
            image: "potion_antidote",
            Heal: "Poison",
            Strength: 70,
            Action: "DrinkPotion",
            Weight: 0.5,
        },
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
        Apple: {
            Name: "apple",
            Type: "food",
            image: "food_apple",
        },
        Sausage: {
            Name: "sausage",
            Type: "food",
            image: "food_sausage",
        },
        // Scrolls
        FireballScroll: {
            Level: 1,
            Name: "fireball scroll",
            Type: "scroll",
            Spell: "FireballSpell",
            image: "scroll",
            Weight: 0.1,
        },
    },

    // Spells
    Spells: {

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
            Heal: {
                Property: "Health",
                Source: "Target",
                Vampiric: true,
                Type: "Percentage",
                Percentage: 100,
            },
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
            Name: "confusion",
            Image: "spell_confusion",
            Type: Motion,
            Effect: "Random",
            Duration: 3, 
        },
        Entangle: {
            Level: 9,
            Name: "entangle",
            Image: "spell_entangle",
            Type: Motion,
            Effect: "Immobilize",
            Duration: 5, 
        },
        ShockingGrasp: {
            Level: 13,
            Name: "shocking grasp",
            Image: "spell_shocking_grasp",
            Type: Motion,
            Effect: "Immobilize",
            Damage: {Min: 3, max: 5},
            Duration: 2, 
        },
        Earthquake: {
            Level: 16,
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
            Name: "create food",
            Image: "spell_create_food",
            Effect: "CreateFood",
        },
        DetectMonster: {
            Level: 4,
            Name: "detect monster",
            Image: "spell_detect_monster",
            Effect: "DetectMonster",
        },
        FindTraps: {
            Level: 7,
            Name: "Find traps",
            Image: "spell_find_traps",
            Effect: "FindTraps",
        },
        MistyStep: {
            Level: 11,
            Name: "misty step",
            Image: "spell_misty_step",
            Effect: "MistyStep",
        },
        Invisibility: {
            Level: 14,
            Name: "invisibility",
            Image: "spell_invisibility",
            Effect: "Invisibility",
            Duration: 12,
        },
        GlobeOfInvulnerability: {
            Level: 17,
            ManaCost: 10,
            Name: "globe of invulnerability",
            Image: "spell_globe_of_invulnerability",
            Effect: "Invulnerability",
            Duration: 5,
        },

    },

    Bestiary: {
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
            Type: UtilityAssets.GreenSkin,
            Level: 1,
            Health: 7,
            Damage: {Min: 1, Max: 4},
        },
        Hobgoblin: {
            Name: "hobgoblin",
            Type: UtilityAssets.GreenSkin,
            Level: 1,
            Health: 11,
            Damage: {Min: 2, Max: 6},
        },
        Orc: {
            Name: "orc",
            Type: UtilityAssets.GreenSkin,
            Level: 1,
            Health: 15,
            Damage: {Min: 4, Max: 7},
        },
    },

}

export default StaticAssets