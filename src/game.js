import React, { Component } from "react"
import StaticAssets from "./StaticAssets.js"
import DynamicAssets from "./DynamicAssets.js"
import Functions from "./functions.js"
import Styles from "./styles.js"

class Inline extends Component {
  render() {
    return <span {...this.props}>{this.props.children}</span>
  }
}

class Block extends Component {
  render() {
    return <div {...this.props}>{this.props.children}</div>
  }
}

class GoNorth extends Component {
  MovePlayer = () => {
    let {MovePlayer} = this.props
    MovePlayer("North")
  }
  render() {
    return <Arrow {... this.props} onClick={this.MovePlayer}>↑</Arrow>
  }
}

class GoWest extends Component {
  MovePlayer = () => {
    let {MovePlayer} = this.props
    MovePlayer("West")
  }
  render() {
    return <Arrow {... this.props} onClick={this.MovePlayer}>←</Arrow>
  }
}

class GoEast extends Component {
  MovePlayer = () => {
    let {MovePlayer} = this.props
    MovePlayer("East")
  }
  render() {
    return <Arrow {... this.props} onClick={this.MovePlayer}>→</Arrow>
  }
}
class GoSouth extends Component {
  MovePlayer = () => {
    let {MovePlayer} = this.props
    MovePlayer("South")
  }
  render() {
    return <Arrow {... this.props} onClick={this.MovePlayer}>↓</Arrow>
  }
}

class Arrow extends Component {
  constructor(props) {
    super(props)
    this.state = {style: Styles.ArrowBlock}
  }
  NormalStyle = () => {
    this.setState({style: Styles.ArrowBlock})
  }
  HoverStyle = () => {
    this.setState({style: Styles.ArrowBlockHover})
  }
  onClick = () => {
    this.props.onClick()
    this.setState({style: Styles.ArrowBlockClick})
    let that = this
    setTimeout(function() {
      if (that.state.style === Styles.ArrowBlockClick) {
        that.setState({style: Styles.ArrowBlockHover})
      }
    },50)
  }
  render() {
    return (
      <Block onClick={this.onClick} onMouseMove={this.HoverStyle} onMouseLeave={this.NormalStyle} style={this.state.style}>{this.props.children}</Block>
    )
  }
}

class Arrows extends Component {
  render() {
    return (
      <Block style={Styles.ArrowContainer}>
        <Block style={Styles.ArrowRow}>
          <GoNorth {... this.props}/>
        </Block>
        <Block style={Styles.ArrowRow}>
          <GoWest {... this.props}/>
          <GoEast {... this.props}/>
        </Block>
        <Block style={Styles.ArrowRow}>
          <GoSouth {... this.props}/>
        </Block>
      </Block>
    )
  }
}

class Inspect extends Component {
  render() {
    return (
      <ActionButton {... this.props}>
        Inspect
      </ActionButton>
    )
  }
}

class ActionButton extends Component {
  constructor(props) {
    super(props)
    this.state = {style: Styles.ActionButton}
  }
  NormalStyle = () => {
    this.setState({style: Styles.ActionButton})
  }
  HoverStyle = () => {
    this.setState({style: Styles.ActionButtonHover})
  }
  onClick = () => {
    this.props.onClick()
    this.setState({style: Styles.ActionButtonClick})
    let that = this
    setTimeout(function() {
      if (that.state.style === Styles.ActionButtonClick) {
        that.setState({style: Styles.ActionButtonHover})
      }
    },50)
  }
  render() {
    return (
      <Block onClick={this.onClick} onMouseMove={this.HoverStyle} onMouseLeave={this.NormalStyle} style={this.state.style}>
        Inspect
      </Block>
    )
  }
}

// a brief message that provides feedback on the user's actions ("you can not go there")
class Message extends Component {
  render() {
    return (
      <Block style={Styles.Message}>
        {this.props.state.currentMessage}
      </Block>
    )
  }
}

// a descriptive paragraph about the surroundings of the user
class Text extends Component {
  render() {
    return (
      <Block style={Styles.Text}>
        {this.props.currentText}
      </Block>
    )
  }
}

class ItemImage extends Component {
  render() {
    return (
      <Inline>
        <img src={this.props.image} style={Styles.ItemImage}/>
      </Inline>
    )
  }
}

class ItemImageBlock extends Component {
  render() {
    return (
      <Block style={Styles.ItemImageBlock}>
        <ItemImage image={this.props.image} />
      </Block>
    )
  }
}

// some text that describes an event that has just occurred ("you found a chest")
class Event extends Component {

  Inspect = () => {
    console.log("YO")
  }

  GenerateEventText = () => {

    let {currentEvent} = this.props

    return currentEvent.map((event, index) => {
      return (
        <Inline key={index}>
          You found {event.article} {event.name}.
          <Inspect onClick={this.Inspect}/>
        </Inline>
      )
    })

  }

  render() {
    return (
      <Block style={Styles.Event}>
        {this.GenerateEventText()}
      </Block>
    )
  }
}

class Map extends Component {

  DrawMap = () => {
    let {WallMap, WallMapRevealed} = this.props.state
    return WallMapRevealed.map((HorizontalLine, y) => {
      return (
        <Block key={y}>
          {HorizontalLine.map((MapObjectRevealed, x) => {
            let MapObject = WallMap[y][x]
            return (
              <Inline key={x} style={Styles.MapObject} title={[x,y].join(",")}>
                {this.DrawMapObject(MapObject, MapObjectRevealed, x, y)}
              </Inline>
            )
          })}
        </Block>
      )
    })
  }

