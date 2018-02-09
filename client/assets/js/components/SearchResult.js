import React,{ Component } from 'react'
import Menu from './Menu'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Link, Redirect} from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
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
            <Col sm={3} xsHidden className="reset">
            <Menu/>
            </Col>
            <div className="paper">
              <div>
                <Col sm={9}>
                <h2>検索結果</h2>
                </Col>
              {this.props.item.map( circle => (
                <Col sm={4} className="marginbottom" key={circle.id}><Link to={`/circle/search/${circle.url_name}`} >
                    <Card className="sizebox">
                    <CardMedia>
                      <img src={`static/${circle.image}`} alt="aa" height="200px;"/>
                    </CardMedia>
                    <CardTitle title={circle.name} />
                    <CardText>
                      サークルの種類:{circle.introduction}
                    </CardText>
                  </Card>
                  </Link>
                  </Col>
              ))}
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
