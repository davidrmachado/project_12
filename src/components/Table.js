import React, { useContext } from 'react';

import AppContext from '../context/AppContext';

function Table() {
  const { planets, handleChange, searchPlanet, setFilterOption,
    setComparisonOption, filterValue, setFilterValue,
    handleCLick } = useContext(AppContext);

  return (
    <div>
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => setFilterOption(target.value) }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => setComparisonOption(target.value) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <label htmlFor="value-filter">
        <input
          data-testid="value-filter"
          onChange={ ({ target }) => setFilterValue(target.value) }
          placeholder="valor numérico"
          type="number"
          value={ filterValue }
        />
      </label>
      <button
        data-testid="button-filter"
        onClick={ handleCLick }
        type="button"
      >
        Filter
      </button>
      <br />
      <label htmlFor="filter">
        <input
          data-testid="name-filter"
          onChange={ handleChange }
          placeholder="Search by name"
          value={ searchPlanet }
          type="text"
        />
      </label>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation</th>
            <th>Orbital</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planets
            .map((planet) => (
              <tr key={ planet.name }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
              </tr>
            ))
            .filter((key) => key !== 'residents')}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
