import React,{ Component } from 'react'
import {Card,CardMedia,CardTitle} from 'material-ui/Card';
import { Link, Redirect, withRouter} from 'react-router-dom'
import {setLoad} from '../actions/index'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
class SearchResult extends Component{
  componentDidMount(){
    this.props.setLoad()
  }
  handleClick(event,url){
    event.preventDefault()
    this.props.history.push(`/circle/search/${url}`)
  }
  render(){
    if(this.props.item==false){
      return(
        <Redirect to="/notFound"/>
      )
    }else{
      return(
        <div>
            <div>
              <div>
                <Col smOffset={2} sm={8}>
                <h2>検索結果</h2>

              {this.props.item.map( circle => (
                <Col sm={6} xs={12} className="marginbottom circleName cardReset" key={circle.id}><Link to={`/circle/search/${circle.url_name}`} >
                    <Card>
                    <CardMedia
                      overlay={<CardTitle title={circle.name}/>}
                    >
                      <img src={`static/${circle.image}`} alt="aa" height="250px;"/>
                    </CardMedia>
                  </Card>
                  </Link>
                  </Col>
              ))}
              </Col>
              </div>
            </div>

        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return{
    item: state.circleAll.item,
  }
}
const mapDispatchToProps = dispatch => {
  return{
    setLoad:()=>{
      dispatch(setLoad())
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResult))
