import React,{Component}from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { FormControl, Button, Grid, Row, Col } from 'react-bootstrap'
import { setSearchWord,circleSearch,circleSearchAll,setfilter} from '../actions/index'
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
class SearchForm  extends Component{

  componentDidMount(){
    this.props.circleSearchAll()
  }


  handleSubmit(event,item){
    event.preventDefault();
    this.props.setfilter(item);

    this.props.history.push('/circle/name/search');
  }
  handleChange(e){
    e.preventDefault();
    this.props.setWord(e.target.value)
  }
  render(){
    const circle = this.props.circle
    const item = circle.filter((item) => {
      if(this.props.searchWord==''){
        return false
      }
      return item.name.includes(this.props.searchWord)
    })
  return(
  <div className="searchForm">
    <div className="searchFormBox">
        <form onSubmit = {(event)=>this.handleSubmit(event,item)}>
          <Col xs={9} sm={11}>
          <input
            type="text"
            onChange = {this.handleChange.bind(this)}
            className="search1"
            />
          </Col>
          <button type="submit" className="searchFormButton">検索</button>
          {/*<IconButton type ="submit"><ActionSearch  className="search"/></IconButton>*/}
        </form>
    </div>
  </div>

    )
  }
}
const mapStateToProps = state => {
  return{
    searchWord: state.searchWord.word,
    circle: state.search.circles
  }
}

const mapDispatchToProps= dispatch => {
  return{
    setWord: word => {
      dispatch(setSearchWord(word))
    },
    circleSearch: word => {
      dispatch(circleSearch(word))
    },
    circleSearchAll: () => {
      dispatch(circleSearchAll())
    },
    setfilter:item => {
      dispatch(setfilter(item))
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForm))
