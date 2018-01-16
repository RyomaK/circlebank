import React,{Component} from 'react'
import Header from './Header'
import Menu from './Menu'

import SearchForm from '../containers/SearchForm'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import CirclePage from '../containers/CirclePage'
import MainPage from './MainPage'
import Auth from './Auth'
import UserPage from './UserPage'
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux'




const App =() => {
  return(
        <BrowserRouter>
          <MuiThemeProvider>
            <div>
              <Header />
              <Auth>
                <SearchForm/>
              </Auth>

              <Switch>
                <Route path="/login" component={LoginPage}/>
                <Route path="/signup" component={SignupPage}/>
                <Auth>
                  <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route path="/user" component={UserPage}/>
                    <Route path ="/circle" component={CirclePage}/>
                  </Switch>
                </Auth>
                </Switch>


            </div>
          </MuiThemeProvider>
        </BrowserRouter>
  )
}
export default App;
