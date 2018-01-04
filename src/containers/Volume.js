import React, {Component} from "react"
import {connect} from 'react-redux'
import mapStateToProps from "./../mapStateToProps"
import {SliderContainer as Slider} from "./../components/Slider"
import {View} from "./../components/Web"
import Gameplay from "./../GameplayAssets"

class Volume extends Component {
    onClick = (NewValueRatio) => {
      this.props.dispatch({type: "UPDATE_VOLUME", Volume: NewValueRatio})
    }
  
    render() {
      let Styles = {...this.props.Styles}
      let style = {...Styles.Slider, ...Styles.VolumeSlider}    
      return (
        <View style={Styles.VolumeControl}>
          <View style={Styles.VolumeLabel}>
            Sound:
          </View>
          <Slider
            Metric="Volume"
            Description={Gameplay.Help.Sound}
            Percentage
            CurrentValue={this.props.Sound.Volume}
            onClick={this.onClick}
            style={style}/>
        </View>
      )
    }
  }
export const VolumeContainer = connect(mapStateToProps)(Volume)