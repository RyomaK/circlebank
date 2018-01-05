import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {logout} from '../actions/index'
import RaisedButton from 'material-ui/RaisedButton';
import {lightBlue900} from 'material-ui/styles/colors';
import { connect } from 'react-redux'

class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {open: false};
  }
handleToggle(){ this.setState({open: !this.state.open})}
  render(){

    return(
    <div className="header">
      <Drawer
      open={this.state.open}
      docked={false}
      onRequestChange={()=>this.handleToggle()}
      >
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem><div onClick={(child)=>{
          child.preventDefault();
          this.props.Logout()}}>Logout</div></MenuItem>
      </Drawer>
      <AppBar
      title="サークルバンク"
      onLeftIconButtonTouchTap={ () => this.handleToggle()}
      style={{backgroundColor:lightBlue900}}
      />
    </div>
  )
  }
}
const mapStateToProps = state => {
  return{
    state
  }
}
const mapDispatchToProps= dispatch => {
  return{
    Logout:() => {
      dispatch(logout())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
