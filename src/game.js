import React, { Component } from "react"
import StaticAssets from "./StaticAssets.js"
import DynamicAssets from "./DynamicAssets.js"
import Styles from "./styles.js"

const authorEmail = "gurcan.yves@gmail.com"
const contactTemplate = "mailto:" + authorEmail +"?subject=Dungeon!"
const repository = "https://github.com/yvesgurcan/dungeon"
const gitHubLogo = "/graphics/misc/Octocat.png"
const itemPath = "/graphics/items/"
const imgExt = ".png"

/* web components */

// a
class URL extends Component {
  render() {
    return (
      <a {... this.props} children={this.props.children}/>
    )
  }
}

// span
class Text extends Component {
  render() {
    return <span {...this.props} />
  }
}

// div
class Block extends Component {
  render() {
    return <div {...this.props} />
  }
}

// h2
class PageSubtitle extends Component {
  render() {
    return <h2 {...this.props} style={Styles.H2} children={this.props.children} />
  }
}

// h1
class PageTitle extends Component {
  render() {
    return <h1 {...this.props} style={Styles.H1} children={this.props.children} />
  }
}

// view (React Native compatibility)
class View extends Component {
  render() {
    return <div {...this.props} />
  }
}

// img
class Image extends Component {
  render() {
    return (
      <img
        alt={this.props.alt || this.props.title || ""}
        {...this.props} />
    )
  }
}

/* small components */

class ClearFloat extends Component {
  render() {
    return  <View style={{clear: "both"}} />
  }
}

class Version extends Component {
  render() {
    return (
      <View>
        {this.props.children} version
      </View>
    )
  }
}

class GitHub extends Component {
  render() {
    return (
      <Graphics
        src={gitHubLogo}
        style={Styles.GitHubLogo}
        title="GitHub repository"/>
    )
  }
}

class Link extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  NormalStyle = () => {
    this.setState({ style: Styles.Link})
  }
  HoverStyle = () => {
    this.setState({ style: Styles.LinkHover})
  }
  render() {
    return (
      <URL
        onMouseMove={this.HoverStyle}
        onMouseLeave={this.NormalStyle}
        style={this.state.style || Styles.Link}
        {...this.props}/>
    )
  }
}

/* images */

class Graphics extends Component {
  render() {
    if (this.props.image === null) return null
    else {
      return (
        <Image
          title={this.props.title}
          {... this.props} />
      )
    }
  }
}

class ItemImage extends Component {
  render() {
    return (
      <Text>
        <Graphics
          onClick={this.props.onClick}
          src={this.props.image ? itemPath + this.props.image + imgExt : null}
          style={Styles.ItemImage}
          title={this.props.name} />
      </Text>
    )
  }
}

class ItemImageBlock extends Component {
  render() {
    return (
      <View style={Styles.ItemImageBlock}>
        <ItemImage {... this.props} />
      </View>
    )
  }
}

/* inventory */

class Inventory extends Component {
  
  DisplayInventory = () => {

    let {Backpack} = this.props
    let list = []

    for (let i = 0; i < Backpack.maxItems; i++) {
      if (Backpack.Items[i] !== undefined) {
        list.push(Backpack.Items[i])
      }
      else {
        list.push(null)
      }
    }

    let inventory = list.map((item, index) => {
      return (
        <ItemImageBlock
          key={index}
          image={(item && item.image) || null}
          name={(item && item.name) || null}/>
      )
    })

    return inventory
  }

  render() {
    return (
      <View style={Styles.Inventory}>
        {this.DisplayInventory()}
      </View>
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
      <Text
        onClick={this.onClick}
        onMouseMove={this.HoverStyle}
        onMouseLeave={this.NormalStyle}
        style={
          this.props.arrowStyle && this.props.arrowStyle[this.props.arrow]
            ? this.props.arrowStyle[this.props.arrow]
            : null || this.state.style}>
        {this.props.children}
      </Text>
    )
  }
}

class Arrows extends Component {
  render() {
    return (
      <View style={Styles.ArrowContainer}>
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
      </View>
    )
  }
}

/* player actions */

