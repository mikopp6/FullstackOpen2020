const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return state = action.notification
    case 'REMOVE_NOTIFICATION':
      return state = ''
    default:
      return state
  }
}

export const setNotification = (notification, time) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, time*1000)
  }
}

export default notificationReducer