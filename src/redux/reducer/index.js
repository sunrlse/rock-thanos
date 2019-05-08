import { combineReducers } from 'redux'

import search from './search';

const appReducer = (() => combineReducers({ search }))();

export default appReducer