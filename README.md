# *Dungeon!*
*Dungeon!* is an adventure game written in React.

## TL;DR
Go to http://dungeon.yvesgurcan.com. When the page loads, a default character with random ability scores is created for you. You can start playing right away.

## How to play

### Map
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

### <a name="lockeddoor"/> Locked Doors

To unlock a door, you will need to find the appropriate key. Keys can be found on tables or in any sort of container. Sometimes, monsters carry a key in their pocket. When you kill them, they will drop the key on the ground and you will be able to pick it up.

### Fights

When your progression is blocked by a monster, moving towards them will automatically start a fight. Your character will try to hit them with the weapon currently in their hand.

Whether you are able to hit your target depends on how dexterous you are. If your attack is successful, the monster may take some damage. Your strength and the weapon you used are contingent on the severity of the wound inflicted to your enemy.

When you attack a monster or when a monster is close enough to you, it will try to hit you as well. If the offensive is successful, your health may decrease. If your health reaches an unviable level, you collapse on the ground and die.

You can also cast [spells](#spellbook) that will injure your enemies or affect their combat skills.


### Backpack

When you find loot, you can put it in your backpack. You can pick up as many items as your backpack allows, provided that your inventory and gear do not exceed the maximum weight (determined by your strength) you can carry.

### Equipment
In addition to your inventory, you also carry items on your person. For example, items can be held in your left or right hands, worn around your neck, or on your head.

Each slot can only take 1 item at a time. In order to equip an item, it must fit the part of your body that you are trying to put it on. For example, a ring can only go on your fingers, arrows can only go in the quiver on your back, and boots can only be worn on your feet.

### <a name="spellbook"/> Spellbook
As you progress throughout your adventure, you will learn magic spells (unless your character class disallows it). Each spell you memorize is contained in your spellbook. You can only learn spells that are appropriate to your level.

To summon magic, simply click on one of the spells you learnt or use [keyboard shortcuts](#keyboard).

Casting a spell is an action that consumes a certain amount of mana. If your pool of mana is not full enough, you will not be able to cast the spell.

Moreover, casting a spell requires a great amount of concentration. Sometimes, your incantation will fail and the mana you gathered will dissipate without producing the effect you expected. The success or failure of your magic is determined by your intelligence and the difficulty of the spell.

### <a name="keyboard"/> Keyboard Shortcuts

If you are playing on desktop, you can use your keyboard instead of clicking on the interface. Here are the available shortcuts:
- up arrow: go north
- down arrow: go south
- left arrow: go west
- right arrow: go east
- any number between 01 (padding zero is necessary) and 28: cast the [spell](#spellbook) corresponding to the number you typed
- t: take loot

## Developer's corner

### Install your own copy of *Dungeon!*
 - `npm install`
 - `npm start`
