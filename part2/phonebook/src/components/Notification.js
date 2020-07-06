import React from 'react'

const Notification = ({ message, identifier }) => {
    if (message === null) {
      return null
    }
    
    if(identifier===0){
      return (
        <div className="error">
          {message}
        </div>
      )
    } else {
      return (
        <div className="success">
          {message}
        </div>
      ) 
    }
  }

  export default Notification