import UtilityAssets from "./UtilityAssets.js"

export const StaticAssets = {

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
    },

    UniqueItems: {
        // Keys
        IronKey: {
            type: "key",
            Name: "iron key",
            DoorId: 1,
            image: "iron_key",
            Weight: 0.1
        },
    },

    Backpacks: {
        BagOfHolding: {}
    },

    Items: {
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
            image: "apple",
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

    Spells: {
        // Spells
        FireballSpell: {
            Level: 1,
            Name: "fireball",
            Type: "spell",
            Weight: 0.1,
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