  DrawMapObject = (MapObject, MapObjectRevealed, x,y) => {
    let {Player, WallMap, WallMapRevealed, ShowFullMap} = this.props.state
    if (x === Player.x && y === Player.y) {
      return "O"
    }
    else {
      if (MapObjectRevealed === MapObject || ShowFullMap) {
        return MapObject
      }
      else {
        if (this.DetectObjectInVicinityOfActor(x,y,Player.x,Player.y)) {
          WallMapRevealed[y][x] = WallMap[y][x]
          return WallMap[y][x]
        }
        else {
          return " "
        }
      } 
    }
  }

  DetectObjectInVicinityOfActor = (wallX, wallY, actorX, actorY) => {
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
  render() {
    return (
      <Block style={Styles.Map}>
        {this.DrawMap()}
      </Block>
    )
  }
}

class TextBlock extends Component {
  render() {
    return (
      <Block style={Styles.TextBlock}>
        {this.props.children}
      </Block>
    )
  }
}

class Inventory extends Component {
  render() {
    return (
      <Block style={Styles.Inventory}>
        <ItemImageBlock image={"/graphics/items/potion_mana.png"} />
        <ItemImageBlock image={"/graphics/items/potion_mana.png"} />
        <ItemImageBlock image={"/graphics/test.png"} />
      </Block>
    )
  }
}

class LowerHUD extends Component {
  render() {
    return (
      <Block style={Styles.HUDLowerBlock}>
        {this.props.children}
      </Block>
    )
  }
}

class PageContainer extends Component {
  render() {
    return (
      <Block style={Styles.Game}>
        {this.props.children}
      </Block>
    )
  }
}

class Game extends Component {

  constructor(props) {
    super(props)
  
    // grab the assets
    let initState = Object.assign(StaticAssets,DynamicAssets)
    this.state = initState
  
  }

  componentWillUpdate(nextProps,nextState) {

      // set timer to clear message after it has been displayed
      if (nextState.curentMessage !== " ") {
        setTimeout(function() {
          if (nextState.currentMessage !== "") {
            this.setState({currentMessage: ""})
          }
        }.bind(this), 2000)
      }

  }

  MovePlayer = (Direction) => {

    let State = this.state

    // get the target coordinates
    let targetCoordinates = this.MoveObject({x: State.Player.x, y: State.Player.y}, Direction)
    
    // check if there is a locked door in the way
    if (this.CheckLockedDoors(targetCoordinates)) {
      this.setState({currentMessage: StaticAssets.Messages.LockedDoor})   
      return
    }

    // the player can not go there (there is a wall in the way)
    if (!this.DetectCollision(targetCoordinates)) {
      this.setState({currentMessage: StaticAssets.Messages.Collision})
      return
    }

    // add containers to the list of events
    State.currentEvent =  this.CheckLootContainers(targetCoordinates)

    // save the new coordinates
    State.Player.x = targetCoordinates.x
    State.Player.y = targetCoordinates.y

    // check if the text needs to be updated
    this.UpdateText(targetCoordinates)

    this.setState(State)
  }

  MoveObject = (originalCoordinates, Direction) => {

    // grab the object's current position
    let targetCoordinates = {x: originalCoordinates.x, y: originalCoordinates.y}
    
    // calculate target coordinates
    if (Direction === "West") {
      targetCoordinates.x -= 1
    }
    if (Direction === "East") {
      targetCoordinates.x += 1
    }
    if (Direction === "North") {
      targetCoordinates.y -= 1
    }
    if (Direction === "South") {
      targetCoordinates.y += 1
    }
    
    return targetCoordinates

  }

  DetectCollision = ({x,y}) => {

    let State = this.state

    // target is, apparently, empty
    let targetCoordinates = State.WallMap[y][x]
    if (targetCoordinates === " ") {
      return true
    }
    
    // target is a door
    if (targetCoordinates === "D")
      // check if the door is locked
      if (!this.CheckLockedDoors({x,y})) {
        return true 
      }

    return false
  }

  CheckLockedDoors = ({x,y}) => {

    let {LockedDoors} = this.state

    let matchLockedDoor = LockedDoors.filter((object) => {
      return object.x === x && object.y === y && !object.unlocked
    })

    return matchLockedDoor.length > 0

  }

  CheckLootContainers = ({x,y}) => {

    let {LootContainers} = this.state

    let matchLootContainer = LootContainers.filter((object) => {
      return object.x === x && object.y === y
    })

    return matchLootContainer

  }

  UpdateText = ({x, y}) => {
    let State = this.state

    let matchTextAccessPoint = false
    
    State.Text.map((text) => {
      return text.accessPoints.filter(accessPoint => {
        if (accessPoint.x === x && accessPoint.y === y) {
          matchTextAccessPoint = true
          State.currentText = text.text
          this.setState(State)
          return true
        }
        else {
          return false
        }
      })
      
    })

    return matchTextAccessPoint
  }

  render() {
    // grid
    return (
      <PageContainer>
          {/* row 1 */}
          <Message {... this}/>
          {/* row 2 and 3 */}
          <TextBlock>
            <Text {... this.state}/>
            <Event {... this.state}/>
          </TextBlock>
          <Map {... this}/>
        {/* row 4 */}
        <LowerHUD>
          <Arrows {... this}/>
        </LowerHUD>
        <Inventory/>
      </PageContainer>
    )
  }
}

export default Game
