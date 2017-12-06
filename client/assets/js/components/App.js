import React from 'react'
import Header from './Header'
import TopPage from './TopPage'
import SearchForm from '../containers/SearchForm'
import TagMenu from '../containers/TagMenu'


const App = () => {
  return(

          <div>
          <Header />
          <TopPage />
          <SearchForm />
          <TagMenu/>
          </div>


  )

}

export default App;
