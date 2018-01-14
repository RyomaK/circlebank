import React,{Component}from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { tagSearchStart } from '../actions/index'
import { NavDropdown,MenuItem,Nav } from 'react-bootstrap'


class TagMenu extends Component{


  render(){

    return(
      <div><Nav><NavDropdown title="条件検索" id="basic-nav-dropdown">
        {this.props.tags.map(tag => (<MenuItem
          key={tag.id} value={tag.id}
          onClick ={(event)=>{
          event.preventDefault();
          this.props.onHandleSearch(tag.id)}}>
          {tag.name}
          </MenuItem>))}
        </NavDropdown>
        </Nav>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    tags: state.allTagSearch.tags
  }
}

export default connect(
  mapStateToProps,

)(TagMenu)

TagMenu.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.any)
}
