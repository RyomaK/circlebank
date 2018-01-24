import React,{ Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import Home from 'material-ui/svg-icons/action/home';
import ActionSearch from 'material-ui/svg-icons/action/search';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

class TabMenu extends Component{
  handleClick(){
    this.props.history.push('/')
  }
  handleClick1(){
    this.props.history.push('/')
  }
  handleClick2(){
    this.props.history.push('/user')
  }
  render(){
      return(
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
      )

  }
}

const mapStateToProps = state => {
  return{
    state
  }
}

export default withRouter(connect(mapStateToProps)(TabMenu))
