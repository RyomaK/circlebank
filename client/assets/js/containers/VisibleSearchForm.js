import { connect } from 'react-redux'
import { search } from '../actions'
import SearchForm from '../components/SearchForm'

const mapStateToProps = state => {
  console.log(state)
  return{

    id: state.search.id,
    name: state.search.name
  }
}

const mapDispatchToProps= dispatch => {
  return{
    onSearchClick: value => {
      dispatch(search(value))
    }
  }
}

const VisibleSearchForm= connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm)

export default VisibleSearchForm
