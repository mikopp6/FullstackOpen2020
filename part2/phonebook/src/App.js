import React, { useState } from 'react'
import Display from './components/Display'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons ] = useState([{ name: 'Arto Hellas', number: '040-1234567' }])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchFilter, setSearchFilter ] = useState('')

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInput = (event) => {
    setSearchFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
        <Filter value={searchFilter} handler={handleFilterInput}/>
      <h2>Add a new</h2>
        <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleNameInput={handleNameInput} handleNumberInput={handleNumberInput}/>
      <h2>Numbers</h2>
        <Display persons={persons} searchFilter={searchFilter}/>
    </div>
  )
}

export default App