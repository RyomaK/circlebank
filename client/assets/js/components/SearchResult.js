import React,{ Component } from 'react'
import Menu from './Menu'
import { Link, Redirect} from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

class SearchResult extends Component{
  render(){
    if(this.props.word == 'notFound'){
      return(
        <Redirect to="/notFound"/>
      )
    }else{
      return(
        <div>

            <Menu/>
            <Col xs ={12} sm={9} className="paper">
              <div className="SearchResult ">
                <h2>検索結果</h2>
                <div className="resultPage">
                <Link to={`/circle/search/${this.props.circle.url_name}`}><h3>{this.props.circle.name}</h3></Link>
                </div>
              </div>
            </Col>

        </div>
      )

    }

  }
}

const mapStateToProps = state => {
  return{
    word: state.searchWord.word,
    circle: state.circle.circle
  }
}

export default connect(
  mapStateToProps
)(SearchResult)
