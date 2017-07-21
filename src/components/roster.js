import React, { Component } from 'react'

import { Player } from './player'

class Roster extends Component {

  handleToggle = (id) => {
      this.props.handlePlayerToggle(id);
  }

  render() {
    return (
      <div className="container">
          <div className="row">
              <div className="col-md-4 "></div>
              <div className="col-sm-4 bfc-live">
                  <div>
                    <div className="flex-con flex-items-align mr-2">
                      <h2 className="setting-h mx-2">Playing</h2>
                      {this.props.clockState === true
                      ? <button className="back-to-live flex-align-self-center">Return to BFC Live >>> </button>
                      : null }
                    </div>
                      {this.props.roster
                          .filter((player, id) => player.playerActive)
                          .map((player, id) =>
                              <Player
                                  key={player.id}
                                  handleToggle={this.handleToggle}
                                  {...player}
                              />
                          )}
                      <h2 className="setting-h">Subs</h2>
                      {this.props.roster
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
