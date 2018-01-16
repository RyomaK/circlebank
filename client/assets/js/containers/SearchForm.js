import React,{Component}from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { FormControl, Button, Grid, Row, Col } from 'react-bootstrap'
import { setSearchWord,circleSearch } from '../actions/index'
import IconButton from 'material-ui/IconButton';


import ActionSearch from 'material-ui/svg-icons/action/search';
class SearchForm  extends Component{


  handleSubmit(e){
    e.preventDefault()
    this.props.circleSearch(this.props.searchWord),
    this.props.history.push('/circle');

  }
  handleChange(e){
    e.preventDefault();
    this.props.setWord(e.target.value)
  }


  render(){




  return(
  <div className="searchForm">
      <Row>
        <form onSubmit = {this.handleSubmit.bind(this)}>
          <Col sm={7} smOffset={1}>
          <FormControl
            type="text"
            placeholder="サークルを検索"
            onChange = {this.handleChange.bind(this)}
            className="search1"
            />
            </Col>
          <IconButton type ="submit"><ActionSearch  className="search"/></IconButton>
        </form>
      </Row>
  </div>

    )
  }
}
const mapStateToProps = state => {
  return{
    searchWord: state.searchWord.word
  }
}

const mapDispatchToProps= dispatch => {
  return{
    setWord: word => {
      dispatch(setSearchWord(word))
    },
    circleSearch: word => {
      dispatch(circleSearch(word))
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForm))
