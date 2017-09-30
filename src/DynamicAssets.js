import StaticAssets from "./StaticAssets.js"
import UtilityAssets from "./UtilityAssets.js"

export const DynamicAssets = {


    // debug
    ShowFullMap: true
    ,
    NoClip: true
    ,
    GodMode: true
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
        x: 10,
        y: 9,
        Level: 1,
        Health: 0,
        MaxHealth: 0,
        Mana: 0,
        MaxMana: 0,
        Stamina: null,
        MaxStamina: null,
        MaxWeight: null,
        Luck: null,
        Constitution: null,
        Strength: null,
        Dexterity: null,
        Intelligence: null,
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
                StaticAssets.UniqueItems.IronKey,
                UtilityAssets.GenerateRandomItems.Level1
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
            StaticAssets.Bestiary.Imp,
            Id: 1,
            Stationary: true,
            x: 6,
            y: 3,
        },
        {...
            StaticAssets.Bestiary.Imp,
            Id: 2,
            x: 15,
            y: 8,
        },
    ],

}

export default DynamicAssets