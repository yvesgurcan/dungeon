import React, { Component } from "react"
import StaticAssets from "./StaticAssets.js"
import DynamicAssets from "./DynamicAssets.js"
import UtilityAssets from "./UtilityAssets.js"
import Styles from "./styles.js"
import Functions from "./Functions.js"

const authorEmail = "gurcan.yves@gmail.com"
const contactTemplate = "mailto:" + authorEmail +"?subject=Dungeon!"
const repository = "https://github.com/yvesgurcan/dungeon"
const gitHubLogo = "/graphics/misc/Octocat.png"
const itemPath = "/graphics/items/"
const imgExt = ".png"

const {North, South, West, East} = UtilityAssets.Directions
const {Wall, Door, LootContainer, Undiscovered, Empty} = UtilityAssets.MapObjects

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

class ItemImagePlaceholder extends Component {
  render() {
    return (
      <Text>
      <Block
        onClick={this.props.onClick}
        style={Styles.ItemImagePlaceholder}
        title={this.props.name} />
      </Text>   
    )
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
          name={(item && item.Name) || null}/>
      )
    })

    return inventory
  }

  render() {
    let {Player, Backpack} = this.props
    return (
      <View style={Styles.Inventory}>
        {this.DisplayInventory()}
        <ClearFloat/>
        <Text>
          Weight: {Number(Backpack.Weight).toFixed(2)} / {Player.MaxWeight} lbs
        </Text>
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

class ShortRest extends Component {
  render() {
    return (
      <ActionButton {... this.props}>
        Short Rest
      </ActionButton>
    )
  }
}

class LongRest extends Component {
  render() {
    return (
      <ActionButton {... this.props}>
        Long Rest
      </ActionButton>
    )
  }
}

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
        <ShortRest />
        <LongRest />
      </View>
    )
  }
}

/* stat bar */

class StatBar extends Component {
  render() {
    return (
      <View>
        <Block
          style={Styles.StatBar} 
          title={this.props.ratio || (this.props.current + "/" + this.props.max)}>
          <Block
            style={this.props.style}/>
        </Block>
      </View>
    )
  }
}

class StaminaBar extends Component {
  render() {
    let style = {... Styles.StaminaBar, width: Math.min(100, Math.ceil(this.props.current/this.props.max * 100)) + "%"}
    return (
      <View>
        <StatBar style={style} ratio={style.width}/>
      </View>
    )
  }
}

class ManaBar extends Component {
  render() {
    let style = {... Styles.ManaBar, width: Math.min(100, this.props.current/this.props.max * 100) + "%"}
    return (
      <View>
        <StatBar style={style} max={this.props.max} current={this.props.current}/>
      </View>
    )
  }
}

class HealthBar extends Component {
  render() {
    let style = {... Styles.HealthBar, width: Math.min(100, this.props.current/this.props.max * 100) + "%"}
    return (
      <View>
        <StatBar style={style} max={this.props.max} current={this.props.current}/>
      </View>
    )
  }
}

/* weapons at hand and prepared spells */

class WeaponReady extends Component {
  render() {
    let {Item, Slot} = this.props
    if (!Item) {
      return (
        <View style={Styles.ReadyItem}>
          <ItemImagePlaceholder
            image={null}
            name={Slot + ": none"}/>
        </View>
      )
    }
    else {
      return (
        <View style={Styles.ReadyItem}>
          <ItemImageBlock
          onClick={this.onClick}
          image={(Item && Item.image) || null}
          name={Item && Item.Name ? Slot + ": " + Item.Name : null}
          {... this.props}/>
        </View>
      )
    }
  }
}

class WeaponReadyBlock extends Component {
  render() {
    let {Gear} = this.props
    return (
      <View>
        <WeaponReady Slot="Left hand" Item={Gear.LeftHand} />
        <WeaponReady Slot="Right hand" Item={Gear.RightHand} />
      </View>
    )
  }
}

