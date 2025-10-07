import { useState } from "react";
import countriesService from "./services/countries";
import { useEffect } from "react";

const Filter = ({ searchTerm, handleSearchTerm }) => <div>find countries: <input value={searchTerm} onChange={handleSearchTerm} /></div>

const Countries = ({ countries }) => {
  if (countries.length == 0) return <div>No matches found</div>;
  if (countries.length == 1) return <CountryDetails country={countries[0]} />
  if (countries.length > 10) return <div>Too many matches, specify another filter</div>;

  return (
    (countries.map(country =>
      <div key={country.id}>
        {country.name.common}
      </div>
    ))
  );
}

const Details = ({ country }) => {
  return (
    <div>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
    </div>
  );
}

const Languages = ({ country }) => {
  console.log("country: ", country);
  const languages = Object.values(country.languages);

  console.log("languages: ", languages);

  return (
    <div>
      <h2>Languages</h2>
      {languages.map(language =>
        <li key={language}>
          - {language}
        </li>
      )}
    </div>
  );
}

const Flag = ({ country }) => <div> <img src={country.flags.png} /></div>

const CountryDetails = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <Details country={country} />
      <Languages country={country} />
      <Flag country={country} />
    </>
  );
}

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    countriesService.getAll()
      .then(countries => {
        console.log(countries);
        setCountries(countries);
      })
      .catch(error => {
        console.log("Error obtaining countries", error);
      })
  }, [])

  const countriesToShow = searchTerm ? countries.filter(country => country.name.common.includes(searchTerm)) : countries;

  return (
    <div>
      <Filter searchTerm={searchTerm} handleSearchTerm={handleSearchTerm} />
      <Countries countries={countriesToShow} />
    </div>
  );
}

export default App