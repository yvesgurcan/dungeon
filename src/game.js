import React, { Component } from 'react'
import Assets from './assets.js'
import Functions from './functions.js'
import Styles from './styles.js'

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

class Message extends Component {
  render() {
    return (
      <Block style={Styles.Message}>
        {this.props.state.currentMessage}
      </Block>
    )
  }
}

class Text extends Component {
  render() {
    return (
      <Block style={Styles.Text}>
        {this.props.currentText}
      </Block>
    )
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
  HoverStyle = () => {
    this.setState({style: Styles.ArrowBlockHover})
  }
  NormalStyle = () => {
    this.setState({style: Styles.ArrowBlock})
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

class Map extends Component {
  DrawMap = () => {
    let {WallMap} = this.props.state
    return WallMap.map((HorizontalLine, y) => {
      return (
        <Block key={y}>
          {HorizontalLine.map((MapObject, x) => {
            return (
              <Inline key={x} style={Styles.MapObject}>
                {this.PlayerPosition(MapObject, x, y)}
              </Inline>
            )
          })}
        </Block>
      )
    })
  }
  PlayerPosition = (MapObject, x,y) => {
    let {Player} = this.props.state
    if (x === Player.x && y === Player.y) {
      return "O"
    }
    else {
      return MapObject
    }
  }
  render() {
    return (
      <Block style={Styles.Map}>
        {this.DrawMap()}
      </Block>
    )
  }
}

class PageContainer extends Component {
  render() {
    return (
      <Block {... this.props}>
        {this.props.children}
      </Block>
    )
  }
}

class Game extends Component {

  constructor(props) {
    super(props)
  
    // grab the assets
    let initState = Assets
    // add some game-init data
    initState.currentMessage = ""
    initState.currentText = Assets.Text[0].text
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
    
    // check if the object is a locked door
    if (this.CheckLockedDoor(targetCoordinates)) {
      this.setState({currentMessage: Assets.Messages.LockedDoor})        
      return false
    }

    // the player can not go there
    if (!this.DetectCollision(targetCoordinates)) {
      // something is blocking the way
      this.setState({currentMessage: Assets.Messages.Collision})
      return false
    }

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
    if (targetCoordinates === " ")
      return true
    
    // target is a door
    if (targetCoordinates === "D")
      // check if the door is locked
      if (!this.CheckLockedDoor(targetCoordinates))
      return true 

    return false
  }

  CheckLockedDoor = ({x,y}) => {

    let State = this.state

    let matchLockedDoor = State.LockedDoor.filter((door) => {
      return door.x === x && door.y === y && !door.unlocked
    })

    return matchLockedDoor.length > 0
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
    return (
      <PageContainer style={Styles.Game}>
        <Message {... this}/>
        <Text {... this.state}/>
        <Arrows {... this}/>
        <Map {... this}/>
      </PageContainer>
    )
  }
}

export default Game
