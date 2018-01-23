import React,{ Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import {Tabs, Tab} from 'material-ui/Tabs';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import Home from 'material-ui/svg-icons/action/home';
import ActionSearch from 'material-ui/svg-icons/action/search';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

class TabMenu extends Component{
  render(){
      return(
        <Col smHidden mdHidden lgHidden>
        <Tabs>
          <Tab
            icon={<Home/>}
            label="HOME"
          />
          <Tab
            icon={<ActionSearch/>}
            label="Search"
          />
          <Tab
            icon={<AccountBox/>}
            label="MY PAGE"
          />
        </Tabs>
        </Col>
      )

  }
}

const mapStateToProps = state => {
  return{
    state
  }
}

export default connect(
  mapStateToProps
)(TabMenu)
