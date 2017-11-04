import React, { Component } from "react"

// a
export class URL extends Component {
    render() {
        return (
            <a {... this.props} children={this.props.children}/>
        )
    }
}
  
// br
export class LineBreak extends Component {
    render() {
      return <br/>
    }
}

// span (React Native compatibility)
export class Text extends Component {
    render() {
        return <span {...this.props} />
    }
}

// div (React Native compatibility)
export class View extends Component {
    render() {
        return <div {...this.props} />
    }
}

// div
export class Block extends Component {
    render() {
      return <div {... this.props} />
    }
}

// img
export class Image extends Component {
    render() {
        return (
        <img
            alt={this.props.alt || this.props.title || ""}
            {...this.props} />
        )
    }
}