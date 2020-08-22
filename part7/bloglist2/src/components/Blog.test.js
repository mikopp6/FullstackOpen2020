import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from  '@testing-library/react'
import Blog from './Blog'

describe('Blog rendering', () => {
  let component
  const blog = {
    title: 'Testing rendering content',
    author: 'Test Man',
    url: 'http://www.rendertest.tk',
    likes: 7,
    user: {
      id: '5f168ddc11c3cd2ffc244119',
      name: 'Miko'
    }
  }

  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} addLike={mockHandler}/>
    )
  })

  test('renders title and author', () => {
    const divSimpleBlog = component.container.querySelector('.simpleBlog')
    expect(divSimpleBlog).toHaveTextContent('Testing rendering content')
    expect(divSimpleBlog).toHaveTextContent('Test Man')
    expect()
  })

  test('clicking view renders whole blog', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const divExtendedBlog = component.container.querySelector('.extendedBlog')

    expect(divExtendedBlog).toHaveTextContent('http://www.rendertest.tk')
    expect(divExtendedBlog).toHaveTextContent('likes 7')
  })

  test('event handler for addLike is called correct times', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})