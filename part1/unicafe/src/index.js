import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {

  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const total = props.total
  const average = good/total - bad/total
  const positive = good/total*100 + "%"

  if (total === 0) {
    return <div>No feedback given</div>
  }

  return(
      <table>
        <tbody>
          <Statistic text="good" value = {good} />
          <Statistic text="neutral" value = {neutral} />
          <Statistic text="bad" value = {bad} />
          <Statistic text="all" value = {total} />
          <Statistic text="average" value = {average} />
          <Statistic text="positive" value = {positive} />
        </tbody>
      </table>
  )
}

const Statistic = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    setTotal(total + 1)
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setTotal(total + 1)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setTotal(total + 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback!</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>Statistics</h1>
      
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
      
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)