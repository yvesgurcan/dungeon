import React, {Component} from "react"
import {connect} from 'react-redux'
import mapStateToProps from "./../mapStateToProps"
import {Image, View, Text, URL, PageSubtitleContainer as PageSubtitle, PageTitleContainer as PageTitle} from "./Web"
import Utilities from "./../Utilities"

const authorEmail = "gurcan.yves@gmail.com"
const contactTemplate = "mailto:" + authorEmail +"?subject=Dungeon!"
const repository = "https://github.com/yvesgurcan/dungeon"

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

class GitHub extends Component {
    render() {
        let Styles = {...this.props.Styles}
        return (
        <Graphics
            draggable={false}
            src="./graphics/misc/Octocat.png"
            style={Styles.GitHubLogo}
            title="GitHub repository"/>
        )
    }
}
export const GitHubContainer = connect(mapStateToProps)(GitHub)

class Link extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    NormalStyle = () => {
        let Styles = {...this.props.Styles}
        this.setState({ style: Styles.Link})
    }
    HoverStyle = () => {
        let Styles = {...this.props.Styles}
        this.setState({ style: Styles.LinkHover})
    }
    render() {
        let {Styles, dispatch, ...LinkProps} = {...this.props}
        return (
        <URL
            onMouseMove={this.HoverStyle}
            onMouseLeave={this.NormalStyle}
            style={this.state.style || Styles.Link}
            {...LinkProps}/>
        )
    }
}
export const LinkContainer = connect(mapStateToProps)(Link)

class Contact extends Component {
  render() {
    let Styles = {...this.props.Styles}
    return (
      <View style={Styles.Contact}>
        <Text>
          <Text>
          written by&nbsp;
          </Text>
          <Text>
            <LinkContainer
              href={contactTemplate}
              title={authorEmail}
              target="_blank">
              Yves Gurcan
            </LinkContainer>
            <LinkContainer
              href={repository}
              target="_blank">
              <GitHubContainer/>
            </LinkContainer>
          </Text>
        </Text>
      </View>
    )
  }
}
export const ContactContainer = connect(mapStateToProps)(Contact)

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
      let {Styles} = {...this.props}
    return (
      <View style={Styles.Header}>
        <PageTitle>Dungeon!</PageTitle>
        <PageSubtitle>an adventure game in React</PageSubtitle>
        <Version>
          {window.location.href.indexOf("localhost") > -1
          ?
            <Text>Dev Mode
              (
                <Text>
                  <LinkContainer href={Utilities.DevBuild[Utilities.UserOS]}>dev build url</LinkContainer>;
                </Text>
                {' '}
                <Text>
                  <LinkContainer href={Utilities.StableBuild[Utilities.UserOS]}>stable build url</LinkContainer>
                </Text>
              )
            </Text>       
          :
          process.env.REACT_APP_RELEASE === "dev"
          ?
            <Text>
              {process.env.REACT_APP_STAGE}
              <Text>
                (v{process.env.REACT_APP_VERSION} {process.env.REACT_APP_RELEASE}{process.env.REACT_APP_BUILD_TIME
                  ? <Text>; build: {process.env.REACT_APP_BUILD_TIME}</Text>
                  : null}
                )
              </Text>  
            </Text>
          :
            <Text>
              {process.env.REACT_APP_STAGE}
              (v{process.env.REACT_APP_VERSION} {process.env.REACT_APP_RELEASE})
            </Text>
          }
        </Version>
      </View>
    )
  }
}
export const HeaderContainer = connect(mapStateToProps)(Header)