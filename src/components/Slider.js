import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './../mapStateToProps';
import { View, Text } from './Web';
import { ToolTipContainer as ToolTip } from './ToolTip';

class Slider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Dragging: false,
            Id: Math.floor(Math.random() * 99999999999)
        };
    }

    onClick = input => {
        input.preventDefault();

        let State = { ...this.state };

        let { style } = this.props;
        let SliderWidth = style.width.replace('px', '');

        this.props.onClick(
            ((document.getElementById(this.state.Id).getBoundingClientRect().x -
                input.clientX) /
                SliderWidth) *
                -1
        );

        delete State.x;
        delete State.y;
        State.Dragging = false;

        this.setState(State);
    };

    onMouseDown = input => {
        input.preventDefault();

        if (!this.state.Dragging) {
            this.setState({
                Dragging: true,
                x: input.clientX,
                y: input.clientY
            });
        }

        var that = this;
        document.addEventListener('mouseup', that.onMouseUp);
    };

    onMouseUp = input => {
        input.preventDefault();

        let State = { ...this.state };

        let {
            style,
            Percentage,
            CurrentValue,
            MaxValue,
            MinValue
        } = this.props;
        let SliderWidth = style.width.replace('px', '');
        let Ratio = Percentage
            ? CurrentValue
            : (CurrentValue - MinValue) / (MaxValue - MinValue);

        this.props.onClick(
            ((State.x - SliderWidth * Ratio - input.clientX) / SliderWidth) * -1
        );

        delete State.x;
        delete State.y;
        State.Dragging = false;

        this.setState(State);

        document.removeEventListener('mouseup', this.onMouseUp);
    };

    render() {
        let {
            Styles,
            style,
            Percentage,
            CurrentValue,
            MaxValue,
            MinValue
        } = this.props;
        let SliderWidth = style.width.replace('px', '');
        let CursorWidth =
            Number(Styles.SliderCursor.width.replace('px', '')) +
            Number(Styles.SliderCursor.border.replace(/[^0-9]/g, '') * 2);
        let Ratio = Percentage
            ? null
            : (CurrentValue - MinValue) / (MaxValue - MinValue);
        return (
            <View style={style}>
                <ToolTip
                    FlexibleWidth
                    DisabledOnClick
                    ToolTip={
                        <View>
                            <View>
                                {this.props.Metric ? (
                                    <Text>{this.props.Metric}: </Text>
                                ) : null}
                                {this.props.Percentage
                                    ? CurrentValue * 100 + '%'
                                    : CurrentValue}
                            </View>
                            <View>{this.props.Description}</View>
                        </View>
                    }
                >
                    <View
                        id={this.state.Id}
                        onClick={this.onClick}
                        onMouseDown={this.onMouseDown}
                    >
                        <View style={Styles.SliderTrack} />
                        <View style={Styles.SliderInside} />
                        <View
                            style={{
                                ...Styles.SliderCursor,
                                left:
                                    (SliderWidth - CursorWidth * 2) *
                                        (Ratio || CurrentValue) +
                                    CursorWidth / 2 +
                                    'px'
                            }}
                        />
                    </View>
                </ToolTip>
            </View>
        );
    }
}
export const SliderContainer = connect(mapStateToProps)(Slider);
