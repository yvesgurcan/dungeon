*Dungeon!* is an adventure game written in React.

## TL;DR
Go to <http://dungeon.yvesgurcan.com/stable/>. When the page loads, a default character with random ability scores is created for you. You can start playing right away.

## <a name="toc"/> Guide

- [Releases](#releases)
- [How to play](#how-to-play)
    - [Create Your Character](#create-your-character)
    - [Map](#map)
    - [Locked Doors](#locked-doors)
    - [Combat](#combat)
    - [Experience](#experience)
    - [Backpack](#backpack)
    - [Equipment](#equipment)
    - [Spellbook](#spellbook)
    - [Event Log](#event-log)
    - [Keyboard Shortcuts](#keyboard-shortcuts)
    - [Save/Load Game](#saveload-game)
- [Developer's Corner](#developers-corner)
    - [Install *Dungeon!*](#install-dungeon)

## [Releases](#toc)

*Dungeon!* is in pre-alpha. Since the game is constantly evolving, two different versions are released:
- a [stable release](http://dungeon.yvesgurcan.com/stable/)
- a [dev release](http://dungeon.yvesgurcan.com/build/).

It is recommended to play the [stable release](http://dungeon.yvesgurcan.com/stable/). Less features are available in this version of the game, but it is also less likely to crash.

The [dev release](http://dungeon.yvesgurcan.com/build/) is always an option, but the game might throw errors. Also, this version is experimental, which means that some debug features might be turned ON, altering the gameplay.

## [How to play](#toc)

### [Create Your Character](#toc)

When you start the game, you can choose to create your own character or use the characteristics that were automatically generated for you. Here are the 2 main aspects that define your character: 
- Race: The race that you choose will provide bonuses to some of your character's abilities.
- Class: The class that you select determines which abilities are the most important to your character. Each class excels at different types of weapons. Some classes also allow your character to cast [spells](#spellbook).

Your abilities (strength, dexterity, constitution, and intelligence) are generated in function of your race and your class. You may influence your ability scores by generating new base numbers randomly.

Spellcasters also get to choose a [spell](#spellbook) that they will have memorized from the get-go.

Whenever you are satisfied with your character, you may begin your adventure by clicking on "Let's play!". If you were to change your mind during the game, you can start again by clicking on "New Game".

### [Map](#toc)
Use the directional arrows on the interface or use [keyboard shortcuts](#keyboard) to move your character on the map.

As you move, parts of the map nearby you are revealed. You are free to go wherever pleases you, unless you bump into a wall, a [locked door](#lockeddoor), or a monster.

Here is the meaning of the symbols seen on the map:
- <span style="color: purple">purple dot</span>: you
- <span style="color: red">red dot</span>: monster
- <span style="color: orange">orange dot</span>: loot
- <span style="color: lightsteelblue; -webkit-text-stroke: 0.2px black">blue rectangle</span>: door
- black line: wall
- black square: pillar

The map is always centered around you.

### [Locked Doors](#toc)

To unlock a door, you will need to find the appropriate key. Keys can be found on tables or in any sort of container. Sometimes, monsters carry a key in their pocket. When you kill them, they will drop the key on the ground and you will be able to pick it up.

### [Combat](#toc)

When your progression is blocked by a monster, moving towards them will automatically start a fight. Your character will try to hit them with the weapon currently in their hand.

Whether you are able to hit your target depends on how dexterous you are. If your attack is successful, the monster may take some damage. Your strength and the weapon you used are contingent on the severity of the wound inflicted to your enemy.

When you attack a monster or when a monster is close enough to you, it will try to hit you as well. If the offensive is successful, your health may decrease. If your health reaches an unviable level, you collapse on the ground and die.

You can also cast [spells](#spellbook) that will injure your enemies or affect their combat skills.

### [Experience](#toc)

As you slay the monsters in this dungeon, you gain experience (XP). If you amass enough XP, your character level up. Reaching the next level means that you can learn new spells and gain bonuses that make you stronger, wiser, more vigorous or more dexterous (your choice).

### [Backpack](#toc)

When you find loot, you can put it in your backpack. You can pick up as many items as your backpack allows, provided that your inventory and gear do not exceed the maximum weight (determined by your strength) you can carry.

### [Equipment](#toc)
In addition to your inventory, you also carry items on your person. For example, items can be held in your left or right hands, worn around your neck, or on your head.

Each slot can only take 1 item at a time. In order to equip an item, it must fit the part of your body that you are trying to put it on. For example, a ring can only go on your fingers, arrows can only go in the quiver on your back, and boots can only be worn on your feet.

### [Spellbook](#toc)
As you progress throughout your adventure, you will learn magic spells (unless your character class disallows it). Each spell you memorize is contained in your spellbook. You can only learn spells that are appropriate to your level.

To summon magic, simply click on one of the spells you learnt or use [keyboard shortcuts](#keyboard).

Casting a spell is an action that consumes a certain amount of mana. If your pool of mana is not full enough, you will not be able to cast the spell.

Moreover, casting a spell requires a great amount of concentration. Sometimes, your incantation will fail and the mana you gathered will dissipate without producing the effect you expected. The success or failure of your magic is determined by your intelligence and the difficulty of the spell.

### [Event Log](#toc)
At the top of your screen, a log keeps tracks of actions that happened in the game. The feedback is mostly about your surroundings--whether you came across a locked door, bumped into a wall, or if you were not able to pick up the loot you found. The log is also very useful in combat and for spellcasting. It tells you who is attacking you and how your spell turned out.

### [Keyboard Shortcuts](#toc)

If you are playing on desktop, you can use your keyboard instead of clicking on the interface. Here are the available shortcuts:
- up arrow: go north
- down arrow: go south
- left arrow: go west
- right arrow: go east
- any number between 01 (padding zero is necessary) and 28: cast the [spell](#spellbook) corresponding to the number you typed
- t: take loot

### [Save/Load Game](#toc)

If you want to leave the game and get back to it later, you can click on "Save Game" and copy the game data to a text file or in your notes.

Whenever you want to resume your game, click on "Load Game", paste the saved game data, and click on "Load Game" again.

## [Developer's Corner](#toc)

### [Install *Dungeon!*](#toc)
You can install all the dependencies necessary to run this program with npm by typing:
 - `npm install`

To run the game on a local server, type:
 - `npm start`

### [Build](#toc)
To build the project, type the following command:
- `bash compile` (UNIX only)