import React from 'react'
import AuthorForm from './AuthorForm'
import { ALL_AUTHORS } from '../queries'
import { useQuery } from '@apollo/client'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }
  
  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors 

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    <AuthorForm nameOptions={authors.map(a => ({value: a.name, label: a.name}))}/>
    </div>
  )
}

export default Authors
