import React, { useState } from 'react'

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
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setBlogVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setBlogVisible(false)}>hide</button><br/>
        {blog.url}<br/>
        likes {blog.likes} <button onClick={addLike}>like</button><br />
        {blog.user.name}<br />
        {userName === blog.user.name &&
          <button onClick={() =>
          {if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
            removeBlog()
          }}
          }>remove</button>
        }
      </div>
    </div>
  )
}

export default Blog
