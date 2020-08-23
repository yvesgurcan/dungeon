const SpellTypes = {
    Heal: 'Heal',
    Attack: 'Attack',
    Motion: 'Motion',
    Bonus: 'Bonus'
    // "Other" type is omitted
};

const SpellTargets = {
    Surrounding: 'Surrounding',
    Facing: 'Facing',
    Adjacent: 'Adjacent'
};

// Generic scroll items
const ScrollItemTypes = {
    AttackSpell: {
        Type: 'scroll',
        image: 'scroll_attack',
        Weight: 0.1
    },
    BonusSpell: {
        Type: 'scroll',
        image: 'scroll_bonus',
        Weight: 0.1
    },
    MotionModifierSpell: {
        Type: 'scroll',
        image: 'scroll_motion_modifier',
        Weight: 0.1
    },
    OtherSpell: {
        Type: 'scroll',
        image: 'scroll_other',
        Weight: 0.1
    }
};

const WeaponClasses = {
    Dagger: 'dagger',
    Sword: 'sword',
    Blunt: 'blunt',
    Staff: 'staff',
    Bow: 'bow',
    Crossbow: 'crossbow'
};

const MeleeWeaponClasses = Object.keys(WeaponClasses)
    .filter(Key => {
        return (
            WeaponClasses[Key] !== 'Bow' && WeaponClasses[Key] !== 'Crossbow'
        );
    })
    .map(Key => {
        return WeaponClasses[Key];
    });

