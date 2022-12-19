import countries from './countries.js';
import fs from 'fs';

const jsonValue = JSON.stringify(countries);

fs.writeFile('src/DataBASE/countries.json', jsonValue, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Written!');
  }
});

console.log('He');
