import React from 'react'
import Header from './Header'
import TopPage from './TopPage'
import SearchForm from '../containers/SearchForm'
import TagMenu from '../containers/TagMenu'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



const App = () => {
  return(
        <BrowserRouter>
          <MuiThemeProvider>
            <div>
              <Header />
              <Route exact path="/" component={TopPage}/>
              <Route path="/circle" component={SearchForm} />
            </div>
          </MuiThemeProvider>
        </BrowserRouter>


  )

}

export default App;
