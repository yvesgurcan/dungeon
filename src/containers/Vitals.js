import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './../mapStateToProps';
import { ToolTipContainer as ToolTip } from './../components/ToolTip';
import { View } from './../components/Web';
import Gameplay from './../GameplayAssets';

class StatBar extends Component {
    render() {
        let { Styles } = { ...this.props };
        return (
            <View>
                <ToolTip
                    FlexibleWidth
                    ToolTip={
                        <View>
                            <View>
                                {this.props.Metric}:{' '}
                                {this.props.ratio ||
                                    this.props.current + '/' + this.props.max}
                            </View>
                            <View>{this.props.Description}</View>
                        </View>
                    }
                >
                    {this.props.ShowLabel ? this.props.Metric : null}
                    <View style={Styles.StatBar}>
                        <View style={this.props.style} />
                    </View>
                </ToolTip>
            </View>
        );
    }
}
const StatBarContainer = connect(mapStateToProps)(StatBar);

class HealthBar extends Component {
    render() {
        let { Player, Styles } = { ...this.props };
        let style = {
            ...Styles.HealthBar,
            width:
                Math.min(
                    100,
                    (Player.Health.Current / Player.Health.Max) * 100
                ) + '%'
        };
        return (
            <View>
                <StatBarContainer
                    Metric="Health"
                    ShowLabel
                    style={style}
                    max={Player.Health.Max}
                    current={Player.Health.Current}
                    Description={Gameplay.Help.Vitals.Health}
                />
            </View>
        );
    }
}
export const HealthBarContainer = connect(mapStateToProps)(HealthBar);

class ManaBar extends Component {
    render() {
        let { Player, Styles } = { ...this.props };
        let style = {
            ...Styles.ManaBar,
            width:
                Math.min(100, (Player.Mana.Current / Player.Mana.Max) * 100) +
                '%'
        };
        return (
            <View>
                <StatBarContainer
                    Metric="Mana"
                    ShowLabel
                    style={style}
                    max={Player.Mana.Max}
                    current={Player.Mana.Current}
                />
            </View>
        );
    }
}
export const ManaBarContainer = connect(mapStateToProps)(ManaBar);

class StaminaBar extends Component {
    render() {
        let { Player, Styles } = { ...this.props };
        let style = {
            ...Styles.StaminaBar,
            width:
                Math.min(
                    100,
                    Math.ceil(
                        (Player.Stamina.Current / Player.Stamina.Max) * 100
                    )
                ) + '%'
        };
        return (
            <View>
                <StatBarContainer
                    Metric="Stamina"
                    ShowLabel
                    style={style}
                    ratio={style.width}
                />
            </View>
        );
    }
}
export const StaminaBarContainer = connect(mapStateToProps)(StaminaBar);

class PlayerVitals extends Component {
    render() {
        let { Styles, Player } = { ...this.props };
        return (
            <View style={Styles.PlayerVitals}>
                <View style={Styles.PlayerStat}>
                    <HealthBarContainer />
                </View>
                <View
                    style={Styles.PlayerStat}
                    hidden={!Player.Class || !Player.Class.Spellcaster}
                >
                    <ManaBarContainer />
                </View>
                <View style={Styles.PlayerStat}>
                    <StaminaBarContainer />
                </View>
            </View>
        );
    }
}
export const PlayerVitalsContainer = connect(mapStateToProps)(PlayerVitals);
