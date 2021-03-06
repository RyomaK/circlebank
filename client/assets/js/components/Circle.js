import React,{ Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux'
import {Tabs, Tab} from 'material-ui/Tabs';
import {Table} from "react-bootstrap"
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
        fontSize: 20,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };
    const circle = this.props.circle
    const isLoading = this.props.isLoading
    return(
      <div>
      {isLoading ? <div className="Loading"><CircularProgress size={80} thickness={7} /></div>:
          <div>
            <div className="centerPosition">
              <div className="circleName">
                <span className="circleNameRight">{circle.name}</span>
              </div>
            </div>
            <div className="circleImage">
              <img src={`static/${circle.image}`} alt="aa" width="100%"　height="auto"/>
            </div>
          <Tabs
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
             className="fontChange1 whitePage">
              <Tab label="団体紹介" value="a">
                <div>
                  <div className="circleInt">
                  {circle.introduction.split('\n').map((message,i)=>{
                    return(
                      <p className="heightPosi" key={i}>{message}</p>
                    )
                  })}
                  </div>
                </div>
                <div className="circleImage">
                      <img src={`static/${circle.bill_image}`} alt="ビラ画像" width="100%"　height="auto"/>
                </div>
              </Tab>
              <Tab label="団体詳細" value="b">
                <div>
                <Table className="whitePage">
                  <tbody>
                    <tr>
                      <td width="50%">人数</td>
                      <td width="50%">{circle.number}</td>
                    </tr>
                    <tr>
                      <td width="50%">代表者</td>
                      <td width="50%">{circle.delegate_name}</td>
                    </tr>
                    <tr>
                      <td>キャンパス</td>
                      <td>{circle.campus}</td>
                    </tr>
                    <tr>
                      <td>連絡先</td>
                      <td>{circle.delegate_contact}</td>
                    </tr>
                    <tr>
                      <td>活動</td>
                      <td>{circle.activity_week}</td>
                    </tr>
                    <tr>
                      <td>活動時間</td>
                      <td>{circle.activity_time}</td>
                    </tr>
                    <tr>
                      <td>入会費</td>
                      <td>{circle.entrance_fee}</td>
                    </tr>
                    <tr>
                      <td>年会費</td>
                      <td>{circle.annual_fee}</td>
                    </tr>
                    <tr>
                      <td>入会締切日</td>
                      <td>{circle.admission_deadline}</td>
                    </tr>
                    <tr>
                      <td>Box番号</td>
                      <td>{circle.box_number}</td>
                    </tr>
                    <tr>
                      <td>ブース番号</td>
                      <td>{circle.booth_number}</td>
                    </tr>
                    {
                      this.props.sns.map((sns,index)=>{
                        return(
                          <tr key={index}>
                            <td>SNS</td>
                            <td>{sns.sns}</td>
                          </tr>
                        )
                      })
                    }
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
            <br/>
            <br/>
          </div>
       }
      </div>
     )
    }
}
const mapStateToProps = state => {
    return{
    events: state.circle.events,
    sns: state.circle.sns,
    isLoading: state.circle.isLoading
  }
}
export default connect(
  mapStateToProps
)(Circle)
