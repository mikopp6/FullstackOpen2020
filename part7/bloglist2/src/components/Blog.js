import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, addLike, removeBlog, userName }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    margin: 5,
    display: blogVisible ? 'none' : ''
  }

  const showWhenVisible = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    margin: 5,
    display: blogVisible ? '' : 'none'
  }


  return (
    <div>
      <div style={hideWhenVisible} className='simpleBlog'>
        {blog.title} {blog.author}
        <Button variant='outline-primary' size='sm' onClick={() => setBlogVisible(true)}>view</Button>
      </div>
      <div style={showWhenVisible} className='extendedBlog'>
        {blog.title} {blog.author}
        <Button variant='outline-primary' size='sm' onClick={() => setBlogVisible(false)}>hide</Button><br/>
        {blog.url}<br/>
        likes {blog.likes} <Button variant='outline-primary' size='sm' id='like-button' onClick={addLike}>like</Button><br />
        {blog.user.name}<br />
        {userName === blog.user.name &&
          <Button variant='outline-primary' size='sm' onClick={() =>
          {if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
            removeBlog()
          }}
          }>remove</Button>
        }
      </div>
    </div>
  )
}

export default Blog
