import React, { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR } from '../queries'

const AuthorForm = (nameOptions) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  const submit = (event) => {
    event.preventDefault()
    editAuthor({ variables: {name: name.value, born: parseInt(born, 10)} })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
      <div>
        name
        <Select value={name} options={nameOptions.nameOptions} onChange={setName} />
      </div>
      <div>
        born
        <input type='number' value={born} onChange={({ target }) => setBorn(target.value)} />
      </div>
      <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorForm