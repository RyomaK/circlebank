import React,{Component}from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormControl, Button, Grid, Row, Col } from 'react-bootstrap'
import { tagSearchStart,circleSearchStart } from '../actions/index'
import ResultPage from '../components/ResultPage'
import TagMenu from './TagMenu'

class SearchForm  extends Component{


  componentDidMount(){
    this.props.onCircleSearch(`http://localhost:8080/api/doshisha/circle`),
    this.props.onTagSearch()
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
          <Col md={5} mdOffset={2}><FormControl
                        type="text"
                        placeholder="入力してください"
                        onChange = {e=>{
                          input = e.target.value
                        }}
                        /></Col>
          <Col md={1}><Button type="submit" bsStyle ="default">検索</Button></Col>
          <Col md={2}><TagMenu /></Col>
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
    onTagSearch: () => {
      dispatch(tagSearchStart())
    },
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
