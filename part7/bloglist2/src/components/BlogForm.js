import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <div className="divBlogForm">
      <h2>Create new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control id='title' value={newTitle} onChange={({ target }) => setNewTitle(target.value)}/>
          <Form.Label>author:</Form.Label>
          <Form.Control id='author' value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)}/>
          <Form.Label>url:</Form.Label>
          <Form.Control id='url' value={newUrl} onChange={({ target }) => setNewUrl(target.value)}/>
        </Form.Group>
        <Button variant='outline-primary' size='sm' type="submit">create</Button>
      </Form>
    </div>
  )
}

export default BlogForm