import React from 'react'
import PropTypes from 'prop-types'

export const Player = (props) => {
    const handleToggle = props.handleToggle.bind(null, props.id)
    return (
        <div className="roster" onClick={handleToggle}>
            <div className="player">
                {props.firstName}
            </div>
            <div className="player-minutes">
                00:00
            </div>
        </div>
    )
}

Player.propTypes = {
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    handleToggle: PropTypes.func.isRequired
}

Player.defaultProps = {}
