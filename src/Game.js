import React, { Component } from "react"
import StaticAssets from "./StaticAssets.js"
import DynamicAssets from "./DynamicAssets.js"
import UtilityAssets from "./UtilityAssets.js"
import Functions from "./Functions.js"

/* utility */

const {North, South, West, East} = UtilityAssets.Directions
const {Wall, Door, LootContainer, Undiscovered, Empty} = UtilityAssets.MapObjects

let MobileScreen = UtilityAssets.ScreenSize.MobileScreen()
let TabletScreen = UtilityAssets.ScreenSize.TabletScreen()

/* miscellani */

const authorEmail = "gurcan.yves@gmail.com"
const contactTemplate = "mailto:" + authorEmail +"?subject=Dungeon!"
const repository = "https://github.com/yvesgurcan/dungeon"
const gitHubLogo = "/graphics/misc/Octocat.png"
const itemPath = "/graphics/items/"
const storyPath = "/graphics/story/"
const imgExt = ".png"

let Styles = null

/* web components */

// a
class URL extends Component {
  render() {
    return (
      <a {... this.props} children={this.props.children}/>
    )
  }
}

// br
class LineBreak extends Component {
  render() {
    return <br/>
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
  onClick = () => {
    this.props.onClick(this.props.item)
  }
  render() {
    return (
      <Text>
        <Graphics
          onClick={this.onClick}
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

/* accessories */

class Accessories extends Component {
  render() {
    return (
      <View style={Styles.Accessories}>

      </View>
    )
  }
}

/* spell books */

class SpellBook extends Component {
  render() {
    return (
      <View style={Styles.SpellBook}>
        <Block>Spellbook</Block>
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
          name={(item && item.Name) || null}
          item={item}
          onClick={this.props.UseItem} />
      )
    })

    return inventory
  }

  render() {
    let {Player, Backpack} = this.props
    return (
      <View style={Styles.Inventory}>
        <Block>Backpack</Block>
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

class Take extends Component {
  render() {
    return (
      <ActionButton {... this.props}>
        Take
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
    let style = {...Styles.StaminaBar, width: Math.min(100, Math.ceil(this.props.current/this.props.max * 100)) + "%"}
    return (
      <View>
        <StatBar style={style} ratio={style.width}/>
      </View>
    )
  }
}

class ManaBar extends Component {
  render() {
    let style = {...Styles.ManaBar, width: Math.min(100, this.props.current/this.props.max * 100) + "%"}
    return (
      <View>
        <StatBar style={style} max={this.props.max} current={this.props.current}/>
      </View>
    )
  }
}

class HealthBar extends Component {
  render() {
    let style = {...Styles.HealthBar, width: Math.min(100, this.props.current/this.props.max * 100) + "%"}
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
          item={Item}
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
          item={Item}
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
      <View style={MobileScreen ? Styles.Hidden : Styles.PlayerStats2}>
        <Block style={Styles.PlayerStat} hidden={!TabletScreen}>
          <Text>Level: </Text><Text>{Player.Level}</Text>
        </Block>
        <Block style={Styles.PlayerStat} hidden={!TabletScreen}>
          <Text>XP: </Text><Text>{Player.XP}</Text>
        </Block>
        <Block style={Styles.PlayerStat}>
          <Text>Strength: </Text><Text>{Player.Strength}</Text>
        </Block>
        <Block style={Styles.PlayerStat}>
          <Text>Dexterity: </Text><Text>{Player.Dexterity}</Text>
        </Block>
        <Block style={Styles.PlayerStat}>
          <Text>Constitution: </Text><Text>{Player.Constitution}</Text>
        </Block>
        <Block style={Styles.PlayerStat}>
          <Text>Intelligence: </Text><Text>{Player.Intelligence}</Text>
        </Block>
      </View>
    )
  }
}

class PlayerStats2Block1 extends Component {
  render() {
    let {Player} = this.props
    return (
      <View style={MobileScreen ? Styles.PlayerStats2Block1 : Styles.Hidden}>
        <Block style={Styles.PlayerStat}>
          <Text>LVL: </Text><Text>{Player.Level}</Text>
        </Block>
        <Block style={Styles.PlayerStat}>
          <Text>STR: </Text><Text>{Player.Strength}</Text>
        </Block>
        <Block style={Styles.PlayerStat}>
          <Text>CON: </Text><Text>{Player.Constitution}</Text>
        </Block>
      </View>
    )
  }
}

class PlayerStats2Block2 extends Component {
  render() {
    let {Player} = this.props
    return (
      <View style={MobileScreen ? Styles.PlayerStats2Block2 : Styles.Hidden}>
        <Block style={Styles.PlayerStat}>
          <Text>XP: </Text><Text>{Player.XP}</Text>
        </Block>
        <Block style={Styles.PlayerStat}>
          <Text>DEX: </Text><Text>{Player.Dexterity}</Text>
        </Block>
        <Block style={Styles.PlayerStat}>
          <Text>INT: </Text><Text>{Player.Intelligence}</Text>
        </Block>
      </View>
    )
  }
}

class PlayerStats3 extends Component {
  render() {
    let {Player} = this.props
    return (
      <View style={TabletScreen ? Styles.Hidden : Styles.PlayerStats3}>
        <Block style={Styles.PlayerStat}>
          <Text>Level: </Text><Text>{Player.Level}</Text>
        </Block>
        <Block style={Styles.PlayerStat}>
          <Text>XP: </Text><Text>{Player.XP}</Text>
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
    let {currentText, currentTextImage, currentEvent} = this.props
    return (
      <View style={Styles.Story} hidden={currentEvent.length > 0 && currentText === ""}>
        <Block style={Styles.Paragraph}>
          {currentText.split("\n").map((paragraph, index) => {
            return <Text key={index}>{paragraph}<LineBreak/></Text>
          })}
        </Block>
        <Block hidden={!currentTextImage}>
          <Image src={storyPath + currentTextImage + imgExt} style={Styles.Paragraph}/>
        </Block>
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
        item={item}
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

    let {currentEvent, Stationary} = this.props
    let loot = false
    let lootIsEmpty = true
    let lootCount = 0

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
          lootCount += event.items.length
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
      if (lootCount === 1) {
        eventText.push(
          <Block key="Take">
            <Take
              onClick={this.props.TakeAllLoot}/>
          </Block>
        )
      }
      else {
        eventText.push(
          <Block key="TakeAll">
            <TakeAll
              onClick={this.props.TakeAllLoot}/>
          </Block>
        )
      }
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
        <Block style={Styles.StoryContainer}>
          {this.props.children}
        </Block>
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
        return <Block style={Styles.Monster} />
      }
    }
    return null
  }

  DrawMapObject = (MapObject, MapObjectRevealed, x, y) => {

    let {Player, ShowFullMap, WallMap, WallMapRevealed, DiscoveryMap, LootMap} = this.props

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

        // it's something else
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
        return null
      })
      return null
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
        <PageSubtitle>a D&amp;D-inspired game in React</PageSubtitle>
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
      if (initState.RandomItems["Level" + item.Level] === undefined) {
        initState.RandomItems["Level" + item.Level] = []
      }
      initState.RandomItems["Level" + item.Level].push(item)
      return null
    })

    // create wall map revealed
    initState.WallMapRevealed = DynamicAssets.WallMap.map(HorizontalLine => HorizontalLine.map(x => " "))

    // create discovery map, given player start position
    initState.DiscoveryMap = JSON.parse(JSON.stringify(DynamicAssets.WallMap.map((HorizontalLine, y) => HorizontalLine.map((MapObject, x) => {
        if ((x >= DynamicAssets.Player.x - 1 && x <= DynamicAssets.Player.x + 1) && (y >= DynamicAssets.Player.y - 1 && y <= DynamicAssets.Player.y + 1)) {
          return Empty
        }
        else {
          return Undiscovered
        }
      }))
    ))

    // create the map of loot containers
    let LootMap = JSON.parse(JSON.stringify(DynamicAssets.WallMap.map(HorizontalLine => HorizontalLine.map(x => " "))))

    if (DynamicAssets.LootContainers) {
      DynamicAssets.LootContainers.map(Container => {
        if (Container.x && Container.y) {
          LootMap[Container.y][Container.x] = LootContainer
        }
        return null
      })
    }

    initState.LootMap = LootMap

    // create the map of monster locations
    let MonsterMap = JSON.parse(JSON.stringify(DynamicAssets.WallMap.map(HorizontalLine => HorizontalLine.map(x => " "))))

    if (DynamicAssets.Monsters) {

      DynamicAssets.Monsters.map(Monster => {
        MonsterMap[Monster.y][Monster.x] = Monster.Id
        return null
      })

    }

    initState.MonsterMap = MonsterMap

    // give the player first randomly generated stats
    initState.Player = this.GeneratePlayerStats(initState.Player)
    
    initState.Player.Health = 11

    this.state = initState
    
  }

  componentWillMount() {
    document.addEventListener("keydown", this.ListenToKeyboard, false)
    window.addEventListener("resize", this.CalculateStyles, false)
    this.CalculateStyles()
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
        this.TakeAllLoot()
        break

    }

  }

