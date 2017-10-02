WallMap: [
    [" "," "," ","X","D","X"," "," "," "," "," "," "," "," ","X"," ","X"," "," "," "," "," "," ",],
    ["X","X","X","X"," ","X","X","X"," "," "," "," "," "," ","X"," ","X","X"," "," "," "," "," ",],
    ["X"," "," ","D"," "," "," ","X"," "," "," "," "," "," ","X"," "," ","X"," "," "," "," "," ",],
    ["X"," "," ","X","X","X"," ","X"," "," "," "," "," "," ","X"," ","X","X"," "," "," "," "," ",],
    ["X","X"," ","X"," ","X"," ","X","X","X"," "," "," "," ","X","D","X"," "," "," "," "," "," ",],
    [" ","X","X","X"," ","X"," "," "," ","X","X"," ","X","X","X"," ","X","X","X"," "," "," "," ",],
    [" "," "," "," "," ","X","X"," "," "," ","X"," ","X"," "," "," "," "," ","X"," "," "," "," ",],
    [" "," ","X","X","X","X","X"," "," "," ","X","X","X"," ","X"," ","X"," ","X","X","X"," "," ",],
    [" "," ","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","X"," "," ",],
    [" "," ","X","X","X"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","X"," "," ",],
    [" "," "," "," ","X"," "," "," "," "," ","X","X","X"," ","X"," ","X"," ","X","X","X"," "," ",],
    [" "," "," "," ","X","X"," "," "," ","X","X"," ","X"," "," "," "," "," ","X"," "," "," "," ",],
    [" "," "," "," "," ","X","X"," ","X","X"," "," ","X","X","X"," ","X","X","X"," "," ","X","X",],
    [" "," "," "," "," "," ","X"," ","X"," "," "," "," "," ","X"," ","X"," "," "," ","X","X"," ",],
    [" "," "," "," "," ","X","X"," ","X"," "," "," "," "," ","X"," ","X","X","X","X","X"," "," ",],
    [" "," "," "," "," ","X"," "," ","X"," "," "," "," "," ","X"," "," "," "," "," ","D"," "," ",],
    [" "," "," "," "," ","X"," "," ","X"," "," "," "," "," ","X","X","X","X","X","X","X"," "," ",],
    [" "," "," "," "," ","X","X","X","X"," "," "," "," "," "," "," "," "," "," "," ","X"," "," ",],
    [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","X","X"," ",],
],

Text: [
    {
        text: "You landed in a very dark room. It is very hard to see what is surrouding you."
    },
    {
        accessPoints: [{x: 4, y: 2}],
        text: "You hear strange noises and unfamiliar voices coming from a distance..."
    },
    {
        accessPoints: [{x: 7, y:5}, {x: 7, y: 14}, {x: 10, y: 8}, {x: 10, y: 9}],
        text: "You notice a table in the middle of the room and various shelves with books on the walls. This must be some sort of living quarters."
    },
    {
        accessPoints: [{x: 15, y: 3}],
        text: "This corridor looks filthy!"
    },
    {
        accessPoints: [{x: 7, y: 15}],
        text: "This alcove seems to be a storage area of some sort, but it is empty. Nothing interesting here!"
    },
],

LockedDoors: [
    {
        Id: 1,
        x: 3,
        y: 2,
        key: "IronKey",
    },
],

LootContainers: [
    {
        Id: 1,
        x: 2,
        y: 4,
        Name: "chest",
        items: [
            StaticAssets.UniqueItems.IronKey,
            UtilityAssets.GenerateRandomItems.Level1,
        ]
    },
    {
        Id: 2,
        x: 7,
        y: 9,
        Name: "table",
        items: [
            StaticAssets.Items.HealthPotion,
        ]
    },
],

Monsters: [
    {...
        StaticAssets.Bestiary.Orc,
        Id: 1,
        Stationary: true,
        x: 6,
        y: 3,
    },
    {...
        StaticAssets.Bestiary.Goblin,
        Id: 2,
        x: 15,
        y: 8,
    },
    {...
        StaticAssets.Bestiary.Goblin,
        Id: 3,
        x: 3,
        y: 8,
    },
    {...
        StaticAssets.Bestiary.Goblin,
        Id: 4,
        x: 8,
        y: 11,
    },
],

// start text
DynamicAssets.currentText =
DynamicAssets.Text
&& DynamicAssets.Text[0]
&& DynamicAssets.Text[0].text
    ? DynamicAssets.Text[0].text
    : null