import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../store/mapStateToProps';

class TextEdit extends Component {
    constructor(props) {
        super(props);
        let Styles = { ...this.props.Styles };
        this.state = { style: this.props.style || Styles.TextEdit };
    }
    onKeyPress = keypress => {
        if (keypress.key === 'Enter') {
            keypress.target.blur();
        }
    };
    onFocus = () => {
        let Styles = { ...this.props.Styles };
        this.setState({ style: this.props.styleFocus || Styles.TextEditFocus });
    };
    onBlur = input => {
        let Styles = { ...this.props.Styles };
        this.setState({ style: this.props.style || Styles.TextEdit });
        if (this.props.onBlur) {
            this.props.onBlur(input.target);
        }
    };
    onChange(input) {
        this.props.onChange(input.target);
    }
    render() {
        return (
            <input
                hidden={this.props.hidden}
                name={this.props.name}
                placeholder={this.props.placeholder}
                value={this.props.value || ''}
                style={this.state.style}
                maxLength={this.props.maxLength}
                onKeyPress={this.onKeyPress}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={input => this.onChange(input)}
            />
        );
    }
}
export const TextEditContainer = connect(mapStateToProps)(TextEdit);

class TextArea extends Component {
    onClick = input => {
        this.props.onClick(input.target);
    };
    onChange = input => {
        this.props.onChange(input.target);
    };
    render() {
        return (
            <textarea
                readOnly={this.props.readOnly}
                style={this.props.style}
                onChange={this.onChange}
                onClick={this.onClick}
                value={this.props.value}
            />
        );
    }
}
export const TextAreaContainer = connect(mapStateToProps)(TextArea);
