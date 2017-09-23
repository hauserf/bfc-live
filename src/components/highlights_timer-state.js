import React, { Component } from 'react';
import { TimerEvents } from '../data/timer-events';
import PropTypes from 'prop-types';

export default class TimerState extends Component {

    static propTypes = {
        timeLive: PropTypes.number.isRequired,
        currentButtonState: PropTypes.number.isRequired
    }

    static defaultProps = {
        timeLive: 0,
        currentButtonState: -1
    }

    render() {
        const { timeLive, currentButtonState } = this.props;
        const timerStateEvent = TimerEvents[currentButtonState + 1].timerEvent;
        return (
            <div className="highlight">
                <div className="timer-event">
                    {timerStateEvent}
                    {(currentButtonState === 1 || currentButtonState === 3) && " (" + (Math.ceil(timeLive / 60)) + "')"}
                </div>
            </div>
        )
    }
}
