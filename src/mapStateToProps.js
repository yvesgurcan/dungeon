import { createStore } from 'redux';
import Reducers from './Reducers';
import Gameplay from './GameplayAssets';
import Utilities from './Utilities';

const { Wall, Door, LootContainer, Undiscovered, Empty } = Utilities.MapObjects;

export const store = createStore(
    Reducers,
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const dispatch = store.dispatch;

const mapStateToProps = (state, ownProps) => {
    const IndefiniteArticle = (word, capitalize) => {
        if (word) {
            const Vowels = ['a', 'e', 'i', 'u', 'o'];

            if (isNaN(word) && Vowels.includes(word[0].toLowerCase())) {
                if (capitalize) {
                    return 'An';
                } else {
                    return 'an';
                }
            } else {
                if (capitalize) {
                    return 'A';
                } else {
                    return 'a';
                }
            }
        } else {
            return '';
        }
    };

    const ScrollToTop = ElementId => {
        if (document.getElementById(ElementId)) {
            let HtmlElement = document.getElementById(ElementId);
            HtmlElement.scrollTop = 0;
        }
    };

    const UpdateText = ({ x, y }) => {
        let currentText = state.Story.Text;
        let currentTextImage = state.Story.Image;
        let StoryTexts = [...state.Texts];

        let matchTextAccessPoint = false;

        if (StoryTexts) {
            StoryTexts.map((text, index) => {
                if (text.Used) return null;
                return !text.accessPoints
                    ? null
                    : text.accessPoints.filter(accessPoint => {
                          if (accessPoint.x === x && accessPoint.y === y) {
                              matchTextAccessPoint = true;
                              currentText = text.text;
                              currentTextImage = text.image || null;
                              StoryTexts[index].Used = true;
                              return true;
                          } else {
                              return false;
                          }
                      });
            });

            if (currentText !== state.Story.Text) {
                ScrollToTop('Story');
            }

            dispatch({
                type: 'UPDATE_STORY',
                Story: { Text: currentText, Image: currentTextImage }
            });
        }

        return matchTextAccessPoint;
    };

    const MovePlayer = Direction => {
        let Player = { ...state.Player };
        let WallMap = [...state.Maps.WallMap];
        let MonsterMap = [...state.Maps.MonsterMap];
        let NoClip = state.NoClip;

        let FullStateUpdate = true;

        if (Player.Dead) return false;

        // get the target coordinates
        let targetCoordinates = MoveObject(
            { x: Player.x, y: Player.y },
            Direction
        );

        // out of range
        if (
            targetCoordinates.y > WallMap.length - 1 ||
            targetCoordinates.y < 0 ||
            targetCoordinates.x > WallMap[targetCoordinates.y].length - 1 ||
            targetCoordinates.x < 0
        ) {
            this.SetText(Gameplay.Messages.Collision);
            this.PlaySound('cant_go_there');

            return;
        }

        // check if there is a locked door in the way
        let Door = CheckLockedDoors(targetCoordinates);
        if (Door.Locked && !NoClip) {
            let LockedDoor = this.UnlockDoor(Door.Object);
            if (LockedDoor.Unlocked) {
                let UnlockMessage =
                    Gameplay.PartialMessages.UnlockDoor +
                    LockedDoor.Key +
                    Gameplay.PartialMessages.Period;
                this.setState({
                    currentText: UnlockMessage,
                    currentTextImage: null
                });
            } else {
                this.setState({
                    currentText: Gameplay.Messages.LockedDoor,
                    currentTextImage: null
                });
                return;
            }
        }

        // player is attacking a monster
        if (MonsterMap[targetCoordinates.y][targetCoordinates.x] !== Empty) {
            FullStateUpdate = false;
            this.AttackMonster(targetCoordinates);
            // player is not moving
            targetCoordinates.x = Player.x;
            targetCoordinates.y = Player.y;
        } else {
            // the player can not go there (there is a wall/door in the way)
            if (!DetectCollision(targetCoordinates)) {
                this.SetText(Gameplay.Messages.Collision);
                this.PlaySound('cant_go_there');

                return;
            }
        }

        // the monsters get to move now
        MoveMonsters(targetCoordinates);

        // wake up any monster in the vicinity of the player
        WakeUpMonster(targetCoordinates);

        // let {Turn, DiscoveryMap, currentEvent, currentText, currentTextImage} = state
        let Turn = state.GameTime.Turn;
        let DiscoveryMap = [...state.Maps.DiscoveryMap];
        let currentEvent = [...state.CurrentEvent];
        let currentText = state.currentText;
        let currentTextImage = state.currentTextImage;

        // update the state partially
        Player.Facing = Direction;

        // update various parts of the state
        if (FullStateUpdate) {
            // update which parts of the map were revealed
            DiscoveryMap = UpdateDiscoveryMap(targetCoordinates);

            // add loot containers to the list of events if applicable
            currentEvent = CheckLootContainers(targetCoordinates);

            // reset messages when an event occur (loot container)
            if (currentEvent.length > 0) {
                currentText = '';
                currentTextImage = null;
            }

            // save the new coordinates
            Player.x = targetCoordinates.x;
            Player.y = targetCoordinates.y;

            Player.Stationary = false;
        }

        // update player stats
        if (Player.Stamina > 1) {
            Player.Stamina--;
        }

        // add 1 turn to the game state
        Turn++;

        // catch up with other state mutations
        let PlayerCoordinates = { x: Player.x, y: Player.y };
        if (Player !== state.Player) {
            let NewPlayerState = state.Player;
            if (NewPlayerState.Health !== Player.Health) {
                Player.Health = NewPlayerState.Health;
                Player.Dead = NewPlayerState.Dead;
            }

            // keep the coordinates
            Player.x = PlayerCoordinates.x;
            Player.y = PlayerCoordinates.y;
        }

        dispatch({ type: 'UPDATE_PLAYER', Player: Player });
        dispatch({ type: 'UPDATE_TURN', Turn: Turn });
        dispatch({ type: 'UPDATE_CURRENT_EVENT', Event: currentEvent });
        dispatch({
            type: 'UPDATE_STORY',
            Story: { Text: currentText, Image: currentTextImage }
        });
        dispatch({ type: 'UPDATE_DISCOVERY_MAP', DiscoveryMap: DiscoveryMap });

        // update story text
        UpdateText(targetCoordinates);
    };

    const MoveObject = (originalCoordinates, Direction) => {
        // grab the object's current position
        let targetCoordinates = {
            x: originalCoordinates.x,
            y: originalCoordinates.y
        };

        // calculate target coordinates
        if (Direction === 'West') {
            targetCoordinates.x -= 1;
        }
        if (Direction === 'East') {
            targetCoordinates.x += 1;
        }
        if (Direction === 'North') {
            targetCoordinates.y -= 1;
        }
        if (Direction === 'South') {
            targetCoordinates.y += 1;
        }

        return targetCoordinates;
    };

    const CheckLockedDoors = ({ x, y }) => {
        let LockedDoors = Object.assign([], state.LockedDoors);

        if (LockedDoors) {
            let matchLockedDoor = LockedDoors.filter(object => {
                return object.x === x && object.y === y && !object.Unlocked;
            });

            return {
                Locked: matchLockedDoor.length > 0,
                Object: matchLockedDoor.length > 0 ? matchLockedDoor[0] : null
            };
        }

        return {
            Locked: false,
            Object: null
        };
    };

    const CheckLootContainers = ({ x, y }) => {
        let LootContainers = [...state.Loot];

        if (LootContainers) {
            let matchLootContainer = LootContainers.filter(object => {
                if (object.items) {
                    object.items = object.items
                        .map(item => {
                            return this.GenerateRandomLoot(item);
                        })
                        .filter(item => {
                            return item !== null;
                        });
                }
                return object.x === x && object.y === y;
            });

            matchLootContainer = matchLootContainer.map(loot => {
                loot.eventType = 'loot';
                return loot;
            });

            return matchLootContainer;
        }

        return [];
    };

    const DetectCollision = ({ x, y }) => {
        let WallMap = { ...state.WallMap };
        let MonsterMap = { ...state.MonsterMap };
        let NoClip = { ...state.NoClip };

        if (NoClip) {
            return true;
        }

        // can not get out of the map boundaries
        if (y < 0 || x < 0 || y >= WallMap.length || x >= WallMap[y].length) {
            return false;
        }

        // target is a monster
        if (MonsterMap[y][x] !== Empty) {
            return false;
        }

        // target is empty or non-blocking
        if (WallMap[y][x] === Empty) {
            return true;
        }

        // target is a door
        if (WallMap[y][x] === Door) {
            // check if the door is locked
            let Door = CheckLockedDoors({ x, y });
            if (Door.Locked) {
                return false;
            } else {
                return true;
            }
        }

        return false;
    };

    const UpdateDiscoveryMap = ({ x, y }) => {
        let DiscoveryMap = [...state.Maps.DiscoveryMap];

        let NewDiscoveryMap = DiscoveryMap.map((HorizontalLine, MapY) => {
            return HorizontalLine.map((MapObject, MapX) => {
                if (
                    MapY >= y - 1 &&
                    MapY <= y + 1 &&
                    MapX >= x - 1 &&
                    MapX <= x + 1
                ) {
                    return Empty;
                } else {
                    return MapObject;
                }
            });
        });

        return NewDiscoveryMap;
    };

    const MoveMonsters = PlayerNewCoordinates => {
        let Monsters = [...state.Monsters];
        let Player = { ...state.Player };

        if (Monsters) {
            let MovingMonsters = Monsters.filter(Monster => {
                return (
                    !Monster.Dead &&
                    (Monster.ChasePlayer || !Monster.Stationary)
                );
            });

            MovingMonsters.map(Monster => {
                if (Monster.ChasePlayer) {
                    return this.ChasePlayer(
                        Monster,
                        PlayerNewCoordinates || { x: Player.x, y: Player.y }
                    );
                } else {
                    return this.Patrol(Monster);
                }
            });
        }
    };

    const WakeUpMonster = ({ x, y }) => {
        let Monsters = [...state.Monsters];
        let PlaySound = false;

        if (Monsters) {
            let MonsterList = Monsters.map(Monster => {
                if (
                    Monster.x >= x - 1 &&
                    Monster.x <= x + 1 &&
                    Monster.y >= y - 1 &&
                    Monster.y <= y + 1 &&
                    !Monster.ChasePlayer
                ) {
                    PlaySound = true;

                    Monster.ChasePlayer = true;
                    Monster.Stationary = false;
                    this.SetText(
                        IndefiniteArticle(Monster.Name, true) +
                            ' ' +
                            Monster.Name +
                            Gameplay.PartialMessages.MonsterNoticed
                    );
                }
                return Monster;
            });

            dispatch({ type: 'UPDATE_MONSTERS', MonsterList });
            // this.setState({Monsters: MonsterList})

            if (PlaySound) {
                this.PlaySound('player_noticed');
            }
        }
    };

    return {
        ...state,
        ...ownProps,
        Styles: { ...state.Styles },
        MovePlayer: MovePlayer
    };
};

export default mapStateToProps;
