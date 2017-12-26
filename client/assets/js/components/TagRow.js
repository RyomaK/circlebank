import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { circleSearchStart,login } from '../actions/index'

class TagRow extends Component{
  render(){
  return(
    <div onClick={(child)=>{
      child.preventDefault();
      this.props.onTagSearch(this.props.id)}}>{this.props.tag.name}</div>
  )
}
}
const mapStateToProps = state => {
  return(
    state
  )
}

const mapDispatchToProps= dispatch => {
  return{
    onTagSearch: (id) => {
      dispatch(circleSearchStart(`http://localhost:8080/api/doshisha/tag/${id}`))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagRow)

TagRow.propTypes = {
  tag: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })
}
