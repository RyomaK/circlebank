import React,{Component}from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { FormControl, Button, Grid, Row, Col } from 'react-bootstrap'
import { setSearchWord,circleSearch } from '../actions/index'
import TagMenu from './TagMenu'

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
  <div>
    <Grid>
      <Row className="searchForm">
        <form onSubmit = {this.handleSubmit.bind(this)}>
          <Col md={4} mdOffset={2}>
          <FormControl
            type="text"
            placeholder=""
            onChange = {this.handleChange.bind(this)}
            />
            </Col>
          <Col md={1}><Button type="submit" bsStyle ="default">検索</Button></Col>
        </form>
      </Row>
    </Grid>
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