  CalculateStyles = () => {

    MobileScreen = UtilityAssets.ScreenSize.MobileScreen()
    TabletScreen = UtilityAssets.ScreenSize.TabletScreen()
    
    /* presets */

    // grid columns
    const FirstColumn = 1
    const LastColumn = 10

    // grid rows
    const StoryRowHeight = 245

    // various
    const px = "px"

    const HUDPadding = 10
    const HUDBlockPadding = HUDPadding + px
    const HUDBorder = "1px solid black"
    const HUDStatBarHeight = "10px"

    const ButtonNormalBackground = "lightgray"
    const ButtonHoverBackground = "darkgray"
    const ButtonClickBackground = "gray"

    const MapBackgroundColor = "white"

    const BorderThickness = 1.5
    const BorderColor = "black"
    const WallLine = BorderThickness + "px solid " + BorderColor

    const WallBoxWidth = 15
    const WallBoxHeight = 15

    const WallBoxWidthWithBorder = WallBoxWidth - BorderThickness
    const WallBoxHeightWithBorder = WallBoxHeight - BorderThickness

    const PillarBoxWidth = WallBoxWidth - 5
    const PillarBoxHeight = WallBoxHeight - 5

    const WallBoxWidthCentered = WallBoxWidthWithBorder/2
    const WallBoxHeightCentered = WallBoxHeightWithBorder/2

    const DoorLine = Math.max(1,BorderThickness-BorderThickness/2) + "px solid " + BorderColor
    const DoorColor = "lightsteelblue"
    const DoorLongSize = 7
    const DoorBoxLongSizeCentered = DoorLongSize-3

    /* responsiveness */

    // grid rows
    let TitleRow = 1
    let MessageRow = 2
    let ContactRow = 2
    let MainRow = 3
    let MapRow = MainRow
    let ControlRow = 4
    let ControlRow2 = 4
    let InventoryRow = 5
    let SpellBookRow = 6
    let AccessoriesStartRow = 5
    let AccessoriesStopRow = 7

    if (MobileScreen) {

      TitleRow = 1
      ContactRow = 2
      MessageRow = 3
      MainRow = 4
      MapRow = 5
      ControlRow = 6
      ControlRow2 = 7
      InventoryRow = 8
      SpellBookRow = 8
      AccessoriesStartRow = 8
      AccessoriesStopRow = 10

    }

    // grid columns
    let StoryStartColumn = FirstColumn
    let StoryEndColumn = 6
    let MapStartColumn = StoryEndColumn
    let MapEndColumn = LastColumn

    let ContactColumnStart = 7
    let ContactColumnStop = LastColumn

    let PlayerWeaponStartColumn = FirstColumn
    let PlayerWeaponStopColumn = 2
    let PlayerVitalStartColumn = PlayerWeaponStopColumn
    let PlayerVitalStopColumn = 3
    let DirectionalArrowStartColumn = PlayerVitalStopColumn
    let DirectionalArrowStopColumn = 4
    let PlayerActionStartColumn = DirectionalArrowStopColumn
    let PlayerActionStopColumn = 6

    let PlayerStat2StartColumn = PlayerActionStopColumn
    let PlayerStat2StopColumn = 7

    let PlayerStatStartColumn = PlayerStat2StopColumn
    let PlayerStatBlockSeparation = PlayerStatStartColumn
    let PlayerStatStopColumn = LastColumn

    let InventoryStartColumn = FirstColumn
    let InventoryStopColumn = 7

    let SpellBookStartColumn = FirstColumn
    let SpellBookStopColumn = 7

    let AccessoriesStartColumn = 7
    let AccessoriesStopColumn = LastColumn

    if (MobileScreen) {

      StoryStartColumn = FirstColumn
      StoryEndColumn = LastColumn
      MapStartColumn = FirstColumn
      MapEndColumn = LastColumn

      ContactColumnStart = FirstColumn
      ContactColumnStop = LastColumn

      PlayerWeaponStartColumn = FirstColumn
      PlayerWeaponStopColumn = 4
      PlayerVitalStartColumn = PlayerWeaponStopColumn
      PlayerVitalStopColumn = 7
      DirectionalArrowStartColumn = PlayerVitalStopColumn
      DirectionalArrowStopColumn = 9

      PlayerActionStartColumn = FirstColumn
      PlayerActionStopColumn = 4
      PlayerStatStartColumn = PlayerActionStopColumn
      PlayerStatBlockSeparation = 7
      PlayerStatStopColumn = 10

      InventoryStartColumn = FirstColumn
      InventoryStopColumn = LastColumn

      SpellBookStartColumn = FirstColumn
      SpellBookStopColumn = LastColumn

      AccessoriesStartColumn = FirstColumn
      AccessoriesStopColumn = LastColumn

    }
    else if (TabletScreen) {

      PlayerVitalStartColumn = PlayerWeaponStopColumn
      PlayerVitalStopColumn = 4
      DirectionalArrowStartColumn = PlayerVitalStopColumn
      DirectionalArrowStopColumn = 5
      PlayerActionStartColumn = DirectionalArrowStopColumn
      PlayerActionStopColumn = 7
      PlayerStatStartColumn = PlayerActionStopColumn
      PlayerStatStopColumn = LastColumn

    }

    /* style object */

    Styles = {
      Hidden: {
          display: "none",
      },
      Paragraph: {
        display: "block",
        paddingBottom: "13px",
      },
      // Grid
      Game: {
        display: "grid",
        gridTemplateColumns:
          (
            MobileScreen ?
            // column-10
            "repeat(10, 31px)"
            :
            TabletScreen ?
            // column1
            "110px " +
            // column2-4
            "55px " +
            "55px " +
            "70px " +
            "70px " +
            // column5
            "120px " +
            // column 6
            "35px " + 
            // column7-10
            "repeat(3, 76.8px)"
            :
            // column1
            "110px " +
            // column2-4
            "repeat(4, 95px) " +
            // column5
            "130px " +
            // column 6
            "25px " + 
            // column7-10
            "repeat(3, 76.8px)"
          )
        ,
        gridTemplateRows:
          // title (row1)
          "auto " +
          // message (row2)
          (MobileScreen ? "25px " : "") +
          "25px " +
          // story/map (row3)
          StoryRowHeight + px + " " +
          // story (row4)
          (MobileScreen ? StoryRowHeight + px + " " : "") +
          // controls (row5)
          "auto " +
          // controls2 (row5b)
          (MobileScreen ? "auto " : "") +
          // inventory
          "130px " +
          // spell book 
          "108px "
        ,
        gridGap: "10px",
        userSelect: "none",
        cursor: "pointer",
      },
      // page title
      Header: {
        gridColumnStart: FirstColumn,
        gridColumnEnd: LastColumn,
        gridRowStart: TitleRow,
        textAlign: "center",
      },
      H1: {
        margin: "0px",
        fontStyle: "italic",
  
      },
      H2: {
        margin: "0px",
      },
      // links
      Link: {
        color: "inherit",
      },
      LinkHover: {
        color: "inherit",
        textDecoration: "none",
      },
      // Top-screen Message
      Message: {
        gridColumnStart: FirstColumn,
        gridColumnEnd: ContactColumnStop,
        gridRowStart: MessageRow,
        minHeight: "25px",
        fontWeight: "bold",
      },
      // Contact info
      Contact: {
        gridColumnStart: ContactColumnStart,
        gridColumnEnd: LastColumn,
        gridRowStart: ContactRow,
        textAlign: (MobileScreen ? "center" : "right"),
        paddingLeft: (MobileScreen ? "30px" : null),
      },
      GitHubLogo: {
        height: "30px",
        verticalAlign: "middle",
        marginLeft: "2px",
      },
      // Story
      StoryBlock: {
        gridColumnStart: StoryStartColumn,
        gridColumnEnd: StoryEndColumn,
        gridRowStart: MainRow,
        userSelect: "text",
        border: HUDBorder,
        padding: HUDBlockPadding,
      },
      StoryContainer: {
        maxHeight: StoryRowHeight - HUDPadding * 2 + px,
        overflow: "auto",
      },
      Story: {
        userSelect: "text",
      },
  
      Event: {
        userSelect: "text",
      },
      // Map
      Map: {
        gridColumnStart: MapStartColumn,
        gridColumnEnd: MapEndColumn,
        gridRowStart: MapRow,
        border: HUDBorder,
        overflow: "hidden",
        padding: HUDBlockPadding,
        // otherwise, the map will be distorted
        minWidth: "300px",
      },
      MapRow: {
        height: WallBoxHeight + px,
      },
      MapObject: {
        display: "inline-block",
        width: WallBoxWidth + px,
        height: WallBoxHeight + px,
      },
      Player: {
        boxSizing: "border-box",
        width: WallBoxWidth + px,
        height: WallBoxHeight  + px,
        background: "purple",
        borderRadius: "50%",
      },
      Loot: {
        boxSizing: "border-box",
        margin: "1.5px",
        width: WallBoxWidth - 3 + px,
        height: WallBoxHeight - 3 + px,
        background: "orange",
        borderRadius: "50%",
      },
      Monster: {
        boxSizing: "border-box",
        margin: "1.5px",
        width: WallBoxWidth - 3 + px,
        height: WallBoxHeight - 3 + px,
        background: "red",
        borderRadius: "50%",
      },
      Wall: {
        // debug
        Placeholder: {
          background: "red",
          width: WallBoxWidth + px,
          height: WallBoxHeight + px,
        },
        Pillar: {
          boxSizing: "border-box",
          marginTop: (WallBoxHeight - PillarBoxHeight)/2 + px,
          marginRight: (WallBoxWidth - PillarBoxWidth)/2 + px,
          marginBottom: (WallBoxHeight - PillarBoxHeight)/2 + px,
          marginLeft: (WallBoxWidth - PillarBoxWidth)/2 + px,
          width: PillarBoxWidth + px,
          height: PillarBoxHeight + px,
          background: "black",
        },
        // Continous Walls
        NorthToSouth: {
          boxSizing: "border-box",
          borderLeft: WallLine,
          marginLeft: WallBoxWidthCentered + px,
          width: BorderThickness + px,
          height: WallBoxHeight + px,
        },
        WestToEast: {
          boxSizing: "border-box",
          borderTop: WallLine,
          marginTop: WallBoxHeightCentered + px,
          width: WallBoxWidth + px,
          height: BorderThickness + px,

        },
        NorthToEast: {
          boxSizing: "border-box",
          borderLeft: WallLine,
          borderBottom: WallLine,
          marginLeft:  WallBoxHeightCentered + px,
          width: WallBoxWidthCentered + BorderThickness + px,
          height: WallBoxHeightCentered + BorderThickness + px,
        },
        NorthToWest: {
          boxSizing: "border-box",
          borderRight: WallLine,
          borderBottom: WallLine,
          marginRight:  WallBoxHeightCentered + px,
          width: WallBoxWidthCentered + BorderThickness + px,
          height: WallBoxHeightCentered + BorderThickness + px,
        },
        SouthToEast: {
          boxSizing: "border-box",
          borderLeft: WallLine,
          borderTop: WallLine,
          marginTop:  WallBoxHeightCentered + px,
          marginLeft:  WallBoxHeightCentered + px,
          width: WallBoxWidthCentered + BorderThickness + px,
          height: WallBoxHeightCentered + BorderThickness + px,
        },
        SouthToWest: {
          boxSizing: "border-box",
          borderRight: WallLine,
          borderTop: WallLine,
          marginTop:  WallBoxHeightCentered + px,
          marginRight:  WallBoxHeightCentered + px,
          width: WallBoxWidthCentered + BorderThickness + px,
          height: WallBoxHeightCentered + BorderThickness + px,
        },
        // T-shaped walls
        TShapedWallNSE: {
          boxSizing: "border-box",
          background: BorderColor,
          marginLeft: WallBoxHeightCentered + px
        },
        NorthSouthAndEast: {
          boxSizing: "border-box",
          borderTop: WallBoxWidthCentered + "px solid " + MapBackgroundColor,
          borderBottom: WallBoxWidthCentered + "px solid " + MapBackgroundColor,
          marginLeft: BorderThickness + px,
          width: WallBoxWidthCentered + BorderThickness + px,
          height: WallBoxHeight + px,
          background: BorderColor,
        },
        TShapedWallNSW: {
          boxSizing: "border-box",
          background: BorderColor,
          marginRight: WallBoxHeightCentered + px
        },
        NorthSouthAndWest: {
          boxSizing: "border-box",
          borderTop: WallBoxWidthCentered + "px solid " + MapBackgroundColor,
          borderBottom: WallBoxWidthCentered + "px solid " + MapBackgroundColor,
          width: WallBoxWidthCentered + px,
          height: WallBoxHeight + px,
          background: BorderColor,
        },
      },
      Door: {
        NorthToSouth: {
          boxSizing: "border-box",
          border: DoorLine,
          marginLeft: DoorBoxLongSizeCentered + px,
          width: DoorLongSize + px,
          height: WallBoxHeight + px,
          background: DoorColor,
        },
        WestToEast: {
          boxSizing: "border-box",
          border: DoorLine,
          marginTop: DoorBoxLongSizeCentered + px,
          width: WallBoxHeight + px,
          height: DoorLongSize + px,
          background: DoorColor,
        },
      },
      // Various Player Controls
      ControlBlock: {
        gridColumnStart: FirstColumn,
        gridColumnEnd: LastColumn,
        gridRowStart: ControlRow,
        gridRowEnd: InventoryRow,
        border: HUDBorder,
      },
      // Player Stats
      PlayerStats0: {
        gridColumnStart: PlayerWeaponStartColumn,
        gridColumnEnd: PlayerWeaponStopColumn,
        gridRowStart: ControlRow,
        padding: HUDBlockPadding,
        textAlign: "center",
      },
      PlayerStats1: {
        gridColumnStart: PlayerVitalStartColumn,
        gridColumnEnd: PlayerVitalStopColumn,
        gridRowStart: ControlRow,
        padding: HUDBlockPadding,
      },
      ArrowContainer: {
        gridColumnStart: DirectionalArrowStartColumn,
        gridColumnEnd: DirectionalArrowStopColumn,
        gridRowStart: ControlRow,
        textAlign: "center",
        padding: HUDBlockPadding,
        margin: "auto",
      },
      Actions: {
        gridColumnStart: PlayerActionStartColumn,
        gridColumnEnd: PlayerActionStopColumn,
        gridRowStart: ControlRow2,
        padding: HUDBlockPadding,
      },
      PlayerStats2: {
        gridColumnStart: PlayerStatStartColumn,
        gridColumnEnd: PlayerStatStopColumn,
        gridRowStart: ControlRow2,
        padding: HUDBlockPadding,
      },
      PlayerStats2Block1: {
        gridColumnStart: PlayerStatStartColumn,
        gridColumnEnd: PlayerStatBlockSeparation,
        gridRowStart: ControlRow2,
        padding: HUDBlockPadding,
      },
      PlayerStats2Block2: {
        gridColumnStart: PlayerStatBlockSeparation,
        gridColumnEnd: PlayerStatStopColumn,
        gridRowStart: ControlRow2,
        padding: HUDBlockPadding,
      },
      PlayerStats3: {
        gridColumnStart: PlayerStat2StartColumn,
        gridColumnEnd: PlayerStat2StopColumn,
        gridRowStart: ControlRow2,
        padding: HUDBlockPadding,
      },
      PlayerStat: {
        paddingBottom: "5px",
      },
      // Weapons At Hand and Prepared Spells
      ReadyItemBlock: {
        paddingTop: "10px",
        height: "calc(100% - 18px)",
      },
      ReadyItem: {
        display: "inline-block",
      },
      // Player Stat Bars
      StatBar: {
        boxSizing: "border-box",
        width: "100%",
        height: "14px",
        padding: "1px",
        border: "1px solid gray",
      },
      HealthBar: {
        background: "red",
        height: HUDStatBarHeight,
      },
      ManaBar: {
        background: "blue",
        height: HUDStatBarHeight,
      },
      StaminaBar: {
        background: "green",
        height: HUDStatBarHeight,
      },
      // Directional Arrows
      ArrowRow: {
        width: "72px",
      },
      ArrowBlock: {
        display: "inline-block",
        width: "32px",
        height: "23px",
        textAlign: "center",
        border: "1px solid black",
        paddingTop: "3px",
        margin: "1px",
        background: ButtonNormalBackground,
      },
      ArrowBlockHover: {
        display: "inline-block",
        width: "32px",
        height: "23px",
        textAlign: "center",
        border: "1px solid black",
        paddingTop: "3px",
        margin: "1px",
        background: ButtonHoverBackground,
      },
      ArrowBlockClick: {
        display: "inline-block",
        width: "32px",
        height: "23px",
        textAlign: "center",
        border: "1px solid black",
        paddingTop: "3px",
        margin: "1px",
        background: ButtonClickBackground,
      },
      // Actions
      ActionButton: {
        display: "inline-block",
        textAlign: "center",
        border: "1px solid black",
        padding: "3px",
        margin: "1px",
        userSelect: "none",
        background: ButtonNormalBackground,
      },
      ActionButtonHover: {
        display: "inline-block",
        textAlign: "center",
        border: "1px solid black",
        padding: "3px",
        margin: "1px",
        userSelect: "none",
        background: ButtonHoverBackground,
      },
      ActionButtonClick: {
        display: "inline-block",
        textAlign: "center",
        border: "1px solid black",
        padding: "3px",
        margin: "1px",
        userSelect: "none",
        background: ButtonClickBackground,
      },
      // Inventory
      Inventory: {
        gridColumnStart: InventoryStartColumn,
        gridColumnEnd: InventoryStopColumn,
        gridRowStart: InventoryRow,
        padding: HUDBlockPadding,
        border: HUDBorder,
      },
      // SpellBook
      SpellBook: {
        gridColumnStart: SpellBookStartColumn,
        gridColumnEnd: SpellBookStopColumn,
        gridRowStart: SpellBookRow,
        padding: HUDBlockPadding,
        border: HUDBorder,
      },
      // Accessories
      Accessories: {
        gridColumnStart: AccessoriesStartColumn,
        gridColumnEnd: AccessoriesStopColumn,
        gridRowStart: AccessoriesStartRow,
        gridRowEnd: AccessoriesStopRow,
        padding: HUDBlockPadding,
        border: HUDBorder,
      },
      // Item Image
      ItemImageBlock: {
        height: "32px",
        width: "32px",
        border: "1px solid gray",
        margin: "1px",
        textAlign: "center",
        float: "left",
      },
      ItemImage: {
        maxHeight: "30px",
        maxWidth: "30px",
        padding: "1px",
        // placeholder style when asset is missing
        overflow: "hidden",
        fontSize: "10px",
      },
      ItemImagePlaceholder: {
        height: "30px",
        width: "30px",
        border: "1px solid gray",
        padding: "1px",
        margin: "1px"
      },
    }
    
    // Odd-shaped walls
    Styles.Wall.NorthWestEastAndNorthWest = Styles.Wall.WestToEast
    Styles.Wall.NorthSouthEastAndSouthEast = Styles.Wall.NorthToEast

    this.forceUpdate()

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

  SetMessage = (Message) => {
    if (Message) {
      this.setState({ currentMessage: Message})      
    }
  }

  ResetMessage = () => {
    setTimeout(function () {
      if (this.state.currentMessage !== "") {
        this.setState({ currentMessage: "" })
      }
    }.bind(this), 2000)
  }

  SetText = (Message) => {
    if (Message) {
      this.setState({ currentText: Message})
    }
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
      return Math.ceil(Player.Strength * 1.75)
    }
    // new player
    else {
      return Math.ceil(Player.Strength * 1.75)
    }
  }

