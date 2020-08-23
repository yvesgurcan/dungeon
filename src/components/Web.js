import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './../mapStateToProps';

// a
export class URL extends Component {
    render() {
        return (
            <a
                href={this.props.href}
                onMouseLeave={this.props.onMouseLeave}
                onMouseMove={this.props.onMouseMove}
                style={this.props.style}
                target={this.props.target}
                title={this.props.title}
                children={this.props.children}
            />
        );
    }
}

// br
export class LineBreak extends Component {
    render() {
        return <br />;
    }
}

// span (React Native compatibility)
export class Text extends Component {
    render() {
        return <span {...this.props} />;
    }
}

// div (React Native compatibility)
export class View extends Component {
    render() {
        return <div {...this.props} />;
    }
}

// div
export class Block extends Component {
    render() {
        return <div {...this.props} />;
    }
}

// img
export class Image extends Component {
    render() {
        return (
            <img
                alt={this.props.alt || this.props.title || ''}
                {...this.props}
            />
        );
    }
}

// h3
class Heading extends Component {
    render() {
        let Styles = { ...this.props.Styles };
        return <h3 style={Styles.H3} children={this.props.children} />;
    }
}
export const HeadingContainer = connect(mapStateToProps)(Heading);

// h2
class PageSubtitle extends Component {
    render() {
        let Styles = { ...this.props.Styles };
        return <h2 style={Styles.H2} children={this.props.children} />;
    }
}
export const PageSubtitleContainer = connect(mapStateToProps)(PageSubtitle);

// h1
class PageTitle extends Component {
    render() {
        let Styles = { ...this.props.Styles };
        return <h1 style={Styles.H1} children={this.props.children} />;
    }
}
export const PageTitleContainer = connect(mapStateToProps)(PageTitle);
