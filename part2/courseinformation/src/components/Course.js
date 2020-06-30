import React from 'react'

const Course = ({ name, parts }) => {
    return (
      <div>
        <Header name={name} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
    )
}

const Header = ({ name }) => {
    return (
      <h2>{name}</h2>
    )
}
  
const Total = ({ parts }) => {
  const totalAmount = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p>Total number of exercises <b>{totalAmount}</b></p>
  ) 
}

const Part = ({name, exercises}) => {
  return (
    <p>
      {name} {exercises}
    </p>    
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) =>
        <Part name={part.name} exercises={part.exercises} key={part.id} />
      )}
    </div>
  )
}



export default Course