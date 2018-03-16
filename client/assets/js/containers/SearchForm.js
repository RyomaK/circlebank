import React,{Component}from 'react'
import Candidate from '../components/Candidate'
import { Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { FormControl, Button, Grid, Row, Col } from 'react-bootstrap'
import { setSearchWord,circleSearch,Search,setfilter,SearchReset} from '../actions/index'
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
class SearchForm  extends Component{

  handleSubmit(event,item){
    event.preventDefault();
    this.props.setfilter(item);
    this.props.SearchReset()
    this.props.history.push('/circle/name/search');
  }
  handleChange(e){
    e.preventDefault();
    const length = e.target.value.length
    if(length < 4 && e.target.value != ''){
      this.props.setWord(e.target.value)
      this.props.Search(e.target.value)
    }else if(e.target.value == ''){
      this.props.setWord(e.target.value)
      this.props.SearchReset()
    }else{
      this.props.setWord(e.target.value)
    }
  }
  render(){
    const circle = this.props.circle
    const item = circle.filter((item) => {
      if(this.props.searchWord==''){
        return []
      }else{
        return item.name.includes(this.props.searchWord)
      }
    })
  return(
    <div className="relative">
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
            </form>
        </div>
      </div>
      <Candidate item={item}/>
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
    Search: word => {
      dispatch(Search(word))
    },
    setfilter:item => {
      dispatch(setfilter(item))
    },
    SearchReset:()=>{
      dispatch(SearchReset())
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForm))
