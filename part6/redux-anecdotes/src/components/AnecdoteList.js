import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {

  const vote = async (anecdote) => {
    props.addVote(anecdote)
    props.setNotification(`You voted for '${anecdote.content}'`, 5, props)
  }

  return (
    <div>
      {props.anecdotes
        .sort((a, b) => parseInt(b.votes) - parseInt(a.votes))
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  if( state.filter === 'ALL' ) {
    return {
      anecdotes: state.anecdotes,
      filter: state.filter
    }
  }
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)