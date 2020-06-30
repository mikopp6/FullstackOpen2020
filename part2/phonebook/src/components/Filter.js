import React from 'react'

const Filter = ({value, handler}) => {
  return (
    <div>Filter results containing: <input value={value} onChange={handler}/></div>
  )
}

export default Filter