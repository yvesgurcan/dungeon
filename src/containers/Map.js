import React, {Component} from "react"
import {connect} from 'react-redux'
import mapStateToProps from "./../mapStateToProps"
import {Text, View} from "./../components/Web"
import Utilities from "./../Utilities"

const {North, South, West, East} = Utilities.Directions
const {Wall, Door, LootContainer, Empty} = Utilities.MapObjects
let WallMapVisibleRange = {...Utilities.WallMapVisibleRange}

class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  DrawMap = () => {
    // let {WallMap, WallMapRevealed, Player} = this.props
    let WallMap = [...this.props.Maps.WallMap]
    let WallMapRevealed = [...this.props.Maps.WallMapRevealed]
    let {Player, Styles} = {...this.props}

    return WallMapRevealed.map((HorizontalLine, y) => {
      // make sure that the map object is in the max/min Y sight
      if (
        Player.y + WallMapVisibleRange.y >= y &&
        Player.y - WallMapVisibleRange.y <= y) {
        return (
          <View key={y} style={Styles.MapRow}>
            {HorizontalLine.map((MapObjectRevealed, x) => {
              let MapObject = WallMap[y][x]
              // make sure that the map object is in the max/min X sight
              if (
                Player.x + WallMapVisibleRange.x >= x &&
                Player.x - WallMapVisibleRange.x <= x
              ) {
                return (
                  <Text key={x} style={Styles.MapObject} title={[x, y].join(",")}>
                    {this.DrawMonster({x, y}) || this.DrawMapObject(MapObject, MapObjectRevealed, x, y)}
                  </Text>
                )
              }
              // out of sight X
              else {
                return <Text key={x}>{Empty}</Text>
              }
            })}
          </View>
        )
      }
      // out of sight Y
      else {
        return <View key={y}>{Empty}</View>
      }
    })
  }

  DrawMonster = ({x, y}) => {

    let MonsterMap = [...this.props.Maps.MonsterMap]
    let ShowFullMap = this.props.ShowFullMap
    let {Player, Styles} = {...this.props}

    if (
      ShowFullMap
      || (x >= Player.x - 1
        && x <= Player.x + 1
        && y >= Player.y - 1
        && y <= Player.y + 1)
    ) {
      if (MonsterMap[y][x] !== Empty) {
        if (x === Player.x && y === Player.y) {
          return null
        }
        return <View style={Styles.Monster} />
      }
    }
    return null
  }

  DrawMapObject = (MapObject, MapObjectRevealed, x, y) => {

    let ShowFullMap = this.props.ShowFullMap
    let WallMap = [...this.props.Maps.WallMap]
    let WallMapRevealed = [...this.props.Maps.WallMapRevealed]
    let DiscoveryMap = [...this.props.Maps.DiscoveryMap]
    let LootMap = [...this.props.Maps.LootMap]
    let {Player, Styles} = {...this.props}

    // player marker
    if (x === Player.x && y === Player.y) {
      return <View id="you-are-here" style={Styles.Player} />
    }

    else {

      // area has already been discovered
      if (MapObjectRevealed === MapObject || ShowFullMap) {

        if (MapObject === Wall || MapObject === Door) {

          // grab neighboring objects (if vertically out of range, assume that what is outside is walls)
          let topRow = y-1 >= 0 ? WallMap[y-1].slice(x-1, x+2) : [Wall, Wall, Wall]
          let middleRow = WallMap[y].slice(x-1, x+2)
          let bottomRow = y+1 < WallMap.length ? WallMap[y+1].slice(x-1, x+2) : [Wall, Wall, Wall]

          // if horizontally out of range, assume that what is outside is nothing
          if (x === 0) {
            topRow = [Empty, WallMap[y-1][x], WallMap[y-1][x+1]]
            middleRow = [Empty, WallMap[y][x], WallMap[y][x+1]]
            bottomRow = [Empty, WallMap[y+1][x], WallMap[y+1][x+1]]
          }
          else if (x === WallMap[y].length - 1) {
            topRow = [WallMap[y-1][x-1], WallMap[y-1][x], Empty]
            middleRow = [WallMap[y-1][x-1], WallMap[y][x], Empty]
            bottomRow = [WallMap[y-1][x-1], WallMap[y+1][x], Empty]
          }

          let MapObjectInContext = [
            topRow,
            middleRow,
            bottomRow,
          ]

          // it's a wall
          if (MapObject === Wall) {
            return this.DrawWall(MapObjectInContext, MapObject)
          }
          // it's a door
          if (MapObject === Door) {
            return this.DrawDoor(MapObjectInContext, MapObject)
            // <View style={{textAlign: "center"}}>{MapObject}</View>
          }

        }
        // this is a loot container and it is part of the map that has been explored
        else if (LootMap[y][x] === LootContainer && (DiscoveryMap[y][x] === Empty || ShowFullMap)) {

          return <View style={Styles.Loot} />

        }

        // it's something else
        return <View style={{textAlign: "center"}}>{MapObject}</View>

      }

      // this area was newly discovered
      else {

        // reveal new walls or doors
        if (this.DetectWallInVicinityOfActor(x, y, Player.x, Player.y)) {
          WallMapRevealed[y][x] = WallMap[y][x]

          if (MapObject === Wall || MapObject === Door) {
            
            // grab neighboring objects (if vertically out of range, assume that what is outside is walls)
            let topRow = y-1 >= 0 ? WallMap[y-1].slice(x-1, x+2) : [Wall, Wall, Wall]
            let middleRow = WallMap[y].slice(x-1, x+2)
            let bottomRow = y+1 < WallMap.length ? WallMap[y+1].slice(x-1, x+2) : [Wall, Wall, Wall]

            // if horizontally out of range, assume that what is outside is nothing
            if (x === 0) {
              topRow = [Empty, WallMap[y-1][x], WallMap[y-1][x+1]]
              middleRow = [Empty, WallMap[y][x], WallMap[y][x+1]]
              bottomRow = [Empty, WallMap[y+1][x], WallMap[y+1][x+1]]
            }
            else if (x === WallMap[y].length - 1) {
              topRow = [WallMap[y-1][x-1], WallMap[y-1][x], Empty]
              middleRow = [WallMap[y-1][x-1], WallMap[y][x], Empty]
              bottomRow = [WallMap[y-1][x-1], WallMap[y+1][x], Empty]
            }

            let MapObjectInContext = [
              topRow,
              middleRow,
              bottomRow,
            ]
  
            // it's a wall
            if (MapObject === Wall) {
              return this.DrawWall(MapObjectInContext, MapObject)
            }
            // it's a door
            if (MapObject === Door) {
              return this.DrawDoor(MapObjectInContext, MapObject)
            }

          }

          // it's something else
          return WallMap[y][x]

        }

        // still hidden area
        else {
          return Empty
        }

      }

    }

  }

  DrawWall = (MapObjectInContext, MapObject) => {

    let {Styles} = {...this.props}

    let EmptySurrounding = 0

    MapObjectInContext.map(Row => {
      Row.map(MapObj => {
        if (MapObj === Empty) {
          EmptySurrounding++
        }
        return null
      })
      return null
    })

    // Pillar
    if (
      EmptySurrounding === 8
    ) {
      return <View style={Styles.Wall.Pillar} />
    }
    // Completely surrounded by walls
    else if (
      EmptySurrounding === 0
    ) {
      return Empty
    }
    // 4 surrounding walls (odd-shaped walls)
    // North, West, East, and NorthWest
    else if (
        (MapObjectInContext[North.y][North.x] === Wall
        || MapObjectInContext[North.y][North.x] === Door)
      && (
        MapObjectInContext[East.y][East.x] === Wall
        || MapObjectInContext[East.y][East.x] === Door)
      &&
        (MapObjectInContext[West.y][West.x] === Wall
        || MapObjectInContext[West.y][West.x] === Door)
        &&
          (MapObjectInContext[North.y][East.x] === Wall
          || MapObjectInContext[North.y][East.x] === Door)
    ) {
      return (
        <View style={Styles.Wall.NorthWestEastAndNorthWest}/>
      )
    }
    // North, South, East, and SouthEast
    else if (
        (MapObjectInContext[North.y][North.x] === Wall
        || MapObjectInContext[North.y][North.x] === Door)
      &&
        (MapObjectInContext[South.y][South.x] === Wall
        || MapObjectInContext[South.y][South.x] === Door)
      &&
        (MapObjectInContext[East.y][East.x] === Wall
        || MapObjectInContext[East.y][East.x] === Door)
        &&
          (MapObjectInContext[South.y][East.x] === Wall
          || MapObjectInContext[South.y][East.x] === Door)
    ) {
      return (
        <View style={Styles.Wall.NorthSouthEastAndSouthEast}/>
      )
    }
    // 3 surrounding walls (T-shaped walls)
    // North, South and East
    else if (
        (MapObjectInContext[North.y][North.x] === Wall
        || MapObjectInContext[North.y][North.x] === Door)
      &&
        (MapObjectInContext[South.y][South.x] === Wall
        || MapObjectInContext[South.y][South.x] === Door)
      &&
        (MapObjectInContext[East.y][East.x] === Wall
        || MapObjectInContext[East.y][East.x] === Door)
    ) {
      return (
        <View style={Styles.Wall.TShapedWallNSE}>
          <View style={Styles.Wall.NorthSouthAndEast} />
          </View>
      )
    }
    // North, South and West
    else if (
        (MapObjectInContext[North.y][North.x] === Wall
        || MapObjectInContext[North.y][North.x] === Door)
      &&
        (MapObjectInContext[South.y][South.x] === Wall
        || MapObjectInContext[South.y][South.x] === Door)
      &&
        (MapObjectInContext[West.y][West.x] === Wall
        || MapObjectInContext[West.y][West.x] === Door)
    ) {
      return (
        <View style={Styles.Wall.TShapedWallNSW}>
          <View style={Styles.Wall.NorthSouthAndWest} />
          </View>
      )
    }
    // 2 surrounding walls (continuous walls)
    // North and East
    else if (
        (MapObjectInContext[North.y][North.x] === Wall
        || MapObjectInContext[North.y][North.x] === Door)
      &&
        (MapObjectInContext[East.y][East.x] === Wall
        || MapObjectInContext[East.y][East.x] === Door)
    ) {
      return <View style={Styles.Wall.NorthToEast} />
    }
    // South and West
    else if (
        (MapObjectInContext[South.y][South.x] === Wall
        || MapObjectInContext[South.y][South.x] === Door)
      &&
        (MapObjectInContext[West.y][West.x] === Wall
        || MapObjectInContext[West.y][West.x] === Door)
    ) {
      return <View style={Styles.Wall.SouthToWest} />
    }
    // South and East
    else if (
        (MapObjectInContext[South.y][South.x] === Wall
        || MapObjectInContext[South.y][South.x] === Door)
      &&
        (MapObjectInContext[East.y][East.x] === Wall
        || MapObjectInContext[East.y][East.x] === Door)
    ) {
      return <View style={Styles.Wall.SouthToEast} />
    }
    // North and West
    else if (
        (MapObjectInContext[North.y][North.x] === Wall
        || MapObjectInContext[North.y][North.x] === Door)
      &&
        (MapObjectInContext[West.y][West.x] === Wall
        || MapObjectInContext[West.y][West.x] === Door)
    ) {
      return <View style={Styles.Wall.NorthToWest} />
    }
    // North and South
    else if (
        (MapObjectInContext[North.y][North.x] === Wall
        || MapObjectInContext[North.y][North.x] === Door)
      &&
        (MapObjectInContext[South.y][South.x] === Wall
        || MapObjectInContext[South.y][South.x] === Door)
    ) {
      return <View style={Styles.Wall.NorthToSouth} />
    }
    // West and East
    else if (
        (MapObjectInContext[West.y][West.x] === Wall
        || MapObjectInContext[West.y][West.x] === Door)
      &&
        (MapObjectInContext[East.y][East.x] === Wall
        || MapObjectInContext[East.y][East.x] === Door)
    ) {
      return <View style={Styles.Wall.WestToEast} />
    }
    else {
      return MapObject
    }
  }

  DrawDoor = (MapObjectInContext, MapObject) => {

    let {Styles} = {...this.props}

    if (
        (MapObjectInContext[North.y][North.x] === Wall
        || MapObjectInContext[North.y][North.x] === Door)
      &&
        (MapObjectInContext[South.y][South.x] === Wall
        || MapObjectInContext[South.y][South.x] === Door)
      ) {
        return <View style={Styles.Door.NorthToSouth} />
      }
    else if (
        (MapObjectInContext[West.y][West.x] === Wall
        || MapObjectInContext[West.y][West.x] === Door)
      &&
        (MapObjectInContext[East.y][East.x] === Wall
        || MapObjectInContext[East.y][East.x] === Door)
      ) {
        return <View style={Styles.Door.WestToEast} />
      }

    return MapObject
  }

  DetectWallInVicinityOfActor = (wallX, wallY, actorX, actorY) => {
    if (
      // detect horizontal objects
      (wallX === actorX && (wallY === actorY + 1 || wallY === actorY - 1))
      // detect veretical objects
      || (wallY === actorY && (wallX === actorX + 1 || wallX === actorX - 1))
      // detect diagonal objects
      || ((wallY === actorY + 1 || wallY === actorY - 1) && (wallX === actorX + 1 || wallX === actorX - 1))
    ) {
      return true
    }
    return false
  }
  
  onClick = (input) => {
    
        input.preventDefault()

        let Click = {x: input.clientX, y: input.clientY}

        let PlayerMarker = document.getElementById("you-are-here").getBoundingClientRect()

        let Direction = {x: null, y: null}

        if (Click.x - PlayerMarker.width/2 > PlayerMarker.x) {
          Direction.x = "East"
        }
        else if (Click.x - PlayerMarker.width/2 <= PlayerMarker.x) {
          Direction.x = "West"
        }

        if (Click.y - PlayerMarker.height/2 > PlayerMarker.y) {
          Direction.y = "South"
        }
        else if (Click.y - PlayerMarker.height/2 <= PlayerMarker.y) {
          Direction.y  = "North"
        }

        let Offset = {
          x: Click.x - PlayerMarker.x - PlayerMarker.width/2,
          y: Click.y - PlayerMarker.y - PlayerMarker.height/2,
        }

        let DecisiveDirection

        if (Direction.y === "North") {
          // player has clicked in a triangle area above the marker
          if (Offset.x <= 0 && Offset.x > Offset.y) {
            DecisiveDirection = Direction.y
          }
          if (Offset.x > 0 && Offset.x < Offset.y * -1) {
            DecisiveDirection = Direction.y
          }
        }

        if (Direction.y === "South") {
          // player has clicked in a triangle area below the marker
          if (Offset.x <= 0 && Offset.x * -1 < Offset.y) {
            DecisiveDirection = Direction.y
          }
          if (Offset.x > 0 && Offset.x < Offset.y) {
            DecisiveDirection = Direction.y
          }
        }
        
        if (Direction.x === "West") {
          // player has clicked in a triangle area on the left of the marker
          if (Offset.y <= 0 && Offset.x < Offset.y) {
            DecisiveDirection = Direction.x
          }
          if (Offset.y > 0 && Offset.x * -1 > Offset.y) {
            DecisiveDirection = Direction.x
          }
        }

        if (Direction.x === "East") {
          // player has clicked in a triangle area on the left of the marker
          if (Offset.y <= 0 && Offset.x > Offset.y * -1) {
            DecisiveDirection = Direction.x
          }
          if (Offset.y > 0 && Offset.x > Offset.y) {
            DecisiveDirection = Direction.x
          }
        }

        if (typeof DecisiveDirection !== undefined) {
          this.props.MovePlayer(DecisiveDirection)
          if (DecisiveDirection === "North") {
            this.props.onClickArrow("ArrowUp")
          }
          if (DecisiveDirection === "South") {
            this.props.onClickArrow("ArrowDown")
          }
          if (DecisiveDirection === "West") {
            this.props.onClickArrow("ArrowLeft")
          }
          if (DecisiveDirection === "East") {
            this.props.onClickArrow("ArrowRight")
          }
        }

      }

  render() {
    let {Styles} = {...this.props}
    return (
      <View
        style={Styles.Map}
        onClick={this.onClick}
        onMouseDown={this.onMouseDown}>
        {this.DrawMap()}
      </View>
    )
  }
}
export const MapContainer = connect(mapStateToProps)(Map)