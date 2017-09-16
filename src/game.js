import React, { Component } from 'react'
import './game.css'
import Assets from './assets.js'
import Functions from './functions.js'

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
    return <Block onClick={this.MovePlayer}>↑</Block>
  }
}

class GoWest extends Component {
  MovePlayer = () => {
    let {MovePlayer} = this.props
    MovePlayer("West")
  }
  render() {
    return <Block onClick={this.MovePlayer}>←</Block>
  }
}

class GoEast extends Component {
  MovePlayer = () => {
    let {MovePlayer} = this.props
    MovePlayer("East")
  }
  render() {
    return <Block onClick={this.MovePlayer}>→</Block>
  }
}
class GoSouth extends Component {
  MovePlayer = () => {
    let {MovePlayer} = this.props
    MovePlayer("South")
  }
  render() {
    return <Block onClick={this.MovePlayer}>↓</Block>
  }
}

class Arrows extends Component {
  render() {
    return (
      <Block>
        <GoNorth {... this.props}/>
        <GoWest {... this.props}/>
        <GoEast {... this.props}/>
        <GoSouth {... this.props}/>
      </Block>
    )
  }
}

class Map extends Component {
  DrawMap = () => {
    let {WallMap} = this.props
    return WallMap.map((HorizontalLine, y) => {
      return (
        <Block key={y}>
          {HorizontalLine.map((MapObject, x) => {
            return (
              <Inline key={x} className="mapObject">
                {this.PlayerPosition(MapObject, x, y)}
              </Inline>
            )
          })}
        </Block>
      )
    })
  }
  PlayerPosition = (MapObject, x,y) => {
    let {Player} = this.props
    if (x == Player.x && y == Player.y) {
      return "O"
    }
    else {
      return MapObject
    }
  }
  render() {
    return (
      <Block>
        {this.DrawMap()}
      </Block>
    )
  }
}

class PageContainer extends Component {
  render() {
    return (
      <Block>
        {this.props.children}
      </Block>
    )
  }
}

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = Assets
  }
  MovePlayer = (Direction) => {
    console.log("GO", Direction)
    let State = this.state
    if (Direction === "North") {
      State.Player.y -= 1
    }
    if (Direction === "South") {
      State.Player.y += 1
    }
    if (Direction === "West") {
      State.Player.x -= 1
    }
    if (Direction === "East") {
      State.Player.x += 1
    }
    this.setState(State)
  }
  render() {
    return (
      <PageContainer>
        <Arrows {... this}/>
        <Map {... this.state}/>
      </PageContainer>
    )
  }
}

export default Game
