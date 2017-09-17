import StaticAssets from "./StaticAssets.js"

export const DynamicAssets = {

    currentMessage: ""
    ,

    currentText: StaticAssets.Text[0].text
    ,

    // creates an array without wall information
    WallMapRevealed:
        StaticAssets.WallMap.map(HorizontalLine => HorizontalLine.map(x => " ")),

    ShowFullMap: true
    ,

    Player: {
        x: 1,
        y: 2,
    },

    LootContainers: [
        {
            id: 1,
            x: 2,
            y: 4,
            type: "chest",
            Items: [
                StaticAssets.UniqueItems.IronKey
            ]
        }
    ],

    LockedDoors: [
        {
            id: 1,
            x: 3,
            y: 2,
            key: "iron key",
        },
    ],
}

export default DynamicAssets