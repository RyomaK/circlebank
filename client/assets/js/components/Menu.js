import React, { Component }from 'react'
import { withRouter } from 'react-router-dom'
import {Grid,Col} from "react-bootstrap"
import { connect } from 'react-redux'
import {List, ListItem} from 'material-ui/List';
import Run from 'material-ui/svg-icons/maps/directions-run';
import Book from 'material-ui/svg-icons/action/book';
import Other from 'material-ui/svg-icons/action/account-balance';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import { tagSearchStart,tagSearch,tagReset} from '../actions/index'


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
      <div className="whitePage">
          <List>
            <Subheader>絞り検索</Subheader>
            <ListItem
              primaryText="運動系"
              leftIcon={<Run />}
              disabled={true}
              initiallyOpen={false}
              primaryTogglesNestedList={true}
              nestedItems={this.props.tags[0].tags.map(tag => (<ListItem
                  key={tag.id}
                  primaryText={tag.name} onClick={(event)=>{
                    event.preventDefault();
                    this.props.tagReset()
                    this.props.Search(tag.id)
                    this.props.history.push(`/tag/${tag.id}`)
                  }}
                />))}
                />
            <ListItem
              primaryText="文化系"
              leftIcon={<Book />}
              disabled={true}
              initiallyOpen={false}
              primaryTogglesNestedList={true}
              nestedItems={this.props.tags[1].tags.map(tag => (<ListItem
                  key={tag.id}
                  primaryText={tag.name} onClick={(event)=>{
                    event.preventDefault();
                    this.props.tagReset()
                    this.props.Search(tag.id)
                    this.props.history.push(`/tag/${tag.id}`)
                  }}
                />))}
                />
            <ListItem
              primaryText="その他"
              leftIcon={<Other />}
              disabled={true}
              initiallyOpen={false}
              primaryTogglesNestedList={true}
              nestedItems={this.props.tags[2].tags.map(tag => (<ListItem
                  key={tag.id}
                  primaryText={tag.name} onClick={(event)=>{
                    event.preventDefault();
                    this.props.tagReset()
                    this.props.Search(tag.id)
                    this.props.history.push(`/tag/${tag.id}`)
                  }}
                />))}
                />
          </List>
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
      },
      Search: id =>{
        dispatch(tagSearch(id))
      },
      tagReset:()=>{
        dispatch(tagReset())
      }
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))
