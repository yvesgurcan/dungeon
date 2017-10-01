import StaticAssets from "./StaticAssets.js"
import UtilityAssets from "./UtilityAssets.js"
import Functions from "./Functions.js"

const Debug = true

export const DynamicAssets = {


    // debug
    Debug: Debug
    ,
    ShowFullMap: Debug || false
    ,
    NoClip: Debug || false
    ,
    GodMode: Debug || false
    ,

    currentMessage: ""
    ,

    currentText: StaticAssets.Text[0].text
    ,

    currentEvent: []
    ,

    // creates an array without wall information
    WallMapRevealed:
        StaticAssets.WallMap.map(HorizontalLine => HorizontalLine.map(x => " ")),

    Player: {
        x: 2,
        y: 3,
        Level: 1,
        XP: 0,
        Health: 0,
        MaxHealth: 0,
        Mana: 0,
        MaxMana: 0,
        Stamina: null,
        MaxStamina: null,
        MaxWeight: null,
        Luck: null, // deprecated
        Constitution: null,
        Strength: null,
        Dexterity: null,
        Intelligence: null,
        Name: "Leto Seldon",
    },

    Gear: {
        LeftHand: null,
        RightHand: StaticAssets.Items.FireSword,
        PreparedSpell1: StaticAssets.Items.FireballSpell,
        PreparedSpell2: null,
    },

    Backpack: {
        maxItems: 5,
        Weight: 0,
        Items: [],
    },

    LockedDoors: [
        {
            Id: 1,
            x: 3,
            y: 2,
            key: "IronKey",
        },
    ],

    LootContainers: [
        {
            Id: 1,
            x: 2,
            y: 4,
            Name: "chest",
            items: [
                {... StaticAssets.Items.Rock, Weight: Functions.RandomFloatFromRange(5,50)},
                StaticAssets.UniqueItems.IronKey,
                UtilityAssets.GenerateRandomItems.Level1,
                UtilityAssets.GenerateRandomItems.Level1,
                UtilityAssets.GenerateRandomItems.Level1,
            ]
        },
        {
            Id: 2,
            x: 7,
            y: 9,
            Name: "table",
            items: [
                StaticAssets.Items.HealthPotion,
            ]
        },
    ],

    Monsters: [
        {...
            StaticAssets.Bestiary.Orc,
            Id: 1,
            Stationary: true,
            x: 6,
            y: 3,
        },
        {...
            StaticAssets.Bestiary.Goblin,
            Id: 2,
            x: 15,
            y: 8,
        },
        {...
            StaticAssets.Bestiary.Goblin,
            Id: 3,
            x: 3,
            y: 8,
        },
        {...
            StaticAssets.Bestiary.Goblin,
            Id: 4,
            x: 8,
            y: 11,
        },
    ],

}

export default DynamicAssets