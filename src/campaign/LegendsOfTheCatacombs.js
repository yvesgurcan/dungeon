import WorldAssets from "../WorldAssets.js"
import Utilities from "../Utilities.js"

export const CampaignAssets = {

    // Let the player create their character at the beginning of the campaign
    CreateCharacter: false,

    // Player start
    Player: {
        // debug
        Name: "Leto Seldon",
        Mana: 999,
        Health: 999,
        Level: Utilities.MaxSpellLevel,
        Class: WorldAssets.Classes.Wizard,
        SpellBook: {
            Spells: Object.keys(WorldAssets.Spells).map(Key => {return WorldAssets.Spells[Key]}),
        },
        //
        x: 10,
        y: 14,
        Facing: "East",
    },

    Gear: {
        LeftHand: WorldAssets.Items.EmeraldDagger,
        RightHand: null,
        PreparedSpell1: null,
        PreparedSpell2: null,
    },

    Backpack: {
        maxItems: 28,
        Weight: 0,
        Items: [
            {...WorldAssets.Items.HealthPotion, Id: 1},
            {...WorldAssets.Items.HealthPotion, Id: 12},
            {...WorldAssets.Items.HealthPotion, Id: 13},
            {...WorldAssets.Items.HealthPotion, Id: 14},
            {...WorldAssets.Items.ManaPotion, Id: 3},
            {...WorldAssets.Items.ManaPotion, Id: 6},
            {...WorldAssets.Items.ManaPotion, Id: 7},
            {...WorldAssets.Items.ManaPotion, Id: 8},
            {...WorldAssets.Items.ManaPotion, Id: 9},
            {...WorldAssets.Items.ManaPotion, Id: 10},
            {...WorldAssets.Items.ManaPotion, Id: 11},
            {...WorldAssets.Items.StaminaPotion, Id: 4},
            WorldAssets.Items.AmuletOfMagic,
            WorldAssets.Items.SkullAmulet,
            WorldAssets.Items.Sword,
            WorldAssets.Items.SimpleStaff,
            WorldAssets.Items.MagicArrowScroll,
            WorldAssets.Items.HealWoundsScroll,
            WorldAssets.Items.EntangleScroll,
            WorldAssets.Items.DetectMonsterScroll,
            {...WorldAssets.Items.Apple, Id: 5},
        ],
    },

    LootContainers: [
        {
            Id: 1,
            x: 10,
            y: 13,
            Name: "skeleton",
            items: [
                // WorldAssets.UniqueItems.IronKey,
                {...WorldAssets.Items.HealthPotion, Id: 2}
            ]
        },
    ],

    // LockedDoors

    Monsters: [
        {...WorldAssets.Bestiary.Orc,
            x: 12,
            y: 13,
            Id: 2,
            Name: "cell keeper1",
            Damage: {Min: 1, Max: 4},
            Stationary: true,
        },
        {...WorldAssets.Bestiary.Orc,
            x: 12,
            y: 14,
            Id: 1,
            Name: "cell keeper2",
            Damage: {Min: 1, Max: 4},
            Stationary: true,
        },
        {...WorldAssets.Bestiary.Orc,
            x: 12,
            y: 15,
            Id: 3,
            Name: "cell keeper3",
            Damage: {Min: 1, Max: 4},
            Stationary: true,
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
                `You're still trying to get your bearings but the darkness is too thick and too still.

                Suddenly, you hear something. The sound resembles the jingle of a bunch of keys. Silence again. Then, a huge clang. You turn you head in the direction of the loud noise. A slit of bright light appears a few feet away. The tiny opening slowly becomes big and wide. The sound of rusty hinges turning on themselves, a deep and interminable complaint, makes you grind your teeth. Blinded by the intense brightness, you can only see a vague, dark shape in the middle of a rectangle of light.
                
                A guttural voice says 'Come with me.' You can hear a discernible accent. As your eyes start to catch sight of what's in front of you, you recognize the stout silhouette of a small orc. On his belt, a massive key ring.

                Outside the cell, you hear torches crackling.

                You can feel the orc staring at you. He lets a couple of menacing breaths out.

                After some long seconds, you position your body towards the door, and take a step forward. The orc turns to let you out of this dingy, confined room.

                Before the cellkeeper has time to set a safe distance between you and him, you run towards him and hit the creature in the face!
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

export default CampaignAssets