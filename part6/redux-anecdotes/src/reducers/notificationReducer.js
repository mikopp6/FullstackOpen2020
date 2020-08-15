const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      clearTimeout(state.timeoutID)
      return state = action.data
    case 'REMOVE_NOTIFICATION':
      return state = ''
    default:
      return state
  }
}

export const setNotification = (message, time) => {
  return dispatch => {
    const timeoutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, time*1000)
    
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, timeoutID }
    })
    
  }
}

export default notificationReducer