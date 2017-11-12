import {combineReducers} from 'redux'

function GameTime (State, Action) {

    let NewState = {...State}

    switch (Action.type) {

        case "UPDATE_TURN":
            NewState = {...NewState, Turn: Action.Turn}
            break

        case "UPDATE_TIMESTAMP":
        NewState = {...NewState, Milliseconds: Action.Milliseconds, HumanFriendly: Action.HumanFriendly}
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

function EventLog (State, Action) {

    let NewState = {...State}

    switch (Action.type) {

        case "UPDATE_EVENT_LOG":
            NewState = {...NewState, EventLog: [...Action.EventLog]}
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
    EventLog,
    Story,
    Cheats,
    Sound,
})