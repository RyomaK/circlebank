import React, { Component }from 'react'
import { withRouter } from 'react-router-dom'
import {Grid,Col} from "react-bootstrap"
import { connect } from 'react-redux'
import {List, ListItem} from 'material-ui/List';
import Run from 'material-ui/svg-icons/maps/directions-run';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import { tagSearchStart } from '../actions/index'


class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {open: false};
  }
  componentDidMount(){
    this.props.tagSearch()
  }
  handleToggle(){
    this.setState({
      open: !this.state.open,
    });
  };

  handleNestedListToggle(item){
    this.setState({
      open: item.state.open,
    });
  };
  render(){

    return(
      <div>
        <Col sm={3}>
          <div className="menucolor">
          <List>
            <Subheader>絞り検索</Subheader>
            <ListItem
              primaryText="サークル"
              leftIcon={<Run />}
              disabled={true}
              initiallyOpen={false}
              primaryTogglesNestedList={true}
              nestedItems={this.props.tags.map(tag => (<ListItem
                  key={tag.id}
                  primaryText={tag.name} onClick={(event)=>{
                    event.preventDefault();
                    this.props.history.push(`/tag/${tag.id}`)
                  }}
                />))}
                />
          </List>
          </div>
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

const mapDispatchToProps= dispatch => {
  return{
      tagSearch: () => {
        dispatch(tagSearchStart())
      }
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))