class TakeAll extends Component {
  render() {
    return (
      <ActionButton {... this.props}>
        Take All
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
      <View
        onClick={this.onClick}
        onMouseMove={this.HoverStyle}
        onMouseLeave={this.NormalStyle}
        style={this.state.style}>
        {this.props.children}
      </View>
    )
  }
}

class Actions extends Component {
  render() {
    return (
      <View style={Styles.Actions}>
        {/* todo */}
      </View>
    )
  }
}

/* player stats */

class PlayerStats1 extends Component {
  render() {
    return (
      <View style={Styles.PlayerStats1}>
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
      </View>
    )
  }
}

class PlayerStats2 extends Component {
  render() {
    return (
      <View style={Styles.PlayerStats2}>
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
      </View>
    )
  }
}

/* player controls */

class Controls extends Component {
  render() {
    return (
      <View style={Styles.ControlBlock}>
        {this.props.children}
      </View>
    )
  }
}

/* story and events */

// a brief message that provides feedback on the user's actions (example: "you can't go there")
class Message extends Component {
  render() {
    return (
      <View style={Styles.Message}>
        {this.props.state.currentMessage}
      </View>
    )
  }
}

// a descriptive paragraph about the surroundings of the user, to set the mood :)
class Story extends Component {
  render() {
    return (
      <View style={Styles.Story}>
        {this.props.currentText}
      </View>
    )
  }
}

// single loot item
class Loot extends Component {

  onClick = () => {
    this.props.TakeSingleLoot(this.props.index,this.props.lootContainerId)
  }

  render() {
    let {item} = this.props
    return (
      <ItemImageBlock
        onClick={this.onClick}
        image={(item && item.image) || null}
        name={(item && item.name) || null}
        {... this.props}/>      
    )
  }
}

// the loot found by the player
class LootList extends Component {

  render() {
    return (
      <View>
        <Block>
        {
          this.props.items && this.props.items.map((item, index) => {
            return (
              <Loot
                key={index}
                index={index}
                item={item}
                lootContainerId={this.props.lootContainerId}
                TakeSingleLoot={this.props.TakeSingleLoot} />
            )
          })
        }
        </Block>

      </View>
    )
  }
}

// some text that describes an event that has just occurred ("you found a chest")
class Event extends Component {

  ItemArticle = (itemName) => {
    if (itemName) {

      const Vowels = ["a","e","i","u","o"]

      if (isNaN(itemName) && Vowels.includes(itemName[0].toLowerCase())) {
        return "an"
      }
      else {
        return "a"
      }
    }
    else {
      return null
    }
  }

  GenerateEventText = () => {

    let { currentEvent, Stationary } = this.props
    let loot = false
    let lootIsEmpty = true

    let eventText = currentEvent.map((event, index) => {

      if (event.eventType === "loot") {

        loot = true

        if (event.items.length === 0) {
          if (!Stationary) {
            event.name = "empty " + event.name.replace("empty ","")
          }
        }
        else {
          lootIsEmpty = false
        }

        if (Stationary && event.items.length === 0) {
          return (
            <Text key={index}>
              <Text>The  </Text>
              <Text>{event.name}</Text>
              <Text> is empty.</Text>
              <ClearFloat />
            </Text>
          )
        }
        else {
          return (
            <Text key={index}>
              <Text>You found </Text>
              <Text>{this.ItemArticle(event.name)}</Text>
              <Text> </Text>
              <Text>{event.name}</Text>
              <Text>.</Text>
              <LootList items={event.items} lootContainerId={event.id} {... this.props} />
              <ClearFloat />
            </Text>
          )
        }
      }
      else {
        console.warn("Unknown type of event.", event)
      }
      return null
    })

    if (loot && !lootIsEmpty) {
      eventText.push(
        <Block key="TakeAll">
          <TakeAll
            onClick={this.props.TakeAllLoot}/>
        </Block>
      )
    }

    return eventText

  }

  render() {
    return (
      <View style={Styles.Event}>
        {this.GenerateEventText()}
      </View>
    )
  }
}

class StoryBlock extends Component {
  render() {
    return (
      <View style={Styles.StoryBlock}>
        {this.props.children}
      </View>
    )
  }
}

/* map */

class Map extends Component {

