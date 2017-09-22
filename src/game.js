import React, { Component } from "react"
import StaticAssets from "./StaticAssets.js"
import DynamicAssets from "./DynamicAssets.js"
import Functions from "./functions.js"
import Styles from "./styles.js"

/* web components */

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

class Image extends Component {
  // built-in handling of broken image links
  constructor(props) {
    super(props)
    this.state = { placeholder: false }
  }
  showPlaceholder = () => {
    this.setState({ placeholder: true })
  }
  hidePlaceholder = () => {
    this.setState({ placeholder: false })
  }
  render() {
    {
      if (this.state.placeholder) {
        return (
          <img
            style={this.props.style}
            title={this.props.title} />
        )
      }
      else {
        return (
          <img
            onLoad={this.hidePlaceholder}
            onError={this.showPlaceholder}
            title={this.props.title}
            {... this.props} />
        )
      }
    }
  }
}

/* custom components */

class ItemImage extends Component {
  render() {
    return (
      <Inline>
        <Image
          src={this.props.image}
          style={Styles.ItemImage}
          title={this.props.name} />
      </Inline>
    )
  }
}

class ItemImageBlock extends Component {
  render() {
    return (
      <Block style={Styles.ItemImageBlock}>
        <ItemImage {... this.props} />
      </Block>
    )
  }
}

/* action buttons */

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
    this.state = { style: Styles.ActionButton }
  }
  NormalStyle = () => {
    this.setState({ style: Styles.ActionButton })
  }
  HoverStyle = () => {
    this.setState({ style: Styles.ActionButtonHover })
  }
  onClick = () => {
    this.props.onClick()
    this.setState({ style: Styles.ActionButtonClick })
    let that = this
    setTimeout(function () {
      if (that.state.style === Styles.ActionButtonClick) {
        that.setState({ style: Styles.ActionButtonHover })
      }
    }, 50)
  }
  render() {
    return (
      <Block onClick={this.onClick} onMouseMove={this.HoverStyle} onMouseLeave={this.NormalStyle} style={this.state.style}>
        Inspect
      </Block>
    )
  }
}

/* story and events */

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

class LootList extends Component {

  render() {
    return (
      <Block>
        {this.props.items.map((item, index) => {
          return (
            <ItemImageBlock
              key={index}
              image={"/graphics/items/" + item.image + ".png"}
              name={item.name} />
          )
        })}
      </Block>
    )
  }
}

// some text that describes an event that has just occurred ("you found a chest")
class Event extends Component {

