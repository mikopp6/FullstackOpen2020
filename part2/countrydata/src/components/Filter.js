import React from 'react'

const Filter = ({value, handler}) => {
  return (
    <div>Find countries containing: <input value={value} onChange={handler}/></div>
  )
}

export default Filter