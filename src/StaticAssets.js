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
        Dagger: {
            Level: 2,
            Name: "dagger",
            Type: "weapon",
            Damage: {Min: 1, Max: 3},
            Weight: 3,
        },
        Sword: {
            Name: "sword",
            Type: "weapon",
            image: "sword"
        },
        // Bows
        Bow: {
            Type: "weapon",
            Name: "bow",
            image: "bow",
        },
        // Staff
        SimpleStaff: {
            Name: "simple staff",
            Type: "weapon",
            image: "staff",
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
            image: "sausage",
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
            Name: "first aid",
            Level: 1,
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
            Name: "regenerate",
            Level: 3,
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
            Name: "heal wounds",
            Level: 6,
            Type: Heal,
            // Cumulated Health Restored Range: 6-15
            Heal: {
                Property: "Health",
                Min: 6,
                Max: 15,
            },
            Duration: 1,
        },
        Regenerate: {
            Name: "regenerate",
            Type: Heal,
            Level: 11,
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
            Name: "magic arrow",
            Level: 1,
            Type: Attack,
            // Cumulated Damage Range: 1-5
            Damage: {Min: 1, Max: 5},
            Duration: 1,
        },
        ColdTouch: {
            Name: "cold touch",
            Level: 3,
            Type: Attack,
            // Cumulated Damage Range: 4-8
            Damage: {Min: 2, Max: 4},
            Duration: 2,
        },
        Fireball: {
            Name: "fireball",
            Level: 5,
            Type: Attack,
            // Cumulated Damage Range: 6-12
            Damage: {Min: 6, Max: 12},
            Duration: 1,
        },
        VampiricTouch: {
            Level: 8,
            Name: "vampiric touch",
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
            Name: "chain lightning",
            Type: Attack,
            // Cumulated Damage Range: 3-45 (1-15 * 3)
            Damage: {Min: 1, Max: 15},
            Duration: 1,
            Target: Adjacent,
            MaxTargets: 3,
        },
        CircleOfDeath: {
            Level: 16,
            Nanme: "circle of death",
            Type: Attack,
            // Cumulated Damage Range: 40-80 (5-10 * 8)
            Danage: {Min: 5, Max: 10},
            Duration: 1,
            Target: Surrounding,
        },
        Moonbeam: {
            Level: 19,
            Name: "moonbeam",
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
            Name: "true strike",
            Type: Bonus,
            Boost: {
                Property: "Damage",
                Type: "Percentage",
                Percentage: 10,
            },
            Duration: 5, 
        },
        BarkSkin: {
            Level: 2,
            Name: "bark skin",
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
            Name: "stone skin",
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
            Name: "bless",
            Type: Bonus,
            Boost: {
                Property: "Damage",
                Type: "Max",
            },
            Duration: 8, 
        },
        Blur: {
            Level: 6,
            Name: "blur",
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
            Type: Bonus,
            Damage: {
                Type: "Percentage",
                Percentage: 20,
            },
            Target: Surrounding,
            Duration: 5, 
        },

        // Motion Modifiers
        Confusion: {
            Level: 5,
            Name: "confusion",
            Type: Motion,
            Effect: "Random",
            Duration: 3, 
        },
        Entangle: {
            Level: 9,
            Name: "entangle",
            Type: Motion,
            Effect: "Immobilize",
            Duration: 5, 
        },
        ShockingGrasp: {
            Level: 13,
            Name: "shocking grasp",
            Type: Motion,
            Effect: "Immobilize",
            Damage: {Min: 3, max: 5},
            Duration: 2, 
        },
        Earthquake: {
            Level: 16,
            Name: "earthquake",
            Type: Motion,
            Effect: "Immobilize",
            Target: Surrounding,
            Duration: 3, 
        },

        // Other
        CreateFood: {
            Level: 3,
            Name: "create food",
            Effect: "CreateFood",
        },
        DetectMonster: {
            Level: 4,
            Name: "detect monster",
            Effect: "DetectMonster",
        },
        FindTraps: {
            Level: 6,
            Name: "Find traps",
            Effect: "FindTraps",
        },
        MistyStep: {
            Level: 11,
            Name: "misty step",
            Effect: "MistyStep",
        },
        Invisibility: {
            Level: 13,
            Name: "invisibility",
            Effect: "Invisibility",
            Duration: 12,
        },
        GlobeOfInvulnerability: {
            Level: 17,
            Name: "globe of invulnerability",
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