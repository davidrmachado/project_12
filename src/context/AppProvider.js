import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AppContext from './AppContext';
import fetchPlanetsAPI from '../services/planetsData';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsList, setPlanetsList] = useState([]);
  const [searchPlanet, setSearchPlanet] = useState('');

  const [filterOption, setFilterOption] = useState('population');
  const [comparisonOption, setComparisonOption] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);

  const [filterByNumericValues, setFilterByNumericValues] = useState([{
    column: filterOption,
    comparison: comparisonOption,
    value: filterValue,
  }]);

  const [multFilterList, setMultFilterList] = useState([]);

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

  function handleCLick() {
    setFilterByNumericValues([{
      column: filterOption,
      comparison: comparisonOption,
      value: filterValue,
    }]);
    if (multFilterList.length === 0) {
      switch (comparisonOption) {
      case 'maior que':
        setPlanets(planetsList.filter(
          (planet) => Number(planet[filterOption]) > Number(filterValue),
        ));
        break;
      case 'menor que':
        setPlanets(planetsList.filter(
          (planet) => Number(planet[filterOption]) < Number(filterValue),
        ));
        break;
      case ('igual a'):
        setPlanets(planetsList.filter(
          (planet) => Number(planet[filterOption]) === Number(filterValue),
        ));
        break;
      default:
        console.log('default');
      }
      setMultFilterList(planets);
    } else {
      switch (comparisonOption) {
      case 'maior que':
        setPlanets(multFilterList.filter(
          (planet) => Number(planet[filterOption]) > Number(filterValue),
        ));
        break;
      case 'menor que':
        setPlanets(multFilterList.filter(
          (planet) => Number(planet[filterOption]) < Number(filterValue),
        ));
        break;
      case ('igual a'):
        setPlanets(multFilterList.filter(
          (planet) => Number(planet[filterOption]) === Number(filterValue),
        ));
        break;
      default:
        console.log('default');
      }
      setMultFilterList(planets);
    }
  }

  return (
    <AppContext.Provider
      value={ {
        planets,
        savePlanetsList,
        searchPlanet,
        handleChange,
        filterOption,
        setFilterOption,
        comparisonOption,
        setComparisonOption,
        filterValue,
        setFilterValue,
        filterByNumericValues,
        setFilterByNumericValues,
        handleCLick,
        multFilterList,
        setMultFilterList,
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
