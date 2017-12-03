import React from 'react'
import PropTypes from 'prop-types';

const ResultPage = ({id, name}) => {
  return(
    <div>
      検索結果:{id,name}
    </div>

  )
}

ResultPage.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string
}


export default ResultPage
