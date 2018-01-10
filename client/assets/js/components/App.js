import React,{Component} from 'react'
import Header from './Header'

import SearchForm from '../containers/SearchForm'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import Auth from './Auth'
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
                    <Route path="/" component={SearchForm}/>
                  </Auth>
                </Switch>

            </div>
          </MuiThemeProvider>
        </BrowserRouter>
  )
}
export default App;
