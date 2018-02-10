import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

import {grey50,indigo900} from 'material-ui/styles/colors';


import {Tabs, Tab} from 'material-ui/Tabs';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import Home from 'material-ui/svg-icons/action/home';
import ActionSearch from 'material-ui/svg-icons/action/search';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

class TabMenu extends Component{
  constructor(props){
    super(props)
    this.state = {
     selectedIndex: 0
   }
 }

  render(){

      return(
        <Col smHidden mdHidden lgHidden>
        <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem

            icon={<Home/>}

            onClick={() =>{
              this.setState({selectedIndex: 0})
              this.props.history.push('/')

            }}
          />
          <BottomNavigationItem
            icon={<ActionSearch/>}
            onClick={() => {
              this.setState({selectedIndex: 1})
              this.props.history.push('/menu')
            }}
          />
          <BottomNavigationItem

            icon={<AccountBox/>}
            onClick={() => {
              this.setState({selectedIndex: 2})
              this.props.history.push('/user')
            }}
          />
        </BottomNavigation>
      </Paper>
      </Col>

      )

  }
}

{/*
  <Col smHidden mdHidden lgHidden>
  <Tabs>
    <Tab
      icon={<Home/>}
      label="HOME"
      onActive={this.handleClick.bind(this)}
    />
    <Tab
      icon={<ActionSearch/>}
      label="Search"
      onActive={this.handleClick1.bind(this)}
    />
    <Tab
      icon={<AccountBox/>}
      label="MY PAGE"
      onActive={this.handleClick2.bind(this)}
    />
  </Tabs>
  </Col>
  */}

const mapStateToProps = state => {
  return{
    state
  }
}

export default withRouter(connect(mapStateToProps)(TabMenu))
