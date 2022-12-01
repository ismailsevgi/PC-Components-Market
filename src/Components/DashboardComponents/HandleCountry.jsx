import React, { useEffect, useState } from 'react';
import countriesReady from '../../DataBASE/countries';
import countries from 'all-countries-and-cities-json';
import Select from 'react-select';

export default function HandleCountry({
  styleSheet,

  handleLocation,
  location,
}) {
  const [cities, setCities] = useState(countries['Afghanistan']);

  useEffect(() => {
    setCities(
      countries[location.country].map((city) => {
        return {
          label: city,
          value: city,
        };
      })
    );
  }, [location.country]);

  return (
    <>
      <div className='labelBox'>
        <label htmlFor='exampleFormControlSelect1'>Select Country</label>
      </div>
      <Select
        onChange={(selectedOption) => {
          handleLocation('country', selectedOption.value);
        }}
        options={countriesReady}
        styles={styleSheet}
      />
      <div className='labelBox'>
        <label htmlFor='exampleFormControlSelect1'>Select City</label>
      </div>
      <Select
        styles={styleSheet}
        onChange={(selectedOption) => {
          handleLocation('city', selectedOption.value);
        }}
        options={cities}
      />
    </>
  );
}
