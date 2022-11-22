import React, { useEffect, useState } from 'react';
import countriesReady from '../../DataBASE/countries';
import countries from 'all-countries-and-cities-json';
import Select from 'react-select';

export default function HandleCountry({
  styleSheet,
  setCity,
  setCountry,
  country,
}) {
  //ülke şehir seçme yapıldı yarın contition la birlikte single product page de test et

  const [cities, setCities] = useState(countries[country.value]);

  useEffect(() => {
    console.log('Seçilen Ülke: ', countries[country.value]);
    console.log('Current Cities: ', cities);
    setCities(
      countries[country.value].map((city) => {
        return {
          value: city,
          label: city,
        };
      })
    );
  }, [country]);

  return (
    <>
      <div className='labelBox'>
        <label htmlFor='exampleFormControlSelect1'>Select Country</label>
      </div>
      <Select
        onChange={({ value }) => setCountry({ value })}
        options={countriesReady}
        styles={styleSheet}
      />
      <div className='labelBox'>
        <label htmlFor='exampleFormControlSelect1'>Select City</label>
      </div>
      <Select
        styles={styleSheet}
        onChange={(e) => setCity(e)}
        options={cities}
      />
    </>
  );
}
