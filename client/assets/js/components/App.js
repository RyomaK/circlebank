import React,{Component} from 'react'
import Header from './Header'

import Auth from './Auth'
import SearchForm from '../containers/SearchForm'
import LoginPage from './LoginPage'
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux'




const App =() => {
  return(
        <BrowserRouter>
          <MuiThemeProvider>
            <div>
              <Header />
                <Route exact path="/login" component={LoginPage}/>
                <Auth>
                  <Route path="/" component={SearchForm} />
                </Auth>
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
  )
}
export default App;
