import { 
    GET_SEARCH_RESULTS
} from 'constant/actionTypes';

const searchReducer = (state = {
    fetched: false,
    results: [{
        key: '1',
        id: '1',
        title: 'test'
    }],
	error: null
}, action) => {
    switch(action.type) {
        case GET_SEARCH_RESULTS:
            return {...state, fetched: true, results: action.results} 
    }
    return state;
}


export default searchReducer