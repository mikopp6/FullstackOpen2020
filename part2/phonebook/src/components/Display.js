import React from 'react'

const Display = ({persons, searchFilter, removePerson}) => {
  const filteredList = persons.filter(person => person.name.toLowerCase().includes(searchFilter.toLowerCase()))

  return (
    <div>
      {filteredList.map((filtered) => <p key={filtered.name}> {filtered.name} {filtered.number}
      {<button onClick={(e) => removePerson(filtered.name, filtered.id, e)}>delete</button>}</p>)}
    </div>
  )
}

export default Display