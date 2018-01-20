import React,{ Component } from 'react'
import { connect } from 'react-redux'
import {Tabs, Tab} from 'material-ui/Tabs';
import {Grid,Col,Table} from "react-bootstrap"
import LikeButton from './LikeButton'
import Events from './Events'
class Circle extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange(value){
    this.setState({
      value: value,
    });
  };
  render(){

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};
const circle = this.props.circle

    return(
      <div>
        <div className="centerPosition">
          <div className="circleName">
            <span className="circleNameRight">{circle.name}</span>
            <LikeButton id={circle.id}/>
          </div>
          <div className="circleImage">
            <img src="static/img/users/default.png" alt="aa" width="50%" height="50%"/>
          </div>

        </div>
        <div>

        </div>



      <Tabs
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
         className="fontChange1 whitePage">
          <Tab label="団体紹介" value="a">
            <div className="centerPosition whitePage">
              <div className="circleInt">
                {circle.message_for_fresh}
              </div>
            </div>
          </Tab>
          <Tab label="団体詳細" value="b">
            <div>
            <Table className="whitePage">
            <tbody>
              <tr>
                <td width="25%">キャンパス</td>
                <td width="25%">{circle.campus}</td>
                <td width="25%">カテゴリ</td>
                <td width="25%">{circle.introduction}</td>
              </tr>
              <tr>
                <td>サークル人数</td>
                <td>{circle.number}人</td>
                <td>代表者</td>
                <td>{circle.delegete_name}</td>
              </tr>
              <tr>
                <td>男女比</td>
                <td>{circle.gender_ratio}</td>
                <td>連絡先</td>
                <td>{circle.delegete_contact}</td>
              </tr>
            </tbody>
            </Table>
            </div>
          </Tab>
          <Tab label="イベント" value="c">
            <div>
              <Events events={this.props.events}/>
            </div>
          </Tab>
        </Tabs>

      </div>
    )

  }
}

const mapStateToProps = state => {
    return{
    events: state.circle.events
  }
}

export default connect(
  mapStateToProps
)(Circle)