  GenerateEventText = () => {

    let { currentEvent } = this.props

    return currentEvent.map((event, index) => {
      if (event.eventType === "loot") {
        return (
          <Inline key={index}>
            You found {event.article} {event.name}.
            <LootList items={event.items} />
          </Inline>
        )
      }
      else {
        console.warn("Unknown type of event.", event)
      }
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

class TextBlock extends Component {
  render() {
    return (
      <Block style={Styles.TextBlock}>
        {this.props.children}
      </Block>
    )
  }
}

/* map */

class Map extends Component {

  DrawMap = () => {
    let { WallMap, WallMapRevealed } = this.props.state
    return WallMapRevealed.map((HorizontalLine, y) => {
      return (
        <Block key={y}>
          {HorizontalLine.map((MapObjectRevealed, x) => {
            let MapObject = WallMap[y][x]
            return (
              <Inline key={x} style={Styles.MapObject} title={[x, y].join(",")}>
                {this.DrawMapObject(MapObject, MapObjectRevealed, x, y)}
              </Inline>
            )
          })}
        </Block>
      )
    })
  }

  DrawMapObject = (MapObject, MapObjectRevealed, x, y) => {
    let { Player, WallMap, WallMapRevealed, ShowFullMap } = this.props.state
    if (x === Player.x && y === Player.y) {
      return "O"
    }
    else {
      if (MapObjectRevealed === MapObject || ShowFullMap) {
        return MapObject
      }
      else {
        if (this.DetectObjectInVicinityOfActor(x, y, Player.x, Player.y)) {
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

/* directional arrows */

class GoNorth extends Component {
  MovePlayer = () => {
    let { MovePlayer } = this.props
    MovePlayer("North")
  }
  render() {
    return <Arrow {... this.props} onClick={this.MovePlayer} arrow="ArrowUp">↑</Arrow>
  }
}

class GoWest extends Component {
  MovePlayer = () => {
    let { MovePlayer } = this.props
    MovePlayer("West")
  }
  render() {
    return <Arrow {... this.props} onClick={this.MovePlayer} arrow="ArrowLeft">←</Arrow>
  }
}

class GoEast extends Component {
  MovePlayer = () => {
    let { MovePlayer } = this.props
    MovePlayer("East")
  }
  render() {
    return <Arrow {... this.props} onClick={this.MovePlayer} arrow="ArrowRight">→</Arrow>
  }
}
class GoSouth extends Component {
  MovePlayer = () => {
    let { MovePlayer } = this.props
    MovePlayer("South")
  }
  render() {
    return <Arrow {... this.props} onClick={this.MovePlayer} arrow="ArrowDown">↓</Arrow>
  }
}

class Arrow extends Component {
  constructor(props) {
    super(props)
    this.state = { style: Styles.ArrowBlock }
  }
  NormalStyle = () => {
    this.setState({ style: Styles.ArrowBlock })
  }
  HoverStyle = () => {
    this.setState({ style: Styles.ArrowBlockHover })
  }
  onClick = () => {
    this.props.onClick()
    this.setState({ style: Styles.ArrowBlockClick })
    let that = this
    setTimeout(function () {
      if (that.state.style === Styles.ArrowBlockClick) {
        that.setState({ style: Styles.ArrowBlockHover })
      }
    }, 50)
  }
  render() {
    return (
      <Block onClick={this.onClick} onMouseMove={this.HoverStyle} onMouseLeave={this.NormalStyle} style={this.props.arrowStyle && this.props.arrowStyle[this.props.arrow] ? this.props.arrowStyle[this.props.arrow] : null || this.state.style}>{this.props.children}</Block>
    )
  }
}

class Arrows extends Component {
  render() {
    return (
      <Block style={Styles.ArrowContainer}>
        <Block style={Styles.ArrowRow}>
          <GoNorth {... this.props} />
        </Block>
        <Block style={Styles.ArrowRow}>
          <GoWest {... this.props} />
          <GoEast {... this.props} />
        </Block>
        <Block style={Styles.ArrowRow}>
          <GoSouth {... this.props} />
        </Block>
      </Block>
    )
  }
}

/* player actions */

class Actions extends Component {
  render() {
    return (
      <Block style={Styles.Actions}>
      </Block>
    )
  }
}


/* player stats */

class PlayerStats1 extends Component {
  render() {
    return (
      <Block style={Styles.PlayerStats1}>
        <Block style={Styles.PlayerStat}>
          Health:
          <br />{this.props.Player.Health}/{this.props.Player.MaxHealth}
        </Block>
        <Block style={Styles.PlayerStat}>
          Mana:
          <br />{this.props.Player.Mana}/{this.props.Player.MaxMana}
        </Block>
        <Block style={Styles.PlayerStat}>
          Stamina:
          <br />{this.props.Player.Stamina * 100}%
        </Block>
      </Block>
    )
  }
}

class PlayerStats2 extends Component {
  render() {
    return (
      <Block style={Styles.PlayerStats2}>
        <Block style={Styles.PlayerStat}>
          Luck: {this.props.Player.Luck}
        </Block>
        <Block style={Styles.PlayerStat}>
          Constitution: {this.props.Player.Constitution}
        </Block>
        <Block style={Styles.PlayerStat}>
          Strength: {this.props.Player.Strength}
        </Block>
        <Block style={Styles.PlayerStat}>
          Dexterity: {this.props.Player.Dexterity}
        </Block>
      </Block>
    )
  }
}

/* low part pf the HUD */

class LowerHUD extends Component {
  render() {
    return (
      <Block style={Styles.HUDLowerBlock}>
        {this.props.children}
      </Block>
    )
  }
}

/* inventory */

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

/* main */

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
    let initState = Object.assign(
      StaticAssets,
      DynamicAssets,
    )

    // create the list of random items to draw from, grouped by level
    initState.RandomItems = {}

    Object.keys(initState.Items).map(itemObjectName => {
      let item = initState.Items[itemObjectName]
      if (initState.RandomItems["Level" + item.level] === undefined) {
        initState.RandomItems["Level" + item.level] = []
      }
      initState.RandomItems["Level" + item.level].push(item)
      return null
    })

    initState.Player = this.GeneratePlayerStats(initState.Player)

    this.state = initState

  }

  componentWillMount() {
    document.addEventListener("keydown", this.ListenToKeyboard, false)
  }

  componentWillUpdate(nextProps, nextState) {

    // set timer to clear message after it has been displayed
    if (nextState.curentMessage !== " ") {
      setTimeout(function () {
        if (nextState.currentMessage !== "") {
          this.setState({ currentMessage: "" })
        }
      }.bind(this), 2000)
    }

    if (nextState.arrowStyle !== null) {
      setTimeout(function () {
        this.setState({ arrowStyle: null })
      }.bind(this), 50)
    }

  }

  RandomIntegerFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  RandomInteger = (max = 100) => {
    return Math.floor(Math.random() * max)
  }

  RollD20 = () => {
    return this.RandomInteger(20)
  }

  GetUnlucky = (Luck) => {
    return this.RandomInteger() + Luck <= 60
  }

  ListenToKeyboard = (keypress) => {

    // console.log(keypress)

    keypress.preventDefault()

    switch (keypress.key) {

      case "ArrowDown":
        this.MovePlayer("South")
        this.onClickArrow(keypress.key)
        break;

      case "ArrowUp":
        this.MovePlayer("North")
        this.onClickArrow(keypress.key)
        break;

      case "ArrowLeft":
        this.MovePlayer("West")
        this.onClickArrow(keypress.key)
        break;

      case "ArrowRight":
        this.MovePlayer("East")
        this.onClickArrow(keypress.key)
        break;

    }


  }

  onClickArrow = (key) => {
    let arrowStyle = {}
    arrowStyle[key] = Styles.ArrowBlockClick
    this.setState({ arrowStyle: arrowStyle })
    let that = this
  }

  GeneratePlayerStats = (Player) => {

    Player.Luck = this.RandomIntegerFromRange(10,20)
    Player.Constitution = this.RandomIntegerFromRange(10,20)
    Player.Strength = this.RandomIntegerFromRange(10,20)
    Player.Dexterity = this.RandomIntegerFromRange(10,20)

    return Player

  }

  MovePlayer = (Direction) => {

    let State = this.state

    // get the target coordinates
    let targetCoordinates = this.MoveObject({ x: State.Player.x, y: State.Player.y }, Direction)

    // check if there is a locked door in the way
    if (this.CheckLockedDoors(targetCoordinates)) {
      this.setState({ currentMessage: StaticAssets.Messages.LockedDoor })
      return
    }

    // the player can not go there (there is a wall in the way)
    if (!this.DetectCollision(targetCoordinates)) {
      this.setState({ currentMessage: StaticAssets.Messages.Collision })
      return
    }

    // add containers to the list of events
    State.currentEvent = this.CheckLootContainers(targetCoordinates)

    // save the new coordinates
    State.Player.x = targetCoordinates.x
    State.Player.y = targetCoordinates.y

    // check if the text needs to be updated
    this.UpdateText(targetCoordinates)

    this.setState(State)
  }

  MoveObject = (originalCoordinates, Direction) => {

    // grab the object's current position
    let targetCoordinates = { x: originalCoordinates.x, y: originalCoordinates.y }

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

  DetectCollision = ({ x, y }) => {

    let State = this.state

    // target is, apparently, empty
    let targetCoordinates = State.WallMap[y][x]
    if (targetCoordinates === " ") {
      return true
    }

    // target is a door
    if (targetCoordinates === "D")
      // check if the door is locked
      if (!this.CheckLockedDoors({ x, y })) {
        return true
      }

    return false
  }

  CheckLockedDoors = ({ x, y }) => {

    let { LockedDoors } = this.state

    let matchLockedDoor = LockedDoors.filter((object) => {
      return object.x === x && object.y === y && !object.unlocked
    })

    return matchLockedDoor.length > 0

  }

  CheckLootContainers = ({ x, y }) => {

    let { LootContainers } = this.state

    let matchLootContainer = LootContainers.filter(object => {
      if (object.items) {
        object.items = object.items.map(item => {
          return this.GenerateRandomLoot(item)
        }).filter(item => { return item !== null })
      }
      return object.x === x && object.y === y
    })

    matchLootContainer = matchLootContainer.map(loot => {
      loot.eventType = "loot"
      return loot
    })

    return matchLootContainer

  }

  GenerateRandomLoot = (item) => {
    let { RandomItems } = this.state
    if (item.random) {
      if (!this.GetUnlucky(10)) {
        item = RandomItems["Level" + item.level][this.RandomIntegerFromRange(0, RandomItems["Level" + item.level].length - 1)]
      }
      else {
        return null
      }
    }
    return item
  }

  UpdateText = ({ x, y }) => {
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
        <Message {... this} />
        {/* row 2 */}
        <TextBlock>
          <Text {... this.state} />
          <Event {... this.state} />
        </TextBlock>
        <Map {... this} />
        {/* row 3 */}
        <LowerHUD />
        <PlayerStats1 {... this.state} />
        <Arrows {... this} {... this.state} />
        <Actions/>
        <PlayerStats2 {... this.state} />
        <Inventory />
      </PageContainer>
    )
  }
}

export default Game
