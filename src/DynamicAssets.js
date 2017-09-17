import StaticAssets from "./StaticAssets.js"

export const DynamicAssets = {
    currentMessage: ""
    ,
    currentText: StaticAssets.Text[0].text
    ,
    Player: {
        x: 1,
        y: 1,
    },
    LockedDoor: [
        {
            x: 3,
            y: 1,
            key: "emerald key",
            unlocked: true,
        },
    ],
}

export default DynamicAssets