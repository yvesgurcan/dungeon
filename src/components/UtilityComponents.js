import React, { Component } from "react"
import {Image, View} from "./WebComponents.js"

export class Graphics extends Component {
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

export class ClearFloat extends Component {
    render() {
        return  <View style={{clear: "both"}} />
    }
}

export class Version extends Component {
    render() {
        return (
        <View>
            {this.props.children}
        </View>
        )
    }
}