import React, { Component } from "react"
import StaticAssets from "./StaticAssets.js"
import DynamicAssets from "./DynamicAssets.js"
import UtilityAssets from "./UtilityAssets.js"
import Functions from "./Functions.js"

/* utility */

const Debug = true

const {North, South, West, East} = UtilityAssets.Directions
const {Wall, Door, LootContainer, Undiscovered, Empty} = UtilityAssets.MapObjects
// let {WallMapVisibleRange} = UtilityAssets.WallMapVisibleRange
let WallMapVisibleRange = Object.assign({}, UtilityAssets.WallMapVisibleRange)

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

// input type=text
class TextEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {style: this.props.styleObject ? Styles[this.props.styleObject] : Styles.TextEdit}
  }
  onFocus = () => {
    this.setState({style: this.props.styleObject ? Styles[this.props.styleObject + "Focus"] : Styles.TextEdit})
  }
  onBlur = () => {
    this.setState({style: this.props.styleObject ? Styles[this.props.styleObject] : Styles.TextEdit})
  }
  onChange(input) {
      this.props.onChange(input.target)  
  }
  render() {
    return (
      <input
        name={this.props.name}
        value={this.props.value}
        style={this.state.style}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={input => this.onChange(input)} />
      )
  }
}

// div
class Block extends Component {
  render() {
    return <div {... this.props} />
  }
}

// h4
class SubHeading extends Component {
  render() {
    return <h4 {...this.props} style={Styles.H4} children={this.props.children} />
  }
}

// h3
class Heading extends Component {
  render() {
    return <h3 {...this.props} style={Styles.H3} children={this.props.children} />
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

    if (!this.props.onClick) {
      console.warn("This feature is not ready yet :)")
      return null
    }

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
        <View style={Styles.ItemImageBlockNumber} hidden={!this.props.showIndex}>
          {this.props.index}
        </View>
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

  // no need to re-render spell book if it has not changed
  shouldComponentUpdate(nextProps) {
    if (nextProps.Player.SpellBook !== this.props.Player.SpellBook) {
      if (Debug) console.log("re-render: spellbook")
      return true
    }
    return false
  }

  DisplaySpellBook = () => {

    // let {Player} = this.props
    let Player = Object.assign({}, this.props.Player)

    let List = Object.keys(Player.SpellBook.Spells).map(SpellObjectName => {
      return Player.SpellBook.Spells[SpellObjectName]
    })

    let SpellImages = List.map((Spell, index) => {
      return (
        <ItemImageBlock
          key={index}
          index={index <= 99 ? ("0" + Number(index+1)).slice(-2) : index}
          showIndex
          image={(Spell && Spell.Image) || null}
          name={(Spell && Spell.Name) || null}
          item={Spell}
          onClick={this.props.CastSpell} />
      )
    })

    return SpellImages
  }

  render() {
    // let {Player} = this.props
    let Player = Object.assign({}, this.props.Player)

    if (Player.SpellBook.MaxSpells === 0) {
      return null
    }
    return (
      <View style={Styles.SpellBook}>
        <Block style={Styles.SpellBookLabel}>Spellbook</Block>
        {this.DisplaySpellBook()}
      </View>
    )
  }
}

/* inventory */

class Inventory extends Component {
  
  // no need to re-render backpack content if it has not changed
  shouldComponentUpdate(nextProps) {
    if (nextProps.Backpack !== this.props.Backpack) {
      if (Debug) console.log("re-render: backpack")
      return true
    }
    return false
  }

  DisplayInventory = () => {

    // let {Backpack} = this.props
    let Backpack = Object.assign({}, this.props.Backpack)

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
    // let {Player, Backpack} = this.props
    let Player = Object.assign({}, this.props.Player)
    let Backpack = Object.assign({}, this.props.Backpack)

    return (
      <View style={Styles.Inventory}>
        <Block style={Styles.InventoryLabel}>Backpack</Block>
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
    let {MovePlayer} = this.props
    MovePlayer("North")
  }
  render() {
    return <Arrow {... this.props} onClick={this.MovePlayer} arrow="ArrowUp">↑</Arrow>
  }
}

class GoWest extends Component {
  MovePlayer = () => {
    let {MovePlayer} = this.props
    MovePlayer("West")
  }
  render() {
    return <Arrow {... this.props} onClick={this.MovePlayer} arrow="ArrowLeft">←</Arrow>
  }
}

class GoEast extends Component {
  MovePlayer = () => {
    let {MovePlayer} = this.props
    MovePlayer("East")
  }
  render() {
    return <Arrow {... this.props} onClick={this.MovePlayer} arrow="ArrowRight">→</Arrow>
  }
}
class GoSouth extends Component {
  MovePlayer = () => {
    let {MovePlayer} = this.props
    MovePlayer("South")
  }
  render() {
    return <Arrow {... this.props} onClick={this.MovePlayer} arrow="ArrowDown">↓</Arrow>
  }
}

class Arrow extends Component {

  // no need to re-render the arrow if its style has not changed
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextState.style !== this.state.style
      || nextProps.arrowStyle !== this.props.arrowStyle
    ) {
      if (Debug) console.log("re-render: directional arrow")
      return true
    }
    return false
  }

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

    if (!this.props.onClick) {
      console.warn("This feature is not ready yet :)")
      return null
    }

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

class Rest extends Component {
  render() {
    return (
      <View style={Styles.Rest}>
        {/* todo */}
        <ActionButton>
          <View style={Styles.RestButton}>
              Rest
          </View>
        </ActionButton>
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


/* weapons at hand */

class WeaponReady extends Component {
  render() {
    // let {Item, Slot} = this.props
    let Item = Object.assign({}, this.props.Item)
    let Slot = this.props.Slot

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

  // no need to re-render gear if it has not changed
  shouldComponentUpdate(nextProps) {
    if (nextProps.Gear !== this.props.Gear) {
      if (Debug) console.log("re-render: weapon ready")
      return true
    }
    return false
  }

  render() {
    // let {Gear} = this.props
    let Gear = Object.assign({}, this.props.Gear)

    return (
      <View>
        <WeaponReady Slot="Left hand" Item={Gear.LeftHand} />
        <WeaponReady Slot="Right hand" Item={Gear.RightHand} />
      </View>
    )
  }
}

/* player stats */

class PlayerStats0 extends Component {

  // no need to re-render stats if player has not changed
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.Player.Name !== this.props.Player.Name
      ||  nextProps.Gear !== this.props.Gear
    ) {
      if (Debug) console.log("re-render: player name and gear")
      return true
    }
    return false
  }

  render() {
    // let {Player} = this.props
    let Player = Object.assign({}, this.props.Player)
    return (
      <View style={Styles.PlayerStats0}>
        <Block>
          <Text>{Player.Name}</Text>
        </Block>
        <Block style={Styles.ReadyItemBlock}>
          <WeaponReadyBlock {... this.props} />
        </Block>
      </View>
    )
  }
}

class PlayerVitals extends Component {

  // no need to re-render stats if player has not changed
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.Player.Health !== this.props.Player.Health
      || nextProps.Player.MaxHealth !== this.props.Player.MaxHealth
      || nextProps.Player.Mana !== this.props.Player.Mana
      || nextProps.Player.MaxMana !== this.props.Player.MaxMana
      || nextProps.Player.Stamina !== this.props.Player.Stamina
      || nextProps.Player.MaxStamina !== this.props.Player.MaxStamina
    ) {
      if (Debug) console.log("re-render: player vitals")
      return true
    }
    return false
  }

