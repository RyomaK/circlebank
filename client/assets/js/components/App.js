import React,{Component} from 'react'
import Header from './Header'
import NotFound from './NotFound'
import SearchForm from '../containers/SearchForm'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import CirclePage from '../containers/CirclePage'
import MainPage from './MainPage'
import SearchResult from './SearchResult'
import Auth from './Auth'
import TagPage from './TagPage'
import SmartPage from './SmartPage'
import TabMenu from './TabMenu'
import Filter from './Filter'
import Schedule from './Schedule'
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux'

const App =() => {
  return(
        <BrowserRouter>
          <MuiThemeProvider>
            <div>
              <Switch>
                <Route path='/login' component={LoginPage}/>
                <Route path='/signup' component={SignupPage}/>
                <Auth>
                  <div>
                  <div id="Header">
                  <Header />
                  </div>
                  <div className="contents">
                  <SearchForm/>
                  <Switch>
                    <Route exact path='/' component={MainPage}/>
                    <Route exact path='/circle/name/search' component={SearchResult}/>
                    <Route exact path='/circle/search/:name' component={CirclePage}/>
                    <Route exact path='/tag/:id' component={TagPage}/>
                    <Route exact path='/menu' component={SmartPage}/>
                    <Route exact path ="/schedule" component={Schedule}/>
                    <Route component={ NotFound }/>
                  </Switch>
                  </div>
                  </div>
                </Auth>
                </Switch>

                <div id="footer">
                  <TabMenu/>
                </div>

              </div>
          </MuiThemeProvider>
        </BrowserRouter>
  )
}
export default App;
