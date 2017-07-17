import React, { Component } from 'react';


class Player extends Component {

  subPlayerIn(index) {
    console.log("sub In")
    this.props.subPlayerIn(index);
  }

  subPlayerOut(index) {
    console.log("sub Out")
    this.props.subPlayerOut(index);
  }
  componentDidMount(){
    console.log(this.props.currentActive);
  }

  render(){
    // console.log(this.props.roster[this.props.index].playerActive, this.props.roster[this.props.index].playerActive)
    return (
      <div
        className="roster"
        onClick={this.subPlayerIn.bind(this, this.props.index)}
        //   /// condition ??? // on click event needs to change once player has been moved into the other array
        //   ?  this.subPlayerIn.bind(this, this.props.index)
        //   :  this.subPlayerOut.bind(this, this.props.index)
        // }
        >

        <div className="player">
          {this.props.name}
          {this.props.currentActive}
        </div>
        <div className="player-minutes">
          {
            // this.props.roster[this.props.index].playerActive === false
            // ? "SubIn"
            // : "SubOut"
          }
        </div>

        <div className="player-minutes">
          00:00
        </div>
      </div>
    );
  }
}

export default Player;
