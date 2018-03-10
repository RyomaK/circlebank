import React,{ Component } from 'react'
import {Card,CardMedia,CardTitle} from 'material-ui/Card';
import { Link, Redirect} from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
class SearchResult extends Component{
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
                <Col sm={6} xs={12} className="marginbottom circleName reset" key={circle.id}><Link to={`/circle/search/${circle.url_name}`} >
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
export default connect(
  mapStateToProps
)(SearchResult)