  DrawMap = () => {
    let { WallMap, WallMapRevealed } = this.props.state
    return WallMapRevealed.map((HorizontalLine, y) => {
      return (
        <View key={y}>
          {HorizontalLine.map((MapObjectRevealed, x) => {
            let MapObject = WallMap[y][x]
            return (
              <Text key={x} style={Styles.MapObject} title={[x, y].join(",")}>
                {this.DrawMapObject(MapObject, MapObjectRevealed, x, y)}
              </Text>
            )
          })}
        </View>
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
      <View style={Styles.Map}>
        {this.DrawMap()}
      </View>
    )
  }
}

/* top */

class Contact extends Component {
  render() {
    return (
      <View style={Styles.Contact}>
        <Text>
          <Text>
          written by&nbsp;
          </Text>
          <Text>
            <Link
              href={contactTemplate}
              title={authorEmail}
              target="_blank">
              Yves Gurcan
            </Link>
            <Link
              href={repository}
              target="_blank">
              <GitHub/>
            </Link>
          </Text>
        </Text>
      </View>
    )
  }
}

class Header extends Component {
  render() {
    return (
      <View style={Styles.Header}>
        <PageTitle>Dungeon!</PageTitle>
        <PageSubtitle>a D&amp;D-inspired game written with ReactJS</PageSubtitle>
        <Version>pre-alpha</Version>
      </View>
    )
  }
}

/* main */

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

  componentDidUpdate(nextProps, nextState) {

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

      default:
        break
      case "ArrowDown":
        this.MovePlayer("South")
        this.onClickArrow(keypress.key)
        break

      case "ArrowUp":
        this.MovePlayer("North")
        this.onClickArrow(keypress.key)
        break

      case "ArrowLeft":
        this.MovePlayer("West")
        this.onClickArrow(keypress.key)
        break

      case "ArrowRight":
        this.MovePlayer("East")
        this.onClickArrow(keypress.key)
        break

    }

  }

  onClickArrow = (key) => {
    let arrowStyle = {}
    arrowStyle[key] = Styles.ArrowBlockClick
    this.setState({ arrowStyle: arrowStyle })
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
    State.Stationary = false

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

    // can not get out of the map boundaries
    if (y < 0 || x < 0 || y >= State.WallMap.length || x >= State.WallMap[y].length ) {
      return false
    }

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
    if (item && item.random) {
      if (!this.GetUnlucky(10)) {
        item = RandomItems["Level" + item.level][this.RandomIntegerFromRange(0, RandomItems["Level" + item.level].length - 1)]
      }
      else {
        return null
      }
    }
    return item
  }

  TakeAllLoot = () => {

    let {currentEvent, Backpack} = this.state

    // TODO: check if there is room in the inventory

    let loot = []

    currentEvent.map(event => {
      if (event.eventType === "loot") {
        if (event.items) {
          loot = loot.concat(event.items)
          event.items = []
        }
      }
      return null
    })

    Backpack.Items = Backpack.Items.concat(loot)

    this.setState({Backpack: Backpack, Stationary: true})

  }

  TakeSingleLoot = (lootIndex, containerId) => {
    
    let {LootContainers, Backpack} = this.state

    // TODO: check if there is room in the inventory

    let matchLootContainer = LootContainers.filter(lootContainer => {
      return lootContainer.id === containerId
    })[0]


    Backpack.Items.push(matchLootContainer.items[lootIndex])

    this.setState({Backpack: Backpack}, function() {
      matchLootContainer.items[lootIndex] = null
      this.setState({currentEvent: this.state.currentEvent})
    })

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
      <View style={Styles.Game}>
        {/* row 1 */}
        <Header/>
        {/* row 2 */}
        <Contact/>
        <Message {... this} />
        {/* row 3 */}
        <StoryBlock>
          <Story {... this.state} />
          <Event {... this} {... this.state} />
        </StoryBlock>
        <Map {... this} />
        {/* row 4 */}
        <Controls />
        <PlayerStats1 {... this.state} />
        <Arrows {... this} {... this.state} />
        <Actions/>
        <PlayerStats2 {... this.state} />
        <Inventory {... this.state} />
      </View>
    )
  }
}

export default Game
