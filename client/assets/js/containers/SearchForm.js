import React,{Component}from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { FormControl, Button, Grid, Row, Col } from 'react-bootstrap'

import { circleSearchStart } from '../actions/index'
import ResultPage from '../components/ResultPage'

class SearchForm  extends Component{


  componentDidMount(){
    this.props.onCircleSearch(`http://localhost:8080/api/doshisha/circle`)
  }

  render(){


let input
  return(
  <div>
    <Grid>
      <Row className="searchForm">
        <form onSubmit = { e => {

          input = ""
        }}>
          <Col md={5} mdOffset={3}><FormControl
                        type="text"
                        placeholder="入力してください"
                        onChange = {e=>{
                          input = e.target.value
                        }}
                        /></Col>
          <Col md={4}><Button type="submit" bsStyle ="default">検索</Button></Col>
        </form>
      </Row>
      <Row>
      {this.props.circles.map(circle => (<ResultPage key={circle.id} circle={circle}/>))}

      </Row>
    </Grid>
  </div>

    )
  }
}
const mapStateToProps = state => {
  return{
    circles: state.search.circles
  }
}

const mapDispatchToProps= dispatch => {
  return{
    onCircleSearch: (value) => {
      dispatch(circleSearchStart(value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm)

SearchForm.propTypes = {
  onCircleSearch: PropTypes.func.isRequired,
  circles: PropTypes.arrayOf(PropTypes.any)

}
