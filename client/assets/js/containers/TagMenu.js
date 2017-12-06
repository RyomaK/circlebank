import React,{Component}from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { tagSearchStart } from '../actions/index'
import TagRow from '../components/TagRow'

class TagMenu extends Component{
  componentDidMount(){
    this.props.onTagSearch()
  }

  render(){

    return(
      <div>{this.props.tags.map(tag => (<TagRow key={tag.id} id={tag.id} tag={tag}/>))}</div>
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
    onTagSearch: () => {
      dispatch(tagSearchStart())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagMenu)

TagMenu.propTypes = {
  onTagSearch: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.any)
}
