import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, Button, Grid, Row, Col } from 'react-bootstrap'
import ResultPage from './ResultPage'

const SearchForm = ({id,name,onSearchClick}) =>{
  let input
  return(

  <div>
    <Grid>
      <Row>
        <form onSubmit = { e => {
          e.preventDefault()
          onSearchClick(input)
          input = ""
        }}>
          <Col md={6}><FormControl
                        type="text"
                        placeholder="入力してください"
                        onChange = {e=>{
                          input = e.target.value
                        }}
                        /></Col>
          <Col md={4}><Button type="submit" bsStyle ="default">検索</Button></Col>
        </form>
      </Row>
      <Row>
        <ResultPage id={id} name={name}/>
      </Row>
    </Grid>
  </div>

  )
}

SearchForm.propTypes = {
  onSearchClick: PropTypes.func.isRequired,
  id: PropTypes.string,
  name: PropTypes.string
}

export default SearchForm
