import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('BlogForm calls received event handler with right details', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Form testing is not that simple' }
  })

  fireEvent.change(author, {
    target: { value: 'Test Man' }
  })

  fireEvent.change(url, {
    target: { value: 'http://www.testurl.com' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Form testing is not that simple')
  expect(createBlog.mock.calls[0][0].author).toBe('Test Man')
  expect(createBlog.mock.calls[0][0].url).toBe('http://www.testurl.com')

})