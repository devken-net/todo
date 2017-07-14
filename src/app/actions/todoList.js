import * as types from './types'
import Api from '../utils/api'
import UUID from 'uuid-lib'

/** @description Request mossbyte tokens.
 */
export function fetchTasks() {
  return (dispatch, getState) => {
    const headers = getState().config.get('headers').toJSON()
    const url = `${getState().config.get('baseUrl')}/${getState().config.get('readKey')}`
    const method = 'GET'
    dispatch({
      type: types.FETCH_TASKS,
      payload: {
        headers,
        url,
        method
      }
    })

    return Api.xhr(headers, url, null, method)
    .then(response => {
      dispatch({
        type: types.SET_TASKS,
        payload: response
      })
    })
    .catch( error => {
      console.error(error)
    })
  }
}
export function createTasks({ title, description }) {
  return (dispatch, getState) => {
    const headers = getState().config.get('headers').toJSON()
    const url = `${getState().config.get('baseUrl')}/${getState().config.get('adminKey')}`
    const method = 'PUT'
    let todoList = getState().todoList
    const task = {
      id: UUID.raw(),
      title,
      description,
      priority: todoList.size
    }
    const newTasks = todoList.push(task)
    const payload = {
      object: [{ todoList: newTasks }],
    }
    dispatch({
      type: types.CREATE_TASKS,
      payload: {
        headers,
        url,
        payload,
        method
      }
    })

    return Api.xhr(headers, url, payload, method)
    .then( response => {
      dispatch(fetchTasks())
    })
    .catch( error => {
      console.error(error)
    })
  }
}
export function updateTasks(newTasks) {
  return (dispatch, getState) => {
    const headers = getState().config.get('headers').toJSON()
    const url = `${getState().config.get('baseUrl')}/${getState().config.get('adminKey')}`
    const method = 'PUT'
    const payload = {
      object: [{ todoList: newTasks }],
    }
    dispatch({
      type: types.UPDATE_TASKS,
      payload: {
        headers,
        url,
        payload,
        method
      }
    })

    return Api.xhr(headers, url, payload, method)
    .then( response => {
      dispatch(fetchTasks())
    })
    .catch( error => {
      console.error(error)
    })
  }
}

export function deleteTask(taskID) {
  return (dispatch, getState) => {
    const headers = getState().config.get('headers').toJSON()
    const url = `${getState().config.get('baseUrl')}/${getState().config.get('adminKey')}`
    const method = 'PUT'
    let todoList = getState().todoList.filter(task => task.get('id') !== taskID)
    const payload = {
      object: [{ todoList }],
    }
    dispatch({
      type: types.DELETE_TASKS,
      payload: {
        headers,
        url,
        payload,
        method
      }
    })

    return Api.xhr(headers, url, payload, method)
    .then( response => {
      dispatch(fetchTasks())
    })
    .catch( error => {
      console.error(error)
    })
  }
}
