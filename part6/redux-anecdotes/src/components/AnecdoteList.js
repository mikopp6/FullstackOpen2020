import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if( filter === 'ALL' ) {
      return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
  })

  const vote = (id, content) => {
    dispatch(addVote(id))

    dispatch(setNotification(`You voted for '${content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      {anecdotes
        .sort((a, b) => parseInt(b.votes) - parseInt(a.votes))
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
      )}
    </div>
  )
}

export default AnecdoteList