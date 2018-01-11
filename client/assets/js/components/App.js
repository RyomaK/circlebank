import React,{Component} from 'react'
import Header from './Header'

import SearchForm from '../containers/SearchForm'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
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
              <Switch>
                <Route path="/login" component={LoginPage}/>
                <Route path="/signup" component={SignupPage}/>
                <Auth>
                  <Switch>
                    <Route exact path="/" component={SearchForm}/>
                    <Route path="/user" component={UserPage}/>
                  </Switch>
                </Auth>
                </Switch>


            </div>
          </MuiThemeProvider>
        </BrowserRouter>
  )
}
export default App;
