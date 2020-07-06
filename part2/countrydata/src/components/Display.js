import React from 'react'
import Weather from './Weather'

const Country = ({filterResult}) => {
  return (
    <div>
      <h1>{filterResult[0].name}</h1>
      <p>Capital {filterResult[0].capital}</p>
      <h2>Languages</h2>
      <ul>
        {filterResult[0].languages.map(mapped => (<li key={mapped.name}>{mapped.name}</li>))}
      </ul>
      <img src={filterResult[0].flag} alt="Country Flag" width="300" height="150"></img>
      <h2>Weather in {filterResult[0].capital}</h2>
      <Weather capital={filterResult[0].capital}/>
    </div>
  )
}

const Display = ({countries, setSingleCountry, searchFilter}) => {
  const filterResult = countries.filter(country => country.name.toLowerCase().includes(searchFilter.toLowerCase()))

  if (filterResult.length>10) {
    return <p>Too many matches, specify another filter</p>
  } else if (filterResult.length===1) {
    return (
      <Country filterResult={filterResult}/>
    )
  } else {
    return (
      <div>
        {filterResult.map((country, index) => <p key={index}>{country.name}
        {<button onClick={(e)=>setSingleCountry(country.name, e)}>show</button>}</p>)}
      </div>
    )
  }
}

export default Display