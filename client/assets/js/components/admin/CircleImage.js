import React,{Component} from 'react'
import {circleImage,adminSetTags,adminAddCircleTag,circleSearch} from '../../actions/index'
import {withRouter} from 'react-router-dom'
import {Col,Form,FormGroup,FormControl} from "react-bootstrap"
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'
class CircleImage extends Component{

  constructor(props){
    super(props)
    this.state={values1:[],
                values2:[],
                values3:[],
                tags:[],
                image:""
      }
  }
  componentDidMount(){
    const url = this.props.match.params.circle_url
    this.props.circleSearch(url)
  }

  handleSubmit(e){
    e.preventDefault();
    const id = this.props.match.params.id
    this.props.CircleImage(this.state.image,id)
    this.props.adminAddCircleTag(this.props.addTag,id)
    this.props.history.push('/')
  }

  handleChange1(event,index,values1){
    event.preventDefault()
    this.setState({values1})
    let tag = values1.concat(this.state.values2)
    tag = tag.concat(this.state.values3)
    this.props.adminSetTags(tag)

  }
  handleChange2(event,index,values2){
    event.preventDefault()
    this.setState({values2})
    let tag = this.state.values1.concat(values2)
    tag = tag.concat(this.state.values3)
    this.props.adminSetTags(tag)
  }

  handleChange3(event,index,values3){
    event.preventDefault()
    this.setState({values3})
    let tag = this.state.values1.concat(this.state.values2)
    tag = tag.concat(values3)
    this.props.adminSetTags(tag)
  }

  handleChange(e){
    e.preventDefault();
    this.setState({image:e.target.files[0]})
  }

  menuItems1(values) {
    return this.props.tags[0].tags.map((tag) => (
      <MenuItem
        key={tag.name}
        insetChildren={true}
        checked={values && values.indexOf(tag.name) > -1}
        value={tag}
        primaryText={tag.name}
      />
    ));
  }
  menuItems2(values) {
    return this.props.tags[1].tags.map((tag) => (
      <MenuItem
        key={tag.name}
        insetChildren={true}
        checked={values && values.indexOf(tag.name) > -1}
        value={tag}
        primaryText={tag.name}
      />
    ));
  }
  menuItems3(values) {
    return this.props.tags[2].tags.map((tag) => (
      <MenuItem
        key={tag.name}
        insetChildren={true}
        checked={values && values.indexOf(tag.name) > -1}
        value={tag}
        primaryText={tag.name}
      />
    ));
  }


  render(){
    console.log(this.props.tags)
    const {values1,values2,values3} = this.state;
    return(
      <div>
        <div>現在のタグ</div>
        {this.props.tag.map((tag)=> {
          return(
            <div key={tag.id}>
              {tag.name}
            </div>
          )
        })}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="file" onChange={this.handleChange.bind(this)}/>
          <FormGroup>
      			<Col smOffset={2} sm={8}>
            <SelectField
              multiple={true}
              hintText="運動"
              value={values1}
              onChange={this.handleChange1.bind(this)}
            >
            {this.menuItems1(values1)}
            </SelectField>
      			</Col>
      		</FormGroup>
          <FormGroup>
      			<Col smOffset={2} sm={8}>
            <SelectField
              multiple={true}
              hintText="文化"
              value={values2}
              onChange={this.handleChange2.bind(this)}
            >
            {this.menuItems2(values2)}
            </SelectField>
      			</Col>
      		</FormGroup>
          <FormGroup>
      			<Col smOffset={2} sm={8}>
            <SelectField
              multiple={true}
              hintText="その他"
              value={values3}
              onChange={this.handleChange3.bind(this)}
            >
            {this.menuItems3(values3)}
            </SelectField>
      			</Col>
      		</FormGroup>
        <button type="submit">送信</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {

  return{
    tags: state.allTagSearch.tags,
    addTag: state.adminCircleTag,
    tag: state.circle.tags
  }
}
const mapDispatchToProps = dispatch => {
  return{
      CircleImage:(image,id)=>{
        dispatch(circleImage(image,id))
      },
      adminSetTags:(tag)=>{
        dispatch(adminSetTags(tag))
      },
      adminAddCircleTag:(tag,id) => {
        dispatch(adminAddCircleTag(tag,id))
      },
      circleSearch:(url) => {
        dispatch(circleSearch(url))
      }
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CircleImage))