  CalculateMaxHealth = (Player) => {
    // level up
    if (Player.MaxHealth) {
      return Math.ceil((Player.MaxHealth * 1.1))
    }
    // new player
    else {
      return Math.ceil((Player.Constitution * 2.25) + (Player.Strength/3) + this.RandomIntegerFromRange(-3, 5))
    }
  }

  CalculateMaxMana = (Player) => {
    // level up
    if (Player.MaxMana) {
      return Math.ceil(Player.MaxMana * 1.1)
    }
    // new player
    else {
     return Math.ceil((Player.Intelligence) * 1.45) + this.RandomIntegerFromRange(-4, 3)
    }
  }

  CalculateMaxStamina = (Player) => {
    // level up
    if (Player.MaxStamina) {
      return Math.ceil(Player.MaxStamina * 1.5)
    }
    // new player
    else {
     return Math.ceil((Player.Strength) * 5) + this.RandomIntegerFromRange(-5, 15)
    }
  }

  UpdateText = ({ x, y }) => {
    let State = this.state

    let matchTextAccessPoint = false

    if (State.Text) {

      State.Text.map((text, index) => {
        if (text.Used) return null
        return !text.accessPoints ? null : text.accessPoints.filter(accessPoint => {
          if (accessPoint.x === x && accessPoint.y === y) {
            matchTextAccessPoint = true
            State.currentText = text.text
            State.currentTextImage = text.image || null
            State.Text[index].Used = true
            return true
          }
          else {
            return false
          }
        })

      })

      this.setState(State)

    }

    return matchTextAccessPoint
  }

