import React from 'react'
import personService from '../services/persondata'

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber, handleNameInput, handleNumberInput, setSuccessMessage, setErrorMessage}) => {
  
  const AddPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(x => x.name === newName)) {
      if(window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)){
        const id = persons.find(x => x.name === newName).id

        personService
          .update(id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson.data))
            setSuccessMessage(`Updated '${newName}'`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else { 
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setSuccessMessage(`Added '${newName}'`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  return(
    <form onSubmit={AddPerson}>
        <div>name: <input value={newName} onChange={handleNameInput}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberInput}/></div>
        <button type="submit">add</button> 
    </form>
  )
}

export default PersonForm