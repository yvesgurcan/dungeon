import UtilityAssets from "./UtilityAssets.js"

export const StaticAssets = {

    Messages: {
        Collision: "You can't go there.",
        LockedDoor: "You try to open the door... it's locked.",
        PlayerMissed: "You missed your target!",
        PlayerDead: "Ouch! You are dead.",
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
            image: "key",
            Weight: 0.1
        }
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
            Weight: 0.5,
        },
        ManaPotion: {
            Level: 1,
            Type: "potion",
            Name: "mana potion",
            image: "potion_mana",
            Weight: 0.5,
        },
        StaminaPotion: {
            Level: 1,
            Type: "potion",
            Name: "potion of vigor",
            image: "potion_stamina",
            Weight: 0.5,
        },
        CurePoisonPotion: {
            Level: 1,
            Type: "potion",
            Name: "cure poison",
            image: "potion_cure_poison",
            Weight: 0.5,
        },
        // Swords
        FireSword: {
            Level: 2,
            Name: "fire sword",
            Type: "weapon",
            Weight: 3,
        },
        // Scrolls
        FireballScroll: {
            Level: 1,
            Name: "fireball scroll",
            Type: "scroll",
            Spell: "FireballSpell",
            image: "spell_fireball",
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