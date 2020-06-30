import React from 'react'

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber, handleNameInput, handleNumberInput}) => {

  const AddPerson = (event) => {
    event.preventDefault()
    if (persons.find(x => x.name === newName)) {
      window.alert(`${newName} is already in the phonebook!`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('') 
      setNewNumber('')
    }
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