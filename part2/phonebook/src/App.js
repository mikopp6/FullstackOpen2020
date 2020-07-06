import React, { useState, useEffect } from 'react'
import Display from './components/Display'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persondata'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchFilter, setSearchFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])  
  console.log('render', persons.length, 'persons')

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInput = (event) => {
    setSearchFilter(event.target.value)
  }

  const removePerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(response => {
          console.log(`succesfully removed`)
          setPersons(persons.filter(person => person.id !== id))
          setSuccessMessage(`Deleted '${name}'`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Unable to delete '${name}'`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
        <Notification message={errorMessage} identifier={0}/>
        <Notification message={successMessage} identifier={1}/>
        <Filter value={searchFilter} handler={handleFilterInput}/>
      <h2>Add a new</h2>
        <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}
          handleNameInput={handleNameInput} handleNumberInput={handleNumberInput} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}/>
      <h2>Numbers</h2>
        <Display persons={persons} searchFilter={searchFilter} removePerson={removePerson}/>
    </div>
  )
}

export default App