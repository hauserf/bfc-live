import React from 'react';
import FormationSelector from './formation-selector';

const Formation = (props) => {

  const handleFormationSelected = props.handleFormationSelected.bind(this);

  return (
    <div className="flex-con flex-dir-col">
        <p>Format:</p>
        <div>
            <h4 className="text-warning flex-g-1 text-center settings-data"> {props.format} </h4>
        </div>
        <div className="flex-con flex-dir-row flex-g-2">
            <FormationSelector name='5' handleFormationSelected={handleFormationSelected} />
            <FormationSelector name='6' handleFormationSelected={handleFormationSelected} />
            <FormationSelector name='7' handleFormationSelected={handleFormationSelected} />
            <FormationSelector name='8' handleFormationSelected={handleFormationSelected} />
            <FormationSelector name='9' handleFormationSelected={handleFormationSelected} />
            <FormationSelector name='10' handleFormationSelected={handleFormationSelected} />
            <FormationSelector name='11' handleFormationSelected={handleFormationSelected} />
        </div>
    </div>
  );
}

export default Formation;
