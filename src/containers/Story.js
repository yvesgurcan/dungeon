import React, {Component} from "react"
import {connect} from 'react-redux'
import {Text, View, LineBreak, Image} from "./../components/Web.js"

const mapStateToProps = (state, ownProps) => {
  return {
      ...state,
    ...ownProps,
  }
}

const storyPath = "./graphics/story/"
const imgExt = ".png"

class Story extends Component {
  render() {
    let {Styles, Story} = {...this.props}
    return (
      <View style={Styles.Story} hidden={Story.Text.length > 0 && Story.Text === ""}>
        <View style={Styles.Paragraph}>
          {!Story.Text ? null : typeof Story.Text.split !== "function" ? Story.Text : Story.Text.split("\n").map((paragraph, index) => {
            return <Text key={index}>{paragraph}<LineBreak/></Text>
          })}
        </View>
        <View hidden={!Story.Image}>
          <Image
            draggable={false}
            src={storyPath + Story.Image + imgExt}
            style={Styles.Paragraph}/>
        </View>
      </View>
    )
  }
}
export const StoryContainer = connect(mapStateToProps)(Story)