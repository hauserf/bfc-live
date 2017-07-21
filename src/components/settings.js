import React, { Component } from 'react';
import { Format } from '../data/format';



export default class Settings extends Component {

  setBFCTeam(e){
    this.props.setBFCTeam(e);
  }

  setOPPTeam(e){
    this.props.setOPPTeam(e);
  }

  setFormation(e){
    this.props.setFormation();
  }

  render(){

    const format = Format[this.props.format];
    const lengthOfHalf = Math.ceil(this.props.lengthOfHalf / 60) + "'"

    return(
      <div className="container">
        <div className="row">
          <div className="col-md-4 "></div>
          <div className="col-sm-4 bfc-live">
            <div className="flex-vh flex-con flex-dir-col flex-items-align">
              <h2 className="setting-h">Settings</h2>
              <div className="flex-con flex-dir-col">
                <p>BFC Team:</p>
                <input
                  value={this.props.teamBFC}
                  onChange={this.setBFCTeam.bind(this)} />
              </div>
              <div className="flex-con flex-dir-col">
                <p>Opponent:</p>
                <input
                  value={this.props.teamOPP}
                  onChange={this.setOPPTeam.bind(this)}/>
              </div>
              <div className="flex-con flex-dir-col">
                <p>Format:</p>
                <div>
                  <h4 className="text-warning flex-g-1 text-center settings-data"> {format} </h4>
                </div>
                <div className="flex-con flex-dir-row flex-g-2">
                  <div id="5" className="x-aside" onClick={() => this.setFormation.bind(this)}>5</div>
                  <div className="x-aside">6</div>
                  <div className="x-aside">7</div>
                  <div className="x-aside">8</div>
                  <div className="x-aside">9</div>
                  <div className="x-aside">10</div>
                  <div className="x-aside">11</div>
                </div>
              </div>
              <div className="flex-con flex-dir-col">
                <p className="flex-g-1 pt-1">Length of Halfs:</p>
                <div className="flex-g-1">
                  <h4 className="text-warning flex-g-1 text-center settings-data"> {lengthOfHalf} </h4>
                </div>
                <div className="flex-con flex-dir-row">
                  <div className="length-btn">-5</div>
                  <div className="length-btn">-1</div>
                  <div className="length-btn">+1</div>
                  <div className="length-btn">+5</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }

}