  MovePlayer = (Direction) => {

    let {Player, WallMap, MonsterMap, NoClip} = this.state
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
        this.setState({currentText: UnlockMessage, currentTextImage: null})
      }
      else {
        this.setState({
          currentText: StaticAssets.Messages.LockedDoor, currentTextImage: null
        })
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

      if (State.currentEvent.length > 0) {
        State.currentText = ""
        State.currentTextImage = null
      }

      // save the new coordinates
      State.Player.x = targetCoordinates.x
      State.Player.y = targetCoordinates.y
      State.Player.Facing = Direction
      State.Stationary = false

      // update player stats
      State.Player.Stamina = State.Player.Stamina - 1

      this.setState(State)
      
      this.UpdateText(targetCoordinates)


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

    let {LockedDoors} = this.state

    if (LockedDoors) {

      let matchLockedDoor = LockedDoors.filter((object) => {
        return object.x === x && object.y === y && !object.Unlocked
      })

      return {
        Locked: matchLockedDoor.length > 0,
        Object: matchLockedDoor.length > 0 ? matchLockedDoor[0] : null
      }

    }

    return {
      Locked: false,
      Object: null
    }

  }

  UnlockDoor = (Door) => {

    let {Backpack} = this.state

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

    let {LootContainers} = this.state

    if (LootContainers) {

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

    return []

  }

  GenerateRandomLoot = (item) => {
    let { RandomItems } = this.state
    if (item && item.random) {
      if (!this.GetUnlucky(10)) {
        item = RandomItems["Level" + item.Level][this.RandomIntegerFromRange(0, RandomItems["Level" + item.Level].length - 1)]
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

    let loot = []
    let LootCount = 0
    let FreeSlots = Backpack.maxItems - Backpack.Items.length

    currentEvent.map(event => {
      if (event.eventType === "loot") {
        if (event.items) {
          LootCount += event.items.length
        }
      }
      return null
    })

    currentEvent.map(event => {
      if (event.eventType === "loot") {
        if (event.items) {
          loot = loot.concat(event.items)
        }
      }
      return null
    })

    if (FreeSlots >= LootCount) {

      if (this.CheckInventoryWeight(loot)) {

        currentEvent.map(event => {
          if (event.eventType === "loot") {
            if (event.items) {
              event.items = []
            }
          }
          return null
        })

        Backpack.Items = Backpack.Items.concat(loot)        
        this.setState({Backpack: Backpack, Stationary: true})

        this.SetText("You gathered all the loot in your backpack.")
             
      }
      else {

        this.SetText("The loot is too heavy.")
          
      }

    }
    else {

      this.SetText("You can not take all the loot.")

    }

  }

  TakeSingleLoot = (lootIndex, containerId) => {
    
    let {LootContainers, Backpack, Player} = this.state

    if (Player.Dead) return false

    let FreeSlots = Backpack.maxItems - Backpack.Items.length

    let matchLootContainer = LootContainers.filter(lootContainer => {
      return lootContainer.Id === containerId
    })[0]

    if (FreeSlots > 0 ) {

      if (this.CheckInventoryWeight([matchLootContainer.items[lootIndex]])) {

          Backpack.Items.push(matchLootContainer.items[lootIndex])      

          this.setState({Backpack: Backpack}, function() {
            matchLootContainer.items.splice(lootIndex,1)
            this.setState({currentEvent: this.state.currentEvent, Stationary: true})
          })

      }
      else {

        this.SetMessage("This item is too heavy.")
        this.ResetMessage()

      }

    }
    else {

      this.SetMessage("Your backpack is full.")
      this.ResetMessage()

    }

  }

  CheckInventoryWeight = (Loot) => {

    let {Backpack, Player} = this.state

    let BackpackWeight = 0

    if (Backpack.Items.length > 0) {
      BackpackWeight = Backpack.Items.map(Item => {
        return Item !== null ? Item.Weight : 0
      }).reduce((sum, val) => sum + val)
    }
    else {
      BackpackWeight = 0
    }

    let LootWeight = Loot.map(Item => {
      return Item !== null ? Item.Weight : 0
    }).reduce((sum, val) => sum + val)

    BackpackWeight += LootWeight

    if (BackpackWeight <= Player.MaxWeight) {
      Backpack.Weight = BackpackWeight
      this.setState({Backpack: Backpack})
      return true
    }

    return false
    
  }

  WakeUpMonster = ({x, y}) => {
    
    let {Monsters} = this.state

    if (Monsters) {

      let MonsterAwake = Monsters.filter(Monster => {
        return Monster.x >= x-1 && Monster.x <= x+1 && Monster.y >= y-1 && Monster.y <= y+1 && !Monster.ChasePlayer
      })

      if (MonsterAwake.length === 0) return null
      else MonsterAwake = MonsterAwake[0]

      MonsterAwake.ChasePlayer = true
      MonsterAwake.Stationary = false

      this.SetText(Functions.IndefiniteArticle(MonsterAwake.Name, true) + " " + MonsterAwake.Name + StaticAssets.PartialMessages.MonsterNoticed)

    }

  }

  MoveMonsters = (PlayerNewCoordinates) => {
    let {Monsters} = this.state

    if (Monsters) {

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
      })

    }

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

    let {MonsterMap, WallMap} = this.state

    let originalMonsterCoordinates = {x: Monster.x, y: Monster.y}
    let HorizontalDistance = PlayerNewCoordinates.x - Monster.x
    let VerticalDistance = PlayerNewCoordinates.y - Monster.y

    // player is north of the monster
    if (
      VerticalDistance < 0
      && WallMap[Monster.y-1][Monster.x] === Empty
      && Monster.y-1 !== PlayerNewCoordinates.y
    ) {
      Monster.y -= 1
    }
    // player is south of the monster
    else if (
      VerticalDistance > 0
      && WallMap[Monster.y+1][Monster.x] === Empty
      && Monster.y+1 !== PlayerNewCoordinates.y
    ) {
      Monster.y += 1
    }
    // player is west of the monster
    else if (
      HorizontalDistance < 0
      && WallMap[Monster.y][Monster.x-1] === Empty
      && Monster.x-1 !== PlayerNewCoordinates.x
    ) {
      Monster.x -= 1
    }
    else if (
      // player is east of the monster
      HorizontalDistance > 0
      && WallMap[Monster.y][Monster.x+1] === Empty
      && Monster.x+1 !== PlayerNewCoordinates.x
    ) {
      Monster.x += 1
    }
    // player is north-west of the monster and north is not blocked
    else if (
      VerticalDistance < 0 && HorizontalDistance < 0
      && WallMap[Monster.y-1][Monster.x] === Empty
      && (Monster.y-1 !== PlayerNewCoordinates.y
        || (Monster.y-1 === PlayerNewCoordinates.y
        && Monster.x !== PlayerNewCoordinates.x))
    ) {
      Monster.y -= 1
    }
    // player is north-west of the monster and west is not blocked
    else if (
      VerticalDistance < 0 && HorizontalDistance < 0
      && WallMap[Monster.y][Monster.x-1] === Empty
      && (Monster.x-1 !== PlayerNewCoordinates.x
        || (Monster.x-1 === PlayerNewCoordinates.x
        && Monster.y !== PlayerNewCoordinates.y))
    ) {
      Monster.x -= 1
    }
    // player is north-east of the monster and north is not blocked
    else if (
      VerticalDistance < 0 && HorizontalDistance > 0
      && WallMap[Monster.y-1][Monster.x] === Empty
      && (Monster.y-1 !== PlayerNewCoordinates.y
        || (Monster.y-1 === PlayerNewCoordinates.y
        && Monster.x !== PlayerNewCoordinates.x))
    ) {
      Monster.y -= 1
    }
    // player is north-east of the monster and east is not blocked
    else if (
      VerticalDistance < 0 && HorizontalDistance > 0
      && WallMap[Monster.y][Monster.x+1] === Empty
      && (Monster.x+1 !== PlayerNewCoordinates.x
        || (Monster.x+1 === PlayerNewCoordinates.x
        && Monster.y !== PlayerNewCoordinates.y))
    ) {
      Monster.x += 1
    }
    // player is south-west of the monster and south is not blocked
    else if (
      VerticalDistance > 0 && HorizontalDistance < 0
      && WallMap[Monster.y+1][Monster.x] === Empty
      && (Monster.y+1 !== PlayerNewCoordinates.y
        || (Monster.y+1 === PlayerNewCoordinates.y
        && Monster.x !== PlayerNewCoordinates.x))
    ) {
      Monster.y += 1
    }
    // player is south-west of the monster and west is not blocked
    else if (
      VerticalDistance > 0 && HorizontalDistance < 0
      && WallMap[Monster.y][Monster.x-1] === Empty
      && (Monster.x-1 !== PlayerNewCoordinates.x
        || (Monster.x-1 === PlayerNewCoordinates.x
        && Monster.y !== PlayerNewCoordinates.y))
    ) {
      Monster.x -= 1
    }
    // player is south-east of the monster and south is not blocked
    else if (
      VerticalDistance > 0 && HorizontalDistance > 0
      && WallMap[Monster.y+1][Monster.x] === Empty
      && (Monster.y+1 !== PlayerNewCoordinates.y
        || (Monster.y+1 === PlayerNewCoordinates.y
        && Monster.x !== PlayerNewCoordinates.x))
    ) {
      Monster.y += 1
    }
    // player is south-east of the monster and east is not blocked
    else if (
      VerticalDistance > 0 && HorizontalDistance > 0
      && WallMap[Monster.y][Monster.x+1] === Empty
      && (Monster.x+1 !== PlayerNewCoordinates.x
        || (Monster.x+1 === PlayerNewCoordinates.x
        && Monster.y !== PlayerNewCoordinates.y))
    ) {
      Monster.x += 1
    }
    else {
      // the monster has lost interest in the player
      if (this.RandomInteger(100) <= 5) {
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

    if (this.RandomInteger(100) >= Player.Dexterity) {

      let Damage = this.RandomIntegerFromRange(Monster.Damage.Min,Monster.Damage.Max)

      if (this.PlayerTakeDamage(Damage)) {
        this.SetText(Functions.IndefiniteArticle(Monster.Name, true) + " " + Monster.Name + StaticAssets.PartialMessages.MonsterAttacking)
      }
    }
    else {

      this.SetText(Functions.IndefiniteArticle(Monster.Name, true) + " " + Monster.Name + StaticAssets.PartialMessages.MonsterMissed)

    }

  }

  AttackMonster = (MonsterCoordinates) => {

    let {Player, Gear, Monsters} = this.state

    if (this.RandomInteger(100) >= Player.Dexterity) {
      
      let Monster = Monsters.filter(Enemy => {
        return Enemy.x === MonsterCoordinates.x && Enemy.y === MonsterCoordinates.y
      })

      if (Monster.length > 0) {

        Monster = Monster[0]

        let Damage = this.RandomIntegerFromRange(Gear.LeftHand.Damage.Min + (Gear.LeftHand.Damage.Min * Player.Strength/20), Gear.LeftHand.Damage.Max + (Gear.LeftHand.Damage.Min * Player.Strength/20))

        console.log(Gear.LeftHand.Damage.Min + (Gear.LeftHand.Damage.Min * Player.Strength/20), Gear.LeftHand.Damage.Max + (Gear.LeftHand.Damage.Min * Player.Strength/20))
        console.log(Damage)

        if (this.MonsterTakeDamage(Monster, Damage)) {
          this.SetText(StaticAssets.PartialMessages.PlayerHit + Functions.IndefiniteArticle(Monster.Name, true) + " " + Monster.Name + StaticAssets.PartialMessages.Period)
        }

      }

    }
    else {
      this.SetText(StaticAssets.Messages.PlayerMissed)

    }

  }

  PlayerTakeDamage = (Damage) => {

    let {Player, GodMode} = this.state

    if (!GodMode) {

      Player.Health = Math.max(0,Player.Health - Damage)

      if (Player.Health <= 0) {
        Player.Dead = true
        this.SetText(StaticAssets.Messages.PlayerDead)
        return false
      }

      this.setState({Player: Player})
    }

    return true

  }

  MonsterTakeDamage = (Monster, Damage) => {

    let {MonsterMap} = this.state

    Monster.Health = Math.max(0,Monster.Health - Damage)

    if (Monster.Health <= 0) {
      Monster.Dead = true
      MonsterMap[Monster.y][Monster.x] = Empty
      this.SetText(StaticAssets.PartialMessages.MonsterKilled + Functions.IndefiniteArticle(Monster.Name) + " " + Monster.Name + StaticAssets.PartialMessages.Period)
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

  UseItem = (Item) => {

    if (this[Item.Action]) {
      this[Item.Action](Item)
    }

  }

  DrinkPotion = (Item) => {

    let {Player, Backpack} = this.state

    // Healing potion
    if (Player[Item.Heal]) {
      let NewHealedProperty = Math.min(Player["Max" + Item.Heal], Player[Item.Heal] + Item.Strength + Functions.RandomIntegerFromRange(-2,3))
      
      let Message = null

      if (NewHealedProperty - Player[Item.Heal] === 0) {
        Message = StaticAssets.Messages.Potion.NoEffect
      }
      else if (NewHealedProperty - Player[Item.Heal] <= 5) {
        Message = StaticAssets.Messages.Potion[Item.Heal + "1"]
      }
      else if (NewHealedProperty - Player[Item.Heal] <= 10) {
        Message = StaticAssets.Messages.Potion[Item.Heal + "2"]
      }
      else {
        Message = StaticAssets.Messages.Potion[Item.Heal + "3"]
      }

      this.SetText(Message)

      Player[Item.Heal] = NewHealedProperty

    }

    // remove item from inventory
    Backpack.Items.map((BackpackItem, index) => {
      if (BackpackItem.Id === Item.Id) {
        Backpack.Items.splice(index, 1)
      }
      return null
    })

    this.setState({Player: Player, Backpack: Backpack})

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
        <PlayerStats3 {... this.state} />
        <PlayerStats2 {... this.state} />
        <PlayerStats2Block1 {... this.state} />
        <PlayerStats2Block2 {... this.state} />
        <Inventory {... this} {... this.state} />
        <SpellBook {... this} {... this.state} />
        <Accessories {... this} {... this.state} />
      </View>
    )
  }
}

export default Game
