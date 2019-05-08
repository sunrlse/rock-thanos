import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { 
    GET_SEARCH_RESULTS_SAGA,
    GET_SEARCH_RESULTS
} from 'constant/actionTypes';

import {
    GET_SEARCH_RESULTS_URL
} from 'constant/url';

// worker saga

function* searchResultsAsync(action) {
    try {
        const res = yield call(axios.get, GET_SEARCH_RESULTS_URL);
        yield put({ type: GET_SEARCH_RESULTS, results: res.data.data })
    } catch (e) {
        
    }
}

// wacther saga
// search results
function* watchGetResults() {
    yield takeLatest(GET_SEARCH_RESULTS_SAGA, searchResultsAsync)
}

// root saga
export default function* rootSaga() {
    yield watchGetResults()
} 