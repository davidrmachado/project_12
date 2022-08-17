import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AppContext from './AppContext';
import fetchPlanetsAPI from '../services/planetsData';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  function savePlanetsList(newPlanets) {
    setPlanets(newPlanets);
  }

  useEffect(() => {
    async function fetchPlanets() {
      const newPlanets = await fetchPlanetsAPI();
      setPlanets(newPlanets);
    }
    fetchPlanets();
  }, []);

  return (
    <AppContext.Provider
      value={ {
        planets,
        savePlanetsList,
      } }
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