export const WorldAssets = {
    Races: {
        Dwarf: {
            Name: 'dwarf',
            AbilityBoost: { Constitution: 2 },
            Description:
                'Dwarves are used to the hardship of the mountains. They are very resistant to attacks.'
        },
        Elf: {
            Name: 'elf',
            AbilityBoost: { Dexterity: 2 },
            Description:
                'Elves are atuned to their body. Their concentration gives them a great advantage during combat.'
        },
        Human: {
            Name: 'human',
            AbilityBoost: {
                Constitution: 1,
                Strength: 1,
                Intelligence: 1
            },
            Description:
                'Humans are polyvalent. Their instincts make them fit for any kind of adventure.'
        },
        Gnome: {
            Name: 'gnome',
            AbilityBoost: { Intelligence: 2 },
            Description: 'Gnomes are a smart people. They can be great wizards.'
        }
    },

    Classes: {
        Barbarian: {
            Name: 'barbarian',
            // STR (+) - CON - DEX
            AbilityPriorities: [
                'Strength',
                'Constitution',
                'Dexterity',
                'Intelligence'
            ],
            Proficiency: Object.keys(WeaponClasses).map(Key => {
                return WeaponClasses[Key];
            }),
            Description:
                'Barbarians are vigorous warriors. Their innate combat skills give them an advantage with all weapons. Conversely, barbarians have absolutely no interest in magic.'
        },
        Cleric: {
            Name: 'cleric',
            Spellcaster: true,
            // INT - CON - DEX
            AbilityPriorities: [
                'Intelligence',
                'Constitution',
                'Dexterity',
                'Strength'
            ],
            Proficiency: ['blunt', 'staff'],
            Description:
                'Clerics are spiritual guides who have a strong connection with the plane of immateriality. Their faith allows them to summon the powers of their gods. Clerics are experimented with blunt weapons and staves.'
        },
        Fighter: {
            Name: 'fighter',
            // STR (+) - DEX - CON
            AbilityPriorities: [
                'Strength',
                'Dexterity',
                'Constitution',
                'Intelligence'
            ],
            Proficiency: MeleeWeaponClasses,
            Description:
                'Fighters are strong beings that consider combat as a sport. Their meticulous training make them more precise than barbarians. Fighters tend to have a slightly weaker constitution, though. They are unable to cast spells but they know the secrets of all melee weapons.'
        },
        Paladin: {
            Name: 'paladin',
            Spellcaster: true,
            // STR - INT - CON
            AbilityPriorities: [
                'Strength',
                'Intelligence',
                'Constitution',
                'Dexterity'
            ],
            Proficiency: ['sword', 'blunt'],
            Description:
                'Paladins are both skilled soldiers and well-versed into the arcane of magic. Their weapon of choice is the sword but they also do a good deal of damage with blunt weapons.'
        },
        Ranger: {
            Name: 'ranger',
            // DEX (+) - CON - STR
            AbilityPriorities: [
                'Dexterity',
                'Constitution',
                'Strength',
                'Intelligence'
            ],
            Proficiency: ['dagger', 'sword', 'bow', 'crossbow'],
            Description:
                'Rangers are stealthy individuals. Their incredible dexterity is instrumental during combats. They excel at the art of dodging and hitting their foes. Rangers are good with daggers, swords, bows, and crossbows.'
        },
        Wizard: {
            Name: 'wizard',
            Spellcaster: true,
            // INT - DEX - CON
            AbilityPriorities: [
                'Intelligence',
                'Dexterity',
                'Constitution',
                'Strength'
            ],
            Proficiency: ['dagger', 'staff'],
            Description:
                'Wizard are powerful mages. Their dedicated study of the world and its essence give them the ability to manipulate reality. They cast spells to protect themselves or destroy their opponents. Wizards are proficient with staves and daggers.'
        }
    },

    Items: {
        // Spellbook
        SpellBook: {
            Type: 'spellbook',
            Name: 'spellbook',
            Image: 'spellbook',
            Description:
                'This is where you keep notes on how to cast spells. Without this book, your magic is useless.',
            Weight: 4
        },

        // Backpacks
        BagOfHolding: {
            Type: 'backpack',
            Name: 'bag of holding',
            Image: 'backpack_holding', // rename backpack_Sack2.png
            Description:
                'The best backpack you could dream of. Lots of room in there.',
            MaxItems: 48
        },
        TravelerBag: {
            Type: 'backpack',
            Name: "traveler's bag",
            Image: 'backpack_traveler',
            Description:
                'A must-have for adventurers. Holds a comfortable number of items.',
            MaxItems: 32
        },
        DuffelBag: {
            Type: 'backpack',
            Name: 'duffel bag',
            Description:
                'This bag allows you to bring additional items with you.',
            MaxItems: 16
        },
        Haversack: {
            Type: 'backpack',
            Name: 'haversack',
            Description: 'A small bag where you can carry essential items.',
            MaxItems: 10
        },

        // Keys
        IronKey: {
            type: 'key',
            Name: 'iron key',
            image: 'key_iron',
            Weight: 0.1
        },
        BrassKey: {
            type: 'key',
            Name: 'brass key',
            image: 'key_brass'
        },
        OrnateKey: {
            type: 'key',
            Name: 'ornate key',
            image: 'key_ornate'
        },

        // Miscellani
        Rock: {
            Level: 1,
            Type: 'misc',
            Name: 'rock',
            image: 'rock',
            Weight: 2
        },

        // Potions
        HealthPotion: {
            Level: 1,
            Type: 'potion',
            Name: 'health potion',
            image: 'potion_health',
            Heal: 'Health',
            Strength: 12,
            Action: 'DrinkPotion',
            Description:
                'This vial contains a precious liquid that heals your wounds immediately.',
            Weight: 0.5
        },
        ManaPotion: {
            Level: 1,
            Type: 'potion',
            Name: 'mana potion',
            image: 'potion_mana',
            Heal: 'Mana',
            Strength: 8,
            Action: 'DrinkPotion',
            Description:
                'A precious item for spellcasters. This potion replenishes your magic energy without the need to rest.',
            Weight: 0.5
        },
        StaminaPotion: {
            Level: 1,
            Type: 'potion',
            Name: 'potion of vigor',
            image: 'potion_stamina',
            Heal: 'Stamina',
            Strength: 30,
            Action: 'DrinkPotion',
            Description:
                'A useful beverage for adventurers that need a boost to keep going.',
            Weight: 0.5
        },

        // Weapons
        // Swords
        EmeraldDagger: {
            Name: 'emerald dagger',
            Type: 'weapon',
            image: 'weapon_dagger_emerald',
            Damage: { Min: 3, Max: 7 },
            Weight: 3
        },
        Sword: {
            Name: 'sword',
            Type: 'weapon',
            image: 'weapon_sword',
            Damage: { Min: 5, Max: 9 }
        },
        // Bows
        Bow: {
            Type: 'weapon',
            Name: 'bow',
            image: 'weapon_bow'
        },
        // Staff
        SimpleStaff: {
            Name: 'simple staff',
            Type: 'weapon',
            image: 'weapon_staff'
        },
        BurningStaff: {
            Name: 'burning staff',
            Type: 'staff',
            Image: 'weapon_staff_burning' // rename weapon_Staff2
        },
        StaffOfLife: {
            Name: 'staff of life',
            Type: 'staff',
            Image: 'weapon_staff_life' // rename weapon_Staff3
        },
        StaffOfintelligence: {
            Name: 'staff of intelligence',
            Type: 'staff',
            Image: 'weapon_staff_intelligence' // staff0
        },
        // Shield
        CrusaderShield: {
            Name: 'crusader shield',
            Type: 'shield',
            Image: 'shield_crusader'
        },
        TitaniumShield: {
            Name: 'titanium_shield',
            Type: 'shield',
            Image: 'shield_titanium'
        },
        // Gear
        // Necklaces
        AmuletOfMagic: {
            Name: 'amulet of magic',
            Type: 'necklace',
            image: 'amulet_magic'
        },
        SkullAmulet: {
            Name: 'skull amulet',
            Type: 'necklace',
            image: 'amulet_skull'
        },
        // Armors
        ChainmailArmor: {
            Name: 'chainmail armor',
            Type: 'armor',
            Image: 'armor_chainmail' // delete original; rename armor_ChestH1.png
        },
        SteelArmor: {
            Name: 'steel armor',
            Type: 'armor',
            Image: 'armor_steel' // rename armor_ChestG1.png
        },
        GoldArmor: {
            Name: 'gold armor',
            Type: 'armor',
            Image: 'armor_gold'
        },
        MithrilArmor: {
            Name: 'mithril armor',
            Type: 'armor',
            Image: 'armor_mithril'
        },
        TitaniumArmor: {
            Name: 'titanium armor',
            Type: 'armor',
            Image: 'armor_titanium'
        },
        // Boots
        LeatherBoots: {
            Name: 'leather boots',
            Type: 'boots',
            Image: 'boots_leather'
        },
        // Gloves
        LeatherGloves: {
            Name: 'leather gloves',
            Type: 'gloves',
            Image: 'gloves_leather'
        },
        // Helm
        SteelHelm: {
            Name: 'steel helm',
            Type: 'helm',
            Image: 'steel_helm' // rename helm_01.png
        },
        KnightHelm: {
            Name: 'knight helm',
            Type: 'helm',
            Image: 'helm_knight'
        },
        // Food
        Leaf: {
            Level: 1,
            Name: 'leaf',
            Type: 'food',
            image: 'food_leaf',
            RestoreStamina: 2,
            Action: 'ConsumeFood',
            Description:
                "There's probably more nutritious food that this leaf.",
            Weight: 0.1
        },
        Apple: {
            Level: 1,
            Name: 'apple',
            Type: 'food',
            image: 'food_apple',
            RestoreStamina: 3,
            Action: 'ConsumeFood',
            Description: 'A delicious apple.',
            Weight: 0.3
        },
        Berries: {
            Level: 1,
            Name: 'berries',
            Type: 'food',
            image: 'food_berries',
            RestoreStamina: 3,
            Action: 'ConsumeFood',
            Description: 'Some sort of juicy fruit.',
            Weight: 0.2
        },
        Grapes: {
            Level: 1,
            Name: 'grapes',
            Type: 'food',
            image: 'food_grapes',
            RestoreStamina: 3,
            Action: 'ConsumeFood',
            Description: 'Nothing special about these grapes.',
            Weight: 0.4
        },
        Bread: {
            Level: 1,
            Name: 'bread',
            Type: 'food',
            image: 'food_bread',
            RestoreStamina: 5,
            Action: 'ConsumeFood',
            Description: "Probably freshly baked. Where's the cheese?",
            Weight: 0.5
        },
        Chicken: {
            Level: 1,
            Name: 'chicken',
            Type: 'food',
            image: 'food_chicken',
            RestoreStamina: 7,
            Action: 'ConsumeFood',
            Description: 'Would be even better in a soup.',
            Weight: 0.4
        },
        Sausage: {
            Level: 1,
            Name: 'sausage',
            Type: 'food',
            image: 'food_sausage',
            RestoreStamina: 7,
            Action: 'ConsumeFood',
            Description: 'Meat!',
            Weight: 0.3
        },

        // Scrolls
        // Attack
        MagicArrowScroll: {
            Level: 1,
            Name: 'scroll of magic arrow',
            Spell: 'MagicArrow',
            ...ScrollItemTypes.AttackSpell
        },
        ColdTouchScroll: {
            Name: 'scroll of cold touch',
            Spell: 'ColdTouch',
            ...ScrollItemTypes.AttackSpell
        },
        FireballScroll: {
            Name: 'scroll of fireball',
            Spell: 'Fireball',
            ...ScrollItemTypes.AttackSpell
        },
        VampiricTouchScroll: {
            Name: 'scroll of vampiric touch',
            Spell: 'VampiricTouch',
            ...ScrollItemTypes.AttackSpell
        },
        ChainLightningScroll: {
            Name: 'scroll of chain lightning',
            Spell: 'ChainLightning',
            ...ScrollItemTypes.AttackSpell
        },
        CircleOfDeathScroll: {
            Name: 'scroll of circle of death',
            Spell: 'CircleOfDeath',
            ...ScrollItemTypes.AttackSpell
        },
        MoonbeamScroll: {
            Name: 'scroll of moonbeam',
            Spell: 'Moonbeam',
            ...ScrollItemTypes.AttackSpell
        },
        // Heal
        FirstAidScroll: {
            Level: 1,
            Name: 'scroll of first aid',
            Spell: 'FirstAid',
            ...ScrollItemTypes.BonusSpell
        },
        AlertnessScroll: {
            Name: 'scroll of alertness',
            Spell: 'Alertness',
            ...ScrollItemTypes.BonusSpell
        },
        HealWoundsScroll: {
            Name: 'scroll of heal wounds',
            Spell: 'HealWounds',
            ...ScrollItemTypes.BonusSpell
        },
        RegenerateScroll: {
            Name: 'scroll of regenerate',
            Spell: 'Regenerate',
            ...ScrollItemTypes.BonusSpell
        },
        // Bonus
        TrueStrikeScroll: {
            Name: 'scroll of true strike',
            Spell: 'TrueStrike',
            ...ScrollItemTypes.BonusSpell
        },
        BarkSkinScroll: {
            Level: 1,
            Name: 'scroll of bark sin',
            Spell: 'BarkSkin',
            ...ScrollItemTypes.BonusSpell
        },
        StoneSkinScroll: {
            Name: 'scroll of stone skin',
            Spell: 'StoneSkin',
            ...ScrollItemTypes.BonusSpell
        },
        BlessScroll: {
            Name: 'scroll of bless',
            Spell: 'Bless',
            ...ScrollItemTypes.BonusSpell
        },
        BlurScroll: {
            Name: 'scroll of blur',
            Spell: 'Blur',
            ...ScrollItemTypes.BonusSpell
        },
        MirrorShieldScroll: {
            Name: 'scroll of mirror shield',
            Spell: 'MirrorShield',
            ...ScrollItemTypes.BonusSpell
        },
        BerserkScroll: {
            Name: 'scroll of berserk',
            Spell: 'Berserk',
            ...ScrollItemTypes.BonusSpell
        },
        // Motion Modifiers
        ConfusionScroll: {
            Name: 'scroll of confusion',
            Spell: 'Confusion',
            ...ScrollItemTypes.MotionModifierSpell
        },
        EntangleScroll: {
            Name: 'scroll of entangle',
            Spell: 'Entangle',
            ...ScrollItemTypes.MotionModifierSpell
        },
        ShockingGraspScroll: {
            Name: 'scroll of shocking grasp',
            Spell: 'ShockingGrasp',
            ...ScrollItemTypes.MotionModifierSpell
        },
        EarthquakeScroll: {
            Name: 'scroll of earthquake',
            Spell: 'Earthquake',
            ...ScrollItemTypes.MotionModifierSpell
        },
        // Other
        CreateFoodScroll: {
            Name: 'scroll of create food',
            Spell: 'CreateFood',
            ...ScrollItemTypes.OtherSpell
        },
        DetectMonsterScroll: {
            Name: 'scroll of detect monster',
            Spell: 'DetectMonster',
            ...ScrollItemTypes.OtherSpell
        },
        FindTrapsScroll: {
            Name: 'scroll of find traps',
            Spell: 'FindTraps',
            ...ScrollItemTypes.OtherSpell
        },
        MistyStepScroll: {
            Name: 'scroll of misty step',
            Spell: 'MistyStep',
            ...ScrollItemTypes.OtherSpell
        },
        InvisibilityScroll: {
            Name: 'scroll of invisibility',
            Spell: 'Invisibility',
            ...ScrollItemTypes.OtherSpell
        },
        GlobeOfInvulnerabilityScroll: {
            Name: 'scroll of globe of invulnerability',
            Spell: 'GlobeOfInvulnerability',
            ...ScrollItemTypes.OtherSpell
        }
    },

    // Placeholder usable in campaign assets' loot containers
    GenerateRandomItems: {
        Level1: {
            Level: 1,
            random: true
        }
    },

    // Spells
    Spells: {
        // Attack
        MagicArrow: {
            Level: 1,
            ManaCost: 3,
            Name: 'magic arrow',
            Image: 'spell_magic_arrow',
            Type: SpellTypes.Attack,
            // Cumulated Damage Range: 1-5
            Damage: { Min: 1, Max: 5 },
            Duration: 1,
            Description:
                'A low-level spell. A magic arrow shoots from your hand and pierces the flesh of your target.'
        },
        ColdTouch: {
            Level: 3,
            ManaCost: 7,
            Name: 'frost bite',
            Image: 'spell_cold_touch',
            Type: SpellTypes.Attack,
            // Cumulated Damage Range: 4-8
            Damage: { Min: 2, Max: 4 },
            Duration: 2,
            Description:
                'This spell inflicts cold, lasting damage to the creature you touch.'
        },
        Fireball: {
            Level: 5,
            ManaCost: 11,
            Name: 'fireball',
            Image: 'spell_fireball',
            Sound: 'spells/fireball',
            Type: SpellTypes.Attack,
            // Cumulated Damage Range: 6-12
            Damage: { Min: 6, Max: 12 },
            Duration: 1,
            Description: 'A burst of flame that briefly burns your enemy.'
        },
        VampiricTouch: {
            Level: 8,
            ManaCost: 16,
            Name: 'vampiric touch',
            Image: 'spell_vampiric_touch',
            Sound: 'spells/vampiric_touch',
            Type: SpellTypes.Attack,
            // Cumulated Damage Range: 4-10
            Damage: { Min: 4, Max: 10 },
            // Cumulated Health Restored Range: 4-10
            Vampiric: true,
            Duration: 1,
            Description:
                'This spell sucks a little bit of life from your target and transfers it to the caster.'
        },
        ChainLightning: {
            Level: 12,
            ManaCost: 26,
            Name: 'chain lightning',
            Image: 'spell_chain_lightning',
            Type: SpellTypes.Attack,
            // Cumulated Damage Range: 3-45 (1-15 * 3)
            Damage: { Min: 1, Max: 15 },
            Duration: 1,
            Target: SpellTargets.Adjacent,
            MaxTargets: 3,
            Description:
                'A lightning bolt hits a cluster of creatures that stand next to each other.'
        },
        CircleOfDeath: {
            Level: 16,
            ManaCost: 59,
            Name: 'circle of death',
            Image: 'spell_circle_of_death',
            Type: SpellTypes.Attack,
            // Cumulated Damage Range: 40-80 (5-10 * 8)
            Damage: { Min: 5, Max: 10 },
            Duration: 1,
            Target: SpellTargets.Surrounding,
            Description:
                'A wave of necrotic energy emanates from the caster and inflicts damage to all the enemy nearby.'
        },
        Moonbeam: {
            Level: 18,
            ManaCost: 79,
            Name: 'moonbeam',
            Image: 'spell_moonbeam',
            Type: SpellTypes.Attack,
            // Cumulated Damage Range: 30-120 (6-24 * 5)
            Damage: { Min: 3, Max: 12 },
            Duration: 2,
            Target: SpellTargets.Surrounding,
            MaxTargets: 5,
            Description:
                'Beautiful rays of light magically appear and target the foes surrounding you.'
        },

        // Heal
        FirstAid: {
            Level: 1,
            ManaCost: 4,
            Name: 'first aid',
            Image: 'spell_first_aid',
            Type: SpellTypes.Heal,
            // Cumulated Health Restored Range: 4-9
            Heal: {
                Property: 'Health',
                Min: 4,
                Max: 9
            },
            Duration: 1,
            Description: 'Slightly improves your health.'
        },
        Alertness: {
            Level: 3,
            ManaCost: 6,
            Name: 'alertness',
            Image: 'spell_alertness',
            Type: SpellTypes.Heal,
            // Cumulated Stamina Restored Range: 24-48
            Heal: {
                Property: 'Stamina',
                Min: 8,
                Max: 16
            },
            Duration: 3,
            Description: 'Relieves some of your fatigue.'
        },
        HealWounds: {
            Level: 6,
            ManaCost: 8,
            Name: 'heal wounds',
            Image: 'spell_heal_wounds',
            Type: SpellTypes.Heal,
            // Cumulated Health Restored Range: 6-16
            Heal: {
                Property: 'Health',
                Min: 6,
                Max: 16
            },
            Duration: 1,
            Description: 'Resorbs the most superficial injuries.'
        },
        Regenerate: {
            Level: 11,
            ManaCost: 19,
            Name: 'regenerate',
            Image: 'spell_regenerate',
            Type: SpellTypes.Heal,
            // Cumulated Health Restored Range: 18-33
            Heal: {
                Property: 'Health',
                Min: 6,
                Max: 11
            },
            Duration: 3,
            Description: 'A powerful spell that heals you gradually.'
        },

        // Bonus
        TrueStrike: {
            Level: 4,
            ManaCost: 7,
            Name: 'true strike',
            Image: 'spell_true_strike',
            Type: SpellTypes.Bonus,
            Boost: {
                Property: 'Damage',
                Type: 'Fixed',
                Fixed: 2
            },
            Duration: 5,
            Description:
                'Your attacks temporarily inflict a little bit more damage.'
        },
        BarkSkin: {
            Level: 1,
            ManaCost: 11,
            Name: 'bark skin',
            Image: 'spell_bark_skin',
            Sound: 'spells/bark_skin',
            Type: SpellTypes.Bonus,
            Boost: {
                Property: 'Armor',
                Type: 'Percentage',
                Percentage: 15
            },
            Duration: 10,
            Description:
                'Your skin gets a wood-like quality that makes you more resistant to attacks for a while.'
        },
        StoneSkin: {
            Level: 3,
            ManaCost: 19,
            Name: 'stone skin',
            Image: 'spell_stone_skin',
            Type: SpellTypes.Bonus,
            Boost: {
                Property: 'Armor',
                Type: 'Percentage',
                Percentage: 40
            },
            Duration: 15,
            Description:
                'This spell turns the outer layer of your body into stone, making it harder to hit you for some time.'
        },
        Bless: {
            Level: 2,
            ManaCost: 13,
            Name: 'bless',
            Image: 'spell_bless',
            Type: SpellTypes.Bonus,
            Boost: {
                Property: 'Damage',
                Type: 'Max'
            },
            Duration: 8,
            Description:
                'This mystical spell momentarily helps you inflict the most damage to your foes.'
        },
        Blur: {
            Level: 6,
            ManaCost: 20,
            Name: 'blur',
            Image: 'spell_blur',
            Type: SpellTypes.Bonus,
            Boost: {
                Property: 'Damage',
                Type: 'Min'
            },
            Target: SpellTargets.Facing,
            Duration: 6
        },
        MirrorShield: {
            Level: 10,
            ManaCost: 36,
            Name: 'mirror shield',
            Image: 'spell_mirror_shield',
            Type: SpellTypes.Bonus,
            Damage: {
                Type: 'Percentage',
                Percentage: 20
            },
            Target: SpellTargets.Surrounding,
            Duration: 5
        },
        Berserk: {
            Level: 15,
            ManaCost: 41,
            Name: 'berserk',
            Image: 'spell_berserk',
            Type: SpellTypes.Bonus,
            Boost: {
                Property: 'Strength',
                Type: 'Absolute',
                Amount: 10
            },
            Duration: 5
        },

        // Motion Modifiers
        Confusion: {
            Level: 5,
            ManaCost: 17,
            Name: 'confusion',
            Image: 'spell_confusion',
            Type: SpellTypes.Motion,
            Effect: 'Random',
            Duration: 3
        },
        Entangle: {
            Level: 9,
            ManaCost: 18,
            Name: 'entangle',
            Image: 'spell_entangle',
            Type: SpellTypes.Motion,
            Effect: 'Immobilize',
            Duration: 5
        },
        ShockingGrasp: {
            Level: 13,
            ManaCost: 25,
            Name: 'shocking grasp',
            Image: 'spell_shocking_grasp',
            Type: SpellTypes.Motion,
            Effect: 'Immobilize',
            Damage: { Min: 3, max: 5 },
            Duration: 2
        },
        Earthquake: {
            Level: 16,
            ManaCost: 69,
            Name: 'earthquake',
            Image: 'spell_earthquake',
            Type: SpellTypes.Motion,
            Effect: 'Immobilize',
            Target: SpellTargets.Surrounding,
            Duration: 3
        },

        // Other
        CreateFood: {
            Level: 3,
            ManaCost: 9,
            Name: 'create food',
            Image: 'spell_create_food',
            Effect: 'CreateFood'
        },
        DetectMonster: {
            Level: 4,
            ManaCost: 12,
            Name: 'detect monster',
            Image: 'spell_detect_monster',
            Effect: 'DetectMonster'
        },
        FindTraps: {
            Level: 7,
            ManaCost: 14,
            Name: 'Find traps',
            Image: 'spell_find_traps',
            Effect: 'FindTraps'
        },
        MistyStep: {
            Level: 11,
            ManaCost: 23,
            Name: 'misty step',
            Image: 'spell_misty_step',
            Sound: 'spells/misty_step',
            Effect: 'MistyStep'
        },
        Invisibility: {
            Level: 14,
            ManaCost: 78,
            Name: 'invisibility',
            Image: 'spell_invisibility',
            Effect: 'Invisibility',
            Duration: 12
        },
        GlobeOfInvulnerability: {
            Level: 17,
            ManaCost: 89,
            Name: 'globe of invulnerability',
            Image: 'spell_globe_of_invulnerability',
            Effect: 'Invulnerability',
            Duration: 5
        }
    },

    Bestiary: {
        // Forest
        WinterWolf: {},
        Hyena: {},
        PoisonousSnake: {},
        Boar: {},
        BlackBear: {},
        SwarmOfWasps: {},
        Kobold: {},
        Gnoll: {},
        Dryad: {},

        // Subterranean
        Bullywug: {},
        Lizard: {},
        GiantRat: {},
        EvilSpider: {},
        Troglodyte: {},
        DeepRothe: {},

        // Undead
        Zombie: {},
        Skeleton: {},
        Ghoul: {},
        HellHound: {},
        Mummy: {
            Name: 'mummy',
            Level: 1,
            Health: 14,
            Damage: { Min: 2, Max: 5 }
        },
        Banshee: {},
        LostSoul: {},
        Vampire: {},
        BoneDevil: {},
        Lich: {},
        PitFiend: {},

        // Humanoids
        Bandit: {},
        TribalWarrior: {},
        Assassin: {},

        // Green Skins
        Goblin: {
            Name: 'goblin',
            Type: 'Green Skin',
            Level: 1,
            XP: 15,
            Health: 12,
            Damage: { Min: 1, Max: 4 }
        },
        Hobgoblin: {
            Name: 'hobgoblin',
            Type: 'Green Skin',
            Level: 1,
            XP: 20,
            Health: 11,
            Damage: { Min: 2, Max: 6 }
        },
        Orc: {
            Name: 'orc',
            Type: 'Green Skin',
            Level: 1,
            XP: 20,
            Health: 30,
            Damage: { Min: 4, Max: 7 }
        },
        Troll: {},
        Dretch: {},

        // Giants
        HalfOgre: {},
        Ogre: {},
        Cyclops: {},
        Golem: {},
        StoneGiant: {},

        // Magic
        Acolyte: {},
        Sprite: {},
        Satyr: {},
        Elemental: {},
        Djinn: {},

        // Hybrids
        Harpy: {},
        Centaur: {},
        Manticore: {},
        Minotaur: {},

        // Fun
        Flumph: {},
        AnimatedTable: {}
    }
};

export default WorldAssets;
