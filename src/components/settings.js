import React, { Component } from 'react';
import { Format } from '../data/format';

export const FormationSelector = (props) => {
    const handleFormationSelected = props.handleFormationSelected.bind(null, props.name + 'v' + props.name)
    return (
        <div className="x-aside" onClick={handleFormationSelected}>{props.name}</div>
    )
}

export default class Settings extends Component {

    state = {
        format: '11v11'
    }

    setBFCTeam(e) {
        this.props.setBFCTeam(e);
    }

    setOPPTeam(e) {
        this.props.setOPPTeam(e);
    }

    setFormation(e) {
        this.props.setFormation();
    }

    handleFormationSelected = (formationName) => {
        this.setState({ format: formationName })
    }

    render() {

        //const format = Format[this.props.format];
        const lengthOfHalf = Math.ceil(this.props.lengthOfHalf / 60) + "'"

        return (
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
                                    onChange={this.setOPPTeam.bind(this)} />
                            </div>
                            <div className="flex-con flex-dir-col">
                                <p>Format:</p>
                                <div>
                                    <h4 className="text-warning flex-g-1 text-center settings-data"> {this.state.format} </h4>
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
