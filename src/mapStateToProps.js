import { createStore } from 'redux';
import Reducers from './Reducers';
import Gameplay from './GameplayAssets';
import Utilities from './Utilities';

const { Door, Empty } = Utilities.MapObjects;

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
        Styles: { ...state.Styles }
    };
};

export default mapStateToProps;
