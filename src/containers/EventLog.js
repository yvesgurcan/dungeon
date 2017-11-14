import React, {Component} from "react"
import {connect} from 'react-redux'
import {View, Text} from "./../components/Web.js"
import {ActionButtonContainer as Button} from "./../components/Button.js"
import {TextEditContainer as TextEdit} from "./../components/Input.js"
import {ClearFloat} from "./../components/Misc.js"
import {ItemImageBlockContainer as ItemImage} from "./../components/ItemImage.js"
import {ArrowContainer as Arrow} from "./../components/Arrow.js"
import {ToolTipContainer as ToolTip} from "./../components/ToolTip.js"
import Gameplay from "./../GameplayAssets.js"

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    ...ownProps,
  }
}

class ClearLog extends Component {
  render() {
    let {Styles, Responsiveness} = {...this.props}
    return (
      <View style={Styles.ClearLog}>
        <ToolTip DisabledOnClick ToolTip={Gameplay.Help.Buttons.ClearLog} style={Styles.Inline}>
          <Button SmallPadding={Responsiveness.MobileScreen} onClick={this.props.ClearLog}>
            {Responsiveness.MobileScreen ? <Text>X</Text> : <Text>Clear Log</Text>}
          </Button>
        </ToolTip>
      </View>
    )
  }
}
export const ClearLogContainer = connect(mapStateToProps)(ClearLog)

class EventLog extends Component {

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
    let {Styles} = {...this.props}
    let EventLog = Object.assign([], this.props.EventLog)
    return (
      <View style={Styles.EventLog} onClick={this.onClick}>
        <View id="EventLog" style={Styles.EventLogContainer}>
          <View>
            {!EventLog ? null : EventLog.map((LogEntry, Index) => {return <View key={Index}>{LogEntry}</View>})}
          </View>
          <View style={Styles.CustomLogEntryInputContainer}>
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
          </View>

        </View>
      </View>
    )
  }
}
export const EventLogContainer = connect(mapStateToProps)(EventLog)