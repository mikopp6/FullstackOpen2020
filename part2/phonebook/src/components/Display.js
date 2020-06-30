import React from 'react'

const Display = ({persons, searchFilter}) => (
    <ul>
        {persons.filter(person => person.name.toLowerCase().includes(searchFilter.toLowerCase())).map(filtered => (
            <li key={filtered.name}>{filtered.name} {filtered.number}</li>
        ))}
    </ul>
)

export default Display