  render() {
    // let {Player} = this.props
    let Player = Object.assign({}, this.props.Player)
    return (
      <View style={Styles.PlayerVitals}>
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

class PlayerAttributesStacked extends Component {

  // no need to re-render stats if player has not changed
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.Player.Level !== this.props.Player.Level
      || nextProps.Player.XP !== this.props.Player.XP
      || nextProps.Player.Strength !== this.props.Player.Strength
      || nextProps.Player.Dexterity !== this.props.Player.Dexterity
      || nextProps.Player.Constitution !== this.props.Player.Constitution
      || nextProps.Player.Intelligence !== this.props.Player.Intelligence
    ) {
      if (Debug) console.log("re-render: player level/XP + abilities")
      return true
    }
    return false
  }

  render() {
    // let {Player} = this.props
    let Player = Object.assign({}, this.props.Player)
    return (
      <View style={MobileScreen || TabletScreen ? Styles.Hidden : Styles.PlayerAttributesStacked}>
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

  // no need to re-render stats if player has not changed
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.Player.Level !== this.props.Player.Level
      || nextProps.Player.XP !== this.props.Player.XP
      || nextProps.Player.ArmorClass !== this.props.Player.ArmorClass
    ) {
      if (Debug) console.log("re-render: player level/XP and AC")
      return true
    }
    return false
  }

  render() {
    // let {Player} = this.props
    let Player = Object.assign({}, this.props.Player)
    return (
      <View style={MobileScreen || TabletScreen ? Styles.PlayerStats2Block1 : Styles.Hidden}>
        <Block style={Styles.PlayerStat}>
          <Text>{MobileScreen ? <Text>LVL</Text> : <Text>Level</Text>}: </Text><Text>{Player.Level}</Text>
        </Block>
        <Block style={Styles.PlayerStat}>
          <Text>XP: </Text><Text>{Player.XP}</Text>
        </Block>
        <Block style={Styles.PlayerStat}>
          <Text>AC: </Text><Text>{Player.ArmorClass}</Text>
        </Block>
      </View>
    )
  }
}

class PlayerStats2Block2 extends Component {

  // no need to re-render stats if player has not changed
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.Player.Strength !== this.props.Player.Strength
      || nextProps.Player.Dexterity !== this.props.Player.Dexterity
      || nextProps.Player.Constitution !== this.props.Player.Constitution
      || nextProps.Player.Intelligence !== this.props.Player.Intelligence
    ) {
      if (Debug) console.log("re-render: player abilities")
      return true
    }
    return false
  }

  render() {
    // let {Player} = this.props
    let Player = Object.assign({}, this.props.Player)
    return (
      <View style={MobileScreen || TabletScreen ? Styles.PlayerStats2Block2 : Styles.Hidden}>
        <Block style={Styles.PlayerStat}>
          <Text>{MobileScreen ? <Text>STR</Text> : <Text>Strength</Text>}: </Text><Text>{Player.Strength}</Text>
        </Block>
        <Block style={Styles.PlayerStat}>
          <Text>{MobileScreen ? <Text>CON</Text> : <Text>Constitution</Text>}: </Text><Text>{Player.Constitution}</Text>
        </Block>
        <Block style={Styles.PlayerStat}>
          <Text>{MobileScreen ? <Text>DEX</Text> : <Text>Dexterity</Text>}: </Text><Text>{Player.Dexterity}</Text>
        </Block>
        <Block style={Styles.PlayerStat}>
          <Text>{MobileScreen ? <Text>INT</Text> : <Text>Intelligence</Text>}: </Text><Text>{Player.Intelligence}</Text>
        </Block>
      </View>
    )
  }
}

class PlayerStats3 extends Component {

