import * as types from './types'
import Api from '../utils/api'

/** @description Request mossbyte tokens.
 */
export function initializeApp() {
  return (dispatch, getState) => {
    const headers = getState().config.get('headers').toJSON()
    const url = `${getState().config.get('baseUrl')}/${getState().config.get('apiKey')}`
    const keys = getState().config.get('keys')
    const todoList = getState().todoList
    const payload = {
      object: [{todoList}],
      keys: keys
    }
    dispatch({
      type: types.INITIALIZE_APP,
      payload: {
        headers,
        url,
        payload,
        method: 'POST',
      }
    })

    return Api.xhr(headers, url, payload, 'POST')
    .then(response => {
      dispatch({
        type: types.SET_CONFIG,
        payload: response
      })
    })
    .catch( error => {
      console.error(error)
    })
  }
}
