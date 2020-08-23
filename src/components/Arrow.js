import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './../mapStateToProps';
import { Text } from './Web';

class Arrow extends Component {
    constructor(props) {
        super(props);
        let { Styles } = { ...this.props };
        this.state = { style: Styles.ArrowBlock };
    }
    NormalStyle = () => {
        let { Styles } = { ...this.props };
        this.setState({ style: Styles.ArrowBlock });
    };
    HoverStyle = () => {
        let { Styles } = { ...this.props };
        this.setState({ style: Styles.ArrowBlockHover });
    };
    onClick = () => {
        let { Styles } = { ...this.props };
        this.props.onClick(this.props.arrow);
        this.setState({ style: Styles.ArrowBlockClick });
        setTimeout(
            function () {
                if (this.state.style === Styles.ArrowBlockClick) {
                    this.setState({ style: Styles.ArrowBlockHover });
                }
            }.bind(this),
            50
        );
    };
    render() {
        return (
            <Text
                onClick={this.onClick}
                onMouseMove={this.HoverStyle}
                onMouseLeave={this.NormalStyle}
                style={
                    this.props.arrowStyle &&
                    this.props.arrowStyle[this.props.arrow]
                        ? this.props.arrowStyle[this.props.arrow]
                        : null || this.state.style
                }
            >
                {this.props.children}
            </Text>
        );
    }
}
export const ArrowContainer = connect(mapStateToProps)(Arrow);
