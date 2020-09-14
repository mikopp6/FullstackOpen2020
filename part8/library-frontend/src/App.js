import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const Notification = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logOut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        
        {token && 
        <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={logOut}>log out</button>
        </>
        }
        {!token &&
          <button onClick={() => setPage('login')}>login</button>
        }
        
      </div>
      <Authors show={page === 'authors'} token={token} notify={notify} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} notify={notify} />
      <LoginForm show={page === 'login'} setToken={setToken} notify={notify} />
    </div>
  )
}

export default App