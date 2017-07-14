import createReducer from '../utils/createReducer'
import * as types from '../actions/types'

import {
    fromJS,
} from 'immutable'

var defaultValue = {
  baseUrl: 'https://mossbyte.com/api/v1',
  apiKey: 'ea4449eb-307d-454f-9c27-36c59456e8cc', //'7827a33d-ec3c-43c9-a0d2-c205fd259ab3',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'dataType': 'json'
  },
  keys: {
    'read': [
      {
        'key': '{unique_36_char_string}',
        'label': 'read'
      }
    ],
    'admin': [
      {
        'key': '{unique_36_char_string}',
        'label': 'update'
      }
    ]
  }
}

export const config = createReducer(fromJS(defaultValue), {
  [types.SET_CONFIG](state, { payload }) {
    const mossByteID = payload.data.mossByte.id
    const readKey = payload.data.mossByte.keys.read[0].key
    const adminKey = payload.data.mossByte.keys.admin[0].key
    return state.merge({ mossByteID, readKey, adminKey })
  }
})