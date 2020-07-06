import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Display from './components/Display'
import Filter from './components/Filter'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ searchFilter, setSearchFilter ] = useState('')

  const handleFilterInput = (event) => {
    setSearchFilter(event.target.value)
  }

  const setSingleCountry = (name) => {
    setSearchFilter(name)
  }
  
  useEffect(() => {
      axios
        .get('http://restcountries.eu/rest/v2/all')
        .then(response => {setCountries(response.data)})
  }, [])
  
  return (
    <div>
      <Filter value={searchFilter} handler={handleFilterInput}/>
      <Display countries={countries} setSingleCountry={setSingleCountry} searchFilter={searchFilter}/>
    </div>
  )
}

export default App
