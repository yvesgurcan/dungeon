import StaticAssets from "./StaticAssets.js"
import UtilityAssets from "./UtilityAssets.js"

export const DynamicAssets = {

    currentMessage: ""
    ,

    currentText: StaticAssets.Text[0].text
    ,

    currentEvent: []
    ,

    // creates an array without wall information
    WallMapRevealed:
        StaticAssets.WallMap.map(HorizontalLine => HorizontalLine.map(x => " ")),

    ShowFullMap: true
    ,

    Player: {
        x: 1,
        y: 2,
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

    LootContainers: [
        {
            id: 1,
            x: 2,
            y: 4,
            name: "chest",
            items: [
                StaticAssets.UniqueItems.IronKey,
                UtilityAssets.GenerateRandomItems.Level1
            ]
        }
    ],

    LockedDoors: [
        {
            Id: 1,
            x: 3,
            y: 2,
            key: "IronKey",
        },
    ],
}

export default DynamicAssets