import React,{ Component } from 'react'
import Menu from './Menu'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
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
            <Col sm={3} xsHidden className="reset">
            <Menu/>
            </Col>
            <Col xs ={12} sm={4} className="paper">
              <div>
                <h2>検索結果</h2>
                <Link to={`/circle/search/${this.props.circle.url_name}`}>
                  <Card className="sizebox">
                    <CardMedia>
                      <img src={`static/${this.props.circle.image}`} alt="aa" height="200px;"/>
                    </CardMedia>
                    <CardTitle title={this.props.circle.name}/>
                    <CardText>
                      サークルの種類:{this.props.circle.introduction}
                    </CardText>
                  </Card>
                </Link>
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
