import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

export const FormationSelector = (props) => {
    const handleFormationSelected = props.handleFormationSelected.bind(null, props.name + 'v' + props.name)
    return (
        <div className="x-aside" onClick={handleFormationSelected}>{props.name}</div>
    )
}

export const LengthOfHalfSelector = (props) => {
  const handleLengthOfHalfSelected = props.handleLengthOfHalfSelected.bind(null, props.name)
  return (
    <div className="length-btn" onClick={handleLengthOfHalfSelected}>{props.name}</div>
  )
}

export default class Settings extends Component {

    // state = {
    //     format: '11v11'
    // }

    setBFCTeam(e) {
        this.props.setBFCTeam(e);
    }

    setOPPTeam(e) {
        this.props.setOPPTeam(e);
    }

    // setFormation(e) {
    //     this.props.setFormation();
    // }

    handleFormationSelected = (formationName) => {
      this.props.handleFormationSelected(formationName);
    }

    handleLengthOfHalfSelected = (lengthAdjuster) => {
      this.props.handleLengthOfHalfSelected(lengthAdjuster);
    }

    render() {

      console.log("Teams", this.props.data);

      // mapping teams from database via API
      let teams = this.props.data.map(team => {
        return <p> {team.name} </p>
      })


        //const format = Format[this.props.format];
        const lengthOfHalf = Math.ceil(this.props.lengthOfHalf / 60) + "'"

        return (
          <div>
            <div className="flex-vh flex-con flex-dir-col flex-items-align">
              <h2 className="setting-h">Settings</h2>
              <div className="flex-con flex-dir-col">
                  <p>BFC Team:</p>
                  <Dropdown placeholder='Select a team' fluid selection options={this.props.data} onChange={this.setBFCTeam.bind(this)}/>
                  {/* <input
                     value={this.props.teamBFC}
                     onChange={this.setBFCTeam.bind(this)} />  */}
              </div>
              <div className="flex-con flex-dir-col">
                  <p>Opponent:</p>
                  <input
                      value={this.props.teamOPP}
                      onChange={this.setOPPTeam.bind(this)} />
              </div>
              <div className="flex-con flex-dir-col">
                  <p>Format:</p>
                  <div>
                      <h4 className="text-warning flex-g-1 text-center settings-data"> {this.props.format} </h4>
                  </div>
                  <div className="flex-con flex-dir-row flex-g-2">
                      <FormationSelector name='5' handleFormationSelected={this.handleFormationSelected} />
                      <FormationSelector name='6' handleFormationSelected={this.handleFormationSelected} />
                      <FormationSelector name='7' handleFormationSelected={this.handleFormationSelected} />
                      <FormationSelector name='8' handleFormationSelected={this.handleFormationSelected} />
                      <FormationSelector name='9' handleFormationSelected={this.handleFormationSelected} />
                      <FormationSelector name='10' handleFormationSelected={this.handleFormationSelected} />
                      <FormationSelector name='11' handleFormationSelected={this.handleFormationSelected} />
                  </div>
              </div>
              <div className="flex-con flex-dir-col">
                  <p className="flex-g-1 pt-1">Length of Halfs:</p>
                  <div className="flex-g-1">
                      <h4 className="text-warning flex-g-1 text-center settings-data"> {lengthOfHalf} </h4>
                  </div>
                  <div className="flex-con flex-dir-row">
                      <LengthOfHalfSelector name="-10"
                      handleLengthOfHalfSelected={this.handleLengthOfHalfSelected}/>
                      <LengthOfHalfSelector name="-5"
                      handleLengthOfHalfSelected={this.handleLengthOfHalfSelected}/>
                      <LengthOfHalfSelector name="-1"
                      handleLengthOfHalfSelected={this.handleLengthOfHalfSelected}/>
                      <LengthOfHalfSelector name="+1"
                      handleLengthOfHalfSelected={this.handleLengthOfHalfSelected}/>
                      <LengthOfHalfSelector name="+5"
                      handleLengthOfHalfSelected={this.handleLengthOfHalfSelected}/>
                      <LengthOfHalfSelector name="+10"
                      handleLengthOfHalfSelected={this.handleLengthOfHalfSelected}/>
                  </div>
              </div>
            </div>
          </div>
        )
    }

}
