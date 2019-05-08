import { connect } from 'react-redux';

import Search from 'component/Search';
import { GET_SEARCH_RESULTS_SAGA } from 'constant/actionTypes'

const mapStateToProps = (state) => ({
  results: state.search.results
})

const mapDispatchToProps = (dispatch) => ({
  fetchResults: () => dispatch({ type: GET_SEARCH_RESULTS_SAGA })
});

export default connect(mapStateToProps, mapDispatchToProps)(Search)