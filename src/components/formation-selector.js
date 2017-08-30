import React from 'react';

const FormationSelector = (props) => {

    const handleFormationSelected = props.handleFormationSelected.bind(null, props.name + 'v' + props.name);

    return (
        <div className="x-aside" onClick={handleFormationSelected}>{props.name}</div>
    )
}

export default FormationSelector;
