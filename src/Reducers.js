import {combineReducers} from 'redux'

function Player (State, Action) {

    let NewState = {...State}

    switch (Action.type) {

        case "INIT_PLAYER":
            NewState = {...NewState, ...Action.Player}
            
        default:
            break
    }

    return NewState
}

function Maps (State, Action) {

    let NewState = {...State}

    switch (Action.type) {

        case "INIT_MAPS":
            NewState = {
                ...NewState,
                WallMap: [...Action.WallMap],
                WallMapRevealed: [...Action.WallMapRevealed],
                DiscoveryMap: [...Action.DiscoveryMap],
                LootMap: [...Action.LootMap],
                MonsterMap: [...Action.MonsterMap],
            }
            
        default:
            break
    }

    return NewState
}

export default combineReducers({
    Player,
    Maps,
})