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

    ShowFullMap: false
    ,

    Player: {
        x: 1,
        y: 2,
        Health: 0,
        MaxHealth: 0,
        Mana: 0,
        MaxMana: 0,
        Stamina: 1,
        Luck: null,
        Constitution: null,
        Strength: null,
        Dexterity: null,
    },

    Backpack: {
        maxItems: 5,
        Items: [
            StaticAssets.Items.ManaPotion,
        ],
    },

    LootContainers: [
        {
            id: 1,
            x: 2,
            y: 4,
            name: "chest",
            article: "a",
            items: [
                StaticAssets.UniqueItems.IronKey,
                UtilityAssets.GenerateRandomItems.Level1
            ]
        }
    ],

    LockedDoors: [
        {
            id: 1,
            x: 3,
            y: 2,
            key: "iron key",
            unlocked: true,
        },
    ],
}

export default DynamicAssets