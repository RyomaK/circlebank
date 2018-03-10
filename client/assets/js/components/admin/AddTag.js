import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Button,Col,Form,FormGroup,FormControl} from 'react-bootstrap'
import {connect} from 'react-redux'
import {adminAddTag} from '../../actions/index'

class AddTag extends Component{
  constructor(props) {
    super(props);
    this.state = {
      tags:[],
      sports:{
        name:'',
        class_name:'運動'
    },
    calture:{
      name:'',
      class_name:'文化'
  },
    sonota:{
      name:'',
      class_name:'その他'
  },
  }
}


  handleSubmit(e){
    e.preventDefault();
    this.props.adminAddTag(this.state.tags)
    this.props.history.push('/admin');
  }
  handleClick(e){
    e.preventDefault();
    let tag = this.state.tags.concat(this.state.sports)
    this.setState({tags:tag})
  }
  handleClick1(e){
    e.preventDefault();
    let tag = this.state.tags.concat(this.state.calture)
    this.setState({tags:tag})
  }
  handleClick2(e){
    e.preventDefault();
    let tag = this.state.tags.concat(this.state.sonota)
    this.setState({tags:tag})
  }
  handleChange(e){
    switch(e.target.name){
      case 'sport':
        this.setState({sports:{
          name:e.target.value,
          class_name:'運動'
        }})
      break;
      case 'calture':
        this.setState({calture:{
          name:e.target.value,
          class_name:'文化'
        }})
      break;
      case 'sonota':
        this.setState({sonota:{
          name:e.target.value,
          class_name:'その他'
        }})
      break;
      default:
      break;
    }
  }

  render(){
    return(
        <div>
          <h3>新規タグ</h3>
          {this.state.tags.map((tag,index)=>{
            return(
              <div key={index}>{
                tag.name
              }</div>
            )
          })}
          <Col sm={12}>
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
              <FormGroup>
                <Col sm={8}>
                  <TextField
                  name = "sport"
                  floatingLabelText="運動"
                  floatingLabelFixed={true}
                  onChange={this.handleChange.bind(this)}
                  fullWidth={true}
                  />
                </Col>
                <Col sm={4} className="admintag">
                  <FlatButton onClick={this.handleClick.bind(this)}>追加</FlatButton>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={8}>
                  <TextField
                  name = "calture"
                  floatingLabelText="文化"
                  floatingLabelFixed={true}
                  onChange={this.handleChange.bind(this)}
                  fullWidth={true}
                  />
                </Col>
                <Col sm={4} className="admintag">
                  <FlatButton onClick={this.handleClick1.bind(this)}>追加</FlatButton>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={8}>
                  <TextField
                  name = "sonota"
                  floatingLabelText="その他"
                  floatingLabelFixed={true}
                  onChange={this.handleChange.bind(this)}
                  fullWidth={true}
                  />
                </Col>
                <Col sm={4} className="admintag">
                  <FlatButton onClick={this.handleClick2.bind(this)}>追加</FlatButton>
                </Col>
              </FormGroup>
              <FlatButton fullWidth={true} type="submit">送信</FlatButton>
            </Form>
          </Col>
        </div>
      )
  }
}
const mapStateToProps = state => {
  return{
    tags: state.allTagSearch.tags
  }
}
const mapDispatchToProps = dispatch => {
  return{
      adminAddTag:(tag)=>{
        dispatch(adminAddTag(tag))
      }
    }
  }
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddTag))
