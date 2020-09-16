import React, { useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const [currentGenre, setCurrentGenre] = useState('all genres')
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  
  let books = result.data.allBooks
  const genres = [...new Set(books.map(book => book.genres).flat())]

  if (currentGenre !== 'all genres') {
    books = books.filter(book => book.genres.includes(currentGenre))
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{currentGenre}</b></p>
      <button onClick={() => setCurrentGenre('all genres')}>all genres</button>
      {genres.map(genre => <button key={genre} onClick={() => setCurrentGenre(genre)}>{genre}</button>)}
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books