class PreparedSpell extends Component {
  render() {
    let {Item} = this.props
    if (!Item) {
      return (
        <View style={Styles.ReadyItem}>
          <ItemImagePlaceholder
            image={null}
            name={"Prepared spell: none"}/>
        </View>
      )
    }
    else {
      return (
        <View style={Styles.ReadyItem}>
          <ItemImageBlock
          onClick={this.onClick}
          image={(Item && Item.image) || null}
          name={Item && Item.Name ? "Prepared spell: " + Item.Name : null}
          {... this.props}/>
        </View>
      )
    }
  }
}

class PreparedSpellBlock extends Component {
  render() {
    let {Gear} = this.props
    return (
      <View>
        <PreparedSpell Item={Gear.PreparedSpell1} />
        <PreparedSpell Item={Gear.PreparedSpell2} />
      </View>
    )
  }
}

/* player stats */

class PlayerStats0 extends Component {
  render() {
    let {Player} = this.props
    return (
      <View style={Styles.PlayerStats0}>
        <Block>
          <Text>{Player.Name}</Text>
        </Block>
        <Block style={Styles.ReadyItemBlock}>
          <WeaponReadyBlock {... this.props} />
          <PreparedSpellBlock {... this.props} />
        </Block>
      </View>
    )
  }
}

class PlayerStats1 extends Component {
  render() {
    let {Player} = this.props
    return (
      <View style={Styles.PlayerStats1}>
        <Block style={Styles.PlayerStat}>
          Health
          <HealthBar current={Player.Health} max={Player.MaxHealth}/>
        </Block>
        <Block style={Styles.PlayerStat}>
          Mana:
          <ManaBar current={Player.Mana} max={Player.MaxMana}/>
        </Block>
        <Block style={Styles.PlayerStat}>
          Stamina:
          <StaminaBar current={Player.Stamina} max={Player.MaxStamina}/>
        </Block>
      </View>
    )
  }
}

