import {combineReducers} from 'redux'

function GameTime (State, Action) {

    let NewState = {...State}

    switch (Action.type) {

        case "UPDATE_TURN":
            NewState = {...NewState, Turn: Action.Turn}
            break

        case "ADD_TIMESTAMP":
        if (!NewState.GameTime) {
            NewState = {...NewState, Start: []}
        }
        NewState = {
            ...NewState,
            Start: [...NewState.Start, {Milliseconds: Action.Milliseconds, HumanFriendly: Action.HumanFriendly}]
        }
            break

        default:
            break
    }

    return NewState
}

function Player (State, Action) {

    let NewState = {...State}

    switch (Action.type) {

        case "UPDATE_PLAYER":
            NewState = {...NewState, ...Action.Player}
            break

        default:
            break
    }

    return NewState
}

function Monsters (State, Action) {

    let NewState = {...State}

    switch (Action.type) {

        case "UPDATE_MONSTERS":
            NewState = {...NewState, ...Action.Monsters}
            break

        default:
            break
    }

    return NewState
}

function Maps (State, Action) {

    let NewState = {...State}

    switch (Action.type) {

        case "UPDATE_MAPS":
            NewState = {
                ...NewState,
                WallMap: [...Action.WallMap],
                WallMapRevealed: [...Action.WallMapRevealed],
                DiscoveryMap: [...Action.DiscoveryMap],
                LootMap: [...Action.LootMap],
                MonsterMap: [...Action.MonsterMap],
            }
            break
            
        default:
            break
    }

    return NewState
}

function Loot (State, Action) {

    let NewState = {...State}

    switch (Action.type) {

        case "UPDATE_LOOT":
            NewState = {...NewState, ...Action.LootContainers}
            break

        default:
            break
    }

    return NewState
}

function EventLog (State, Action) {

    let NewState = {...State}

    switch (Action.type) {

        case "UPDATE_EVENT_LOG":
            NewState = {...NewState, ...Action.EventLog}
            break

        default:
            break
    }

    return NewState
}

function Story (State, Action) {

    let NewState = {...State}

    switch (Action.type) {

        case "UPDATE_STORY":
            NewState = {...NewState, ...Action.Story}
            break

        default:
            break
    }

    return NewState
}

function Cheats (State, Action) {

    let NewState = {...State}

    switch (Action.type) {

        case "UPDATE_CHEATS":
            NewState = {...NewState, ...Action.Cheats}
            break

        default:
            break
    }

    return NewState
}

function Sound (State, Action) {
    
    let NewState = {...State}

    switch (Action.type) {

        case "UPDATE_SOUND":
            NewState = {...NewState, ...Action.Sound}
            break

        case "UPDATE_VOLUME":
            NewState = {...NewState, Volume: Math.max(0,Math.min(1,Math.floor(Action.Volume*100)/100))}
            break

        case "MUTE_VOLUME":
            NewState = {...NewState, Volume: 0}
            break

        case "INCREASE_VOLUME":
            NewState = {...NewState, Volume: Math.min(1,Math.floor((NewState.Volume+0.1)*100)/100)}
            break

        case "DECREASE_VOLUME":
            NewState = {...NewState, Volume: Math.max(0,Math.floor((NewState.Volume-0.1)*100)/100)}
            break

        default:
            break
    }

    return NewState
}

function Debug (State, Action) {

    let NewState = {...State}

    switch (Action.type) {

        case "UPDATE_DEBUG":
            NewState = {...NewState, Debug: Action.Debug, SoundDebug: Action.SoundDebug}
            break

        default:
            break
    }

    return NewState
}

function Responsiveness (State, Action) {

    let NewState = {...State}

    switch (Action.type) {

        case "UPDATE_SCREEN_SIZE":
            NewState = {...NewState, MobileScreen: Action.MobileScreen, TabletScreen: Action.TabletScreen}
            break

        default:
            break
    }

    return NewState
}

function Styles (State, Action) {

    let NewState = {...State}

    switch (Action.type) {

        case "UPDATE_STYLES":
            NewState = {...NewState, ...Action.Styles}
            break

        default:
            break
    }

    return NewState
}

export default combineReducers({
    GameTime,
    Player,
    Monsters,
    Maps,
    Loot,
    EventLog,
    Story,
    Cheats,
    Sound,
    Debug,
    Responsiveness,
    Styles,
})