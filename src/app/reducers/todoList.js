import createReducer from '../utils/createReducer'
import * as types from '../actions/types'

import {
    fromJS,
} from 'immutable'

let defaultValue = []

export const todoList = createReducer(fromJS(defaultValue), {
    [types.SET_TASKS](state, { payload }) {
        let newTasks = payload.data.mossByte.object[0].todoList
        return fromJS(newTasks)
    }
})