class PlayerStats2 extends Component {
  render() {
    let {Player} = this.props
    return (
      <View style={Styles.PlayerStats2}>
        <Block style={Styles.PlayerStat}>
          Luck: {Player.Luck}
        </Block>
        <Block style={Styles.PlayerStat}>
          Constitution: {Player.Constitution}
        </Block>
        <Block style={Styles.PlayerStat}>
          Strength: {Player.Strength}
        </Block>
        <Block style={Styles.PlayerStat}>
          Dexterity: {Player.Dexterity}
        </Block>
        <Block style={Styles.PlayerStat}>
          Intelligence: {Player.Intelligence}
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
        {this.props.permanentMessage || this.props.currentMessage}
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
        name={(item && item.Name) || null}
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

  GenerateEventText = () => {

    let { currentEvent, Stationary } = this.props
    let loot = false
    let lootIsEmpty = true

    let eventText = currentEvent.map((event, index) => {

      if (event.eventType === "loot") {

        loot = true

        if (event.items.length === 0) {
          if (!Stationary) {
            event.Name = "empty " + event.Name.replace("empty ","")
          }
        }
        else {
          lootIsEmpty = false
        }

        if (Stationary && event.items.length === 0) {
          return (
            <Text key={index}>
              <Text>The  </Text>
              <Text>{event.Name.replace("empty","")}</Text>
              <Text> is empty.</Text>
              <ClearFloat />
            </Text>
          )
        }
        else {
          return (
            <Text key={index}>
              <Text>You found </Text>
              <Text>{Functions.IndefiniteArticle(event.Name)}</Text>
              <Text> </Text>
              <Text>{event.Name}</Text>
              <Text>.</Text>
              <LootList items={event.items} lootContainerId={event.Id} {... this.props} />
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
    let {WallMap, WallMapRevealed, WallMapVisibleRange, Player} = this.props
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

    let {Player, MonsterMap, ShowFullMap} = this.props

    if (ShowFullMap || x >= Player.x - 1 && x <= Player.x + 1 && y >= Player.y - 1 && y <= Player.y + 1) {
      if (MonsterMap[y][x] !== Empty) {
        if (x === Player.x && y === Player.y) {
          return null
        }
        return <Block style={Styles.Monster} />
      }
    }
    return null
  }

  DrawMapObject = (MapObject, MapObjectRevealed, x, y) => {

    let {Player, ShowFullMap, WallMap, WallMapRevealed, DiscoveryMap, LootMap, MonsterMap} = this.props

    // player marker
    if (x === Player.x && y === Player.y) {
      return <Block style={Styles.Player} />
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
            // <Block style={{textAlign: "center"}}>{MapObject}</Block>
          }

        }
        // this is a loot container and it is part of the map that has been explored
        else if (LootMap[y][x] === LootContainer && (DiscoveryMap[y][x] === Empty || ShowFullMap)) {

          return <Block style={Styles.Loot} />

        }

        // it's somethin else
        return <Block style={{textAlign: "center"}}>{MapObject}</Block>

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

          // it's somethin else
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

    let EmptySurrounding = 0

    MapObjectInContext.map(Row => {
      Row.map(MapObj => {
        if (MapObj === Empty) {
          EmptySurrounding++
        }
      })
    })

    // Pillar
    if (
      EmptySurrounding === 8
    ) {
      return <Block style={Styles.Wall.Pillar} />
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
        <Block style={Styles.Wall.NorthWestEastAndNorthWest}/>
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
        <Block style={Styles.Wall.NorthSouthEastAndSouthEast}/>
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
        <Block style={Styles.Wall.TShapedWallNSE}>
          <Block style={Styles.Wall.NorthSouthAndEast} />
          </Block>
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
        <Block style={Styles.Wall.TShapedWallNSW}>
          <Block style={Styles.Wall.NorthSouthAndWest} />
          </Block>
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
      return <Block style={Styles.Wall.NorthToEast} />
    }
    // South and West
    else if (
        (MapObjectInContext[South.y][South.x] === Wall
        || MapObjectInContext[South.y][South.x] === Door)
      &&
        (MapObjectInContext[West.y][West.x] === Wall
        || MapObjectInContext[West.y][West.x] === Door)
    ) {
      return <Block style={Styles.Wall.SouthToWest} />
    }
    // South and East
    else if (
        (MapObjectInContext[South.y][South.x] === Wall
        || MapObjectInContext[South.y][South.x] === Door)
      &&
        (MapObjectInContext[East.y][East.x] === Wall
        || MapObjectInContext[East.y][East.x] === Door)
    ) {
      return <Block style={Styles.Wall.SouthToEast} />
    }
    // North and West
    else if (
        (MapObjectInContext[North.y][North.x] === Wall
        || MapObjectInContext[North.y][North.x] === Door)
      &&
        (MapObjectInContext[West.y][West.x] === Wall
        || MapObjectInContext[West.y][West.x] === Door)
    ) {
      return <Block style={Styles.Wall.NorthToWest} />
    }
    // North and South
    else if (
        (MapObjectInContext[North.y][North.x] === Wall
        || MapObjectInContext[North.y][North.x] === Door)
      &&
        (MapObjectInContext[South.y][South.x] === Wall
        || MapObjectInContext[South.y][South.x] === Door)
    ) {
      return <Block style={Styles.Wall.NorthToSouth} />
    }
    // West and East
    else if (
        (MapObjectInContext[West.y][West.x] === Wall
        || MapObjectInContext[West.y][West.x] === Door)
      &&
        (MapObjectInContext[East.y][East.x] === Wall
        || MapObjectInContext[East.y][East.x] === Door)
    ) {
      return <Block style={Styles.Wall.WestToEast} />
    }
    else {
      return MapObject
    }
  }

  DrawDoor = (MapObjectInContext, MapObject) => {

    if (
        (MapObjectInContext[North.y][North.x] === Wall
        || MapObjectInContext[North.y][North.x] === Door)
      &&
        (MapObjectInContext[South.y][South.x] === Wall
        || MapObjectInContext[South.y][South.x] === Door)
      ) {
        return <Block style={Styles.Door.NorthToSouth} />
      }
    else if (
        (MapObjectInContext[West.y][West.x] === Wall
        || MapObjectInContext[West.y][West.x] === Door)
      &&
        (MapObjectInContext[East.y][East.x] === Wall
        || MapObjectInContext[East.y][East.x] === Door)
      ) {
        return <Block style={Styles.Door.WestToEast} />
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
      {WallMapVisibleRange: UtilityAssets.WallMapVisibleRange},
    )

    // create the list of random items to draw from when looting, grouped by level
    initState.RandomItems = {}

    Object.keys(initState.Items).map(itemObjectName => {
      let item = initState.Items[itemObjectName]
      if (initState.RandomItems["Level" + item.level] === undefined) {
        initState.RandomItems["Level" + item.level] = []
      }
      initState.RandomItems["Level" + item.level].push(item)
      return null
    })

    // create discovery map, given player start position
    initState.DiscoveryMap = JSON.parse(JSON.stringify(StaticAssets.WallMap.map((HorizontalLine, y) => HorizontalLine.map((MapObject, x) => {
        if ((x >= DynamicAssets.Player.x - 1 && x <= DynamicAssets.Player.x + 1) && (y >= DynamicAssets.Player.y - 1 && y <= DynamicAssets.Player.y + 1)) {
          return Empty
        }
        else {
          return Undiscovered
        }
      }))
    ))

    // create the map of loot containers
    let LootMap = JSON.parse(JSON.stringify(StaticAssets.WallMap.map(HorizontalLine => HorizontalLine.map(x => " "))))

    DynamicAssets.LootContainers.map(Container => {
      LootMap[Container.y][Container.x] = LootContainer
      return null
    })

    initState.LootMap = LootMap

    // create the map of monster locations
    let MonsterMap = JSON.parse(JSON.stringify(StaticAssets.WallMap.map(HorizontalLine => HorizontalLine.map(x => " "))))

    DynamicAssets.Monsters.map(Monster => {
      MonsterMap[Monster.y][Monster.x] = Monster.Id
      return null
    })

    initState.MonsterMap = MonsterMap

    // give the player first randomly generated stats
    initState.Player = this.GeneratePlayerStats(initState.Player)
    
    this.state = initState
    
  }

  componentWillMount() {
    document.addEventListener("keydown", this.ListenToKeyboard, false)
  }

  RandomDirection = (array) => {

    array = array.filter(HorizontalLine => HorizontalLine.length > 0)

    let randomY = Math.floor(Math.random() * (array.length))
    let randomX = Math.floor(Math.random() * (array[randomY].length))
    return array[randomY][randomX]
  }

  RandomIntegerFromRange = (min, max) => {
    return Math.floor(Math.random() * (Math.floor(max) - Math.floor(min) + 1)) + Math.floor(min)
  }

  RandomInteger = (max = 100) => {
    return Math.floor(Math.random() * Math.floor(max))
  }

  RollD20 = () => {
    return this.RandomInteger(20)
  }

  GetUnlucky = (Luck) => {
    return this.RandomInteger() + Luck <= 60
  }

  ListenToKeyboard = (keypress) => {

    let {Player} = this.state

    // console.log(keypress)

    keypress.preventDefault()

    if (Player.Dead) return false

    // in-game keyboard controls
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

      case "t":
        this.TakeAllLoot("")
        break

    }

  }

  SetPermanentMessage = (Message) => {
    this.setState({ permanentMessage: Message})
  }

  SetMessage = (Message) => {
    this.setState({ currentMessage: Message})
  }

  ResetMessage = () => {
    setTimeout(function () {
      if (this.state.currentMessage !== "") {
        this.setState({ currentMessage: "" })
      }
    }.bind(this), 2000)
  }

  onClickArrow = (key) => {
    let arrowStyle = {}
    arrowStyle[key] = Styles.ArrowBlockClick
    this.setState({ arrowStyle: arrowStyle })
    this.ResetArrowStyle()
  }

  ResetArrowStyle = () => {
    if (this.state.arrowStyle !== null) {
      setTimeout(function () {
        this.setState({ arrowStyle: null })
      }.bind(this), 50)
    }
  }

  GeneratePlayerStats = (Player) => {

    Player.Luck = this.RandomIntegerFromRange(10,20)
    Player.Constitution = this.RandomIntegerFromRange(10,20)
    Player.Strength = this.RandomIntegerFromRange(10,20)
    Player.Dexterity = this.RandomIntegerFromRange(10,20)
    Player.Intelligence = this.RandomIntegerFromRange(10,20)
    Player.MaxWeight = this.CalculateMaxWeight(Player)
    Player.MaxHealth = Player.Health = this.CalculateMaxHealth(Player)
    Player.MaxMana = Player.Mana = this.CalculateMaxMana(Player)
    Player.MaxStamina = Player.Stamina = this.CalculateMaxStamina(Player)

    return Player

  }

  CalculateMaxWeight = (Player) => {
    // level up
    if (Player.MaxWeight) {
      return Math.ceil((Player.Constitution * 1.25) + (Player.Strength * 1.75))
    }
    // new player
    else {
      return Math.ceil((Player.Constitution * 1.25) + (Player.Strength * 1.75))
    }
  }

  CalculateMaxHealth = (Player) => {
    // level up
    if (Player.MaxHealth) {
      return Math.ceil((Player.MaxHealth * 1.1) + Player.Luck/6)
    }
    // new player
    else {
      return Math.ceil((Player.Constitution * 2.25) + (Player.Strength/3) + this.RandomIntegerFromRange(-3, Player.Luck/3))
    }
  }

  CalculateMaxMana = (Player) => {
    // level up
    if (Player.MaxMana) {
      return Math.ceil((Player.MaxMana * 1.1) + Player.Luck/4)
    }
    // new player
    else {
     return Math.ceil((Player.Intelligence) * 1.45) + this.RandomIntegerFromRange(-4, Player.Luck/4)
    }
  }

  CalculateMaxStamina = (Player) => {
    // level up
    if (Player.MaxStamina) {
      return Math.ceil(Player.MaxStamina * 1.5)
    }
    // new player
    else {
     return Math.ceil((Player.Strength) * 5) + this.RandomIntegerFromRange(-5, Player.Luck/2)
    }
  }

  MovePlayer = (Direction) => {      

    let {Player, WallMap, DiscoveryMap, MonsterMap, currentEvent, Stationary, NoClip} = this.state
    let UpdateState = true

    if (Player.Dead) return false

    // get the target coordinates
    let targetCoordinates = this.MoveObject(
      {x: Player.x, y: Player.y}, Direction)

    // out of range
    if (targetCoordinates.y > WallMap.length - 1 || targetCoordinates.y < 0 || targetCoordinates.x > WallMap[targetCoordinates.y].length - 1 || targetCoordinates.x < 0) {
      this.setState({
        currentMessage: StaticAssets.Messages.Collision
      })
      this.ResetMessage()
      return
    }

    // check if there is a locked door in the way
    let Door = this.CheckLockedDoors(targetCoordinates)
    if (Door.Locked && !NoClip) {
      let LockedDoor = this.UnlockDoor(Door.Object)
      if (LockedDoor.Unlocked) {
        let UnlockMessage =
          StaticAssets.PartialMessages.UnlockDoor  + 
          LockedDoor.Key +
          StaticAssets.PartialMessages.Period
        this.setState({ currentMessage: UnlockMessage})
        this.ResetMessage()
      }
      else {
        this.setState({
          currentMessage: StaticAssets.Messages.LockedDoor
        })
        this.ResetMessage()
        return
      }
    }

    // player is attacking a monster
    if (MonsterMap[targetCoordinates.y][targetCoordinates.x] !== Empty) {
      UpdateState = false
      this.AttackMonster(targetCoordinates)

    }
    else {

      // the player can not go there (there is a wall/door in the way)
      if (!this.DetectCollision(targetCoordinates)) {
        this.setState({
          currentMessage: StaticAssets.Messages.Collision
        })
        this.ResetMessage()
        return
      }

    }

    // wake up any monster in the vicinity of the player
    this.WakeUpMonster(targetCoordinates)

    // the monsters get to move now
    this.MoveMonsters(targetCoordinates)

    // update state
    if (UpdateState) {

      // init
      let State = this.state
      
      // update the data about which parts of the map were revealed, in order to show loot containers on the map
      State.DiscoveryMap = this.UpdateDiscoveryMap(targetCoordinates)

      // add containers to the list of events
      State.currentEvent = this.CheckLootContainers(targetCoordinates)

      // save the new coordinates
      State.Player.x = targetCoordinates.x
      State.Player.y = targetCoordinates.y
      State.Stationary = false

      // update player stats
      State.Player.Stamina = State.Player.Stamina - 1

      // check if the text needs to be updated
      this.UpdateText(targetCoordinates)

      this.setState(State)

    }
    
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

    let {WallMap, MonsterMap, NoClip} = this.state

    if (NoClip) {
      return true
    }

    // can not get out of the map boundaries
    if (y < 0 || x < 0 || y >= WallMap.length || x >= WallMap[y].length ) {
      return false
    }

    // target is a monster
    if (MonsterMap[y][x] !== Empty) {
      return false
    }

    // target is empty or non-blocking
    if (WallMap[y][x] === Empty) {
      return true
    }

    // target is a door
    if (WallMap[y][x] === Door) {
      // check if the door is locked
      let Door = this.CheckLockedDoors({ x, y })
      if (Door.Locked) {
        return false
      }
      else {
        return true
      }
    }

    return false
  }

  UpdateDiscoveryMap = ({x, y}) => {

    let {DiscoveryMap} = this.state

    let NewDiscoveryMap = DiscoveryMap.map((HorizontalLine, MapY) => {
      return HorizontalLine.map((MapObject, MapX) => {
        if (MapY >= y-1 && MapY <= y+1 && MapX >= x-1 && MapX <= x+1) {
          return Empty
        }
        else {
          return MapObject
        }
      })
    })

    return NewDiscoveryMap

  }

  CheckLockedDoors = ({ x, y }) => {

    let { LockedDoors } = this.state

    let matchLockedDoor = LockedDoors.filter((object) => {
      return object.x === x && object.y === y && !object.Unlocked
    })

    return {
      Locked: matchLockedDoor.length > 0,
      Object: matchLockedDoor.length > 0 ? matchLockedDoor[0] : null
    }

  }

  UnlockDoor = (Door) => {

    let {Backpack, WallMap} = this.state

    let matchKey = Backpack.Items.filter(Item => {
      return Item.DoorId === Door.Id
    })

    if (matchKey.length > 0) {
      Door.Unlocked = true
      this.setState({Backpack: Backpack})
    }

    return {
      Unlocked: matchKey.length > 0,
      Key: matchKey.length > 0 ? matchKey[0].Name : null}

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

    let {currentEvent, Backpack, Player} = this.state

    if (Player.Dead) return false

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

    if (loot.length > 0) {

      Backpack.Items = Backpack.Items.concat(loot)
      this.RecalculateInventoryWeight(Backpack.Items)
      this.setState({Backpack: Backpack, Stationary: true})

    }

  }

  TakeSingleLoot = (lootIndex, containerId) => {
    
    let {LootContainers, Backpack, Player} = this.state

    if (Player.Dead) return false

    // TODO: check if there is room in the inventory

    let matchLootContainer = LootContainers.filter(lootContainer => {
      return lootContainer.Id === containerId
    })[0]


    Backpack.Items.push(matchLootContainer.items[lootIndex])

    this.setState({Backpack: Backpack}, function() {
      matchLootContainer.items[lootIndex] = null
      this.setState({currentEvent: this.state.currentEvent})
    })

  }

  RecalculateInventoryWeight = (Items) => {

    let {Backpack} = this.state

    if (Items) {
      Backpack.Weight = Items.map(Item => {return Item.Weight}).reduce((sum, val) => sum + val)
    }
    else {
      Backpack.Weight = Backpack.Items.map(Item => {return Item.Weight}).reduce((sum, val) => sum + val)
    }

    this.setState({Backpack: Backpack})
    
  }

  WakeUpMonster = ({x, y}) => {
    
    let {Monsters} = this.state

    let MonsterAwake = Monsters.filter(Monster => {
      return Monster.x >= x-1 && Monster.x <= x+1 && Monster.y >= y-1 && Monster.y <= y+1 && !Monster.ChasePlayer
    })

    if (MonsterAwake.length === 0) return null
    else MonsterAwake = MonsterAwake[0]

    MonsterAwake.ChasePlayer = true
    MonsterAwake.Stationary = false

    this.ResetMessage()

  }

  MoveMonsters = (PlayerNewCoordinates) => {
    let {Monsters, Player} = this.state

    let MovingMonsters = Monsters.filter(Monster => {
      return !Monster.Dead && (Monster.ChasePlayer || !Monster.Stationary)
    })

    MovingMonsters.map(Monster => {
      if (Monster.ChasePlayer) {
        return this.ChasePlayer(Monster, PlayerNewCoordinates)
      }
      else {
        return this.Patrol(Monster)
      }
      return null
    })

  }

  Patrol = (Monster) => {

    let {MonsterMap} = this.state

    let Surroundings = this.GetSurroundingWalls({x: Monster.x, y: Monster.y})

    // indicate coordinates in the array
    Surroundings = Surroundings.map((HorizontalLine, y) => {
      return HorizontalLine.map((MapObject, x) => {
        if (MapObject === Empty) {
          // do not let monsters move diagonally
          if (
            (x === 0 && y === 0)
            || (x === 2 && y === 2)
            || (x === 2 && y === 0)
            || (x === 0 && y === 2)
          ) {
            return Wall
          }
          return {x: x - 1, y: y - 1}
        }
        else {
          return MapObject
        }
      })
    })

    // filter out walls and doors to only give valid choices
    Surroundings = Surroundings.map((HorizontalLine, y) => {
      return HorizontalLine.filter(x => {
        return x !== Wall && x !== Door
      })
    })

    let Direction = this.RandomDirection(Surroundings)

    MonsterMap[Monster.y][Monster.x] = Empty
    MonsterMap[Monster.y + Direction.y][Monster.x + Direction.x] = Monster.Id

    Monster.x = Monster.x + Direction.x
    Monster.y = Monster.y + Direction.y

    return Monster

  }

  ChasePlayer = (Monster, PlayerNewCoordinates) => {

    let {Player, MonsterMap, WallMap} = this.state

    let originalMonsterCoordinates = {x: Monster.x, y: Monster.y}
    let HorizontalDistance = PlayerNewCoordinates.x - Monster.x
    let VerticalDistance = PlayerNewCoordinates.y - Monster.y

    if (
      HorizontalDistance > 0
      && WallMap[Monster.y][Monster.x+1] !== Wall
      && WallMap[Monster.y][Monster.x+1] !== Door
      && Monster.x+1 !== PlayerNewCoordinates.x
    ) {
      Monster.x += 1
    }
    else if (
      HorizontalDistance < 0
      && WallMap[Monster.y][Monster.x-1] !== Wall
      && WallMap[Monster.y][Monster.x-1] !== Door
      && Monster.x-1 !== PlayerNewCoordinates.x
    ) {
      Monster.x -= 1
    }
    else if (
      VerticalDistance > 0
      && WallMap[Monster.y+1][Monster.x] !== Wall
      && WallMap[Monster.y+1][Monster.x] !== Door
      && Monster.y+1 !== PlayerNewCoordinates.y
    ) {
      Monster.y += 1
    }
    else if (
      VerticalDistance < 0
      && WallMap[Monster.y-1][Monster.x] !== Wall
      && WallMap[Monster.y-1][Monster.x] !== Door
      && Monster.y-1 !== PlayerNewCoordinates.y
    ) {
      Monster.y -= 1
    }
    else {
      // the monster has lost interest in the player
      if (this.RandomInteger(100) <= 1 + Player.Luck/5) {
        Monster.ChasePlayer = false
      }
    }

    // recalculate distance for attack after move
    HorizontalDistance = PlayerNewCoordinates.x - Monster.x
    VerticalDistance = PlayerNewCoordinates.y - Monster.y

    if (
      (HorizontalDistance === 0
        && (VerticalDistance === 1
          || VerticalDistance === -1))
      || (VerticalDistance === 0
        && (HorizontalDistance === 1
          || HorizontalDistance === -1))
      || (HorizontalDistance === 0
        && VerticalDistance === 0)
    ) {
      this.AttackPlayer(Monster)
    }

    MonsterMap[originalMonsterCoordinates.y][originalMonsterCoordinates.x] = Empty
    MonsterMap[Monster.y][Monster.x] = Monster.Id
  }

  AttackPlayer = (Monster) => {

    let {Player} = this.state

    if (this.RandomInteger(100) >= (Player.Dexterity + Player.Luck/3)) {

      let Damage = this.RandomIntegerFromRange(Monster.Damage.Min,Monster.Damage.Max)

      if (this.PlayerTakeDamage(Damage)) {
        this.SetMessage(Functions.IndefiniteArticle(Monster.Name, true) + " " + Monster.Name + " is attacking you.")
        this.ResetMessage()
      }
    }
    else {

      this.SetMessage(Functions.IndefiniteArticle(Monster.Name, true) + " " + Monster.Name + " tried to attack you and missed their target.")
      this.ResetMessage()

    }

  }

  AttackMonster = (MonsterCoordinates) => {

    let {Player, Monsters} = this.state

    if (this.RandomInteger(100) >= (Player.Dexterity + Player.Luck/3)) {
      
      let Monster = Monsters.filter(Enemy => {
        return Enemy.x === MonsterCoordinates.x && Enemy.y === MonsterCoordinates.y
      })

      if (Monster.length > 0) {

        Monster = Monster[0]

        let Damage = this.RandomIntegerFromRange(1, Player.Strength / 2 + Player.Luck / 8)

        console.log("Damage inflicted to monster:",Damage)

        if (this.MonsterTakeDamage(Monster, Damage)) {
          this.SetMessage("You hit your target!")
          this.ResetMessage()
        }

      }

    }
    else {
      this.SetMessage("You missed your target!")
      this.ResetMessage()

    }

  }

  PlayerTakeDamage = (Damage) => {

    let {Player, currentMessage, GodMode} = this.state

    if (!GodMode) {

      Player.Health = Math.max(0,Player.Health - Damage)

      if (Player.Health <= 0) {
        Player.Dead = true
        this.SetPermanentMessage("You are dead.")
        return false
      }

      this.setState({Player: Player})
    }

    return true

  }

  MonsterTakeDamage = (Monster, Damage) => {

    let {Player, MonsterMap, currentMessage} = this.state

    Monster.Health = Math.max(0,Monster.Health - Damage)

    if (Monster.Health <= 0) {
      Monster.Dead = true
      MonsterMap[Monster.y][Monster.x] = Empty
      this.SetMessage("You killed " + Functions.IndefiniteArticle(Monster.Name) + " " + Monster.Name + ".")
      return false
    }

    return true
  }


  GetSurroundingWalls = ({x, y}) => {

    let {WallMap} = this.state

    let Surroundings = [
      y-1 >= 0 ? WallMap[y-1].slice(x-1, x+2) : [Wall, Wall, Wall],
      WallMap[y].slice(x-1, x+2),
      y+1 < WallMap.length ? WallMap[y+1].slice(x-1, x+2) : [Wall, Wall, Wall],
    ]

    // if horizontally out of range, block the object from moving outside with walls
    if (x === 0) {
      Surroundings = [
        [Wall, WallMap[y-1][x], WallMap[y-1][x+1]],
        [Wall, WallMap[y][x], WallMap[y][x+1]],
        [Wall, WallMap[y+1][x], WallMap[y+1][x+1]],
      ]
    }
    else if (x === WallMap[y].length - 1) {
      Surroundings = [
        [WallMap[y-1][x-1], WallMap[y-1][x], Wall],
        [WallMap[y-1][x-1], WallMap[y][x], Wall],
        [WallMap[y-1][x-1], WallMap[y+1][x], Wall],
      ]
    }

    return Surroundings

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
        <Message {... this} {... this.state} />
        {/* row 3 */}
        <StoryBlock>
          <Story {... this.state} />
          <Event {... this} {... this.state} />
        </StoryBlock>
        <Map {... this} {... this.state}/>
        {/* row 4 */}
        <Controls />
        <PlayerStats0 {... this.state} />
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