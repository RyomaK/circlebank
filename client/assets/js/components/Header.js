import React,{Component} from 'react';
import Auth from './Auth'
import Filter from './Filter'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/svg-icons/navigation/menu';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import { logout,getUserInfo} from '../actions/index'
import {Redirect, Link ,withRouter} from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';
import {grey50,indigo900} from 'material-ui/styles/colors';
import { connect } from 'react-redux'
class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {open: false};
  }
  handleToggle(){ this.setState({open: !this.state.open})}
  handleClick(){
    this.props.Logout()
    this.props.history.push('/')
  }
  render(){
    return(
    <div className="header">
      <Drawer
      open={this.state.open}
      docked={false}
      onRequestChange={()=>this.handleToggle()}
      >
          <MenuItem onClick={ e =>{
            e.preventDefault(); this.props.history.push("/");
          }}>ホーム</MenuItem>
          <MenuItem onClick={ e =>{
            e.preventDefault(); this.props.history.push("/schedule");
          }}>新歓予定</MenuItem>
          
      </Drawer>
      <AppBar
      title="団体図鑑"
      iconElementLeft={window.parent.screen.width>768?<IconButton><IconMenu /></IconButton>:<div></div>}
      onLeftIconButtonTouchTap={ () => this.handleToggle()}
      onRightIconButtonTouchTap={ () => this.handleClick()}
      style={{backgroundColor:indigo900}}
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
const mapDispatchToProps = dispatch => {
  return{
    Logout: () => {
      dispatch(logout())
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
