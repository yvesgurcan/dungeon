import StaticAssets from "./StaticAssets.js"

const Debug = true

export const DynamicAssets = {


    // debug
    Debug: Debug
    ,
    ShowFullMap: Debug || false
    ,
    NoClip: Debug || true
    ,
    GodMode: Debug || false
    ,

    currentEvent: []
    ,

    Player: {
        x: 10,
        y: 14,
        Facing: "East",
        Level: 1,
        XP: 0,
        Health: 0,
        MaxHealth: 0,
        Mana: 0,
        MaxMana: 0,
        Stamina: null,
        MaxStamina: null,
        MaxWeight: null,
        Constitution: null,
        Strength: null,
        Dexterity: null,
        Intelligence: null,
        Name: "Leto Seldon",
    },

    Gear: {
        LeftHand: StaticAssets.Items.Dagger,
        RightHand: null,
        PreparedSpell1: StaticAssets.Items.FireballSpell,
        PreparedSpell2: null,
    },

    Backpack: {
        maxItems: 28,
        Weight: 0,
        Items: [],
    },

    LootContainers: [
        {
            Id: 1,
            x: 10,
            y: 13,
            Name: "skeleton",
            items: [
                // StaticAssets.UniqueItems.IronKey,
                {...StaticAssets.Items.HealthPotion, Id: 2}
            ]
        },
    ],

    Monsters: [
        {...StaticAssets.Bestiary.Orc,
            x: 12,
            y: 14,
            Id: 1,
            Name: "cell-keeper",
            Stationary: true,
        },
    ],

    Text: [
        {
            text:
                `You slowly wake up. Ouch! Your head hurts...

                Where are you?
                
                You try to examine your surroundings, but your eyes can't see a thing. It's too dark. Night time? There's no star in the sky.
                
                A terrible stench makes you belch. What the hell is this putrid smell?! You must be in some sort of small enclosed space--a basement, without any window.
                
                You become aware of the fact that you are lying down. You raise your left arm and touch your head. Something hot above your left eyebrow--must be blood. Probably a bad wound.
                
                With much effort, you manage to get in an upright position and find a vertical wall behind you to support your back. Little by little, you slide up the wall and, finally, stand up.`
        },
        {
            accessPoints: [{x: 10, y: 13}],
            image: "bones",
            text:
                `As you take a few steps ahead of you, you stumble on something on the ground.

                What the heck?

                You bend towards the ground with caution. When your fingers can reach what's down there, you feel something porous and dry...`
        },
        {
            accessPoints: [{x: 11, y: 13}, {x: 11, y: 14}, {x: 11, y: 15}, ],
            text:
                `A huge noise.
                `
        },
    ],

    WallMap: [
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," ","X","X","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," ","X","X","X","X","X"," ","X","X","X","X","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," ","X"," "," "," ","X"," ","X"," "," "," ","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," ","X"," "," "," ","D"," ","D"," "," "," ","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," ","X"," "," "," ","X"," ","X"," "," "," ","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," ","X","X","X","X","X"," ","X","X","X","X","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," ","X"," ","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," ","X","X","X","X","X"," ","X","X","X","X","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," ","X"," "," "," ","X"," ","X"," "," "," ","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," ","X"," "," "," ","D"," ","D"," "," "," ","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," ","X"," "," "," ","X"," ","X"," "," "," ","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," ","X","X","X","X","X"," ","X","X","X","X","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," ","X","X","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
    ],

}

// start text
DynamicAssets.currentText =
    DynamicAssets.Text
    && DynamicAssets.Text[0]
    && DynamicAssets.Text[0].text
        ? DynamicAssets.Text[0].text
        : null

export default DynamicAssets