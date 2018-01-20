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

          <h1>{circle.name}</h1>
          <LikeButton id={this.props.circle.id}/>
        </div>



      <Tabs
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        >
          <Tab label="団体紹介" value="a">
            <div className="centerPosition">
              <h3>
                {circle.message_for_fresh}
              </h3>
            </div>
          </Tab>
          <Tab label="団体詳細" value="b">
            <div>
            <Table responsive>
            <tbody>
              <tr>
                <td>キャンパス</td>
                <td>{circle.campus}</td>
                <td>カテゴリ</td>
                <td>{circle.introduction}</td>
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
