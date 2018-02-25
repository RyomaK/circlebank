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
import UserPage from './UserPage'
import TagPage from './TagPage'
import Comment from './Comment'
import SmartPage from './SmartPage'
import TabMenu from './TabMenu'
import Filter from './Filter'
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
                    <Route exact path='/user' component={UserPage}/>
                    <Route exact path='/circle/name/search' component={SearchResult}/>
                    <Route exact path='/circle/search/:name' component={CirclePage}/>
                    <Route exact path='/tag/:id' component={TagPage}/>
                    <Route exact path='/user/:id/:name/comment' component={Comment}/>
                    <Route exact path='/menu' component={SmartPage}/>
                    <Route component={ NotFound }/>
                  </Switch>
                  </div>
                  </div>
                </Auth>
                </Switch>
                <Filter>
                <div id="footer">
                  <TabMenu/>
                </div>
                </Filter>
              </div>
          </MuiThemeProvider>
        </BrowserRouter>
  )
}
export default App;
