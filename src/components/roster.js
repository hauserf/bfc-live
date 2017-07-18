import React, { Component } from 'react'

import { Player } from './player'
import { PlayerStats } from '../data/player-stats'
import { findById, togglePlayer, updatePlayer } from '../lib/rosterHelpers'

class Roster extends Component {

    state = {
        roster: []
    }

    handleToggle = (id) => {
        const player = findById(id, this.state.roster)
        console.log(player)
        const toggled = togglePlayer(player)
        const updatedRoster = updatePlayer(this.state.roster, toggled)
        this.setState({ roster: updatedRoster })
    }

    componentWillMount() {
        this.setState({ roster: PlayerStats })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 "></div>
                    <div className="col-sm-4 bfc-live">
                        <div>
                            <h1>On the field</h1>
                            {this.state.roster
                                .filter((player, id) => player.playerActive)
                                .map((player, id) =>
                                    <Player
                                        key={player.id}
                                        handleToggle={this.handleToggle}
                                        {...player}
                                    />
                                )}
                            <h1>Subs</h1>
                            {this.state.roster
                                .filter((player, id) => !player.playerActive)
                                .map((player, id) =>
                                    <Player
                                        key={player.id}
                                        handleToggle={this.handleToggle}
                                        {...player}
                                    />
                                )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Roster;
