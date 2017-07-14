import {
    combineReducers
} from 'redux';

import * as configReducer from './config';
import * as todoListReducer from './todoList';

export default combineReducers(Object.assign(
    configReducer,
    todoListReducer,
))