  // no need to re-render stats if player has not changed
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.Player.Level !== this.props.Player.Level
      || nextProps.Player.XP !== this.props.Player.XP
      || nextProps.Player.ArmorClass !== this.props.Player.ArmorClass
    ) {
      if (Debug) console.log("re-render: player level/XP + AC")
      return true
    }
    return false
  }

  render() {
    // let {Player} = this.props
    let Player = Object.assign({}, this.props.Player)
    return (
      <View style={TabletScreen ? Styles.Hidden : Styles.PlayerStats3}>
        <Block style={Styles.PlayerStat}>
          <Text>Level: </Text><Text>{Player.Level}</Text>
        </Block>
        <Block style={Styles.PlayerStat}>
          <Text>XP: </Text><Text>{Player.XP}</Text>
        </Block>
        <Block style={Styles.PlayerStat}>
          <Text>Armor Class: </Text><Text>{Player.ArmorClass}</Text>
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

// a set of brief messages that provides feedback on the user's actions (example: "you can't go there")
class EventLog extends Component {

  // no need to re-render the log if it has not changed
  shouldComponentUpdate(nextProps) {
    if (nextProps.EventLog !== this.props.EventLog) {
      if (Debug) console.log("re-render: event log")
      return true
    }
    return false
  }

  render() {
    return (
      <View style={Styles.EventLog}>
        <Block id="EventLog" style={Styles.EventLogContainer}>
          {!this.props.EventLog ? null : this.props.EventLog.map((LogEntry, Index) => {return <View key={Index}>{LogEntry}</View>})}
        </Block>
      </View>
    )
  }
}

// a descriptive paragraph about the surroundings of the user, to set the mood :)
class Story extends Component {

  // no need to re-render story text if it has not changed
  shouldComponentUpdate(nextProps) {
    if (nextProps.currentText !== this.props.currentText) {
      if (Debug) console.log("re-render: story")
      return true
    }
    return false
  }

  render() {

    // let {currentText, currentTextImage, currentEvent} = this.props
    let currentText = this.props.currentText
    let currentTextImage = this.props.currentTextImage
    let currentEvent = Object.assign([], this.props.currentEvent)

    return (
      <View style={Styles.Story} hidden={currentEvent.length > 0 && currentText === ""}>
        <Block style={Styles.Paragraph}>
          {typeof currentText.split !== "function" ? currentText : currentText.split("\n").map((paragraph, index) => {
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
    // let {item} = this.props
    let item = Object.assign({}, this.props.item)

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

  // no need to re-render event if it has not changed and the player has not taken the loot yet
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.currentEvent !== this.props.currentEvent
      || nextProps.Player !== this.props.Player
    ) {
      if (Debug) console.log("re-render: event")
      return true
    }
    return false
  }

  GenerateEventText = () => {

    // let {currentEvent, Player} = this.props
    let currentEvent = Object.assign([], this.props.currentEvent)
    let Player = Object.assign({}, this.props.Player)

    let loot = false
    let lootIsEmpty = true
    let lootCount = 0

    let eventText = currentEvent.map((event, index) => {

      if (event.eventType === "loot") {

        loot = true

        if (event.items.length === 0) {
          if (!Player.Stationary) {
            event.Name = "empty " + event.Name.replace("empty ","")
          }
        }
        else {
          lootIsEmpty = false
        }

        if (Player.Stationary && event.items.length === 0) {
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
            <ActionButton onClick={this.props.TakeAllLoot}>
              Take
            </ActionButton>
          </Block>
        )
      }
      else {
        eventText.push(
          <Block key="TakeAll">
            <ActionButton onClick={this.props.TakeAllLoot}>
              Take All
            </ActionButton>
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

  // no need to re-render the map if the player or monsters haven't moved, or the area revealed has not changed
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.Player.x !== this.props.Player.x
      || nextProps.Player.y !== this.props.Player.y
      || nextProps.Monsters !== this.props.Monsters
      || nextProps.WallMapRevealed !== this.props.WallMapRevealed
    ) {
      if (Debug) console.log("re-render: map")
      return true
    }
    return false
  }

  DrawMap = () => {
    // let {WallMap, WallMapRevealed, Player} = this.props
    let WallMap = Object.assign([], this.props.WallMap)
    let WallMapRevealed = Object.assign([], this.props.WallMapRevealed)
    let Player = Object.assign({}, this.props.Player)

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

    // let {Player, MonsterMap, ShowFullMap} = this.props
    let Player = Object.assign({}, this.props.Player)
    let MonsterMap = Object.assign([], this.props.MonsterMap)
    let ShowFullMap = Object.assign([], this.props.ShowFullMap)

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

    // let {Player, ShowFullMap, WallMap, WallMapRevealed, DiscoveryMap, LootMap} = this.props
    let Player = Object.assign({}, this.props.Player)
    let ShowFullMap = Object.assign([], this.props.ShowFullMap)
    let WallMap = Object.assign([], this.props.WallMap)
    let WallMapRevealed = Object.assign([], this.props.WallMapRevealed)
    let DiscoveryMap = Object.assign([], this.props.DiscoveryMap)
    let LootMap = Object.assign([], this.props.LootMap)

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

/* create player */

class StartGame extends Component {
  render() {
    return (
      <View style={Styles.StartGame}>
        <ActionButton onClick={this.props.StartGame}>
        Let's play!
        </ActionButton>
      </View>
    )
  }
}

class CreateCharacterName extends Component {
  render() {
    // let {Player} = this.props
    let Player = Object.assign({}, this.props.Player)
    return (
      <View style={Styles.CharacterCreateName}>
        <Block style={Styles.PropertyLabelForInput}>
          <Text>Name:</Text>
        </Block>
        <Block style={Styles.PropertyFieldForInput}>
          <TextEdit
            styleObject="TextEditCharacterName"
            name="Name"
            value={Player.Name}
            onChange={this.props.SavePlayerName}
          />
        </Block>
        <Block style={Styles.PropertyLabel}>
          <Text>Health:</Text>
        </Block>
        <Block style={Styles.PropertyField}>
        <Text>{Player.MaxHealth}</Text>        
        </Block>
        <Block style={Styles.PropertyLabel}>
          <Text>Mana:</Text>
        </Block>
        <Block style={Styles.PropertyField}>
        <Text>{Player.MaxMana}</Text>        
        </Block>
        <Block style={Styles.PropertyLabel}>
          <Text>Stamina:</Text>
        </Block>
        <Block style={Styles.PropertyField}>
        <Text>{Player.MaxStamina}</Text>        
        </Block>
      </View>
    )
  }
}

class CreateCharacterBackground extends Component {
  render() {
    return (
      <View style={Styles.CharacterCreateBackground}>
        <SubHeading>Origins</SubHeading>
      </View>
    )
  }
}

class CreateCharacterAbilities extends Component {
  render() {
    // let {Player} = this.props
    let Player = Object.assign({}, this.props.Player)
    return (
      <View style={Styles.CharacterCreateView}>
        <SubHeading>Abilities</SubHeading>
        <Block style={Styles.PropertyLabel}>
          <Text>Strength:</Text>
        </Block>
        <Block style={Styles.PropertyField}>
          <Text>{Player.Strength}</Text>
        </Block>
        <Block style={Styles.PropertyLabel}>
          <Text>Dexterity:</Text>
        </Block>
        <Block style={Styles.PropertyField}>
          <Text>{Player.Dexterity}</Text>
        </Block>
        <Block style={Styles.PropertyLabel}>
          <Text>Constitution:</Text>
        </Block>
        <Block style={Styles.PropertyField}>
          <Text>{Player.Constitution}</Text>
        </Block>
        <Block style={Styles.PropertyLabel}>
          <Text>Intelligence:</Text>
        </Block>
        <Block style={Styles.PropertyField}>
          <Text>{Player.Intelligence}</Text>
        </Block>
        <Block />
        <Block style={Styles.RollAbilities}>
          <ActionButton onClick={this.props.GeneratePlayerStats}>
            Roll Again
          </ActionButton>
        </Block>
        <Block />
      </View>
    )
  }
}

class CreateCharacterHeader extends Component {
  render() {
    return (
      <View style={Styles.CharacterHeader}>
        <Heading>Create Your Character</Heading>
      </View>
    )
  }
}

/* top */

class Contact extends Component {

  // content is static
  shouldComponentUpdate() {
    return false
  }

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

  // content is static
  shouldComponentUpdate() {
    return false
  }
  render() {
    return (
      <View style={Styles.Header}>
        <PageTitle>Dungeon!</PageTitle>
        <PageSubtitle>an adventure game in React</PageSubtitle>
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
    
    initState.Player.Health = Math.min(19, initState.Player.MaxHealth)

    // initState.CreateCharacter = true

    initState.Player.Backpack = 
    this.CheckInventoryWeightAtStartUp(initState.Backpack)

    initState.Turn = 0

    this.state = initState

    
  }

  componentWillMount() {
    document.addEventListener("keydown", this.ListenToKeyboard, false)
    window.addEventListener("resize", this.CalculateStyles, false)
    this.CalculateStyles()
  }

  StartGame = () => {
    this.setState({CreateCharacter: false})
  }

  ListenToKeyboard = (keypress) => {

    // let {Player, CreateCharacter, Keystrokes} = this.state
    let Player = Object.assign({}, this.state.Player)
    let CreateCharacter = this.state.CreateCharacter
    let Keystrokes = Object.assign([], this.state.Keystrokes)

    if (Player.Dead) return false
    if (CreateCharacter) return false

    keypress.preventDefault()

    // subsequent key strokes
    let breakEvent = false
    if (Keystrokes) Keystrokes.push(keypress.key)
    else Keystrokes = [keypress.key]
    this.setState({Keystrokes: Keystrokes}, function() {

      // detect two digit numbers between 01 and 99
      if (this.state.Keystrokes.join("").match(/[0-9][1-9]/) !== null) {

        this.CastSpellFromKeyboard(this.state.Keystrokes.join(""))
        this.FlushKeystrokeHistory()

      }
      
    })

    if (breakEvent) return true

    // in-game keyboard controls
    switch (keypress.key) {

      default:
        break

      case "ArrowDown":
        this.MovePlayer("South")
        this.onClickArrow(keypress.key)
        this.FlushKeystrokeHistory()
        break

      case "ArrowUp":
        this.MovePlayer("North")
        this.onClickArrow(keypress.key)
        this.FlushKeystrokeHistory()
        break

      case "ArrowLeft":
        this.MovePlayer("West")
        this.onClickArrow(keypress.key)
        this.FlushKeystrokeHistory()
        break

      case "ArrowRight":
        this.MovePlayer("East")
        this.onClickArrow(keypress.key)
        this.FlushKeystrokeHistory()
        break

      case "t":
        this.TakeAllLoot()
        this.FlushKeystrokeHistory()
        break

    }

  }

  FlushKeystrokeHistory = () => {
    this.setState({Keystrokes: []})
  }

  CalculateStyles = () => {

    MobileScreen = UtilityAssets.ScreenSize.MobileScreen()
    TabletScreen = UtilityAssets.ScreenSize.TabletScreen()
    
    WallMapVisibleRange = MobileScreen ? UtilityAssets.WallMapVisibleRangeMobileScreen : UtilityAssets.WallMapVisibleRange

    /* presets */

    // grid columns
    const FirstColumn = 1
    const LastColumn = 10

    // grid rows
    const StoryRowHeight = 245

    // various
    const px = "px"

    const HUDPadding = 8
    const HUDBlockPadding = HUDPadding + px
    const HUDBlockPadding2 = HUDPadding/2.5 + px
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
    let ContactRow = 2
    let MessageRow = 3
    let MainRow = 4
    let MapRow = MainRow
    let ControlRow = 5
    let ControlRow2 = 5
    let InventoryRow = 6
    let SpellBookRow = 7
    let AccessoriesStartRow = 6
    let AccessoriesStopRow = 8

    if (MobileScreen) {

      TitleRow = 1
      ContactRow = 2
      MessageRow = 3
      MainRow = 4
      MapRow = 5
      ControlRow = 6
      ControlRow2 = 7
      InventoryRow = 8
      SpellBookRow = 9
      AccessoriesStartRow = 10
      AccessoriesStopRow = 11

    }

    // grid columns
    let StoryStartColumn = FirstColumn
    let StoryEndColumn = 6
    let MapStartColumn = StoryEndColumn
    let MapEndColumn = LastColumn

    let ContactColumnStart = 6
    let ContactColumnStop = LastColumn

    let PlayerWeaponStartColumn = FirstColumn
    let PlayerWeaponStopColumn = 2
    let PlayerVitalsStartColumn = PlayerWeaponStopColumn
    let PlayerVitalsStopColumn = 3
    let DirectionalArrowStartColumn = PlayerVitalsStopColumn
    let DirectionalArrowStopColumn = 4
    let PlayerActionStartColumn = DirectionalArrowStopColumn
    let PlayerActionStopColumn = 6

    let PlayerStat2StartColumn = PlayerActionStopColumn
    let PlayerStat2StopColumn = 7

    let PlayerAttributesStartColumn = PlayerStat2StopColumn
    let PlayerAttributesBlockSeparation = PlayerAttributesStartColumn
    let PlayerAttributesStopColumn = LastColumn

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
      PlayerVitalsStartColumn = PlayerWeaponStopColumn
      PlayerVitalsStopColumn = 7
      DirectionalArrowStartColumn = PlayerVitalsStopColumn
      DirectionalArrowStopColumn = 9

      PlayerActionStartColumn = FirstColumn
      PlayerActionStopColumn = 4
      PlayerAttributesStartColumn = PlayerActionStopColumn
      PlayerAttributesStopColumn = 4
      PlayerAttributesBlockSeparation = 7
      PlayerAttributesStopColumn = LastColumn

      InventoryStartColumn = FirstColumn
      InventoryStopColumn = LastColumn

      SpellBookStartColumn = FirstColumn
      SpellBookStopColumn = LastColumn

      AccessoriesStartColumn = FirstColumn
      AccessoriesStopColumn = LastColumn

    }
    else if (TabletScreen) {

      PlayerVitalsStartColumn = PlayerWeaponStopColumn
      PlayerVitalsStopColumn = 4
      DirectionalArrowStartColumn = PlayerVitalsStopColumn
      DirectionalArrowStopColumn = 5
      PlayerActionStartColumn = DirectionalArrowStopColumn
      PlayerActionStopColumn = 6
      PlayerAttributesStartColumn = PlayerActionStopColumn
      PlayerAttributesBlockSeparation = 7
      PlayerAttributesStopColumn = LastColumn

    }

    /* style object */

    Styles = {
      Hidden: {
          display: "none",
      },
      // debug
      Placeholder: {
        background: "red",
        width: WallBoxWidth + px,
        height: WallBoxHeight + px,
      },
      // multi-use
      Paragraph: {
        display: "block",
        paddingBottom: "13px",
      },
      // input fields
      TextEdit: {
        border: "none",
        padding: "5px",
        fontFamily: "inherit",
        fontSize: "inherit",
      },
      TextEditFocus: {
        border: "none",
        padding: "5px",
        outline: "none",
        fontFamily: "inherit",
        fontSize: "inherit",
        textDecoration: "underline",
      },
      // input fields
      TextEditCharacterName: {
        border: "none",
        padding: "5px",
        fontFamily: "inherit",
        fontSize: "inherit",
        width: "120px",
      },
      TextEditCharacterNameFocus: {
        border: "none",
        padding: "5px",
        outline: "none",
        fontFamily: "inherit",
        fontSize: "inherit",
        textDecoration: "underline",
        width: "120px",
      },
      // Create Player Grid
      CreatePlayer: {
        userSelect: "none",
        cursor: "pointer",
        display: "grid",
        gridGap: "10px",
        gridTemplateColumns:
          MobileScreen ?
          // column1-10
          "repeat(10, 31px)"
          :
          TabletScreen ?
          // column1-10
          "repeat(10, 74.3px)"
          :
          // column1-10
          "repeat(10, 88.6px)"
        ,
        gridTemplateRows:
        // title (row1)
        "auto " +
        // contact (row2)
        "25px " + 
        // header (row3)
        "auto" +
        // body (row4)
        "auto"
        ,
      },
      CharacterHeader: {
        gridColumnStart: FirstColumn,
        gridColumnEnd: LastColumn,
        gridRowStart: 3,
      },
      CharacterCreateName: {
        gridRowStart: 4,
        display: "grid",
        // subgrid
        gridTemplateColumns:
        MobileScreen ?
        // column1
        "100px " +
        "130px " +
        // column2-10
        "repeat(8, 31px)"
        :
        TabletScreen ?
        // column1
        "100px " +
        "130px " +
        // column2-10
        "repeat(8, 74.3px)"
        :
        // column1
        "100px " +
        "130px " +
        // column2-10
        "repeat(8, 88.6px)"
      ,
      },
      CharacterCreateBackground: {
        gridColumnStart: 4,
        gridColumnEnd: LastColumn,
        gridRowStart: 4,
        display: "grid",
        // subgrid
        gridTemplateColumns:
        MobileScreen ?
        // column1
        "100px " +
        "130px " +
        // column2-10
        "repeat(8, 31px)"
        :
        TabletScreen ?
        // column1
        "100px " +
        "130px " +
        // column2-10
        "repeat(8, 74.3px)"
        :
        // column1
        "100px " +
        "130px " +
        // column2-10
        "repeat(8, 88.6px)"
      ,
      },
      CharacterCreateView: {
        gridColumnStart: FirstColumn,
        gridColumnEnd: LastColumn,
        gridRowStart: 5,
        display: "grid",
        // subgrid
        gridTemplateColumns:
        MobileScreen ?
        // column1
        "100px " +
        "130px " +
        // column2-10
        "repeat(8, 31px)"
        :
        TabletScreen ?
        // column1
        "100px " +
        "130px " +
        // column2-10
        "repeat(8, 74.3px)"
        :
        // column1
        "100px " +
        "130px " +
        // column2-10
        "repeat(8, 88.6px)"
      ,
      },
      PropertyLabel: {
        gridColumnStart: FirstColumn,
        gridColumnEnd: FirstColumn,
        padding: "2.5px",
        textAlign: "right",
        marginRight: "10px",
      },
      PropertyLabelForInput: {
        gridColumnStart: FirstColumn,
        gridColumnEnd: FirstColumn,
        paddingTop: "5px",
        textAlign: "right",
        marginRight: "10px",
      },
      PropertyField: {
        gridColumnStart: 2,
        gridColumnEnd: 2,
        padding: "2.5px",
      },
      PropertyFieldForInput: {
        gridColumnStart: 2,
        gridColumnEnd: 2,
      },
      RollAbilities: {
        gridColumnStart: 2,
      },
      StartGame: {
        gridColumnStart: FirstColumn,
        gridColumnEnd: LastColumn,
      },
      // In-Game Grid
      Game: {
        margin: "0 auto",
        width: MobileScreen ? "270px" : TabletScreen ? "650px" : "790px",
        userSelect: "none",
        cursor: "pointer",
        display: "grid",
        // gridGap: "10px",
        gridTemplateColumns:
          MobileScreen ?
            // column1-10
            "repeat(10, 29px)"
          :
          TabletScreen ?
            // column1
            "110px " +
            // column2-4
            "40px " +
            "50px " +
            "70px " +
            "70px " +
            // column5
            "120px " +
            // column 6
            "35px " + 
            // column7-10
            "repeat(3, 89px)"
          :
            // column1
            "110px " +
            // column2-6
            "repeat(4, 91px) " +
            // column7
            "132px " +
            // column 8
            "30px " + 
            // column9-10
            "repeat(2, 86px)"
        ,
        gridTemplateRows:
          // title (row1)
          "auto " +
          // contact (row2)
          "30px " +
          // event log (row3)
          Number(HUDPadding * 2 + 18.5 * UtilityAssets.MaxEventLogEntries) + px + " " +
          // story/map (row4)
          StoryRowHeight + px + " " +
          // story (row5)
          (MobileScreen ? StoryRowHeight + px + " " : "") +
          // controls (row6a)
          "auto " +
          // controls2 (row6b)
          (MobileScreen ? "auto " : "") +
          // inventory (row7)
          "auto " +
          // spell book (row8)
          "auto "
        ,
      },
      // page title
      Header: {
        gridColumnStart: FirstColumn,
        gridColumnEnd: LastColumn,
        gridRowStart: TitleRow,
        textAlign: "center",
        fontFamily: "UnifrakturMaguntia, cursive",
        color: "white",
      },
      H1: {
        margin: "0px",
        fontStyle: "italic",
  
      },
      H2: {
        margin: "0px",
      },
      H3: {
        margin: "0px",
      },
      H4: {
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
      // Contact info
      Contact: {
        gridColumnStart: ContactColumnStart,
        gridColumnEnd: LastColumn,
        gridRowStart: ContactRow,
        textAlign: (MobileScreen ? "center" : "right"),
        paddingLeft: (MobileScreen ? "30px" : null),
        color: "white",
      },
      GitHubLogo: {
        height: "30px",
        verticalAlign: "middle",
        marginLeft: "5px",
        backgroundColor: "white",
        borderRadius: "25px",
      },
      // Top-screen Messages
      EventLog: {
        gridColumnStart: FirstColumn,
        gridColumnEnd: ContactColumnStop,
        gridRowStart: MessageRow,
        fontWeight: "bold",
        border: HUDBorder,
        padding: HUDBlockPadding,
        backgroundImage: "url(graphics/hud/parchment.jpg)",
      },
      EventLogContainer: {
        maxHeight: 18.5 * UtilityAssets.MaxEventLogEntries + px,
        overflow: "auto",
      },
      // Story
      StoryBlock: {
        gridColumnStart: StoryStartColumn,
        gridColumnEnd: StoryEndColumn,
        gridRowStart: MainRow,
        userSelect: "text",
        borderRight: HUDBorder,
        borderLeft: HUDBorder,
        padding: HUDBlockPadding,    
        backgroundImage: "url(graphics/hud/parchment.jpg)",
        backgroundPosition: "0 -106px", 
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
        overflow: "hidden",
        padding: HUDBlockPadding,
        borderRight: HUDBorder,
        borderTop: MobileScreen ? HUDBorder : null,
        backgroundImage: "url(graphics/hud/parchment.jpg)",
        backgroundPosition: MobileScreen ? "0px -351px" : "-514px -106px", 
        // otherwise, the map will be distorted
        minWidth: MobileScreen ? null : "300px",
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
        gridRowEnd: ControlRow2+1,
        borderTop: HUDBorder,
        borderLeft: HUDBorder,
        borderRight: HUDBorder,
        backgroundImage: "url(graphics/hud/metal.jpg)",
      },
      // Name and Ready Weapons
      PlayerStats0: {
        gridColumnStart: PlayerWeaponStartColumn,
        gridColumnEnd: PlayerWeaponStopColumn,
        gridRowStart: ControlRow,
        padding: HUDBlockPadding,
        textAlign: "center",
        color: "white",
      },
      // Player Vital Stats
      PlayerVitals: {
        gridColumnStart: PlayerVitalsStartColumn,
        gridColumnEnd: PlayerVitalsStopColumn,
        gridRowStart: ControlRow,
        padding: HUDBlockPadding,
        color: "white",
      },
      // Directional Arrows
      ArrowContainer: {
        gridColumnStart: DirectionalArrowStartColumn,
        gridColumnEnd: DirectionalArrowStopColumn,
        gridRowStart: ControlRow,
        textAlign: "center",
        padding: HUDBlockPadding,
        margin: "auto",
      },
      Rest: {
        gridColumnStart: PlayerActionStartColumn,
        gridColumnEnd: PlayerActionStopColumn,
        gridRowStart: ControlRow2,
        padding: HUDBlockPadding,
        margin: "auto",
        marginTop: "25px",
      },
      RestButton: {
        width: "60px",
      },
      PlayerAttributesStacked: {
        gridColumnStart: PlayerAttributesStartColumn,
        gridColumnEnd: PlayerAttributesStopColumn,
        gridRowStart: ControlRow2,
        padding: HUDBlockPadding,
        color: "white",
      },
      PlayerStats2Block1: {
        gridColumnStart: PlayerAttributesStartColumn,
        gridColumnEnd: PlayerAttributesBlockSeparation,
        gridRowStart: ControlRow2,
        padding: HUDBlockPadding,
        color: "white",
      },
      PlayerStats2Block2: {
        gridColumnStart: PlayerAttributesBlockSeparation,
        gridColumnEnd: PlayerAttributesStopColumn,
        gridRowStart: ControlRow2,
        padding: HUDBlockPadding,
        color: "white",
      },
      PlayerStats3: {
        gridColumnStart: PlayerStat2StartColumn,
        gridColumnEnd: PlayerStat2StopColumn,
        gridRowStart: ControlRow2,
        padding: HUDBlockPadding,
        color: "white",
      },
      PlayerStat: {
        paddingBottom: "5px",
      },
      // Weapons At Hand
      ReadyItemBlock: {
        paddingTop: "8px",
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
        borderLeft: HUDBorder,
        padding: HUDBlockPadding2,
        backgroundImage: "url(graphics/hud/metal.jpg)",
        backgroundPosition: MobileScreen ? "0px -250px" : "0px -128px",
        color: "white",
      },

      InventoryLabel: {
        marginBottom: HUDBlockPadding2,
      },
      // SpellBook
      SpellBook: {
        gridColumnStart: SpellBookStartColumn,
        gridColumnEnd: SpellBookStopColumn,
        gridRowStart: SpellBookRow,
        borderLeft: HUDBorder,
        borderBottom: HUDBorder,
        padding: HUDBlockPadding2,
        backgroundImage: "url(graphics/hud/metal.jpg)",
        backgroundPosition: MobileScreen ? "0px -440px" : "0px -248px", 
        color: "white",
      },
      SpellBookLabel: {
        marginBottom: HUDBlockPadding2,
      },
      // Accessories
      Accessories: {
        gridColumnStart: AccessoriesStartColumn,
        gridColumnEnd: AccessoriesStopColumn,
        gridRowStart: AccessoriesStartRow,
        gridRowEnd: AccessoriesStopRow,
        borderRight: MobileScreen ? null : HUDBorder,
        borderBottom: HUDBorder,
        padding: HUDBlockPadding,
        backgroundImage: "url(graphics/hud/metal.jpg)",
        backgroundPosition: MobileScreen ? "0px -491px" : TabletScreen ? "-452px -128px" : "-604px -128px", 
      },
      // Item Image
      ItemImageBlock: {
        height: "32px",
        width: "32px",
        border: "1px solid gray",
        margin: "1px",
        textAlign: "center",
        float: "left",
        background: "lightgray",
      },
      ItemImageBlockNumber: {
        color: "black",
        background: "white",
        width: "13px",
        // webkitTextStroke: "0.25px black",
        fontSize: "12px",
        position: "relative",
        top: -16,
        left: 19,
        // webkitTextStroke: "0.5px black",
        fontFamily: "VT323, monospace"
      },
      ItemImage: {
        maxHeight: "30px",
        // maxWidth: "30px",
        width: "30px",
        padding: "1px",
        // placeholder style when asset is missing
        overflow: "hidden",
        fontSize: "10px",
      },
      ItemImagePlaceholder: {
        height: "30px",
        width: "30px",
        border: "1px solid gray",
        background: "lightgray",
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
    return this.RandomIntegerFromRange(1,20)
  }

  RollDice = (dice, sides) => {
    let result = 0
    for (let i = 1; i <= dice; i++) {
      result += this.RandomIntegerFromRange(1,sides)
    }
    return result 
  }

  AbilityModifier = (Ability) => {
    if (Ability <= 1) {
      return -5
    }
    if (Ability <= 3) {
      return -4
    }
    if (Ability <= 5) {
      return -3
    }
    if (Ability <= 7) {
      return -2
    }
    if (Ability <= 9) {
      return -1
    }
    if (Ability <= 11) {
      return 0
    }
    if (Ability <= 13) {
      return 1
    }
    if (Ability <= 15) {
      return 2
    }
    if (Ability <= 17) {
      return 3
    }
    if (Ability <= 19) {
      return 4
    }
    if (Ability <= 21) {
      return 5
    }
    if (Ability <= 23) {
      return 6
    }
    if (Ability <= 25) {
      return 7
    }
    if (Ability <= 27) {
      return 8
    }
    if (Ability <= 29) {
      return 9
    }
    return 10
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
    /*setTimeout(function () {
      if (this.state.currentMessage !== "") {
        this.setState({ currentMessage: "" })
      }
    }.bind(this), 2000)*/
  }

  SetText = (Message = "", Image = null) => {
    if (Message || Image) {

    // let {EventLog} = this.state
    let EventLog = Object.assign([], this.state.EventLog)

    if (!EventLog) {
      EventLog = []
    }

    EventLog.push(Message)

    if (EventLog.length > 20) {
      EventLog = EventLog.slice(EventLog.length - 20, EventLog.length)
    }

      this.setState({EventLog: EventLog}, function() {
        let HtmlElement = document.getElementById("EventLog")
        HtmlElement.scrollTop = HtmlElement.scrollHeight
      })
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

  SavePlayerName = (input) => {
    // let {Player} = this.state
    let Player = Object.assign({}, this.state.Player)

    Player[input.name] = input.value
    this.setState({Player: Player})

  }

  GeneratePlayerStats = (Player) => {

    let saveState = false

    if (!Player) {
      saveState = true
      Player = this.state.Player
    }

    // Abilities
    Player.Constitution = this.GeneratePlayerAbilityScore()
    Player.Strength = this.GeneratePlayerAbilityScore()
    Player.Dexterity = this.GeneratePlayerAbilityScore()
    Player.Intelligence = this.GeneratePlayerAbilityScore()
    Player.ArmorClass = 10 + this.AbilityModifier(Player.Dexterity)

    // Vitals
    Player.MaxHealth = Player.Health = this.CalculateMaxHealth(Player)
    Player.MaxMana = Player.Mana = this.CalculateMaxMana(Player)
    Player.MaxStamina = Player.Stamina = this.CalculateMaxStamina(Player)
    Player.MaxWeight = this.CalculateMaxWeight(Player)    

    if (saveState) {
      this.setState({Player: Player})
    }

    return Player

  }

  // takes the 3 best rolls out of 4d6
  GeneratePlayerAbilityScore = () => {
    let rolls = []
    let score = 0
    for (var i = 1; i <= 4; i++) {
      let dieScore = this.RollDice(1,6)
      rolls.push(dieScore)
      score += dieScore
    }

    score -= Math.min.apply(null, rolls)

    return score
  }

  CalculateMaxWeight = (Player) => {
    // level up
    if (Player.MaxWeight) {
      return Math.ceil(Player.Strength * 1.6)
    }
    // new player
    else {
      return Math.ceil(Player.Strength * 1.6)
    }
  }

  CalculateMaxHealth = (Player) => {
    // level up
    if (Player.MaxHealth) {
      return Math.ceil((Player.Constitution * 2.5) + (Player.Strength/5))
    }
    // new player
    else {
      return Math.ceil((Player.Constitution * 2.5) + (Player.Strength/5))
    }
  }

  CalculateMaxMana = (Player) => {
    // level up
    if (Player.MaxMana) {
      return Math.ceil((Player.Intelligence) * 1.85)
    }
    // new player
    else {
     return Math.ceil((Player.Intelligence) * 1.85)
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
    let currentText = this.state.currentText
    let currentTextImage = this.state.currentTextImage
    let Text = Object.assign([], this.state.Text)

    let matchTextAccessPoint = false

    if (Text) {

      Text.map((text, index) => {
        if (text.Used) return null
        return !text.accessPoints ? null : text.accessPoints.filter(accessPoint => {
          if (accessPoint.x === x && accessPoint.y === y) {
            matchTextAccessPoint = true
            currentText = text.text
            currentTextImage = text.image || null
            Text[index].Used = true
            return true
          }
          else {
            return false
          }
        })

      })

      this.setState({currentText: currentText, currentTextImage: currentTextImage, Text: Text})

    }

    return matchTextAccessPoint
  }

  AbilityCheck = (AbilityScore, Modifier) => {

    if (this.RandomInteger() >= 100 - (AbilityScore/UtilityAssets.MaxAbilityScore*100) - (Modifier || 0)) {
      return true
    }

    return false

  }

  FindMonsterById = (MonsterId) => {

    // let {Monsters} = this.state
    let Monsters = Object.assign([], this.state.Monsters)

    return Monsters.filter(Monster => {
      return Monster.Id === MonsterId
    })

  }

  FindSingleMonsterInSurroundings = (Actor) => {

    // let {MonsterMap} = this.state
    let MonsterMap = Object.assign([], this.state.MonsterMap)

    let Targets = [].concat(
      MonsterMap[Actor.y-1].slice(Actor.x-1, Actor.x+2),
      MonsterMap[Actor.y].slice(Actor.x-1, Actor.x+2),
      MonsterMap[Actor.y+1].slice(Actor.x-1, Actor.x+2),
    ).filter(MapObject => {
      return MapObject !== Empty
    })

    if (Targets.length > 0) {
      return this.FindMonsterById(Targets[0])
    }

    return false

  }

  CastSpellFromKeyboard = (SpellNumber) => {

    // let {Player} = this.state
    let Player = Object.assign({}, this.state.Player)

    let SpellName = Object.keys(Player.SpellBook.Spells)[Number(SpellNumber-1)]

    if (!SpellName) return false

    this.CastSpell(Player.SpellBook.Spells[SpellName])

  }

  CastSpell = (Spell, Caster) => {

    // let {Player, Monsters, MonsterMap, Turn} = this.state
    let Player = Object.assign({}, this.state.Player)
    let Monsters = Object.assign([], this.state.Monsters)
    let MonsterMap = Object.assign([], this.state.MonsterMap)
    let Turn = this.state.Turn

    let CasterIsPlayer = false

    if (!Caster) {
      Caster = Player
      CasterIsPlayer = true
    }

    // enough mana
    if (!Spell.ManaCost || Caster.Mana >= Spell.ManaCost) {

      // not enough XP
      if (Spell.Level > Caster.Level) {

        if (CasterIsPlayer) {
          this.SetText(UtilityAssets.Messages.Spell.UnsufficientLevel)
        }

        return false
      }

      if (CasterIsPlayer) {
        Caster.Stamina--
        Caster.SpellActionUsed = true
        Turn++
        this.setState({Turn: Turn})
      }

      // ability score spell-level modifier
      let Modifier = 0
      if (Caster.Intelligence <= 5) {
        return false
      }
      else if (Caster.Intelligence <= 10)  {
        Modifier = UtilityAssets.MaxSpellLevel/Spell.Level/4
      }
      else {
        Modifier = UtilityAssets.MaxSpellLevel/Spell.Level
      }

      // attempt to cast the spell
      if (this.AbilityCheck(Caster.Intelligence, Modifier)) {

        // Heal
        if (Spell.Type === "Heal") {

          Caster[Spell.Heal.Property] += Math.min(this.RandomIntegerFromRange(Spell.Heal.Min,Spell.Heal.Max), Caster["Max" + Spell.Heal.Property])

        }

        // Attack
        else if (Spell.Type === "Attack") {

          // Default Target: whatever monster is in front of the caster
          // and Adjacent Targets: whatever monster is in front of the caster and then an monster adjacent to this monster (and so on, until the max number of targets is reached)
          if (!Spell.Target || Spell.Target === "Adjacent") {

            let targetCoordinates = {
              x: Caster.x + UtilityAssets.DirectionsOffset[Caster.Facing].x,
              y: Caster.y + UtilityAssets.DirectionsOffset[Caster.Facing].y
            }

            // find target
            let TargetMonster = Monsters.filter((Monster, index) => {
              if (Monster.x === targetCoordinates.x && Monster.y === targetCoordinates.y) {
                return true
              }
              return false
            })

            if (TargetMonster.length === 0) {

              if (CasterIsPlayer) {
                this.SetText(UtilityAssets.Messages.Spell.NoTarget)
              }

            }
            else {

              let Damage = this.RandomIntegerFromRange(Spell.Damage.Min, Spell.Damage.Max)

              if (!this.MonsterTakeDamage(TargetMonster[0], Damage)) {
              }

              if (Spell.Vampiric) {
                Caster.Health += Damage
              }

              // adjacent-spell only
              if (Spell.Target === "Adjacent") {

                if (Spell.MaxTargets) {

                  let MonsterInCenter = TargetMonster[0]
                  let TargetHit = 0

                  while (TargetHit < Spell.MaxTargets-1 && MonsterInCenter) {

                    let Target = this.FindSingleMonsterInSurroundings(MonsterInCenter)

                    console.log(
                      "target hit:",TargetHit,
                      "\nmonster in center:", MonsterInCenter,
                      "\nnew target:",Target
                    )

                    if (Target) {

                      this.MonsterTakeDamage(Target[0], this.RandomIntegerFromRange(Spell.Damage.Min, Spell.Damage.Max))

                      TargetHit++

                    }

                    MonsterInCenter = Target[0]

                  }

                }
              }

            }

          }

          // Target Area: whatever monsters are surrounding the caster (until the maximum number of targets has been reached)
          else if (Spell.Target === "Surrounding") {

            let Targets = [].concat(
              MonsterMap[Caster.y-1].slice(Caster.x-1, Caster.x+2),
              MonsterMap[Caster.y].slice(Caster.x-1, Caster.x+2),
              MonsterMap[Caster.y+1].slice(Caster.x-1, Caster.x+2),
            ).filter(MapObject => {
              return MapObject !== Empty
            })

            let TargetHit = 0

            while (TargetHit < Math.min((Spell.MaxTargets || 8), Targets.length)) {

              let Target = this.FindMonsterById(Targets[TargetHit])

              this.MonsterTakeDamage(Target[0], this.RandomIntegerFromRange(Spell.Damage.Min, Spell.Damage.Max))

              TargetHit++

            }

            if (TargetHit === 0) {

              if (CasterIsPlayer) {
                this.SetText(UtilityAssets.Messages.Spell.NoTargetArea)
              }

            }

          }

        }

        // update player state and message
        if (CasterIsPlayer) {

          Caster.Mana -= Spell.ManaCost || 0
          this.setState({Player: Caster})
          
          this.SetText(UtilityAssets.PartialMessages.SpellSuccess + Spell.Name + UtilityAssets.PartialMessages.Period)

          // move enemies
          this.MoveMonsters()

        }

        return true

      }
      // cast failed
      else {

        Caster.Mana -= Spell.ManaCost || 0
        if (CasterIsPlayer) {
          this.setState({Player: Caster}, function() {})
          this.SetText(UtilityAssets.Messages.Spell.Failed[this.RandomInteger(UtilityAssets.Messages.Spell.Failed.length)])
        }

      }

    }
    // caster does not have required mana amount
    else {
      if (CasterIsPlayer) {
        this.SetText(UtilityAssets.Messages.Spell.NotEnoughMana[this.RandomInteger(UtilityAssets.Messages.Spell.NotEnoughMana.length)])
      }
    }

    return false

  }

  MovePlayer = (Direction) => {


    // let {Player, WallMap, MonsterMap, NoClip} = this.state
    let Player = Object.assign({}, this.state.Player)
    let WallMap = Object.assign([], this.state.WallMap)
    let MonsterMap = Object.assign([], this.state.MonsterMap)
    let NoClip = this.state.NoClip

    let FullStateUpdate = true

    if (Player.Dead) return false

    // get the target coordinates
    let targetCoordinates = this.MoveObject(
      {x: Player.x, y: Player.y}, Direction)

    // out of range
    if (targetCoordinates.y > WallMap.length - 1 || targetCoordinates.y < 0 || targetCoordinates.x > WallMap[targetCoordinates.y].length - 1 || targetCoordinates.x < 0) {
      this.SetText(UtilityAssets.Messages.Collision)
      return
    }

    // check if there is a locked door in the way
    let Door = this.CheckLockedDoors(targetCoordinates)
    if (Door.Locked && !NoClip) {
      let LockedDoor = this.UnlockDoor(Door.Object)
      if (LockedDoor.Unlocked) {
        let UnlockMessage =
          UtilityAssets.PartialMessages.UnlockDoor  + 
          LockedDoor.Key +
          UtilityAssets.PartialMessages.Period
        this.setState({currentText: UnlockMessage, currentTextImage: null})
      }
      else {
        this.setState({
          currentText: UtilityAssets.Messages.LockedDoor, currentTextImage: null
        })
        return
      }
    }

    // player is attacking a monster
    if (MonsterMap[targetCoordinates.y][targetCoordinates.x] !== Empty) {
      FullStateUpdate = false
      this.AttackMonster(targetCoordinates)

    }
    else {

      // the player can not go there (there is a wall/door in the way)
      if (!this.DetectCollision(targetCoordinates)) {
        this.SetText(UtilityAssets.Messages.Collision)
        return
      }

    }

    // wake up any monster in the vicinity of the player
    this.WakeUpMonster(targetCoordinates)

    // the monsters get to move now
    this.MoveMonsters(targetCoordinates)

    // let {Turn, DiscoveryMap, currentEvent, currentText, currentTextImage} = this.state
    let Turn = this.state.Turn
    let DiscoveryMap = Object.assign([], this.state.DiscoveryMap)
    let currentEvent = Object.assign([], this.state.currentEvent)
    let currentText = this.state.currentText
    let currentTextImage = this.state.currentTextImage

    // update the state partially
    Player.Facing = Direction
    
    // update various parts of the state
    if (FullStateUpdate) {

      // add 1 turn to the game state
      Turn++

      // update which parts of the map were revealed
      DiscoveryMap = this.UpdateDiscoveryMap(targetCoordinates)

      // add loot containers to the list of events if applicable
      currentEvent = this.CheckLootContainers(targetCoordinates)

      // reset messages when an event occur (loot container)
      if (currentEvent.length > 0) {
        currentText = ""
        currentTextImage = null
      }

      // save the new coordinates
      Player.x = targetCoordinates.x
      Player.y = targetCoordinates.y

      Player.Stationary = false

      // update player stats
      Player.Stamina--

    }

    this.setState({
      Player: Player,
      Turn: Turn,
      currentEvent: currentEvent,
      currentText: currentText,
      currentTextImage: currentTextImage,
      DiscoveryMap: DiscoveryMap,
    })

    // update story text
    this.UpdateText(targetCoordinates)
    
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

    // let {WallMap, MonsterMap, NoClip} = this.state
    let WallMap = Object.assign([], this.state.WallMap)
    let MonsterMap = Object.assign([], this.state.MonsterMap)
    let NoClip = this.state.NoClip

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

    // let {DiscoveryMap} = this.state
    let DiscoveryMap = Object.assign([], this.state.DiscoveryMap)

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

    // let {LockedDoors} = this.state
    let LockedDoors = Object.assign([], this.state.LockedDoors)

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

    // let {Backpack} = this.state
    let Backpack = Object.assign({}, this.state.Backpack)

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

    // let {LootContainers} = this.state
    let LootContainers = Object.assign([], this.state.LootContainers)

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
    // let {RandomItems} = this.state
    let RandomItems = Object.assign({}, this.state.RandomItems)

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

    // let {currentEvent, Backpack, Player} = this.state
    let currentEvent = Object.assign([], this.state.currentEvent)
    let Backpack = Object.assign({}, this.state.Backpack)
    let Player = Object.assign({}, this.state.Player)

    if (Player.Dead) return false

    let loot = []
    let LootCount = 0
    let FreeSlots = Backpack.maxItems - Backpack.Items.length

    let LootEvents = currentEvent.filter(event => {
      if (event.eventType === "loot") {
        if (event.items) {
          LootCount += event.items.length
          return true
        }
      }
      return false
    })

    if (LootEvents.length === 0) return false

    LootEvents.map(event => {
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
        Player.Stationary = true    
        this.setState({Backpack: Backpack, Player: Player})

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
    
    // let {LootContainers, Backpack, Player} = this.state
    let LootContainers = Object.assign([], this.state.LootContainers)
    let Backpack = Object.assign({}, this.state.Backpack)
    let Player = Object.assign({}, this.state.Player)

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
            Player.Stationary = true
            this.setState({currentEvent: this.state.currentEvent, Player: Player})
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

    // let {Backpack, Player} = this.state
    let Backpack = Object.assign({}, this.state.Backpack)
    let Player = Object.assign({}, this.state.Player)

    let BackpackWeight = 0

    if (Backpack.Items.length > 0) {
      BackpackWeight = Backpack.Items.map(Item => {
        return Item !== null ? Item.Weight || 0 : 0
      }).reduce((sum, val) => sum + val)
    }
    else {
      BackpackWeight = 0
    }

    if (Loot) {

      let LootWeight = Loot.map(Item => {
        return Item !== null ? Item.Weight || 0 : 0
      }).reduce((sum, val) => sum + val)

      BackpackWeight += LootWeight
    }

    if (BackpackWeight <= Player.MaxWeight) {
      Backpack.Weight = BackpackWeight
      this.setState({Backpack: Backpack})
      return true
    }

    return false
    
  }

  CheckInventoryWeightAtStartUp = (Backpack) => {

    let BackpackWeight = 0

    if (Backpack.Items.length > 0) {
      BackpackWeight = Backpack.Items.map(Item => {
        return Item !== null ? Item.Weight || 0 : 0
      }).reduce((sum, val) => sum + val)
    }
    else {
      BackpackWeight = 0
    }

    Backpack.Weight = BackpackWeight

    return Backpack

  }

  WakeUpMonster = ({x, y}) => {
    
    // let {Monsters} = this.state
    let Monsters = Object.assign([], this.state.Monsters)

    if (Monsters) {

      let MonsterAwake = Monsters.filter(Monster => {
        return Monster.x >= x-1 && Monster.x <= x+1 && Monster.y >= y-1 && Monster.y <= y+1 && !Monster.ChasePlayer
      })

      if (MonsterAwake.length === 0) return null
      else MonsterAwake = MonsterAwake[0]

      MonsterAwake.ChasePlayer = true
      MonsterAwake.Stationary = false

      this.SetText(Functions.IndefiniteArticle(MonsterAwake.Name, true) + " " + MonsterAwake.Name + UtilityAssets.PartialMessages.MonsterNoticed)

    }

  }

  MoveMonsters = (PlayerNewCoordinates) => {
    // let {Monsters, Player} = this.state
    let Monsters = Object.assign([], this.state.Monsters)
    let Player = Object.assign({}, this.state.Player)

    if (Monsters) {

      let MovingMonsters = Monsters.filter(Monster => {
        return !Monster.Dead && (Monster.ChasePlayer || !Monster.Stationary)
      })

      MovingMonsters.map(Monster => {
        if (Monster.ChasePlayer) {
          return this.ChasePlayer(Monster, PlayerNewCoordinates || {x: Player.x, y: Player.y})
        }
        else {
          return this.Patrol(Monster)
        }
      })

    }

  }

  Patrol = (Monster) => {

    // let {MonsterMap} = this.state
    let MonsterMap = Object.assign([], this.state.MonsterMap)

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

    // let {MonsterMap, WallMap} = this.state
    let MonsterMap = Object.assign([], this.state.MonsterMap)
    let WallMap = Object.assign([], this.state.WallMap)

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

    // let {Player} = this.state
    let Player = Object.assign({}, this.state.Player)

    if (this.RandomInteger(100) >= Player.Dexterity) {

      let Damage = this.RandomIntegerFromRange(Monster.Damage.Min,Monster.Damage.Max)

      if (this.PlayerTakeDamage(Damage)) {
        this.SetText(Functions.IndefiniteArticle(Monster.Name, true) + " " + Monster.Name + UtilityAssets.PartialMessages.MonsterAttacking)
      }
    }
    else {

      this.SetText(Functions.IndefiniteArticle(Monster.Name, true) + " " + Monster.Name + UtilityAssets.PartialMessages.MonsterMissed)

    }

  }

  AttackMonster = (MonsterCoordinates) => {

    // let {Player, Gear, Monsters} = this.state
    let Player = Object.assign({}, this.state.Player)
    let Gear = Object.assign({}, this.state.Gear)
    let Monsters = Object.assign([], this.state.Monsters)

    if (this.RandomInteger(100) >= Player.Dexterity) {
      
      let Monster = Monsters.filter(Enemy => {
        return Enemy.x === MonsterCoordinates.x && Enemy.y === MonsterCoordinates.y
      })

      if (Monster.length > 0) {

        Monster = Monster[0]

        let Damage = this.RandomIntegerFromRange(Gear.LeftHand.Damage.Min + this.AbilityModifier(Player.Strength), Gear.LeftHand.Damage.Max + this.AbilityModifier(Player.Strength))

        console.log(Gear.LeftHand.Damage.Min + this.AbilityModifier(Player.Strength), Gear.LeftHand.Damage.Max + this.AbilityModifier(Player.Strength))

        if (this.MonsterTakeDamage(Monster, Damage)) {
          this.SetText(UtilityAssets.PartialMessages.PlayerHit + Functions.IndefiniteArticle(Monster.Name, true) + " " + Monster.Name + UtilityAssets.PartialMessages.Period)
        }

      }

    }
    else {
      this.SetText(UtilityAssets.Messages.PlayerMissed)

    }

  }

  PlayerTakeDamage = (Damage) => {

    // let {Player, GodMode} = this.state
    let Player = Object.assign({}, this.state.Player)
    let GodMode = this.state.GodMode

    if (!GodMode) {

      Player.Health = Math.max(0,Player.Health - Damage)

      if (Player.Health <= 0) {
        Player.Dead = true
        this.SetText(UtilityAssets.Messages.PlayerDead)
        return false
      }

      this.setState({Player: Player})
    }

    return true

  }

  MonsterTakeDamage = (Monster, Damage) => {

    // let {MonsterMap} = this.state
    let MonsterMap = Object.assign([], this.state.MonsterMap)

    Monster.Health = Math.max(0,Monster.Health - Damage)

    if (Monster.Health <= 0) {
      Monster.Dead = true
      MonsterMap[Monster.y][Monster.x] = Empty
      this.SetText(UtilityAssets.PartialMessages.MonsterKilled + Functions.IndefiniteArticle(Monster.Name) + " " + Monster.Name + UtilityAssets.PartialMessages.Period)
      this.DistributeXP(Monster)
      return false
    }

    return true
  }


  GetSurroundingWalls = ({x, y}) => {

    // let {WallMap} = this.state
    let WallMap = Object.assign([], this.state.WallMap)

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

    // let {Player, Backpack} = this.state
    let Player = Object.assign({}, this.state.Player)
    let Backpack = Object.assign({}, this.state.Backpack)

    // Healing potion
    if (Player[Item.Heal]) {
      let NewHealedProperty = Math.min(Player["Max" + Item.Heal], Player[Item.Heal] + Item.Strength + Functions.RandomIntegerFromRange(-2,3))
      
      let Message = null

      if (NewHealedProperty - Player[Item.Heal] === 0) {
        Message = UtilityAssets.Messages.Potion.NoEffect
      }
      else if (NewHealedProperty - Player[Item.Heal] <= 5) {
        Message = UtilityAssets.Messages.Potion[Item.Heal + "1"]
      }
      else if (NewHealedProperty - Player[Item.Heal] <= 10) {
        Message = UtilityAssets.Messages.Potion[Item.Heal + "2"]
      }
      else {
        Message = UtilityAssets.Messages.Potion[Item.Heal + "3"]
      }

      this.SetText(Message)

      Player[Item.Heal] = NewHealedProperty

    }

    Backpack.Items = this.RemoveItemFromInventory(Item)

    this.setState({Player: Player, Backpack: Backpack}, function() {
      this.CheckInventoryWeight()
    })

  }

  ConsumeFood = (Item) => {
    
    // let {Player, Backpack} = this.state
    let Player = Object.assign({}, this.state.Player)
    let Backpack = Object.assign({}, this.state.Backpack)

    let RestoreStamina = Number(Item.RestoreStamina)
    let Bonus = RestoreStamina + this.RandomIntegerFromRange(Math.floor(RestoreStamina/-4),Math.ceil(RestoreStamina/4))

    Player.Stamina = Math.min(Player.MaxStamina, Player.Stamina + Bonus)

    Backpack.Items = this.RemoveItemFromInventory(Item)

    let Messages = [
      UtilityAssets.Messages.Food.Yummy,
      UtilityAssets.Messages.Food.Delicious,
      UtilityAssets.Messages.Food.Diet,
      UtilityAssets.Messages.Food.NotAsGoodAsMyMom,
    ]

    if (Player.Stamina/Player.MaxStamina < 0.4) {
      Messages.push(UtilityAssets.Messages.Food.Rest)
    }
    
    if (Player.Stamina/Player.MaxStamina < 0.7) {
      Messages.push(UtilityAssets.Messages.Food.More)
    }
    else if (Player.Stamina/Player.MaxStamina > 0.9) {
      Messages.push(UtilityAssets.Messages.Food.NotNecessary)
    }

    this.SetText(Messages[this.RandomInteger(Messages.length)])

    this.setState({Player: Player, Backpack: Backpack}, function() {
      this.CheckInventoryWeight()
    })

  }

  RemoveItemFromInventory = (Item) => {

    // let {Backpack} = this.state
    let Backpack = Object.assign({}, this.state.Backpack)

    let UpdatedBackpackItems = []

    Backpack.Items.map((BackpackItem, index) => {
      if (BackpackItem.Id !== Item.Id || !BackpackItem.Id) {
        UpdatedBackpackItems.push(BackpackItem)
      }
      return null
    })

    return UpdatedBackpackItems

  }

  DistributeXP = (Source) => {

    if (!Source) return false

    // let {Player} = this.state
    let Player = Object.assign({}, this.state.Player)

    if (Source.XP) {
      
      Player.XP += Source.XP

      if (Player.Level < UtilityAssets.MaxPlayerLevel && Player.XP > UtilityAssets.LevelXP["Level" + Number(Player.Level+1)]) {
        Player.Level++ 
      }

      this.setState({Player: Player})

    }

  }

  render() { 
    // create character mode
    if (this.state.CreateCharacter) {
      return (
        <View style={Styles.CreatePlayer}>
          {/* row 1 */}
          <Header/>
          {/* row 2 */}
          <Contact/>
          {/* row 3 */}
          <CreateCharacterHeader/>
          {/* row 4 */}
          <CreateCharacterName {... this} {... this.state} />
          <CreateCharacterBackground {... this} {... this.state} />
          {/* row 5 */}
          <CreateCharacterAbilities {... this} {... this.state}/>
          {/* row 6 */}
          <StartGame {... this} {... this.state} />
        </View>
      )
    }
    // play mode
    return (
      <View style={Styles.Game}>
        {/* row 1 */}
        <Header/>
        {/* row 2 */}
        <Contact/>
        <EventLog {... this} {... this.state} />
        {/* row 3 */}
        <StoryBlock>
          <Story {... this.state} />
          <Event {... this} {... this.state} />
        </StoryBlock>
        <Map {... this} {... this.state}/>
        {/* row 4 */}
        <Controls />
        <PlayerStats0 {... this.state} />
        <PlayerVitals {... this.state} />
        <Arrows {... this} {... this.state} />
        <Rest {... this} {... this.state}/>
        <PlayerStats3 {... this.state} />
        <PlayerAttributesStacked {... this.state} />
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
