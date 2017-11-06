import React, {Component} from "react"
import World from "./WorldAssets.js"
import Campaign from "./LegendsOfTheCatacombs.js"
import Gameplay from "./GameplayAssets.js"
import Utilities from "./Utilities.js"
import Functions from "./Functions.js"
import {URL, LineBreak, Text, View, Block, Image} from "./components/WebComponents.js"
import {Graphics, ClearFloat, Version} from "./components/UtilityComponents.js"

/* utility */

let Debug = process.env.REACT_APP_RELEASE === "stable" ? false : Utilities.Debug 
let SoundDebug = process.env.REACT_APP_RELEASE === "stable" ? false : Utilities.SoundDebug

const {North, South, West, East} = Utilities.Directions
const {Wall, Door, LootContainer, Undiscovered, Empty} = Utilities.MapObjects
let WallMapVisibleRange = Object.assign({}, Utilities.WallMapVisibleRange)

let MobileScreen = Utilities.ScreenSize.MobileScreen()
let TabletScreen = Utilities.ScreenSize.TabletScreen()

let NextAvailableId = {
  Monsters: 0,
  LootContainers: 0,
  Items: 0,
}

/* miscellani */

const authorEmail = "gurcan.yves@gmail.com"
const contactTemplate = "mailto:" + authorEmail +"?subject=Dungeon!"
const repository = "https://github.com/yvesgurcan/dungeon"
const gitHubLogo = "./graphics/misc/Octocat.png"
const itemPath = "./graphics/items/"
const storyPath = "./graphics/story/"
const imgExt = ".png"

let Styles = null

/* web components */

// input type=text
class TextEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {style: this.props.style || Styles.TextEdit}
  }
  onKeyPress = (keypress) => {
    if (keypress.key === "Enter") {
      keypress.target.blur()
    }
  }
  onFocus = () => {
    this.setState({style: this.props.styleFocus || Styles.TextEditFocus})
  }
  onBlur = (input) => {
    this.setState({style: this.props.style || Styles.TextEdit})
    if (this.props.onBlur) {
      this.props.onBlur(input.target)
    }
  }
  onChange(input) {
    this.props.onChange(input.target)
  }
  render() {
    return (
      <input
        hidden={this.props.hidden}
        name={this.props.name}
        placeholder={this.props.placeholder}
        value={this.props.value || ""}
        style={this.state.style}
        onKeyPress={this.onKeyPress}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={input => this.onChange(input)} />
      )
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

/* small components */

class GitHub extends Component {
  render() {
    return (
      <Graphics
        draggable={false}
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
          draggable={this.props.draggable}
          src={this.props.image ? itemPath + this.props.image + imgExt : null}
          style={Styles.ItemImage}
        />
      </Text>
    )
  }
}

class ItemImageBlock extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      HideItemDescription: true,
      HideItemActions: true,
      Id: Math.floor(Math.random() * 99999999999)
    }
  }

  componentDidMount() {
    this.Mounted = true
  }

  componentWillUnmount() {
    this.Mounted = false
  }

  shouldComponentUpdate(NextProps, NextState) {

    if (
      NextProps.item !== this.props.item
      || NextState.HideItemDescription !== this.state.HideItemDescription
      || NextState.HideItemActions !== this.state.HideItemActions
      || NextState.Clicked !== this.state.Clicked
    ) {
      if (Debug) console.log("re-render: image", NextProps.item)
      return true
    }
    return false
  }

  RegisterTouch = () => {

    // there is no item
    let Item = {...this.props.item}
    if (!Object.getOwnPropertyNames(Item).length) return null

    this.setState({TouchEvent: true})
  }

  // right click
  ToggleItemActions = (input) => {

    // there is no item
    let Item = {...this.props.item}
    if (!Object.getOwnPropertyNames(Item).length) return null

    let grabInput = {...input}
    input.preventDefault()

    // this item does not have an action menu
    if (this.props.NoActionMenu) {
      // show the item description instead
      if (this.state.HideItemDescription) {
        this.ShowItemDescription(grabInput)
      }
      // hide the item description if it is already displayed
      else {
        this.HideItemDescription()
      }
      return false
    }

    // get the coordinates where the action menu will be displayed
    let {pageX, pageY} = {...grabInput}

    this.setState({
      // toggle the action menu
      HideItemActions: !this.state.HideItemActions,
      // hide the item description that may have appeared when hovering
      HideItemDescription: true,
      // block hover events so that the description does not re-appear until the user has moved out of the element
      PreventHoverEvent: true,
      x: pageX+5,
      y: pageY+5,
    }, function() {

        // attach event listeners to hide the menu when the user clicks away
        document.addEventListener("click", this.HideItemActions, false)
        document.addEventListener("contextmenu", this.HideItemActions, false)

    })
  }

  // right click -- event listener
  HideItemActions = () => {
    
    if (!this.Mounted) return false

    if (this.state.DescriptionAsAction) {
      // add item description event listener
      document.addEventListener("click", this.HideItemDescription, false)
      document.addEventListener("contextmenu", this.HideItemDescription, false)
      this.setState({
        // toggle the block on this event listener
        DescriptionAsAction: false,
        // let the item description event listeners remove themselves once they executed
        CleanupDescriptionEventListener: true
      })
      // do not execute the rest of the code to keep preventing hover events
      return false
    }

    this.setState({
      // hide the action menu
      HideItemActions: true,
      // release the block on hover events so that when the user moves back to the item, the description will appear again
      PreventHoverEvent: false
    })

    // get rid of the event listeners
    document.removeEventListener("click", this.HideItemActions, false) 
    document.removeEventListener("contextmenu", this.HideItemActions, false) 



  }

  // action menu click
  ShowItemDescription = (input) => {

    // there is no item
    let Item = {...this.props.item}
    if (!Object.getOwnPropertyNames(Item).length) return null

    // grab coordinates
    let {pageX, pageY} = {...input}

    // the item description was called from the action menu
    if (input === null) {
      pageX = this.state.x-5
      pageY = this.state.y-5
      this.setState({DescriptionAsAction: true})

    }

    this.setState({
      // hide the action menu
      HideItemActions: true,
      // show the description
      HideItemDescription: false,
      // block the hover event
      PreventHoverEvent: true,
      x: pageX+5,
      y: pageY+5,
    })

    // add listeners for the item description if there is no action menu so that when the user clicks away it hides the description
    if (this.props.NoActionMenu) {
      document.addEventListener("click", this.HideItemDescription, false)
      document.addEventListener("contextmenu", this.HideItemDescription, false)
      return false
    }

    // add listeners so that when the user clicks away it hides the action menu
    document.addEventListener("click", this.HideItemActions, false)
    document.addEventListener("contextmenu", this.HideItemActions, false)

  }

  // no action menu -- event listener
  HideItemDescription = () => {

    if (!this.Mounted) return false

    this.setState({
      // hide the description
      HideItemDescription: true,
      // release the block on hover events
      PreventHoverEvent: false,
    })

    // remove item description listeners
    if (this.props.NoActionMenu || this.state.CleanupDescriptionEventListener) {

      document.removeEventListener("click", this.HideItemDescription, false)
      document.removeEventListener("contextmenu", this.HideItemDescription, false)

      // toggle the clean up of event listeners corresponding to the item description showing as an action
      if (this.state.CleanupDescriptionEventListener) {
        this.setState({CleanupDescriptionEventListener: false})
      }

    }

  }

  // hover
  ShowItemDescriptionOnHover = (input) => {

    // there is no item
    let Item = {...this.props.item}
    if (!Object.getOwnPropertyNames(Item).length) return null

    // do not show description on hover for touch screens
    if (this.state.TouchEvent) return false

    if (
      // hover events are not blocked
      !this.state.PreventHoverEvent
      // the action menu is hidden
      && this.state.HideItemActions
      // the item description is hidden
      && this.state.HideItemDescription
    ) {

      // the user is hovering the item
      this.setState({HoveredOut: false})

      // grab coordinates
      let {pageX, pageY} = {...input}

      // wait before showing the item description
      setTimeout(function() {
        if (
          // the user is still hovering the item
          !this.state.HoveredOut
          // the action menu is still hidden
          && this.state.HideItemActions
          // the item description is still hidden
          && this.state.HideItemDescription
        ) {

          if (!this.Mounted) return false

          // display description
          this.setState({
            HideItemDescription: false,
            x: pageX+5,
            y: pageY+5,
          })

        }
      }.bind(this), 600)
      
    }

  }

  HideItemDescriptionOnHover = () => {

    // hover events are not blocked
    if (!this.state.PreventHoverEvent) {
      this.setState({
        // hide item description
        HideItemDescription: true,
        // the user is not interested in this item anymore
        HoveredOut: true
      })
    }
  }

  ShowHoverForItemAfterClick = (input) => {
    if (this.state.ResetHover) {
      this.ShowItemDescriptionOnHover(input)
      this.setState({ResetHover: false})
    }
  }

  // item description
  ItemDescription = () => {

    let Item = {...this.props.item}

    if (!Object.getOwnPropertyNames(Item).length) return null

    let Description = (
      <Block hidden={this.state.HideItemDescription} style={{...Styles.ItemDescription, left: this.state.x, top: this.state.y}}>
        <Block style={Styles.ItemDescriptionName}>{Item.Name}</Block>
        <Block style={Styles.ItemDescriptionContent} hidden={!Item.Description}>{Item.Description}</Block>
      </Block>
    )
    return Description

  }

  // action menu
  ItemActions = () => {

    let Item = {...this.props.item}

    if (!Object.getOwnPropertyNames(Item).length) return null

    let Action = (
      <Block hidden={this.state.HideItemActions} style={{...Styles.ItemActions, left: this.state.x, top: this.state.y}}>
      <Block style={Styles.ItemDescriptionName}>{Item.Name}</Block>
      {this.AvailableActions().map(ItemAction => {
        return (
          <ItemSingleAction
            key={ItemAction.Name}
            onClick={this.UseItem}
            ItemAction={ItemAction}
          />
        )
      })}
      </Block>
    )
    return Action
  }

  // discriminate actions that are available for this item
  AvailableActions = () => {
    
    let Item = {...this.props.Item}
    let Equipped = this.props.Equipped
    let Loot = this.props.Loot
    
    if (Item) {

      let Type = Item.Type
      
      let AvailableActions = [{Name: "Description", onClick: "ShowItemDescription", BuiltInComponent: true}]
      
      if (Loot) {
        AvailableActions.push({Name: "Take", onClick: "TakeSingleLoot", MainAction: true})
      }
      
      if (Type === "potion") {
        AvailableActions.push({Name: "Drink", onClick: "DrinkPotion", MainAction: !Loot})
      }
      
      if (Type === "food") {
        AvailableActions.push({Name: "Eat", onClick: "ConsumeFood", MainAction: !Loot})
      }
      
      if (Type === "scroll") {
        AvailableActions.push({Name: "Cast Spell", onClick: "UseScroll", MainAction: !Loot})
      }
      
      if (!Equipped && Utilities.Equipable.indexOf(Type) > -1) {
        AvailableActions.push({Name: "Equip", onClick: "EquipItem"})
      }
      
      if (Equipped) {
        AvailableActions.push({Name: "Unequip", onClick: "UnequipItem"})
      }

      if (!Loot) {
          AvailableActions.push({Name: "Drop", onClick: "DropItem"})
      }

      return AvailableActions
      
    }
    
    return []
  
  }

  // item action selected from action menu
  UseItem = (Action) => {
    if (Action.onClick === "ShowItemDescription") {
      this.ShowItemDescription(null)
      return false
    }

    this.setState({Clicked: true})
    setTimeout(function () {
      this.setState({Clicked: false, ResetHover: true})
      if (Action.MainAction) {
        this.props.onClick(this.props.item)
        return false
      }
      this.props.UseItem(this.props.item, Action.onClick)
    }.bind(this), 50)


  }

  // direct click on item image
  onClick = () => {

    let Item = {...this.props.item}    
    if (!Object.getOwnPropertyNames(Item).length) return null

    if (!this.props.onClick) {
      console.warn("This feature is not ready yet :)")
      return null
    }

    this.setState({Clicked: true})
    setTimeout(function () {
      this.setState({Clicked: false, ResetHover: true})
      this.props.onClick(this.props.item)
      this.HideItemActions()
      this.HideItemDescription()
    }.bind(this), 50)

  }

  render() {

    return (
      <View
        id={this.state.Id}
        style={Styles.ItemImageBlock}
        onContextMenu={this.ToggleItemActions}
        onMouseEnter={this.ShowItemDescriptionOnHover}
        onMouseLeave={this.HideItemDescriptionOnHover}
        onMouseMove={this.ShowHoverForItemAfterClick}
        onTouchStart={this.RegisterTouch}>
        {this.ItemDescription()}
        {this.ItemActions()}
        <View>
          <View hidden={!this.state.Clicked} style={this.props.Loot ? {...Styles.ItemImageBlockClick, top: document.getElementById(this.state.Id) ?document.getElementById(this.state.Id).getBoundingClientRect().y+1 : null} : Styles.ItemImageBlockClick}/>
          <View onClick={this.onClick}>
            <ItemImage {...this} {...this.props} />
          </View>
          <View style={Styles.ItemImageBlockNumber} hidden={!this.props.showIndex}>
            {this.props.index}
          </View>
        </View>
      </View>
    )
  }
}

class ItemSingleAction extends Component {

  constructor(props) {
    super(props)

    this.state = {style: Styles.ItemAction}
  }

  HoverStyle = () => {
    this.setState({style: Styles.ItemActionHover})
  }

  NormalStyle = () => {
    this.setState({style: Styles.ItemAction})
  }

  UseItem = () => {
    this.props.onClick(this.props.ItemAction)
  }

  render() {
    return (
      <View
        style={this.state.style}
        onMouseMove={this.HoverStyle}
        onMouseLeave={this.NormalStyle}
        onClick={this.UseItem}>
        {this.props.ItemAction.Name}
      </View>
    )
  }
}

class BottomControls extends Component {
  render() {
    return (
      <View style={Styles.BottomControls}>
      </View>
    )
  }
}

/* game state manipulations (save/load) */
class GameStateOptions extends Component {

  ToggleSaveGameStateBox = () => {

    this.props.ToggleGameStateBox("Save")
  }

  ToggleLoadGameStateBox = () => {

    this.props.ToggleGameStateBox("Load")

  }

  ToggleCancelGameStateBox = () => {

    this.props.ToggleGameStateBox("Cancel")
    
  }

  render() {
    return (
      <View style={Styles.GameState}>
        <ActionButton onClick={this.props.ShowCharacterScreen}>New Game</ActionButton>
        <ActionButton onClick={this.ToggleSaveGameStateBox}>Save Game</ActionButton>
        <ActionButton onClick={this.ToggleLoadGameStateBox}>Load Game</ActionButton>
        <ActionButton onClick={this.ToggleCancelGameStateBox} hidden={!this.props.ShowGameStateBox}>Close</ActionButton>
      </View>
    )
  }
}

