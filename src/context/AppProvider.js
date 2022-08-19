import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AppContext from './AppContext';
import fetchPlanetsAPI from '../services/planetsData';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsList, setPlanetsList] = useState([]);
  const [searchPlanet, setSearchPlanet] = useState('');

  function savePlanetsList(newPlanets) {
    setPlanets(newPlanets);
    setPlanetsList(newPlanets);
  }

  useEffect(() => {
    async function fetchPlanets() {
      const newPlanets = await fetchPlanetsAPI();
      setPlanets(newPlanets);
      setPlanetsList(newPlanets);
    }
    fetchPlanets();
  }, []);

  function handleChange({ target }) {
    setSearchPlanet(target.value);
    const filteredList = planetsList.filter((planet) => planet
      .name.toLowerCase().includes(target.value.toLowerCase()));
    setPlanets(filteredList);
  }

  return (
    <AppContext.Provider
      value={ {
        planets,
        savePlanetsList,
        searchPlanet,
        handleChange,
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
