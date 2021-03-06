import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    
    history.push('/')
  }

  const handleReset = () => {
    content.onReset()
    author.onReset()
    info.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        content:
        <input {...content}/>
        <br/>
        author:
        <input {...author}/>
        <br/>
        url for more info:
        <input {...info}/>
        <br/>
        <button type='submit'>create</button>
        <input type='reset' onClick={handleReset}/>
      </form>
    </div>
  )

}

export default CreateNew