class GameStateBox extends Component {

  constructor(props) {
    super(props)
    this.state = {
      IncludeStaticAssets: false,
      GameState: this.GenerateSaveGameState({...this.props.state}, false)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ShowGameStateBox === true) {
      if (!this.props.EditableGameStateBox && nextProps.EditableGameStateBox) {
        this.props.UpdateGameStateToLoad("")
        this.setState({GameState: ""})  
      }
      else if (!nextProps.EditableGameStateBox && nextProps.state !== this.props.state) {
        this.setState({GameState: this.GenerateSaveGameState({...nextProps.state})})  
      }
    }
  }

  GenerateSaveGameState = (GameState, IncludeStaticAssets = null) => {

    if (IncludeStaticAssets === null) {
      IncludeStaticAssets = this.state.IncludeStaticAssets      
    }

    delete GameState.Keystrokes
    delete GameState.ShowGameStateBox
    delete GameState.EditableGameStateBox
    delete GameState.MobileScreen
    delete GameState.TabletScreen
    delete GameState.LoadGameError
    delete GameState.GameStateToLoad
    delete GameState.CreateCharacter
    delete GameState.RandomItems

    // remove debug state
    delete GameState.ShowFullMap
    delete GameState.NoClip
    delete GameState.GodMode
    delete GameState.Debug

    if (!IncludeStaticAssets) {
      GameState = this.StripStaticAssets(GameState)      
    }

    let DisplayState = JSON.stringify(
      GameState,
      null,
      `\t`,
    )

    // console.log(DisplayState)
    return DisplayState
  }

  StripStaticAssets = (GameState) => {

    delete GameState.UniqueItems
    delete GameState.Items
    delete GameState.Spells
    delete GameState.Bestiary

    return GameState
  }

  ToggleSaveStaticAsset = () => {
    
    let GameState = {...this.props.state}
    let IncludeStaticAssets = !this.state.IncludeStaticAssets

    this.setState({
      GameState: this.GenerateSaveGameState(GameState, IncludeStaticAssets),
      IncludeStaticAssets: IncludeStaticAssets,
    })  

  }

  onChange = (input) => {

    if (this.props.EditableGameStateBox) {
      this.props.UpdateGameStateToLoad(input.target.value)
      this.setState({GameState: input.target.value})
    }

  }

  onClick = (input) => {

    if (!this.props.EditableGameStateBox) {
      input.target.select()
    }
  }

  render() {
    return (
      <View style={Styles.GameStateBoxContainer} 
      hidden={!this.props.ShowGameStateBox}>
        <Block hidden={!this.props.EditableGameStateBox}>
          {this.props.LoadGameError}
        </Block>
        <Block hidden={this.props.EditableGameStateBox}>
          <input type="checkbox" checked={this.state.IncludeStaticAssets} onChange={this.ToggleSaveStaticAsset}/> include static assets
        </Block>
        <textarea
          readOnly={!this.props.EditableGameStateBox}
          style={{...Styles.GameStateBox}}
          onChange={this.onChange}
          onClick={this.onClick}
          value={this.state.GameState}
        />
      </View>
    )
  }
}

/* set volume */

class Volume extends Component {
  onClick = (NewValueRatio) => {

    this.props.SetVolume(Math.min(1,Math.max(0,Math.floor(NewValueRatio*100)/100)))

  }

  render() {
    let style = {...Styles.Slider, ...Styles.VolumeSlider}    
    return (
      <View style={Styles.VolumeControl}>
        <Block style={Styles.VolumeLabel}>
          Sound:
        </Block>
        <Slider
          Percentage
          CurrentValue={this.props.Sound.Volume}
          onClick={this.onClick}
          style={style}
        />
      </View>
    )
  }
}

/* accessories */

class Accessories extends Component {
  render() {
    return (
      <View style={Styles.Accessories} hidden={this.props.MobileScreen ? this.props.HideInventory : false}>

      </View>
    )
  }
}

/* spell books */

class SpellBook extends Component {

  // no need to re-render spell book if it has not changed
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.MobileScreen !== this.props.MobileScreen
      || nextProps.TabletScreen !== this.props.TabletScreen
      || nextProps.Player.SpellBook !== this.props.Player.SpellBook
      || nextProps.HideSpellBook !== this.props.HideSpellBook
    ) {
      if (Debug) console.log("re-render: spellbook")
      return true
    }
    return false
  }

  DisplaySpellBook = () => {

    // let {Player} = this.props
    let Player = {...this.props.Player}
    let Spells = Player.SpellBook ? Player.SpellBook.Spells : []

    let SpellSlots = []

    for (let i = 0; i < Utilities.NumberOfSpells; i++) {
      if (!Spells || Spells.length <= i) {
        SpellSlots.push(
          <ItemImageBlock
            key={i}/>
        )     
      }
      else {
        SpellSlots.push(
          <ItemImageBlock
          draggable={false}
          key={i}
          index={i <= 99 ? ("0" + Number(i+1)).slice(-2) : i}
          showIndex
          image={(Spells[i] && Spells[i].Image) || null}
          name={(Spells[i] && Spells[i].Name) || null}
          item={Spells[i]}
          NoActionMenu
          onClick={this.props.CastSpell}
          />
        )  
      }
    }

    return SpellSlots
  }

  render() {
    let Player = {...this.props.Player}

    if (!Player.Class.Spellcaster || !Player.SpellBook || Player.SpellBook.MaxSpells === 0) {
      return null
    }
    return (
      <View style={Styles.SpellBook} hidden={this.props.MobileScreen ? this.props.HideSpellBook : false}>
        <Block style={Styles.SpellBookLabel} hidden={this.props.MobileScreen}>Spellbook</Block>
        {this.DisplaySpellBook()}
      </View>
    )
  }
}

/* inventory */

class Inventory extends Component {
  
  // no need to re-render backpack content if it has not changed
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.MobileScreen !== this.props.MobileScreen
      || nextProps.TabletScreen !== this.props.TabletScreen
      || nextProps.Backpack !== this.props.Backpack
      || nextProps.HideInventory !== this.props.HideInventory
    ) {

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
      if (Backpack.Items && Backpack.Items[i] !== undefined) {
        list.push(Backpack.Items[i])
      }
      else {
        list.push(null)
      }
    }

    let inventory = list.map((item, index) => {
      return (
        <ItemImageBlock
          draggable={true}
          key={index}
          index={item && item.image ? "B" + (index <= 99 ? ("0" + Number(index+1)).slice(-2) : index) : null}
          showIndex
          image={(item && item.image) || null}
          name={(item && item.Name) || null}
          item={item}
          onClick={this.props.UseItem}
          {...this.props}
          />
      )
    })

    return inventory
  }

  render() {
    // let {Player, Backpack} = this.props
    let Player = {...this.props.Player}
    let Backpack = {...this.props.Backpack}

    return (
      <View style={Styles.Inventory} hidden={this.props.MobileScreen ? this.props.HideInventory : false}>
        <Block style={Styles.InventoryLabel} hidden={this.props.MobileScreen}>Backpack</Block>
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
      nextProps.MobileScreen !== this.props.MobileScreen
      || nextProps.TabletScreen !== this.props.TabletScreen
      || nextState.style !== this.state.style
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
    this.props.onClick(this.props.arrow)
    this.setState({ style: Styles.ArrowBlockClick })
    setTimeout(function () {
      if (this.state.style === Styles.ArrowBlockClick) {
        this.setState({ style: Styles.ArrowBlockHover })
      }
    }.bind(this), 50)
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

    let {SmallPadding, StayClicked, Clicked} = {...this.props}

    if (StayClicked && Clicked) {
      this.state = {
        style: SmallPadding ? Styles.ActionButtonHoverSmallPadding : Styles.ActionButtonHover 
      } 
    }
    else {
      this.state = {
        style: SmallPadding ? Styles.ActionButtonSmallPadding : Styles.ActionButton 
      }  
    }

  }

  componentWillReceiveProps(NextProps) {
    let {StayClicked, Clicked, SmallPadding} = {...NextProps}
    let CurrentlyClicked = {...this.props.Clicked}
    let CurrentlySmallPadding = {...this.props.SmallPadding}
    
    if (StayClicked && CurrentlyClicked && !Clicked) {
      this.setState({
        style: SmallPadding ? Styles.ActionButtonSmallPadding : Styles.ActionButton,
      })
    }

    if (!StayClicked && SmallPadding !== CurrentlySmallPadding) {
      this.setState({
        style: SmallPadding ? Styles.ActionButtonSmallPadding : Styles.ActionButton,
      })
    }

  }

  NormalStyle = () => {
    let {SmallPadding} = {...this.props}
    this.setState({
      style: SmallPadding ? Styles.ActionButtonSmallPadding : Styles.ActionButton
    })
  }
  HoverStyle = () => {
    let {SmallPadding} = {...this.props}
    this.setState({ style: SmallPadding ? Styles.ActionButtonHoverSmallPadding : Styles.ActionButtonHover })
  }
  onClick = () => {

    let {SmallPadding} = {...this.props}
    this.setState({
      style: SmallPadding ? Styles.ActionButtonClickSmallPadding : Styles.ActionButtonClick
    })

    let that = this
    setTimeout(function () {
      if (that.state.style === Styles.ActionButtonClick || that.state.style === Styles.ActionButtonClickSmallPadding) {
        that.setState({ style: SmallPadding ? Styles.ActionButtonHoverSmallPadding : Styles.ActionButtonHover })
      }
    }, 50)  

    if (!this.props.onClick) {
      console.warn("This feature is not ready yet :)")
      return null
    }

    this.props.onClick()

  }
  render() {

    let {Clicked, StayClicked} = {...this.props}

    return (
      <View
        hidden={this.props.hidden}
        onClick={this.onClick}
        onMouseMove={this.HoverStyle}
        onMouseLeave={Clicked && StayClicked ? null : this.NormalStyle}
        style={this.props.hidden ? {display: "none"} : this.state.style}>
        {this.props.children}
      </View>
    )
  }
}

