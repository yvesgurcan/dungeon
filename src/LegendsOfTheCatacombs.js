import WorldAssets from "./WorldAssets.js"

export const CampaignAssets = {

    // Let the player create their character at the beginning of the campaign
    CreateCharacter: process.env.REACT_APP_RELEASE === "stable" ? true : false,

    // Player start
    Player: {
        x: 10,
        y: 14,
        Facing: "East",
        Health: 19,
    },

    AvailableStartSpell:
        Object.keys(WorldAssets.Spells).map(Key => {return WorldAssets.Spells[Key]}).filter(Spell => {return Spell.Level === 1})
    ,

    Gear: {
        // top
        Head: null,
        Neck: null,
        // middle
        Chest: null,
        LeftHand: WorldAssets.Items.Sword,
        RightHand: null,
        LeftFinger: null,
        RightFinger: null,
        // bottom
        Feet: null,
        // back
        Quiver: null,
    },

    Backpack: {
        maxItems: 10,
        Items: [

            
            {...WorldAssets.Items.ManaPotion},
            {...WorldAssets.Items.HealthPotion},
            {...WorldAssets.Items.StaminaPotion},
            {...WorldAssets.Items.ManaPotion},
            {...WorldAssets.Items.HealthPotion},
            {...WorldAssets.Items.StaminaPotion},
            
            /*
            {...WorldAssets.Items.ManaPotion},
            {...WorldAssets.Items.ManaPotion},
            {...WorldAssets.Items.ManaPotion},
            */
            

            /*
            {...WorldAssets.Items.HealthPotion},
            {...WorldAssets.Items.HealthPotion},
            {...WorldAssets.Items.HealthPotion},
            {...WorldAssets.Items.HealthPotion},
            {...WorldAssets.Items.StaminaPotion},
            WorldAssets.Items.AmuletOfMagic,
            WorldAssets.Items.SkullAmulet,
            WorldAssets.Items.Sword,
            WorldAssets.Items.SimpleStaff,
            WorldAssets.Items.MagicArrowScroll,
            WorldAssets.Items.HealWoundsScroll,
            WorldAssets.Items.EntangleScroll,
            WorldAssets.Items.DetectMonsterScroll,
            {...WorldAssets.Items.Apple},
            */
            
        ],
    },
    
    Maps: {
        
    },

    LootContainers: [
        {
            x: 10,
            y: 13,
            Name: "skeleton",
            items: [
                // WorldAssets.UniqueItems.IronKey,
                {...WorldAssets.Items.HealthPotion},
                {...WorldAssets.Items.ManaPotion},
                {...WorldAssets.Items.ManaPotion},
            ]
        },
        {
            x: 17,
            y: 9,
            Name: "dead body",
            items: [
                {...WorldAssets.Items.Apple},
                {...WorldAssets.Items.Bread},
            ]
        },
        {
            x: 16,
            y: 15,
            Name: "small bag",
            items: [
                {...WorldAssets.Items.Rock},
                {...WorldAssets.Items.StaminaPotion},
            ]
        },
        {
            x: 11,
            y: 20,
            Name: "chest",
            items: [
                {...WorldAssets.Items.HealthPotion},
                {...WorldAssets.Items.ManaPotion},
                {...WorldAssets.Items.Chicken},
                {...WorldAssets.Items.Bow},
            ]
        },
    ],

    // LockedDoors

    Monsters: [
        /*{...WorldAssets.Bestiary.Orc,
            x: 12,
            y: 13,
            Name: "cell keeper1",
            Damage: {Min: 1, Max: 4},
            Stationary: true,
        },*/
        {...WorldAssets.Bestiary.Orc,
            x: 12,
            y: 14,
            Name: "cell keeper",
            Stationary: true,
        },
        /*{...WorldAssets.Bestiary.Orc,
            x: 12,
            y: 15,
            Name: "cell keeper3",
            Damage: {Min: 1, Max: 4},
            Stationary: true,
        },*/
        {...WorldAssets.Bestiary.Goblin,
            x: 14,
            y: 7,
            Damage: {Min: 5, Max: 10},
        },
        {...WorldAssets.Bestiary.Orc,
            x: 15,
            y: 21,
            Health: 70,
            Damage: {Min: 15, Max: 20},
        },
    ],

    // This text will be displayed when the player starts the map
    StartText: {
        text:
            `You slowly wake up. Ouch! Your head hurts...

            Where are you?
            
            You try to examine your surroundings, but your eyes can't see a thing. It's too dark. Night time? There's not a star in the sky.
            
            A terrible stench makes you belch. What the hell is this putrid smell?! You must be in some sort of small enclosed space--a basement, without any window.
            
            You become aware of the fact that you are lying down. You raise your left arm and touch your head. Something hot above your left eyebrow--must be blood. Probably a bad wound.
            
            With much effort, you manage to get in an upright position and find a vertical wall behind you to support your back. Little by little, you slide up the wall and, finally, stand up.`
    },

    Text: [
        {
            accessPoints: [{x: 10, y: 13, SingleTile: true}],
            image: "bones",
            text:
                `As you take a few steps ahead of you, you stumble on something on the ground.

                What the heck?

                You bend towards the ground with caution. When your fingers can reach what's down there, you feel something porous and dry...`
        },
        {
            accessPoints: [{x: 11, y: 13}, {x: 11, y: 14}, {x: 11, y: 15}, ],
            text:
                `You're still trying to get your bearings but the darkness is too thick and too still.

                Suddenly, you hear something. The sound resembles the jingle of a bunch of keys. Silence again. Then, a huge clang. You turn you head in the direction of the loud noise. A slit of bright light appears a few feet away. The tiny opening slowly becomes big and wide. The sound of rusty hinges turning on themselves, a deep and interminable complaint, makes you grind your teeth. Blinded by the intense brightness, you can only see a vague, dark shape in the middle of a rectangle of light.
                
                A guttural voice says 'Come with me.' You can hear a discernible accent. As your eyes start to catch sight of what's in front of you, you recognize the stout silhouette of a small orc. On his belt, a massive key ring.

                Outside the cell, you hear torches crackling.

                You can feel the orc staring at you. He lets a couple of menacing breaths out.

                After some long seconds, you position your body towards the door, and take a step forward. The orc turns to let you out of this dingy, confined room.

                Before the cellkeeper has time to set a safe distance between you and him, you run towards him and hit the creature in the face!
                `
        },
        {
            accessPoints: [{x: 14, y: 14}],
            text:
                `Free at last! Run for your life!
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
        [" "," "," "," "," "," "," "," "," "," "," "," "," ","X"," ","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," "," ","X","D","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," ","X","X","X","X"," ","X","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," ","X"," "," "," "," "," ","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," ","X","X"," "," "," "," ","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," ","X","X"," "," "," ","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," "," "," "," "," ","X","X","X","X","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",],
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

export default CampaignAssets
