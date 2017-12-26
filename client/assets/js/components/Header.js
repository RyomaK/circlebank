import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {lightBlue900} from 'material-ui/styles/colors';
/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

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

export default Header