class Rest extends Component {
  render() {
    return (
      <View style={Styles.Rest} hidden={this.props.MobileScreen ? this.props.HideStats : false}>
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

/* slider */

class Slider extends Component {

  constructor(props) {
    super(props)

    this.state = {
      Dragging: false,
      Id: Math.floor(Math.random() * 99999999999)
    }

  }

  onClick = (input) => {

    input.preventDefault()

    let State = {...this.state}

    let {style} = this.props
    let SliderWidth = style.width.replace("px","")

    this.props.onClick((document.getElementById(this.state.Id).getBoundingClientRect().x - input.clientX) / SliderWidth * -1)

    delete State.x
    delete State.y
    State.Dragging = false

    this.setState(State)

  }
  
  onMouseDown = (input) => {

  input.preventDefault()

  if (!this.state.Dragging) {
    this.setState({
      Dragging: true,
      x: input.clientX,
      y: input.clientY,
    })
  }

  var that = this
  document.addEventListener("mouseup", that.onMouseUp)

  }

  onMouseUp = (input) => {

    input.preventDefault()

    let State = {...this.state}

    let {style, Percentage, CurrentValue, MaxValue, MinValue} = this.props
    let SliderWidth = style.width.replace("px","")
    let Ratio = Percentage ? CurrentValue : (CurrentValue - MinValue)/(MaxValue-MinValue)

    this.props.onClick((State.x - SliderWidth * Ratio - input.clientX) / SliderWidth * -1)

    delete State.x
    delete State.y
    State.Dragging = false

    this.setState(State)

    document.removeEventListener("mouseup", this.onMouseUp)

  }

  render() {
    let {style, Percentage, CurrentValue, MaxValue, MinValue} = this.props
    let SliderWidth = style.width.replace("px","")
    let CursorWidth = Number(Styles.SliderCursor.width.replace("px","")) + Number(Styles.SliderCursor.border.replace(/[^0-9]/g, "") * 2)
    let Ratio = Percentage ? null : (CurrentValue - MinValue)/(MaxValue-MinValue)
    return (
      <View style={style}>
        <Block
          id={this.state.Id}
          onClick={this.onClick}
          onMouseDown={this.onMouseDown}
          title={this.props.Percentage ? CurrentValue * 100 + "%" : CurrentValue}>
          <Block style={Styles.SliderTrack}/>
          <Block style={Styles.SliderInside}/>
          <Block
            style={{
            ...Styles.SliderCursor,
            left: (((SliderWidth-CursorWidth*2) * (Ratio || CurrentValue)) + CursorWidth/2 + "px")
          }}/>
        </Block>
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
          Equipped
          {... this.props}/>
        </View>
      )
    }
  }
}

class WeaponReadyBlock extends Component {

  // no need to re-render gear if it has not changed
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.MobileScreen !== this.props.MobileScreen
      || nextProps.TabletScreen !== this.props.TabletScreen
      || nextProps.Gear !== this.props.Gear
    ) {
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

class PlayerNameAndWeapons extends Component {

  // no need to re-render stats if player has not changed
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.MobileScreen !== this.props.MobileScreen
      || nextProps.TabletScreen !== this.props.TabletScreen
      || nextProps.Player.Name !== this.props.Player.Name
      ||  nextProps.Gear !== this.props.Gear
    ) {
      if (Debug) console.log("re-render: player name and gear")
      return true
    }
    return false
  }

  render() {
    let Player = {...this.props.Player}
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
      
      nextProps.MobileScreen !== this.props.MobileScreen
      || nextProps.TabletScreen !== this.props.TabletScreen
      || nextProps.Player.Health !== this.props.Player.Health
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
    let Player = {...this.props.Player}
    return (
      <View style={Styles.PlayerVitals}>
        <Block style={Styles.PlayerStat}>
          Health
          <HealthBar current={Player.Health} max={Player.MaxHealth}/>
        </Block>
        <Block style={Styles.PlayerStat} hidden={!Player.Class || !Player.Class.Spellcaster}>
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

class ResponsiveTabSelector extends Component {
  render() {
    return (
      <View style={Styles.TabSelector} hidden={!this.props.MobileScreen}>
        <Block style={Styles.FlexBoxContainer}>
          <Block style={Styles.TabButton}>
            <ActionButton StayClicked Clicked={!this.props.HideStats} onClick={this.props.ShowStats}>Stats</ActionButton>
          </Block>
          <Block style={Styles.TabButton}>
            <ActionButton SmallPadding StayClicked Clicked={!this.props.HideInventory} onClick={this.props.ShowInventory}>Backpack</ActionButton>
          </Block>
          <Block style={Styles.TabButton}>
          <ActionButton SmallPadding StayClicked Clicked={!this.props.HideSpellBook} onClick={this.props.ShowSpellBook} hidden={!this.props.Player.Class.Spellcaster}>Spells</ActionButton>
          </Block>
        </Block>
      </View>
    )
  }
}

class RepsonsiveStatsContainer extends Component {
  render() {
    return (
      <View style={Styles.ResponsiveStatsContainer} hidden={!this.props.MobileScreen}>
      </View>
    )
  }
}

class PlayerAbilities extends Component {

  // no need to re-render stats if player has not changed
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.MobileScreen !== this.props.MobileScreen
      || nextProps.TabletScreen !== this.props.TabletScreen
      || nextProps.Player.Level !== this.props.Player.Level
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
    let Player = {...this.props.Player}
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

class ResponsivePlayerLevelAndArmor extends Component {

  // no need to re-render stats if player has not changed
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.MobileScreen !== this.props.MobileScreen
      || nextProps.TabletScreen !== this.props.TabletScreen
      || nextProps.Player.Level !== this.props.Player.Level
      || nextProps.Player.XP !== this.props.Player.XP
      || nextProps.Player.ArmorClass !== this.props.Player.ArmorClass
      || nextProps.HideStats !== this.props.HideStats
    ) {
      if (Debug) console.log("re-render: player level/XP and AC")
      return true
    }
    return false
  }

  render() {
    let Player = {...this.props.Player}
    return (
      <View style={MobileScreen || TabletScreen ? Styles.PlayerStats2Block1 : Styles.Hidden} hidden={this.props.MobileScreen ? this.props.HideStats : false}>
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

class ResponsivePlayerAbilities extends Component {

  // no need to re-render stats if player has not changed
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.MobileScreen !== this.props.MobileScreen
      || nextProps.TabletScreen !== this.props.TabletScreen
      || nextProps.Player.Strength !== this.props.Player.Strength
      || nextProps.Player.Dexterity !== this.props.Player.Dexterity
      || nextProps.Player.Constitution !== this.props.Player.Constitution
      || nextProps.Player.Intelligence !== this.props.Player.Intelligence
      || nextProps.HideStats !== this.props.HideStats
    ) {
      if (Debug) console.log("re-render: player abilities")
      return true
    }
    return false
  }

  render() {
    let Player = {...this.props.Player}
    return (
      <View style={MobileScreen || TabletScreen ? Styles.PlayerStats2Block2 : Styles.Hidden} hidden={this.props.MobileScreen ? this.props.HideStats : false}>
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

class PlayerLevelAndArmor extends Component {

  // no need to re-render stats if player has not changed
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.MobileScreen !== this.props.MobileScreen
      || nextProps.TabletScreen !== this.props.TabletScreen
      || nextProps.Player.Level !== this.props.Player.Level
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

class ClearLog extends Component {
  render() {
    return (
      <View style={Styles.ClearLog}>
        <ActionButton SmallPadding={this.props.MobileScreen} onClick={this.props.ClearLog}>
          {this.props.MobileScreen ? <Text>X</Text> : <Text>Clear Log</Text>}
        </ActionButton>
      </View>
    )
  }
}

// a set of brief messages that provides feedback on the user's actions (example: "you can't go there")
class EventLog extends Component {

  // no need to re-render the log if it has not changed
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.MobileScreen !== this.props.MobileScreen
      || nextProps.TabletScreen !== this.props.TabletScreen
      || nextProps.EventLog !== this.props.EventLog
      || nextProps.EnterCustomLogEntry !== this.props.EnterCustomLogEntry
      || nextProps.CustomLogEntry !== this.props.CustomLogEntry
    ) {
      if (Debug) console.log("re-render: event log")
      return true
    }
    return false
  }

  onClick = (input) => {
    let HtmlElement = document.getElementById("EventLog")
    let SeparatingLine = HtmlElement.clientHeight/2
    let Direction  = 1
    if (input.clientY - HtmlElement.getBoundingClientRect().y < SeparatingLine) {
      Direction = -1
    }

    // event log does not scroll, or user has reached the bottom of the scroll
    if ((HtmlElement.scrollHeight <= HtmlElement.getBoundingClientRect().height) || (Direction === 1 && Math.floor(HtmlElement.scrollTop) === Math.floor(HtmlElement.scrollHeight - HtmlElement.getBoundingClientRect().height))) {
      this.props.DisplayCustomLogEntryInput(input)
    }
    else {
      this.props.Scroll("EventLog",Direction)
    }

  }

  render() {
    return (
      <View style={Styles.EventLog} onClick={this.onClick}>
        <Block id="EventLog" style={Styles.EventLogContainer}>
          <Block>
            {!this.props.EventLog ? null : this.props.EventLog.map((LogEntry, Index) => {return <View key={Index}>{LogEntry}</View>})}
          </Block>
          <Block style={Styles.CustomLogEntryInputContainer}>
            <TextEdit
                style={{...Styles.TextEdit, width: "calc(100% - " + (Styles.TextEdit.padding.replace("px",""))*2 + "px)"}}
                styleFocus={{...Styles.TextEditFocus, width: "calc(100% - " + (Styles.TextEdit.padding.replace("px",""))*2 + "px)"}}
                hidden={!this.props.EnterCustomLogEntry}
                name="CustomLogEntry"
                value={this.props.CustomLogEntry}
                placeholder="You can add an entry to your log here."
                onChange={this.props.StoreCustomLogEntryInput}
                onBlur={this.props.SaveCustomLogEntryInput}     
              />
          </Block>

        </Block>
      </View>
    )
  }
}

// a descriptive paragraph about the surroundings of the user, to set the mood :)
class Story extends Component {

  // no need to re-render story text if it has not changed
  shouldComponentUpdate(nextProps) {
    if (  
      nextProps.MobileScreen !== this.props.MobileScreen
      || nextProps.TabletScreen !== this.props.TabletScreen
      || nextProps.currentText !== this.props.currentText
    ) {
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
          {!currentText ? null : typeof currentText.split !== "function" ? currentText : currentText.split("\n").map((paragraph, index) => {
            return <Text key={index}>{paragraph}<LineBreak/></Text>
          })}
        </Block>
        <Block hidden={!currentTextImage}>
          <Image
            draggable={false}
            src={storyPath + currentTextImage + imgExt}
            style={Styles.Paragraph}/>
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
        Loot
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
      nextProps.MobileScreen !== this.props.MobileScreen
      || nextProps.TabletScreen !== this.props.TabletScreen
      || nextProps.currentEvent !== this.props.currentEvent
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

  onClick = (input) => {
    let HtmlElement = document.getElementById("Story")
    let SeparatingLine = HtmlElement.clientHeight/10*4
    let Direction  = 1
    if (input.clientY - HtmlElement.getBoundingClientRect().y < SeparatingLine) {
      Direction = -1
    }
    this.props.Scroll("Story",Direction)
  }

  render() {
    return (
      <View style={Styles.StoryBlock}>
        <Block id="Story" style={Styles.StoryContainer} onClick={this.onClick}>
          {this.props.children}
        </Block>
      </View>
    )
  }
}

/* map */

class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  // no need to re-render the map if the player or monsters haven't moved, or the area revealed has not changed
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.MobileScreen !== this.props.MobileScreen
      || nextProps.TabletScreen !== this.props.TabletScreen
      || nextProps.Player.x !== this.props.Player.x
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
    let ShowFullMap = this.props.ShowFullMap

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
    let ShowFullMap = this.props.ShowFullMap
    let WallMap = Object.assign([], this.props.WallMap)
    let WallMapRevealed = Object.assign([], this.props.WallMapRevealed)
    let DiscoveryMap = Object.assign([], this.props.DiscoveryMap)
    let LootMap = Object.assign([], this.props.LootMap)

    // player marker
    if (x === Player.x && y === Player.y) {
      return <Block id="you-are-here" style={Styles.Player} />
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

/* create player */

class CreateCharacterHeader extends Component {
  render() {
    return (
      <View style={Styles.CharacterHeader}>
        <Heading>Create Your Character</Heading>
      </View>
    )
  }
}

class CreateCharacterContainer extends Component {
  render() {
    return (
      <View style={Styles.CreateCharacterContainer}>
      </View>
    )
  }
}

class CreateCharacterName extends Component {
  render() {
    // let {Player} = this.props
    let Player = {...this.props.Player}
    return (
      <View style={Styles.CharacterCreateName}>
        <Block style={Styles.PropertyLabelForInput}>
          <Text>Name:</Text>
        </Block>
        <Block style={Styles.PropertyFieldForInput}>
          <TextEdit
            style={Styles.TextEditUnderline}
            styleFocus={Styles.TextEditUnderlineFocus}
            name="Name"
            placeholder="Enter your name."
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

class CreateCharacterAbilities extends Component {
  render() {
    // let {Player} = this.props
    let Player = Object.assign({}, this.props.Player)
    return (
      <View style={Styles.CharacterCreateView}>
        <Block style={Styles.PropertyLabel}>
          <Text>Strength:</Text>
        </Block>
        <Block style={Styles.PropertyField}>
          <Text>{Player.Strength - (Player.Race.AbilityBoost.Strength || 0)} {Player.Race.AbilityBoost.Strength ? "+" + Player.Race.AbilityBoost.Strength : null}</Text>
        </Block>
        <Block style={Styles.PropertyLabel}>
          <Text>Dexterity:</Text>
        </Block>
        <Block style={Styles.PropertyField}>
          <Text>{Player.Dexterity - (Player.Race.AbilityBoost.Dexterity || 0)} {Player.Race.AbilityBoost.Dexterity ? "+" + Player.Race.AbilityBoost.Dexterity : null}</Text>
        </Block>
        <Block style={Styles.PropertyLabel}>
          <Text>Constitution:</Text>
        </Block>
        <Block style={Styles.PropertyField}>
          <Text>{Player.Constitution - (Player.Race.AbilityBoost.Constitution || 0)} {Player.Race.AbilityBoost.Constitution ? "+" + Player.Race.AbilityBoost.Constitution : null}</Text>
        </Block>
        <Block style={Styles.PropertyLabel}>
          <Text>Intelligence:</Text>
        </Block>
        <Block style={Styles.PropertyField}>
          <Text>{Player.Intelligence - (Player.Race.AbilityBoost.Intelligence || 0)} {Player.Race.AbilityBoost.Intelligence ? "+" + Player.Race.AbilityBoost.Intelligence : null}</Text>
        </Block>
        <Block />
        <Block style={Styles.RollAbilities}>
          <ActionButton onClick={this.props.GeneratePlayerStats}>
            Reroll
          </ActionButton>
        </Block>
        <Block />
      </View>
    )
  }
}

class CreateCharacterBackground extends Component {

  SelectRace = (Input) => {

    let Player = {...this.props.Player}
    let Races = World.Races
    let RaceName = ""
    let index = 0

    Object.keys(Races).filter((RaceObjectName, i) => {
      if (RaceObjectName === Player.Race.Id) {
        index = i
        return true
      }
      return false
      
    })
    
    if (Input === "Left") {
      Player.Race = Races[Object.keys(Races).filter((RaceObjectName, i) => {
        if ((index === 0 && i === Object.keys(Races).length-1) || i === index-1) {
          RaceName = RaceObjectName
          return true
        }
        return false
      })[0]]
    }
    else {
      Player.Race = Races[Object.keys(Races).filter((RaceObjectName, i) => {
        if ((index+2 > Object.keys(Races).length && i === 0) || i === index+1) {
          RaceName = RaceObjectName
          return true
        }
        return false
      })[0]]
    }
    this.props.SetRace({...Player.Race, Id: RaceName})

  }

  SelectClass = (Input) => {

    let Player = {...this.props.Player}
    let Classes = World.Classes
    let ClassName = ""
    let index = 0

    Object.keys(Classes).filter((ClassObjectName, i) => {
      if (ClassObjectName === Player.Class.Id) {
        index = i
        return true
      }
      return false
      
    })
    
    if (Input === "Left") {
      Player.Class = Classes[Object.keys(Classes).filter((ClassObjectName, i) => {
        if ((index === 0 && i === Object.keys(Classes).length-1) || i === index-1) {
          ClassName = ClassObjectName
          return true
        }
        return false
      })[0]]
    }
    else {
      Player.Class = Classes[Object.keys(Classes).filter((ClassObjectName, i) => {
        if ((index+2 > Object.keys(Classes).length && i === 0) || i === index+1) {
          ClassName = ClassObjectName
          return true
        }
        return false
      })[0]]
    }
    this.props.SetClass({...Player.Class, Id: ClassName})
  }

  SelectFirstSpell = (Input) => {

    let Player = {...this.props.Player}
    let Spells = Campaign.AvailableStartSpell
    let index = 0

    Spells.filter((Spell, i) => {
      if (Spell === Player.SpellBook.Spells[0]) {
        index = i
        return true
      }
      return false
      
    })

    if (Input === "Left") {
      if (index-1 < 0) {
        Player.SpellBook.Spells[0] = Spells[Spells.length-1]  
      }
      else {
        Player.SpellBook.Spells[0] = Spells[index-1]        
      }
    }
    else {
      if (index+1 > Spells.length-1) {
        Player.SpellBook.Spells[0] = Spells[0]  
      }
      else {
        Player.SpellBook.Spells[0] = Spells[index+1]
      }
    }

    this.props.SetFirstSpell(Player.SpellBook)
    

  }

  render() {

    let Player = {...this.props.Player}

    let FirstSpell = null
    if (Player.SpellBook && Player.SpellBook.Spells) {
      FirstSpell = {...Player.SpellBook.Spells[0]}
    }

    return (
      <View style={Styles.CharacterCreateBackground}>
        <Block style={{...Styles.PropertyLabel, paddingTop: "8px"}}>
          <Text>Race:</Text>
        </Block>
        <Block style={Styles.PropertyField}>
          <Block style={Styles.FlexBoxContainer}>
              <Arrow {...this.props} onClick={this.SelectRace} arrow="Left">←</Arrow>
            <Block style={{flexGrow: "1", flexBasis: "auto", textAlign: "center", margin: "auto"}}>
              <Text>{Player.Race.Name}</Text>
            </Block>
              <Arrow {...this.props} onClick={this.SelectRace} arrow="Right">→</Arrow>  
          </Block>
        </Block>
        <Block style={{...Styles.PropertyLabel, paddingTop: "8px"}}>
          <Text>Class:</Text>
        </Block>
        <Block style={Styles.PropertyField}>
        <Block style={Styles.FlexBoxContainer}>
            <Arrow {...this.props} onClick={this.SelectClass} arrow="Left">←</Arrow>
          <Block style={{flexGrow: "1", flexBasis: "auto", textAlign: "center", margin: "auto"}}>
            <Text>{Player.Class.Name}</Text>
          </Block>
            <Arrow {...this.props} onClick={this.SelectClass} arrow="Right">→</Arrow>  
        </Block>
      </Block>
        <Block style={{...Styles.PropertyLabel, paddingTop: "10px"}} hidden={!Player.Class.Spellcaster || !Campaign.AvailableStartSpell}>
            <Text>Spell:</Text>
        </Block>
        <Block style={Styles.PropertyField} hidden={!Player.Class.Spellcaster || !Campaign.AvailableStartSpell}>
          <Block style={Styles.FlexBoxContainer}>
            <Block style={{marginTop: "3px"}}>
              <Arrow {...this.props} onClick={this.SelectFirstSpell} arrow="Left">←</Arrow>
            </Block>
            <Block style={{flexGrow: "1", flexBasis: "auto", marginLeft: "8px"}}>
              <ItemImageBlock
                draggable={false}
                image={(FirstSpell && FirstSpell.Image) || null}
                name={(FirstSpell && FirstSpell.Name) || null}
                item={FirstSpell}
                onClick={null} />
            </Block>
            <Block style={{marginTop: "3px"}}>
              <Arrow {...this.props} onClick={this.SelectFirstSpell} arrow="Right">→</Arrow>
            </Block>
          </Block> 
        </Block>
      </View>
    )
  }
}

class CreateCharacterDescription extends Component {
  render() {
    let Player = {...this.props.Player}
    return (
      <View style={Styles.CreateCharacterDescription}>
        <Block style={Styles.Paragraph}>
          {Player.Race.Description}
        </Block>
        <Block style={Styles.Paragraph}>
          {Player.Class.Description}
        </Block>
      </View>
    )
  }
}

class StartGame extends Component {
  render() {
    return (
      <View style={Styles.StartGame}>
        <ActionButton onClick={this.props.ResumeGame} hidden={!this.props.GameInBackground}>
        Resume Game
        </ActionButton>
        <ActionButton onClick={this.props.StartPlaying}>
        Let's play!
        </ActionButton>
      </View>
    )
  }
}

/* top */

class Contact extends Component {

  // content is static
  shouldComponentUpdate(nextProps) {
    if (
        nextProps.CreateCharacter !== this.props.CreateCharacter
        || nextProps.MobileScreen !== this.props.MobileScreen
        || nextProps.TabletScreen !== this.props.TabletScreen
      ) {
      return true
    }
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
  shouldComponentUpdate(nextProps) {
    if (
        nextProps.CreateCharacter !== this.props.CreateCharacter
        || nextProps.MobileScreen !== this.props.MobileScreen
        || nextProps.TabletScreen !== this.props.TabletScreen
      ) {
      return true
    }
    return false
  }

  render() {
    return (
      <View style={Styles.Header}>
        <PageTitle>Dungeon!</PageTitle>
        <PageSubtitle>an adventure game in React</PageSubtitle>
        <Version>
          {process.env.REACT_APP_STAGE}
          {process.env.REACT_APP_VERSION
            ? <Text> (v{process.env.REACT_APP_VERSION} {process.env.REACT_APP_RELEASE}{process.env.REACT_APP_BUILD_TIME
              ? <Text>; build: {process.env.REACT_APP_BUILD_TIME}</Text>
              : null}
            )</Text>
            : <Text>Dev Mode</Text>
          }
        </Version>
      </View>
    )
  }
}

/* main */

class Game extends Component {

  /* CSS */

  CalculateStyles = () => {

    MobileScreen = Utilities.ScreenSize.MobileScreen()
    TabletScreen = Utilities.ScreenSize.TabletScreen()

    if (MobileScreen !== this.state.MobileScreen || TabletScreen !== this.state.TabletScreen) {

      WallMapVisibleRange = MobileScreen ? Utilities.WallMapVisibleRangeMobileScreen : Utilities.WallMapVisibleRange

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

      const ButtonNormalBackground = "linear-gradient(135deg, #ccc 35%, #ddd 70%, #eee 100%)"
      
      const ButtonHoverBackground = "linear-gradient(135deg, #aaa 35%, #ccc 70%, #ccc 100%)"
      const ButtonClickBackground = "linear-gradient(135deg, #777 35%, #999 70%, #999 100%)"

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
      let ControlRow3 = null
      let InventoryRow = 6
      let SpellBookRow = 7
      let AccessoriesStartRow = 6
      let AccessoriesStopRow = 8
      let BottomControlsRow = 9
      let VolumeRow = 9
      let GameStateRow = 10

      if (MobileScreen) {

        TitleRow = 1
        ContactRow = 2
        MessageRow = 3
        MainRow = 4
        MapRow = 5
        ControlRow = 6
        ControlRow2 = 7
        ControlRow3 = 8
        InventoryRow = 9
        SpellBookRow = 10
        AccessoriesStartRow = 11
        AccessoriesStopRow = 12
        BottomControlsRow = 13
        VolumeRow = 14
        GameStateRow = 15

      }

      // grid columns
      let StoryStartColumn = FirstColumn
      let StoryEndColumn = 6
      let MapStartColumn = StoryEndColumn
      let MapEndColumn = LastColumn

      let ContactColumnStart = 5
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
        FlexBoxContainer: {
          display: "flex",
          justifyContent: "center",

        },
        // input fields
        // default style
        TextEdit: {
          border: "none",
          padding: "5px",
          fontFamily: "inherit",
          fontSize: "inherit",
          width: "120px",
          background: "transparent",
        },
        TextEditFocus: {
          border: "none",
          padding: "5px",
          outline: "none",
          fontFamily: "inherit",
          fontSize: "inherit",
          width: "120px",
          background: "transparent",
        },
        // underline when focused
        TextEditUnderline: {
          border: "none",
          padding: "5px",
          fontFamily: "inherit",
          fontSize: "inherit",
          width: "120px",
          background: "transparent",
        },
        TextEditUnderlineFocus: {
          border: "none",
          padding: "5px",
          outline: "none",
          fontFamily: "inherit",
          fontSize: "inherit",
          width: "120px",
          background: "transparent",
          textDecoration: "underline",
        },
        // Create Player Grid
        CreatePlayer: {
          margin: "0 auto",
          width: MobileScreen ? "300px" : TabletScreen ? "675px" : "810px",
          userSelect: "none",
          cursor: "pointer",
          display: "grid",
          gridTemplateColumns:
            MobileScreen ?
            // column1-10
            "repeat(9, 34.4px)"
            :
            TabletScreen ?
            // column1-10
            "repeat(9, 75px)"
            :
            // column1-10
            "repeat(9, 90px)"
          ,
          gridTemplateRows:
          "auto " +
          "auto " + 
          "auto"
          ,
        },
        CharacterHeader: {
          padding: HUDPadding,
          gridColumnStart: FirstColumn,
          gridColumnEnd: LastColumn,
          gridRowStart: 3,
        },
        // Character Name and Vitals
        CharacterCreateName: {
          padding: HUDPadding,
          gridColumnStart: FirstColumn,
          gridColumnEnd: MobileScreen ? LastColumn : 4,
          gridRowStart: 4,
          display: "grid",
          // subgrid
          gridTemplateRows: "23px 23px 23px 23px",
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
        },
        CreateCharacterContainer: {
          gridColumnStart: FirstColumn,
          gridColumnEnd: LastColumn,
          gridRowStart: 3,
          gridRowEnd: 9,
          backgroundImage: "url(graphics/hud/parchment.jpg)",
        },
        // Character Ability Scores
        CharacterCreateView: {
          padding: HUDPadding,
          gridColumnStart: MobileScreen ? FirstColumn : 4,
          gridColumnEnd: MobileScreen ? LastColumn : 7,
          gridRowStart: MobileScreen ? 5 : 4,
          display: "grid",
          // subgrid
          gridTemplateRows: "23px 23px 23px 23px",
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
        // Character Race and Class
        CharacterCreateBackground: {
          padding: HUDPadding,
          gridColumnStart: MobileScreen ? FirstColumn : 6,
          gridColumnEnd: 10,
          gridRowStart: MobileScreen ? 6 : 4,
          display: "grid",
          // subgrid
          gridTemplateRows: "32px 32px 32px",
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
        CreateCharacterDescription: {
          gridColumnStart: FirstColumn,
          gridColumnEnd: LastColumn,
          gridRowStart: MobileScreen ? 7 : 5,
          padding: HUDPadding,
          paddingTop: "20px",
          minHeight: "100px",
        },
        StartGame: {
          gridColumnStart: FirstColumn,
          gridColumnEnd: LastColumn,
          gridRowStart: 8,
          padding: HUDPadding,
          textAlign: "right",
        },
        // Create Character: Label/Value Pairs
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
        // In-Game Grid
        Game: {
          margin: "0 auto",
          width: MobileScreen ? "270px" : TabletScreen ? "650px" : "790px",
          userSelect: "none",
          cursor: "pointer",
          display: "grid",
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
          gridTemplateRows: this.state.CreateCharacter ? null :
            // title (row1)
            "auto " +
            // contact (row2)
            "auto " +
            // event log (row3)
            "auto" +
            // story/map (row4)
            (this.state.CreateCharacter ? "auto" : StoryRowHeight + px) + " " +
            // story (row5)
            (MobileScreen ? StoryRowHeight*1/2 + px + " " : "") +
            // controls (row6a)
            "auto " +
            // controls2 (row6b)
            (MobileScreen ? "auto " : "") +
            // controls3 (row6c)
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
        // Game Background images
        TopGameBackgroundImage: {
          gridColumnStart: FirstColumn,
          gridColumnEnd: LastColumn,
          gridRowStart: MessageRow,
          gridRowEnd: MapRow+1,
          backgroundImage: "url(graphics/hud/parchment.jpg)",
        },
        BottomGameBackgroundImage: {
          gridColumnStart: FirstColumn,
          gridColumnEnd: LastColumn,
          gridRowStart: ControlRow,
          gridRowEnd: VolumeRow+1,
          backgroundImage: "url(graphics/hud/metal.jpg)",
        },
        GameStateBackgroundImage: {
          gridColumnStart: FirstColumn,
          gridColumnEnd: LastColumn,
          gridRowStart: GameStateRow,
          backgroundImage: "url(graphics/hud/parchment.jpg)",
        },
        // Top-screen Messages
        EventLog: {
          gridColumnStart: FirstColumn,
          gridColumnEnd: ContactColumnStop,
          gridRowStart: MessageRow,
          fontWeight: "bold",
          border: HUDBorder,
          padding: HUDBlockPadding,
          height:
            Number(18.5 *
              (MobileScreen
                ? Utilities.ResponsiveMaxEventLogEntries
                : Utilities.MaxEventLogEntries
              )
            ) + px,
        },
        EventLogContainer: {
          maxHeight:
          Number(18.5 *
            (MobileScreen
              ? Utilities.ResponsiveMaxEventLogEntries
              : Utilities.MaxEventLogEntries
            )
          ) + px,
          overflow: "auto",
          scrollBehavior: "smooth",
        },
        CustomLogEntryInputContainer: {
          marginLeft: "42.5px"
        },
        ClearLog: {
          gridColumnStart: LastColumn-2,
          gridColumnEnd: LastColumn,
          gridRowStart: MessageRow,
          textAlign: "right",
          padding: HUDBlockPadding,
          paddingRight: "25px",
          zIndex: "1000",
          height: "18px",
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
        },
        StoryContainer: {
          maxHeight: MobileScreen ? null : StoryRowHeight - HUDPadding * 2 + px,
          height: MobileScreen ? (StoryRowHeight*1/2) - HUDPadding * 2 + px : null,
          overflow: "auto",
          scrollBehavior: "smooth",
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
          gridRowStart: MobileScreen ? ControlRow3 : ControlRow2,
          padding: HUDBlockPadding,
          margin: "auto",
          marginTop: "25px",
        },
        PlayerAttributesStacked: {
          gridColumnStart: PlayerAttributesStartColumn,
          gridColumnEnd: PlayerAttributesStopColumn,
          gridRowStart: ControlRow2,
          padding: HUDBlockPadding,
          color: "white",
        },
        TabSelector: {
          gridColumnStart: FirstColumn,
          gridColumnEnd: LastColumn,
          gridRowStart: ControlRow2,
          margin: "auto",
        },
        TabButton: {
          flexGrow: "1",
          flexBasis: "auto",
          textAlign: "center",
          margin: "auto",
        },
        ResponsiveStatsContainer: {
          gridColumnStart: FirstColumn,
          gridColumnEnd: LastColumn,
          gridRowStart: ControlRow3,
        },
        PlayerStats2Block1: {
          gridColumnStart: PlayerAttributesStartColumn,
          gridColumnEnd: PlayerAttributesBlockSeparation,
          gridRowStart: MobileScreen ? ControlRow3 : ControlRow2,
          padding: HUDBlockPadding,
          color: "white",
        },
        PlayerStats2Block2: {
          gridColumnStart: PlayerAttributesBlockSeparation,
          gridColumnEnd: PlayerAttributesStopColumn,
          gridRowStart: MobileScreen ? ControlRow3 : ControlRow2,
          padding: HUDBlockPadding,
          color: "white",
        },
        PlayerStats3: {
          gridColumnStart: PlayerStat2StartColumn,
          gridColumnEnd: PlayerStat2StopColumn,
          gridRowStart: MobileScreen ? ControlRow3 : ControlRow2,
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
          border: "1px solid #555",
          background: "linear-gradient(135deg, dimgray 35%, gray 70%, #aaa 100%)",
          boxShadow: "inset 0 0 10px gray",
        },
        HealthBar: {
          background: "linear-gradient(0deg, red 50%, lightgray 100%)",
          height: HUDStatBarHeight,
        },
        ManaBar: {
          background: "linear-gradient(0deg, blue 50%, lightgray 100%)",
          height: HUDStatBarHeight,
        },
        StaminaBar: {
          background: "linear-gradient(0deg, green 50%, lightgray 100%)",
          height: HUDStatBarHeight,
        },
        // Directional Arrows
        ArrowRow: {
          width: "72px",
        },
        ArrowBlock: {
          display: "inline-block",
          width: "32px",
          height: "21.5px",
          textAlign: "center",
          border: "1px solid #333",
          paddingTop: "3px",
          margin: "1px",
          background: ButtonNormalBackground,
          boxShadow: "inset 0 0 10px gray",
        },
        ArrowBlockHover: {
          display: "inline-block",
          width: "32px",
          height: "21.5px",
          textAlign: "center",
          border: "1px solid #333",
          paddingTop: "3px",
          margin: "1px",
          background: ButtonHoverBackground,
          boxShadow: "inset 0 0 10px gray",
        },
        ArrowBlockClick: {
          display: "inline-block",
          width: "32px",
          height: "21.5px",
          textAlign: "center",
          border: "1px solid #333",
          paddingTop: "3px",
          margin: "1px",
          background: ButtonClickBackground,
          boxShadow: "inset 0 0 10px gray",
        },
        // Actions
        ActionButton: {
          display: "inline-block",
          textAlign: "center",
          border: "1px solid black",
          padding: "3px 20px 3px 20px",
          margin: "1px",
          userSelect: "none",
          background: ButtonNormalBackground,
          boxShadow: "inset 0 0 10px gray",
        },
        ActionButtonSmallPadding: {
          display: "inline-block",
          textAlign: "center",
          border: "1px solid black",
          padding: "3px 10px 3px 10px",
          margin: "1px",
          userSelect: "none",
          background: ButtonNormalBackground,
          boxShadow: "inset 0 0 10px gray",
        },
        ActionButtonHover: {
          display: "inline-block",
          textAlign: "center",
          border: "1px solid black",
          padding: "3px 20px 3px 20px",
          margin: "1px",
          userSelect: "none",
          background: ButtonHoverBackground,
          boxShadow: "inset 0 0 10px gray",
        },
        ActionButtonHoverSmallPadding: {
          display: "inline-block",
          textAlign: "center",
          border: "1px solid black",
          padding: "3px 10px 3px 10px",
          margin: "1px",
          userSelect: "none",
          background: ButtonHoverBackground,
          boxShadow: "inset 0 0 10px gray",
        },
        ActionButtonClick: {
          display: "inline-block",
          textAlign: "center",
          border: "1px solid black",
          padding: "3px 20px 3px 20px",
          margin: "1px",
          userSelect: "none",
          background: ButtonClickBackground,
          boxShadow: "inset 0 0 10px gray",
        },
        ActionButtonClickSmallPadding: {
          display: "inline-block",
          textAlign: "center",
          border: "1px solid black",
          padding: "3px 10px 3px 10px",
          margin: "1px",
          userSelect: "none",
          background: ButtonClickBackground,
          boxShadow: "inset 0 0 10px gray",
        },
        // Inventory
        Inventory: {
          gridColumnStart: InventoryStartColumn,
          gridColumnEnd: InventoryStopColumn,
          gridRowStart: InventoryRow,
          padding: HUDBlockPadding2,
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
          padding: HUDBlockPadding2,
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
          padding: HUDBlockPadding,
        },
        // Game settings
        BottomControls: {
          gridColumnStart: FirstColumn,
          gridColumnEnd: LastColumn,
          gridRowStart: VolumeRow,
          padding: HUDBlockPadding,
        },
        GameState: {
          gridColumnStart: FirstColumn,
          gridColumnEnd: MobileScreen ? LastColumn : 7,
          gridRowStart: BottomControlsRow,
          padding: HUDBlockPadding,
          textAlign: MobileScreen ? "center" : null,
        },
        GameStateBoxContainer: {
          gridColumnStart: FirstColumn,
          gridColumnEnd: LastColumn,
          gridRowStart: GameStateRow,
          padding: HUDBlockPadding,
          borderTop: "1px solid black",
          color: "black",
          fontWeight: "bold",
        },
        GameStateBox: {
          width: "100%",
          height: "500px",
          cursor: "pointer",
          outline: "none",
          background: "transparent",
          color: "white",
          border: "none",
        },
        // Volume
        VolumeControl: {
          gridColumnStart: MobileScreen ? FirstColumn : 7,
          gridColumnEnd: LastColumn,
          gridRowStart: VolumeRow,
          padding: HUDBlockPadding,
          color: "white",
        },
        VolumeLabel: {
          display: "inline-block",
          margin: "1px",
          textAlign: "right",
          width: "60px",
        },
        VolumeSlider: {
          float: "right",
          width: "120px",
        },
        // Sliders
        Slider: {
          display:"block",
          height: "22px",
        },
        SliderTrack: {
          position: "relative",
          top: "8px",
          margin: "auto",
          width: "calc(100% - 4px)",
          height: "4px",
          border: "1px solid black",
          background: "linear-gradient(90deg, lightgray 0%, dimgray 100%)",
          borderRadius: "2px",
        },
        SliderInside: {
          position: "relative",
          top: "4px",
          margin: "auto",
          width: "calc(100% - 8px)",
          height: "2px",
          background: "linear-gradient(90deg, #999 0%, #555 100%)",
          borderRadius: "2px",
        },
        SliderCursor: {
          position: "relative",
          top: "-7.5px",
          height: "19px",
          width: "8px",
          border: "1px solid black",
          background: "linear-gradient(135deg, dimgray 0%, lightgray 100%)",
          borderRadius: "4px",
        },
        // Item Image
        ItemImageBlock: {
          height: "32px",
          width: "32px",
          border: "1px solid #666",
          margin: "1px",
          textAlign: "center",
          float: "left",
          background: "linear-gradient(135deg, #999 35%, #aaa 60%, lightgray 100%)",
          boxShadow: "inset 0 0 10px gray",
        },
        ItemImageBlockClick: {
          position: "fixed",
          height: "32px",
          width: "32px",
          background: "#333",
          opacity: "0.5",
        },
        ItemImageBlockNumber: {
          color: "black",
          background: "white",
          width: "15px",
          // webkitTextStroke: "0.25px black",
          fontSize: "10px",
          position: "relative",
          top: -15,
          right: -16,
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
          background: "lightgray",
          padding: "1px",
          margin: "1px"
        },
        ItemDescription: {
          zIndex: "900",
          position: "absolute",
          background: "#999",
          border: "1px solid #666",
          padding: "5px",
          maxWidth: "200px",
          textAlign: "left",
          opacity: "0.85",
          color: "white",
        },
        ItemDescriptionName: {
          fontWeight: "bold",
          textTransform: "capitalize",
        },
        ItemDescriptionContent: {
          paddingTop: "5px",
        },
        ItemActions: {
          zIndex: "800",
          position: "absolute",
          background: "#999",
          border: "1px solid #666",
          padding: "5px",
          minWidth: "90px",
          textAlign: "left",
          opacity: "0.85",
          color: "white",
        },
        ItemAction: {
          paddingTop: "2.5px",
          paddingBottom: "2.5px",
          paddingLeft: "2.5px",
          paddingRight: "2.5px",
        },
        ItemActionHover: {
          paddingTop: "2.5px",
          paddingBottom: "2.5px",
          paddingLeft: "2.5px",
          paddingRight: "2.5px",
          background: "#777",
        },
      }
      
      // Odd-shaped walls
      Styles.Wall.NorthWestEastAndNorthWest = Styles.Wall.WestToEast
      Styles.Wall.NorthSouthEastAndSouthEast = Styles.Wall.NorthToEast

      this.forceUpdate()

      this.setState({
        MobileScreen: MobileScreen,
        TabletScreen: TabletScreen,
      })

    }

  }

  /* Global Event Listeners */

  componentWillMount() {
    // keyboard shortcuts
    document.addEventListener("keydown", this.ListenToKeyboard, false)
    // responsiveness
    window.addEventListener("resize", this.CalculateStyles, false)
    this.CalculateStyles()
    this.ShowStats()
  }

  componentDidMount() {

    let State = {...this.state}
    let DebugEventMessages = []

    if (Debug) {
      DebugEventMessages.push(Gameplay.Messages.Debug.On)
    }
    if (SoundDebug) {
      DebugEventMessages.push(Gameplay.Messages.SoundDebug.On)
    }
    if (State.ShowFullMap) {
      DebugEventMessages.push(Gameplay.Messages.Cheats.ShowFullMap.On + (Debug ? " ShowFullMap is ON." : ""))
    }
    if (State.NoClip) {
      DebugEventMessages.push(Gameplay.Messages.Cheats.NoClip.On + (Debug ? " NoClip is ON." : ""))
    }
    if (State.GodMode) {
      DebugEventMessages.push(Gameplay.Messages.Cheats.GodMode.On + (Debug ? " GodMode is ON." : ""))
    }
    if (State.CastAlwaysSucceeds) {
      DebugEventMessages.push(Gameplay.Messages.Cheats.CastAlwaysSucceeds.On + (Debug ? " CastAlwaysSucceeds is ON." : ""))
    }
    this.SetText(DebugEventMessages)
  }

  /* Init Game State */

  constructor(props) {
    super(props)

    this.state = {...this.InitGameEnvironment(true), HideInventory: true, HideSpellBook : true, HideStats: false}
    
  }

  /* Init Game Environment */

  GenerateFormattedDate = (TimeInMilliseconds) => {
    return [
      [
        TimeInMilliseconds.getFullYear(),
        TimeInMilliseconds.getMonth()+1,
        TimeInMilliseconds.getDate(),
      ].join("-"),
      [
        this.PadNumber(TimeInMilliseconds.getHours()),
        this.PadNumber(TimeInMilliseconds.getMinutes()),
      ].join(":")
    ].join(" ")

  }

  GenerateFormattedTime = (TimeInMilliseconds) => {
    let Time = new Date(TimeInMilliseconds)
    return [
      this.PadNumber(Time.getMinutes(),3),
      this.PadNumber(Time.getSeconds(),3),
    ].join(":")
  }

  PadNumber = (NumberToPad) => {

    if (NumberToPad < 10) {
      return "0" + NumberToPad
    }
    else {
      return NumberToPad
    }

  }
  
  GenerateIds = (ArrayToId, IdType) => {

    let ArrayWithIds = [...ArrayToId]
    return ArrayWithIds.map((ArrayElement, index) => {
      if (!NextAvailableId[IdType]) {
        NextAvailableId[IdType] = 0
      }
      ArrayElement.Id = NextAvailableId[IdType]++
      
      if (Debug) console.log("NextAvailableId:",NextAvailableId)

      return ArrayElement
    })
  }

  InitGameEnvironment = (InitPlayer = false) => {

    // Campaign assets
    let InitState = {
      CreateCharacter: Campaign.CreateCharacter,
      Player: {...Campaign.Player},
      Backpack: {...Campaign.Backpack},
      AvailableStartSpell: [...Campaign.AvailableStartSpell],
      Gear: {...Campaign.Gear},
      LootContainers: this.GenerateIds([...Campaign.LootContainers], "LootContainers"),
      Monsters: this.GenerateIds([...Campaign.Monsters], "Monsters"),
      Text: {...Campaign.Text},
      WallMap: [...Campaign.WallMap],
      GameStarted: {
        Milliseconds: Date.now(),
        HumanFriendly: this.GenerateFormattedDate(new Date())
      },
      EnterCustomLogEntry: false,
    }

    // let the player go to the main screen if their character is stored in the state already
    if (!InitPlayer) {
      delete InitState.CreateCharacter      
    }

    // Debug/Cheats
    if (Utilities.ShowFullMap) {
      InitState.ShowFullMap = process.env.REACT_APP_RELEASE === "stable" ? false : true
    }
    if (Utilities.NoClip) {
      InitState.NoClip = process.env.REACT_APP_RELEASE === "stable" ? false : true
    }
    if (Utilities.GodMode) {
      InitState.GodMode = process.env.REACT_APP_RELEASE === "stable" ? false : true
    }
    if (Utilities.CastAlwaysSucceeds) {
      InitState.CastAlwaysSucceeds = process.env.REACT_APP_RELEASE === "stable" ? false : true
    }
    if (Utilities.EmptyBackpack) {
      InitState.Backpack.Items = []
    }
    
    // Items
    // create the list of random items to draw from when looting, grouped by level
    InitState.RandomItems = {}

    Object.keys(World.Items).map(itemObjectName => {
      let item = World.Items[itemObjectName]
      if (InitState.RandomItems["Level" + item.Level] === undefined) {
        InitState.RandomItems["Level" + item.Level] = []
      }
      InitState.RandomItems["Level" + item.Level].push(item)
      return null
    })

    // Character
    if (InitPlayer) {

      let Player = {...InitState.Player}
      InitState.Player = this.CreateCharacter(Player)

    }

    // Character's Backpack
    InitState.Backpack = 
    this.CheckInventoryWeightAtStartUp(InitState.Backpack)
    InitState.Backpack.Items = this.GenerateIds([...InitState.Backpack.Items], "Items")

    // Maps
    // create the dynamic "revealed area" map as displayed in the HUD
    InitState.WallMapRevealed = Campaign.WallMap.map(HorizontalLine => HorizontalLine.map(x => " "))

    // create internal discovery map, given player start position
    InitState.DiscoveryMap = JSON.parse(JSON.stringify(Campaign.WallMap.map((HorizontalLine, y) => HorizontalLine.map((MapObject, x) => {
        if ((x >= InitState.Player.x - 1 && x <= InitState.Player.x + 1) && (y >= InitState.Player.y - 1 && y <= InitState.Player.y + 1)) {
          return Empty
        }
        else {
          return Undiscovered
        }
      }))
    ))

    // create the internal map of loot containers
    let LootMap = JSON.parse(JSON.stringify(Campaign.WallMap.map(HorizontalLine => HorizontalLine.map(x => " "))))

    if (InitState.LootContainers) {
      InitState.LootContainers = InitState.LootContainers.map(Container => {
        if (Container.x && Container.y) {
          LootMap[Container.y][Container.x] = LootContainer
        }
        // give ids to the loot container items
        if (Container.items) {
          Container.items = this.GenerateIds([...Container.items],"Items")          
        }
        return Container
      })
    }

    InitState.LootMap = LootMap

    // create the internal map of monster locations
    let MonsterMap = JSON.parse(JSON.stringify(Campaign.WallMap.map(HorizontalLine => HorizontalLine.map(x => " "))))

    if (Campaign.Monsters) {

      Campaign.Monsters.map(Monster => {
        MonsterMap[Monster.y][Monster.x] = Monster.Id
        return null
      })

    }

    InitState.MonsterMap = MonsterMap

    // Story
    // text displayed at the beginning of the campaign
    InitState.currentText = Campaign.StartText ? Campaign.StartText.text : null
    InitState.currentTextImage = null

    // Event Log
    InitState.EventLog = ["00:00: " + Gameplay.Messages.NewGame]

    // Turn
    InitState.Turn = 0

    // Sound
    InitState.Sound = {
      Volume: Utilities.DefaultSoundVolume
    }

    return InitState

  }

  /* Character Creation */

  ShowCharacterScreen = () => {
    this.setState({CreateCharacter: true, GameInBackground: this.state}, function() {
      let Player = this.CreateCharacter()
      this.setState({Player: Player}, function() {
        this.CalculateStyles()
        this.forceUpdate()
      })
    })
  }

  GeneratePlayerStats = () => {
    let Player = {...this.state.Player}
    Player = this.CreateCharacter(Player)
    this.setState({Player: Player})
  }

  CreateCharacter = (Player) => {

    if (!Player) {
      Player = {...Campaign.Player}
    }

    if (Campaign.Player.Race) {
      Player.Race = {...Campaign.Player.Race}
    }
    else {
      if (!Player.Race) {
        Player.Race = {
          ...World.Races[Object.keys(World.Races)[2]],
          Id: Object.keys(World.Races)[2]
        }
      }
    }

    if (Campaign.Player.Class) {
      Player.Class = {...Campaign.Player.Class}
    }
    else {
      if (!Player.Class) {
        Player.Class = {
          ...World.Classes[Object.keys(World.Classes)[3]],
          Id: Object.keys(World.Classes)[3]
        }
      }
    }

    // Abilities
    // generate and sort random stats for the player
    let Rolls = []
    for (let i = 0; i < World.Classes[Player.Class.Id].AbilityPriorities.length; i++) {
      // add a bonus die to the 2 first abilities of non-spell casters
      if (!Player.Class.Spellcaster && i <= 1) {
        Rolls.push(this.GeneratePlayerAbilityScore(true))
      }
      else {
        Rolls.push(this.GeneratePlayerAbilityScore())
      }
    }
    Rolls = Rolls.sort(function(a, b) {return a < b})

    let AbilityScores = {}
    for (let i = 0; i < World.Classes[Player.Class.Id].AbilityPriorities.length; i++) {
      AbilityScores[World.Classes[Player.Class.Id].AbilityPriorities[i]] = Rolls[i]
    }

    // if stats were pre-determined for the campaign start, use them instead (weird numbers are handled gracefully)
    Player.Constitution = Math.max(0, Math.min(Campaign.Player.Constitution, Gameplay
    .MaxAbilityScore)) || AbilityScores.Constitution + (Player.Race.AbilityBoost.Constitution || 0)
    Player.Strength = Math.max(0, Math.min(Campaign.Player.Strength, Gameplay
      .MaxAbilityScore)) || AbilityScores.Strength + (Player.Race.AbilityBoost.Strength || 0)
    Player.Dexterity = Math.max(0, Math.min(Campaign.Player.Dexterity, Gameplay
      .MaxAbilityScore))|| AbilityScores.Dexterity + (Player.Race.AbilityBoost.Dexterity || 0)
    Player.ArmorClass = Math.max(0, Campaign.Player.ArmorClass) || 10 + this.AbilityModifier(Player.Dexterity)

    // Vitals
    // the interface will take whatever numbers come from the campaign assets and make sense of them (negative values or maximums greater than the current amount are handled gracefully)
    // Health
    Player.MaxHealth = Math.max(0, Campaign.Player.MaxHealth || 0) || this.CalculateMaxHealth(Player)
    Player.Health = Math.max(0, Campaign.Player.Health) || Player.MaxHealth
    if (Player.MaxHealth < Player.Health) Player.MaxHealth = Player.Health 
    // Stamina
    Player.MaxStamina = Math.max(0, Campaign.Player.MaxStamina || 0) || this.CalculateMaxStamina(Player)
    Player.Stamina = Math.max(0, Campaign.Player.Stamina) || Player.MaxStamina
    if (Player.MaxStamina < Player.Stamina) Player.MaxStamina = Player.Stamina 
    Player.MaxWeight = Campaign.Player.MaxWeight || this.CalculateMaxWeight(Player)

    // Intelligence and Mana
    if (Player.Class.Spellcaster) {
      Player.Intelligence = Math.max(0, Math.min(Campaign.Player.Intelligence, Gameplay
        .MaxAbilityScore)) || AbilityScores.Intelligence + (Player.Race.AbilityBoost.Intelligence || 0)
      Player.MaxMana = Math.max(0, Campaign.Player.MaxMana || 0) || this.CalculateMaxMana(Player)
      Player.Mana = Math.max(0, Campaign.Player.Mana) || Player.MaxMana  
      if (Player.MaxMana < Player.Mana) Player.MaxMana = Player.Mana 
    }
    else {
      Player.MaxMana = Player.Mana = 0
      Player.Intelligence = 5
    }

    // Spellbook
    if (!Player.Class.Spellcaster) {
      delete Player.SpellBook
    }
    else {
      if (!Player.SpellBook || !Player.SpellBook.Spells) {
        if (Campaign.AvailableStartSpell && Campaign.AvailableStartSpell.length > 0) {
          Player.SpellBook = {Spells: [Campaign.AvailableStartSpell[0]]}
        }
      }
    }

    // Check player's start coordinates
    if (!Campaign.Player.x && !Campaign.Player.x) {
      Player.x = 0
      Player.y = 0
      console.error("Please make sure to assign starting coordinates to the player.")
    }
    
    Player.Facing = Campaign.Player.Facing || "North"
    Player.Level = Campaign.Player.Level || 1
    Player.XP = Campaign.Player.XP || 0

    return Player

  }

  // takes the 3 best rolls out of 4d6
  GeneratePlayerAbilityScore = (AbilityDieBonus = false) => {
    let rolls = []
    let score = 0
    for (var i = 1; i <= 4 + AbilityDieBonus; i++) {
      let dieScore = this.RollDice(1,6)
      rolls.push(dieScore)
      score += dieScore
    }

    score -= Math.min.apply(null, rolls)

    return score
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
     return Math.ceil((Player.Strength) * 5)
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

  SetRace = (RaceObject) => {
    let Player = {...this.state.Player}
    Player.Race = {...RaceObject}
    Player = this.CreateCharacter(Player)
    this.setState({Player : Player}, function() {
      
    })
  }

  SetClass = (ClassObject) => {
    let Player = {...this.state.Player}
    Player.Class = {...ClassObject}
    Player = this.CreateCharacter(Player)
    this.setState({Player : Player})
  }

  SetFirstSpell = (SpellBook) => {
    let Player = {...this.state.Player}
    Player.SpellBook = SpellBook
    this.setState({Player : Player})
  }

  SavePlayerName = (input) => {
    let Player = {...this.state.Player}
    Player[input.name] = input.value
    this.setState({Player: Player})

  }

  StartPlaying = () => {

    this.setState({
      CreateCharacter: false,
    }, function() {

      // reset the environment
      let State = this.InitGameEnvironment()
      // grab the character that the player just created
      State.Player = {...this.state.Player}
      // keep the volume at its current level
      State.Sound = {...this.state.Sound}

      this.setState(State)

      this.CalculateStyles()
      
        this.forceUpdate()

    })
  }

  ResumeGame = () => {
    let GameInBackground = {...this.state.GameInBackground}
    this.setState(GameInBackground, function() {
      delete this.state.GameInBackground
      this.CalculateStyles()
      this.forceUpdate()
    })
  }

  /* Save/Load Game */

  ToggleGameStateBox = (Operation) => {

    let EditableGameStateBox = this.state.EditableGameStateBox
    let Visibility = !this.state.ShowGameStateBox
    let Editable = true

    // can not modify the game state
    if (Operation === "Save") {
      Editable = false
    }

    // user has already clicked the save game button 
    if (Operation === "Save" && !EditableGameStateBox) {
      Visibility = true
    }

    // user has already clicked the load game button 
    if (Operation === "Save" && EditableGameStateBox) {
      Visibility = true
      this.UpdateGameStateToLoad("")
    }

    // user has already clicked the save game button
    if (Operation === "Load" && !EditableGameStateBox) {
      Visibility = true
    }

    // load the state
    if (Operation === "Load" && EditableGameStateBox) {
      this.LoadGame(this.state.GameStateToLoad)
      return false
    }

    // close everything
    if (Operation === "Cancel") {
      Editable = false
      Visibility = false
      this.UpdateGameStateToLoad("")
    }

    this.setState({EditableGameStateBox: Editable, ShowGameStateBox: Visibility, LoadGameError: ""})

  }

  UpdateGameStateToLoad = (GameState) => {
    this.setState({GameStateToLoad: GameState, LoadGameError: ""})
  }

  LoadGame = () => {

    let GameStateToLoad = this.state.GameStateToLoad

    try {
          
      GameStateToLoad = JSON.parse(GameStateToLoad)
      console.log(GameStateToLoad)

      delete this.state

      this.setState(GameStateToLoad, function() {
        console.log(this.state)
      })
    
    }
    // catch JSON parse error
    catch (error) {

      if (Debug) console.error("Invalid JSON object.", GameStateToLoad)      
      this.setState({LoadGameError: Gameplay.Messages.LoadGameError.Invalid})

    }

  }

  ShowStats = () => {
    this.setState({
      HideStats: false,
      HideInventory: true,
      HideSpellBook: true,
    })
  }

  ShowInventory = () => {
    this.setState({
      HideStats: true,
      HideInventory: false,
      HideSpellBook: true,
    })
  }

  ShowSpellBook = () => {
    this.setState({
      HideStats: true,
      HideInventory: true,
      HideSpellBook: false,
    })
  }

  /* In-Game Keyboard Shortcuts */

  ListenToKeyboard = (keypress) => {

    let State = {...this.state}
    let Player = {...this.state.Player}
    let Keystrokes = this.state.Keystrokes ? [...this.state.Keystrokes] : []
    let Sound = {...this.state.Sound}

    // do not capture key strokes
    if (Player.Dead) return false
    if (keypress.target.tagName.toLowerCase() === "textarea" || keypress.target.tagName.toLowerCase() === "input") return false
    
    // do not absorb function keys
    if (keypress.key.match(/(F[1-9]|F1[0-2])/) === null) {
      keypress.preventDefault()      
    }

    if (Debug) console.log("keypress: ",keypress.key)    

    // track subsequent key strokes
    let BreakEvent = false
    if (Keystrokes) Keystrokes.push(keypress.key)
    else Keystrokes = [keypress.key]
    this.setState({Keystrokes: Keystrokes}, function() {

      // detect two digit numbers between 01 and 99
      if (this.state.Keystrokes.join("").match(/[0-9][1-9]/) !== null) {

        this.CastSpellFromKeyboard(this.state.Keystrokes.join(""))
        this.FlushKeystrokeHistory()
        BreakEvent = true

      }

      // detect "B" + two digit numbers between 01 and 99
      if (this.state.Keystrokes.join("").match(/b[0-9][1-9]/) !== null) {

        this.UseItemFromKeyboard(this.state.Keystrokes.join(""))
        this.FlushKeystrokeHistory()
        BreakEvent = true

      }

      // cheats
      if (this.LookForCheats(this.state.Keystrokes.join(""))) {
        BreakEvent = true
      }
      
    })

    if (BreakEvent) return true

    // in-game single-keypress shortcuts
    switch (keypress.key) {

      default:
        break
      
      case "Escape":
      case "Enter":
        this.FlushKeystrokeHistory()
        break

      case "ArrowDown":
        if (State.CreateCharacter) return false
        this.MovePlayer("South")
        this.onClickArrow(keypress.key)
        this.FlushKeystrokeHistory()
        break

      case "ArrowUp":
        if (State.CreateCharacter) return false
        this.MovePlayer("North")
        this.onClickArrow(keypress.key)
        this.FlushKeystrokeHistory()
        break

      case "ArrowLeft":
        if (State.CreateCharacter) return false
        this.MovePlayer("West")
        this.onClickArrow(keypress.key)
        this.FlushKeystrokeHistory()
        break

      case "ArrowRight":
        if (State.CreateCharacter) return false
        this.MovePlayer("East")
        this.onClickArrow(keypress.key)
        this.FlushKeystrokeHistory()
        break

      case "+":
        this.SetVolume(Math.min(1, Sound.Volume + .1), "sound_control")
        break

      case "-":
        this.SetVolume(Math.max(0, Sound.Volume - .1), "sound_control")
        break

      case "m":
        this.SetVolume(0)
        break

      case "t":
        if (State.CreateCharacter) return false
        this.TakeAllLoot()
        this.FlushKeystrokeHistory()
        break

    }

  }

  LookForCheats = (Input, Strict = false) => {

    let Cheat = false
    let State = {...this.state}
    let Prefix = "d!"

    // debug
    if ((Strict && Input === Prefix + "debug") || (!Strict && Input.indexOf("debug") > -1)) {

      Debug = !Debug
      console.log(Debug ? Gameplay.Messages.Debug.On : Gameplay.Messages.Debug.Off)
      this.SetText(Debug ? Gameplay.Messages.Debug.On : Gameplay.Messages.Debug.Off)
      this.FlushKeystrokeHistory()
      Cheat = true

    }
    if ((Strict && Input === Prefix + "sound") || (!Strict && Input.indexOf("sound") > -1)) {
      
      SoundDebug = !SoundDebug
      console.log(SoundDebug ? Gameplay.Messages.SoundDebug.On : Gameplay.Messages.SoundDebug.Off)
      this.SetText(Debug ? Gameplay.Messages.SoundDebug.On : Gameplay.Messages.SoundDebug.Off)
      this.FlushKeystrokeHistory()
      Cheat = true

    }

    // actual cheats
    if ((Strict && Input === Prefix + "showmap") || (!Strict && Input.indexOf("showmap") > -1)) {

      this.setState({ShowFullMap: State.ShowFullMap === undefined ? true : !State.ShowFullMap}, function() {
        this.SetText(this.state.ShowFullMap ? Gameplay.Messages.Cheats.ShowFullMap.On : Gameplay.Messages.Cheats.ShowFullMap.Off)
      })
      this.FlushKeystrokeHistory()
      Cheat = true

    }
    if ((Strict && Input === Prefix + "noclip") || (!Strict && Input.indexOf("noclip") > -1)) {

      this.setState({NoClip: State.NoClip === undefined ? true : !State.NoClip}, function() {
        this.SetText(this.state.NoClip ? Gameplay.Messages.Cheats.NoClip.On : Gameplay.Messages.Cheats.NoClip.Off)   
      })
      this.FlushKeystrokeHistory()
      Cheat = true

    }
    if ((Strict && Input === Prefix + "god") || (!Strict && Input.indexOf("god") > -1)) {

      this.setState({GodMode: State.GodMode === undefined ? true : !State.GodMode}, function() {
        this.SetText(this.state.GodMode ? Gameplay.Messages.Cheats.GodMode.On : Gameplay.Messages.Cheats.GodMode.Off)   
      })
      this.FlushKeystrokeHistory()
      Cheat = true

    }
    if ((Strict && Input === Prefix + "spell") || (!Strict && Input.indexOf("spell") > -1)) {

      if (State.CreateCharacter) return false        
      this.setState({CastAlwaysSucceeds: State.CastAlwaysSucceeds === undefined ? true : !State.CastAlwaysSucceeds}, function() {
        this.SetText(this.state.CastAlwaysSucceeds ? Gameplay.Messages.Cheats.CastAlwaysSucceeds.On : Gameplay.Messages.Cheats.CastAlwaysSucceeds.Off)   
      })
      this.FlushKeystrokeHistory()
      Cheat = true

    }

    return Cheat
  }

  FlushKeystrokeHistory = () => {
    this.setState({Keystrokes: []})
  }

  /* Sound */

  SetVolume = (Volume, SoundName = null) => {

    let Sound = {...this.state.Sound}

    // Create sound object
    if (!Object.getOwnPropertyNames(Sound).length) {
      Sound = {
        Volume: Volume,
      }
    }
    // Update sound object
    else {
      Sound.Volume = Volume      
    }

    let that = this
    this.setState({Sound: Sound}, function() {
      if (SoundName) {
        that.PlaySound(SoundName)        
      }
    })

  }

  PlaySound = (SoundName, Precedence) => {

    let Sound = {...this.state.Sound}

    if (!Object.getOwnPropertyNames(Sound).length || Sound.Volume === 0) return false

    const SoundFileExtensions = [".wav",/*".mp3",*/".ogg"]
    const SoundFileFolders = ["", SoundName + "/"]

    let SoundPlaying = false
    let CountTest = 0
    let CountErrors = 0
    let MaxErrorCount =
      SoundFileFolders.length * SoundFileExtensions.length +
      (SoundFileFolders.length-1) * SoundFileExtensions.length * Utilities.MaxSoundFilesPerFolder

    let SoundArray = []

    let AudioObject = new Audio()

    /* Function to handle single sound */
    let PlaySingleFile = function(AudObj) {

      AudioObject.play()
      .then(function() {

        if (SoundDebug) console.log("Played:",AudObj.src)

        AudObj.volume = Sound.Volume
        SoundPlaying = true

      })
      .catch(function() {

        CountErrors++

        // did not find a sound file that matches any extension
        if (CountErrors === MaxErrorCount) {
          console.error(["Sound '", SoundName, "' not found."].join(""))
        }

      })
    }

    /* Functions to handle random sound selection */
    // on error
    let SoundFileDoesNotExist = function() {

      CountErrors++
      CountTest++

      if (CountErrors === MaxErrorCount) {
        console.error(["Sound '", SoundName, "' not found."].join(""))
      }

    }
    // on loaded data
    var that = this
    let SoundFileExists = function(AudObj, i, x, p) {

      AudObj.onloadeddata = function() {

        if (SoundPlaying) {
          console.warn(
            [
              `Warning: Sound files for the '`,SoundName,`' event were both found in the 'sounds/' folder and in the 'sounds/`,SoundName + "/",`' subfolder.
              \nIf you want to play a randomly selected sound when this event occur, keep the 'sounds/`,SoundName + "/", `' subfolder and delete the '`,SoundName,`' file at the root of the 'sounds/' folder.
              \nIf you want to play the exact same sound every time, delete the 'sounds/`,SoundName + "/",`' subfolder and keep the '`,SoundName,`' file at the root of the 'sounds/' folder.`
            ].join(""))
          return null
        }

        CountTest++

        SoundArray.push("/sounds/" +
        SoundFileFolders[i] +
        SoundName + (p || "") + SoundFileExtensions[x])

        if (CountTest === MaxErrorCount) {
          
          let SelectedSound = SoundArray[that.RandomInteger(SoundArray.length)]

          AudObj = new Audio(SelectedSound)

          if (SoundDebug) console.log("Random sound options:", SoundArray)

          AudObj.play()
          .then(function() {

            if (SoundDebug) console.log("Played:",AudObj.src)

            AudObj.volume = Sound.Volume
            SoundPlaying = true

          })
          .catch(function() {

              console.error(["Could not play '", SelectedSound, "'."].join(""))
          })

        }
      }

    } 

    /* Find audio file */
    // Inspect folders
    for (let i = 0; i < SoundFileFolders.length; i++) {

      // Inspect file extensions
      for (let x = 0; x < SoundFileExtensions.length; x++) {

        // Inspect subfolders
        if (SoundFileFolders[i] !== "") {

          // Try numbered file names (e.g.: /drink_potion/drink_potion1.wav)
          for (let p = 0; p <= Utilities.MaxSoundFilesPerFolder; p++) {

            if (SoundDebug) console.log("Inspecting:", "/sounds/" + SoundFileFolders[i] + SoundName + (p || "") + SoundFileExtensions[x])

            AudioObject = new Audio(
              "/sounds/" +
              SoundFileFolders[i] +
              SoundName + (p || "") + SoundFileExtensions[x]
            )

            AudioObject.onerror = SoundFileDoesNotExist

            SoundFileExists(AudioObject, i, x, p) 

            if (SoundPlaying) {
              break
            }

          }
          
        }

        // Inspect root folder
        else {

          CountTest++

          if (SoundDebug) console.log("Inspecting:", "/sounds/" + SoundName + SoundFileExtensions[x])

          AudioObject = new Audio(
            "/sounds/" +
            SoundName + SoundFileExtensions[x]
          )

          PlaySingleFile(AudioObject)

        }

        if (SoundPlaying) {
          console.log("BREAK")
          break
        }

      }

      if (SoundPlaying) {
        break
      }

    }

    this.setState({Sound: Sound})

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

      let EventLog = [...this.state.EventLog]
      let GameStarted = this.state.GameStarted.Milliseconds

      if (!EventLog) {
        EventLog = []
      }

      if (Array.isArray(Message)) {
        let Messages = [...Message]
        EventLog = [...EventLog, ...Messages.map(Msg => {return [this.GenerateFormattedTime(Date.now() - GameStarted),Msg].join(": ")})]
      }
      else {
        EventLog.push([this.GenerateFormattedTime(Date.now() - GameStarted),Message].join(": "))      
      }

      this.setState({EventLog: EventLog}, function() {
        this.ScrollToBottom("EventLog")
        let {EnterCustomLogEntry} = this.state
        if (EnterCustomLogEntry) {
          this.setState({
            EnterCustomLogEntry: false,
            CustomLogEntry: ""
          })        
        }
      })

    }

  }

  ScrollToBottom = (ElementId) => {
    if (document.getElementById(ElementId)) {
      let HtmlElement = document.getElementById(ElementId)
      HtmlElement.scrollTop = HtmlElement.scrollHeight
    }
  }
  
  ScrollToTop = (ElementId) => {
    if (document.getElementById(ElementId)) {
      let HtmlElement = document.getElementById(ElementId)
      HtmlElement.scrollTop = 0
    }
  }

  Scroll = (ElementId, Direction) => {
    if (document.getElementById(ElementId)) {
      let HtmlElement = document.getElementById(ElementId)
      HtmlElement.scrollTop = HtmlElement.scrollTop + HtmlElement.clientHeight * Direction - (18+Direction) * Direction
    }
  }

  ClearLog = () => {

    this.setState({EventLog: [], EnterCustomLogEntry: false, CustomLogEntry: ""})
  }

  DisplayCustomLogEntryInput = (input) => {

    let {EnterCustomLogEntry, CustomLogEntry, CustomLogEntryInputRecentlyClosed} = this.state

    if (!EnterCustomLogEntry && !CustomLogEntryInputRecentlyClosed) {
      this.setState({EnterCustomLogEntry: true}, function() {this.ScrollToBottom("EventLog")})
    }
    if (CustomLogEntryInputRecentlyClosed) {
      this.setState({CustomLogEntryInputRecentlyClosed: false})
    }
    if (EnterCustomLogEntry && (CustomLogEntry === "" || !CustomLogEntry)) {
      if (input.target.name !== "CustomLogEntry") {
        this.setState({EnterCustomLogEntry: false})        
      }
    }
  }

  StoreCustomLogEntryInput = (LogEntry) => {
    this.setState({CustomLogEntry: LogEntry.value})
  }

  SaveCustomLogEntryInput = (input) => {
    let NewLogEntry = this.state.CustomLogEntry
    this.SetText(NewLogEntry)
    this.LookForCheats(NewLogEntry, true)
    if (this.state.EnterCustomLogEntry) {
      this.setState({EnterCustomLogEntry: false, CustomLogEntry: "", CustomLogEntryInputRecentlyClosed: true})      
    }
  }

  onClickArrow = (key) => {
    let arrowStyle = {}
    arrowStyle[key] = Styles.ArrowBlockClick
    this.setState({ arrowStyle: arrowStyle}, function() {
      this.ResetArrowStyle()      
    })
  }

  ResetArrowStyle = () => {
    if (this.state.arrowStyle !== null) {
      setTimeout(function () {
        this.setState({ arrowStyle: null })
      }.bind(this), 50)
    }
  }

  UpdateText = ({ x, y }) => {
    let currentText = this.state.currentText
    let currentTextImage = this.state.currentTextImage
    let Text = [...this.state.Text]

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
            this.ScrollToTop("Story")
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

    if (this.RandomInteger() >= 100 - (AbilityScore/Gameplay.MaxAbilityScore*100) - (Modifier || 0)) {
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

    let Player = {...this.state.Player}

    if (!Player.Class.Spellcaster || !Player.SpellBook) return false

    let FindSpell = Player.SpellBook.Spells.filter((Item, index) => {
      if (index === Number(SpellNumber-1)) {
        return true
      }
      return false
    })


    if (!FindSpell.length) return false

    this.CastSpell(FindSpell[0])

  }

  CastSpell = (Spell, Caster) => {
    
    let Player = {...this.state.Player}
    let Monsters = [...this.state.Monsters]
    let MonsterMap = [...this.state.MonsterMap]
    let Turn = this.state.Turn
    let CastAlwaysSucceeds = this.state.CastAlwaysSucceeds

    let CasterIsPlayer = false
    let UpdateEventLog = true

    if (!Caster) {
      Caster = Player
      CasterIsPlayer = true

      if (Player.Dead) return false

    }

    // enough mana
    if (!Spell.ManaCost || Caster.Mana >= Spell.ManaCost) {

      // not enough XP
      if (Spell.Level > Caster.Level) {

        if (CasterIsPlayer) {
          this.SetText(Gameplay.Messages.Spell.UnsufficientLevel)
        }

        return false
        
      }

      // ability score spell-level modifier
      let Modifier = 0
      if (Caster.Intelligence <= 5) {
        this.SetText(Gameplay.Messages.Spell.CanNotCast)
        return false
      }
      else if (Caster.Intelligence <= 10)  {
        Modifier = Utilities.MaxSpellLevel/Spell.Level/4
      }
      else {
        Modifier = Utilities.MaxSpellLevel/Spell.Level
      }

      // attempt to cast the spell
      if (this.AbilityCheck(Caster.Intelligence, Modifier) || CastAlwaysSucceeds) {

        if (Spell.Sound) {
          this.PlaySound(Spell.Sound)          
        }

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
              x: Caster.x + Utilities.DirectionsOffset[Caster.Facing].x,
              y: Caster.y + Utilities.DirectionsOffset[Caster.Facing].y
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

                this.SetText(Gameplay.Messages.Spell.NoTarget)
                UpdateEventLog = false

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
                this.SetText(Gameplay.Messages.Spell.NoTargetArea)
              }

            }

          }

        }

        // update player state and message
        if (CasterIsPlayer) {

          Turn++
          Caster.Stamina--
          Caster.Mana -= Spell.ManaCost || 0
          Caster.SpellActionUsed = true

          if (UpdateEventLog) {
            this.SetText(Gameplay.PartialMessages.SpellSuccess + Spell.Name + Gameplay.PartialMessages.Period)
          }


          this.setState({
            Player: Caster,
            Turn: Turn,
          }, function() {          
            this.MoveMonsters()
          })

        }

        return true

      }
      // cast failed
      else {

        this.PlaySound("spell_failed")

        if (CasterIsPlayer) {
          
          Caster.Mana -= Spell.ManaCost || 0
          this.setState({Player: Caster})

          this.SetText(Gameplay.Messages.Spell.Failed[this.RandomInteger(Gameplay.Messages.Spell.Failed.length)])

        }

      }

    }
    // caster does not have required mana amount
    else {
      if (CasterIsPlayer) {
        this.SetText(Gameplay.Messages.Spell.NotEnoughMana[this.RandomInteger(Gameplay.Messages.Spell.NotEnoughMana.length)])
      }
    }

    return false

  }

  MovePlayer = (Direction) => {

    let Player = {...this.state.Player}
    let WallMap = [...this.state.WallMap]
    let MonsterMap = [...this.state.MonsterMap]
    let NoClip = this.state.NoClip

    let FullStateUpdate = true

    if (Player.Dead) return false

    // get the target coordinates
    let targetCoordinates = this.MoveObject(
      {x: Player.x, y: Player.y}, Direction)

    // out of range
    if (targetCoordinates.y > WallMap.length - 1 || targetCoordinates.y < 0 || targetCoordinates.x > WallMap[targetCoordinates.y].length - 1 || targetCoordinates.x < 0) {

      this.SetText(Gameplay.Messages.Collision)
      this.PlaySound("cant_go_there")

      return
    }

    // check if there is a locked door in the way
    let Door = this.CheckLockedDoors(targetCoordinates)
    if (Door.Locked && !NoClip) {
      let LockedDoor = this.UnlockDoor(Door.Object)
      if (LockedDoor.Unlocked) {
        let UnlockMessage =
        Gameplay.PartialMessages.UnlockDoor  + 
          LockedDoor.Key +
          Gameplay.PartialMessages.Period
        this.setState({currentText: UnlockMessage, currentTextImage: null})
      }
      else {
        this.setState({
          currentText: Gameplay.Messages.LockedDoor, currentTextImage: null
        })
        return
      }
    }

    // player is attacking a monster
    if (MonsterMap[targetCoordinates.y][targetCoordinates.x] !== Empty) {
      FullStateUpdate = false
      this.AttackMonster(targetCoordinates)
      // player is not moving
      targetCoordinates.x = Player.x
      targetCoordinates.y = Player.y

    }
    else {

      // the player can not go there (there is a wall/door in the way)
      if (!this.DetectCollision(targetCoordinates)) {

        this.SetText(Gameplay.Messages.Collision)
        this.PlaySound("cant_go_there")
        
        return
      }

    }

    // the monsters get to move now
    this.MoveMonsters(targetCoordinates)

    // wake up any monster in the vicinity of the player
    this.WakeUpMonster(targetCoordinates)

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

    }

    // update player stats
    if (Player.Stamina > 1) {
      Player.Stamina--
    }
    
    // add 1 turn to the game state
    Turn++  

    // catch up with other state mutations
    let PlayerCoordinates = {x: Player.x, y: Player.y}
    if (Player !== this.state.Player) {
      let NewPlayerState = this.state.Player
      if (NewPlayerState.Health !== Player.Health) {
        Player.Health = NewPlayerState.Health
        Player.Dead = NewPlayerState.Dead
      }

      // keep the coordinates
      Player.x = PlayerCoordinates.x
      Player.y = PlayerCoordinates.y
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

    let LootContainers = [...this.state.LootContainers]

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

    if (!this.state.currentEvent) return false

    let currentEvent = [...this.state.currentEvent]

    if (currentEvent.length === 0) return false

    let Player = {...this.state.Player}
    let Backpack = {...this.state.Backpack}

    if (Player.Dead) return false

    let loot = []
    let LootCount = 0
    let FreeSlots = Backpack.maxItems - (Backpack.Items ? Backpack.Items.length : 0)

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

    if (FreeSlots >= LootCount && loot.length > 0) {

      if (this.CheckInventoryWeight(loot)) {

        currentEvent.map(event => {
          if (event.eventType === "loot") {
            if (event.items) {
              event.items = []
            }
          }
          return null
        })

        Backpack.Items = Backpack.Items ? Backpack.Items.concat(loot) : [...loot]
        Backpack.Weight = this.CheckInventoryWeight(loot, true)
        Player.Stationary = true  

        this.setState({Backpack: Backpack, Player: Player})

        this.SetText(Gameplay.Messages.Loot.Gathered)
        this.PlaySound("take_loot")
             
      }
      else {
        this.SetText(Gameplay.Messages.Loot.TooHeavy)
          
      }

    }
    else if (loot.length > 0) {

      this.SetText(Gameplay.Messages.Loot.TooMuch)

    }

  }

  TakeSingleLoot = (lootIndex, containerId) => {
    
    let LootContainers = [...this.state.LootContainers]
    let Backpack = {...this.state.Backpack}
    let Player = {...this.state.Player}

    if (Player.Dead) return false

    let FreeSlots = Backpack.maxItems - (Backpack.Items ? Backpack.Items.length : 0)

    let matchLootContainer = LootContainers.filter(lootContainer => {
      return lootContainer.Id === containerId
    })[0]

    if (FreeSlots > 0 ) {

      if (this.CheckInventoryWeight([matchLootContainer.items[lootIndex]])) {

          if (Backpack.Items) {
            Backpack.Items.push(matchLootContainer.items[lootIndex])
          }
          else {
            Backpack.Items = []
            Backpack.Items.push(matchLootContainer.items[lootIndex])
          }

          Backpack.Weight = this.CheckInventoryWeight(matchLootContainer.items[lootIndex], true)

          console.log(Backpack)

          this.setState({Backpack: Backpack}, function() {
            matchLootContainer.items.splice(lootIndex,1)
            Player.Stationary = true
            this.setState({currentEvent: this.state.currentEvent, Player: Player})
          })

      }
      else {
        this.SetText(Gameplay.Messages.Loot.ItemTooHeavy)
      }

    }
    else {
      this.SetText(Gameplay.Messages.Loot.BackpackFull)

    }

  }

  DropItem = () => {
    console.log("drop")
  }

  CheckInventoryWeight = (Loot, Save) => {

    // let {Backpack, Player} = this.state
    let Backpack = Object.assign({}, this.state.Backpack)
    let Player = Object.assign({}, this.state.Player)

    let BackpackWeight = 0

    if (Backpack.Items && Backpack.Items.length > 0) {
      BackpackWeight = Backpack.Items.map(Item => {
        return Item !== null ? Item.Weight || 0 : 0
      }).reduce((sum, val) => sum + val)
    }
    else {
      BackpackWeight = 0
    }

    if (Loot && Loot.length > 0) {

      let LootWeight = Loot.map(Item => {
        return Item !== null ? Item.Weight || 0 : 0
      }).reduce((sum, val) => sum + val)

      BackpackWeight += LootWeight
    }

    if (BackpackWeight <= Player.MaxWeight) {
      if (Save) {
        return BackpackWeight
      }
      return true
    }

    return false
    
  }

  CheckInventoryWeightAtStartUp = (Backpack) => {

    let BackpackWeight = 0

    if (Backpack.Items && Backpack.Items.length > 0) {
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
    
    let Monsters = [...this.state.Monsters]
    let PlaySound = false

    if (Monsters) {

      let MonsterList = Monsters.map(Monster => {

        if (Monster.x >= x-1 && Monster.x <= x+1 && Monster.y >= y-1 && Monster.y <= y+1 && !Monster.ChasePlayer) {

          PlaySound = true

          Monster.ChasePlayer = true
          Monster.Stationary = false
          this.SetText(Functions.IndefiniteArticle(Monster.Name, true) + " " + Monster.Name + Gameplay.PartialMessages.MonsterNoticed)
        }
        return Monster

      })

      this.setState({Monsters: MonsterList})

      if (PlaySound) {
        this.PlaySound("player_noticed")        
      }
    }
  }

  MoveMonsters = (PlayerNewCoordinates) => {
    
    let Monsters = [...this.state.Monsters]
    let Player = {...this.state.Player}

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

    let MonsterMap = [...this.state.MonsterMap]
    let Monsters = [...this.state.Monsters]
    let WallMap = [...this.state.WallMap]

    let originalMonsterCoordinates = {x: Monster.x, y: Monster.y}
    let HorizontalDistance = PlayerNewCoordinates.x - Monster.x
    let VerticalDistance = PlayerNewCoordinates.y - Monster.y

    let index = null
    Monsters.filter((Monst, i) => {
      if (Monst.Id === Monster.Id) {
        index = i
        return true
      }
      return false
    })

    // player is north of the monster
    if (
      VerticalDistance < 0
      && WallMap[Monster.y-1][Monster.x] === Empty
      && MonsterMap[Monster.y-1][Monster.x] === Empty
      && Monster.y-1 !== PlayerNewCoordinates.y
    ) {
      Monster.y -= 1
    }
    // player is south of the monster
    else if (
      VerticalDistance > 0
      && WallMap[Monster.y+1][Monster.x] === Empty
      && MonsterMap[Monster.y+1][Monster.x] === Empty
      && Monster.y+1 !== PlayerNewCoordinates.y
    ) {
      Monster.y += 1
    }
    // player is west of the monster
    else if (
      HorizontalDistance < 0
      && WallMap[Monster.y][Monster.x-1] === Empty
      && MonsterMap[Monster.y][Monster.x-1] === Empty
      && Monster.x-1 !== PlayerNewCoordinates.x
    ) {
      Monster.x -= 1
    }
    else if (
      // player is east of the monster
      HorizontalDistance > 0
      && WallMap[Monster.y][Monster.x+1] === Empty
      && MonsterMap[Monster.y][Monster.x+1] === Empty
      && Monster.x+1 !== PlayerNewCoordinates.x
    ) {
      Monster.x += 1
    }
    // player is north-west of the monster and north is not blocked
    else if (
      VerticalDistance < 0 && HorizontalDistance < 0
      && WallMap[Monster.y-1][Monster.x] === Empty
      && MonsterMap[Monster.y-1][Monster.x] === Empty
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
      && MonsterMap[Monster.y][Monster.x-1] === Empty
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
      && MonsterMap[Monster.y-1][Monster.x] === Empty
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
      && MonsterMap[Monster.y][Monster.x+1] === Empty
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
      && MonsterMap[Monster.y+1][Monster.x] === Empty
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
      && MonsterMap[Monster.y][Monster.x-1] === Empty
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
      && MonsterMap[Monster.y+1][Monster.x] === Empty
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
      && MonsterMap[Monster.y][Monster.x+1] === Empty
      && (Monster.x+1 !== PlayerNewCoordinates.x
        || (Monster.x+1 === PlayerNewCoordinates.x
        && Monster.y !== PlayerNewCoordinates.y))
    ) {
      Monster.x += 1
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

    Monsters[index] = Monster
    this.setState({MonsterMap: MonsterMap, Monsters: Monsters})

  }

  AttackPlayer = (Monster) => {

    let Player = {...this.state.Player}

    if (Player.Dead) return false

    if (this.RandomInteger(100) >= Player.Dexterity) {

      let Damage = this.RandomIntegerFromRange(Monster.Damage.Min,Monster.Damage.Max)

      this.PlaySound("attack_hit")

      this.SetText(Functions.IndefiniteArticle(Monster.Name, true) + " " + Monster.Name + Gameplay.PartialMessages.MonsterAttacking)

      this.PlayerTakeDamage(Damage)

    }
    else {

      this.PlaySound("attack_missed")

      this.SetText(Functions.IndefiniteArticle(Monster.Name, true) + " " + Monster.Name + Gameplay.PartialMessages.MonsterMissed)

    }

  }

  AttackMonster = (MonsterCoordinates) => {

    let Player = {...this.state.Player}
    let Gear = Object.assign({}, this.state.Gear)
    let Monsters = Object.assign([], this.state.Monsters)
    let index = 0

    if (this.RandomInteger(100) >= Player.Dexterity) {
      
      let Monster = Monsters.filter((Enemy, i) => {
        if (Enemy.x === MonsterCoordinates.x && Enemy.y === MonsterCoordinates.y) {
          index = i
          return true
        }
        else {
          return false
        }
      })

      if (Monster.length > 0) {

        Monster = Monster[0]

        let Damage = this.RandomIntegerFromRange(Gear.LeftHand.Damage.Min + this.AbilityModifier(Player.Strength), Gear.LeftHand.Damage.Max + this.AbilityModifier(Player.Strength))

        // console.log(Gear.LeftHand.Damage.Min + this.AbilityModifier(Player.Strength), Gear.LeftHand.Damage.Max + this.AbilityModifier(Player.Strength))

        this.PlaySound("attack_hit")

        this.SetText(Gameplay.PartialMessages.PlayerHit + Functions.IndefiniteArticle(Monster.Name) + " " + Monster.Name + Gameplay.PartialMessages.Period)

        this.MonsterTakeDamage(Monster, Damage, index)

      }

    }
    else {

      this.PlaySound("attack_missed")

      this.SetText(Gameplay.Messages.PlayerMissed)

    }

  }

  PlayerTakeDamage = (Damage) => {

    let Player = {...this.state.Player}
    let GodMode = this.state.GodMode

    if (!GodMode) {

      Player.Health = Math.max(0,Player.Health - Damage)

      console.log("Boom!", Player.Health)


      if (Player.Health <= 0) {

        Player.Dead = true
        this.SetText(Gameplay.Messages.PlayerDead)
        this.setState({Player: Player})

        return false
      }

      this.setState({Player: Player})

    }

    return true

  }

  MonsterTakeDamage = (Monster, Damage, index = null) => {

    // let {MonsterMap} = this.state
    let MonsterMap = Object.assign([], this.state.MonsterMap)
    let Monsters = [...this.state.Monsters]

    Monster.Health = Math.max(0,Monster.Health - Damage)

    if (Monster.Health <= 0) {
      Monster.Dead = true
      MonsterMap[Monster.y][Monster.x] = Empty
      this.SetText(Gameplay.PartialMessages.MonsterKilled + Functions.IndefiniteArticle(Monster.Name) + " " + Monster.Name + Gameplay.PartialMessages.Period)
      this.DistributeXP(Monster)

      if (index !== null) {
        Monsters.splice(index,1)
      }

      this.setState({Monsters: Monsters})

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

  UseItemFromKeyboard = (ItemNumber) => {

    let Backpack = {...this.state.Backpack}
    
    let FindItem = Backpack.Items.filter((Item, index) => {
      if (index === Number(ItemNumber.replace("b","")-1)) {
        return true
      }
      return false
    })

    if (FindItem.length === 0) return false  

    this.UseItem(FindItem[0])

  }

  UseItem = (Item, Action) => {

    console.log(Action, Item)

    if (this[Item.Action]) {
      this[Item.Action](Item)
    }

  }

  DrinkPotion = (Item) => {

    let Player = {...this.state.Player}
    let Backpack = {...this.state.Backpack}
  
    let Message = null

    // Healing potion
    if (Player[Item.Heal]) {
      let NewHealedProperty = Math.min(Player["Max" + Item.Heal], Player[Item.Heal] + Item.Strength + Functions.RandomIntegerFromRange(-2,3))

      if (NewHealedProperty - Player[Item.Heal] === 0) {
        Message = Gameplay.Messages.Potion.NoEffect
      }
      else if (NewHealedProperty - Player[Item.Heal] <= 5) {
        Message = Gameplay.Messages.Potion[Item.Heal + "1"]
      }
      else if (NewHealedProperty - Player[Item.Heal] <= 10) {
        Message = Gameplay.Messages.Potion[Item.Heal + "2"]
      }
      else {
        Message = Gameplay.Messages.Potion[Item.Heal + "3"]
      }


      Player[Item.Heal] = NewHealedProperty

    }
    else {
      Message = Gameplay.Messages.Potion.NoEffect
    }

    Backpack.Items = this.RemoveItemFromInventory(Item)


    this.PlaySound("drink_potion", 999)

    if (Message) {
      this.SetText(Message)        
    }

    this.setState({Player: Player, Backpack: Backpack}, function() {

      Backpack = {...this.state.Backpack}
      Backpack.Weight = this.CheckInventoryWeight(null, true)
      this.setState({Backpack: Backpack})
    
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
      Gameplay.Messages.Food.Yummy,
      Gameplay.Messages.Food.Delicious,
      Gameplay.Messages.Food.Diet,
      Gameplay.Messages.Food.NotAsGoodAsMyMom,
    ]

    if (Player.Stamina/Player.MaxStamina < 0.4) {
      Messages.push(Gameplay.Messages.Food.Rest)
    }
    
    if (Player.Stamina/Player.MaxStamina < 0.7) {
      Messages.push(Gameplay.Messages.Food.More)
    }
    else if (Player.Stamina/Player.MaxStamina > 0.9) {
      Messages.push(Gameplay.Messages.Food.NotNecessary)
    }

    this.SetText(Messages[this.RandomInteger(Messages.length)])

    this.setState({Player: Player, Backpack: Backpack}, function() {

      Backpack = {...this.state.Backpack}
      Backpack.Weight = this.CheckInventoryWeight(null, true)
      this.setState({Backpack: Backpack})

    })

  }

  RemoveItemFromInventory = (Item) => {

    let Backpack = {...this.state.Backpack}

    let UpdatedBackpackItems = []

    Backpack.Items.map((BackpackItem, index) => {
      if (BackpackItem.Id !== Item.Id || typeof BackpackItem.Id === undefined) {
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

      if (Player.Level < Gameplay.MaxPlayerLevel && Player.XP > Gameplay.LevelXP["Level" + Number(Player.Level+1)]) {
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
          <Contact {... this.state}/>
          {/* container */}
          <CreateCharacterContainer/>
          {/* row 3 */}
          <CreateCharacterHeader/>
          {/* row 4 */}
          <CreateCharacterName {... this} {... this.state} />
          <CreateCharacterAbilities {... this} {... this.state}/>
          <CreateCharacterBackground {... this} {... this.state} />
          <CreateCharacterDescription {... this} {... this.state} />
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
        <Contact {... this.state}/>
        <TopBackgroundImage/>
        <EventLog {... this} {... this.state} />
        <ClearLog {... this} {... this.state} />
        {/* row 3 */}
        <StoryBlock {... this}>
          <Story {... this.state} />
          <Event {... this} {... this.state} />
        </StoryBlock>
        <Map {... this} {... this.state}/>
        {/* row 4 */}
        <BottomBackgroundImage/>
        <Controls />
        <PlayerNameAndWeapons {... this.state} />
        <PlayerVitals {... this.state} />
        <Arrows {... this} {... this.state} />
        <ResponsiveTabSelector {...this} {...this.state}/>
        <RepsonsiveStatsContainer {...this} {...this.state}/>
        <Rest {... this} {... this.state}/>
        <PlayerLevelAndArmor {... this.state} />
        <ResponsivePlayerLevelAndArmor {... this.state} />
        <PlayerAbilities {... this.state} />
        <ResponsivePlayerAbilities {... this.state} />
        <Inventory {... this} {... this.state} />
        <SpellBook {... this} {... this.state} />
        <Accessories {... this} {... this.state} />
        <BottomControls/>
        <GameStateBackgroundImage/>
        <GameStateOptions {... this} {... this.state}/>
        <GameStateBox  {... this} {... this.state}/>
        <Volume {... this} {... this.state}/>
      </View>
    )
  }
}

class TopBackgroundImage extends Component {
  render() {
    return (
      <View style={Styles.TopGameBackgroundImage}/>
    )
  }
}

class BottomBackgroundImage extends Component {
  render() {
    return (
      <View style={Styles.BottomGameBackgroundImage}/>
    )
  }
}

class GameStateBackgroundImage extends Component {
  render() {
    return (
      <View style={Styles.GameStateBackgroundImage}/>
    )
  }
}

export default Game
