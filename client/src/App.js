import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFoundPage from './components/not-found/NotFound';
import './App.css';

// Check for token
if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
        <div className="App">
          <Navbar />
            <Switch>
              <Route path="/" component={Landing} exact={true} />
              <Route path="/register" component={Register}/>
              <Route path="/login" component={Login}/>
              <Route path="/profiles" component={Profiles}/>
              <Route path="/profile/:handle" component={Profile}/>
              <PrivateRoute path="/dashboard" component={Dashboard}/>
              <PrivateRoute path="/create-profile" component={CreateProfile}/>
              <PrivateRoute path="/edit-profile" component={EditProfile}/>
              <PrivateRoute path="/add-experience" component={AddExperience}/>
              <PrivateRoute path="/add-education" component={AddEducation}/>
              <PrivateRoute path="/feed" component={Posts}/>
              <PrivateRoute path="/post/:id" component={Post}/>
              <Route component={NotFoundPage}/>
            </Switch>
           <Footer />
          </div>  
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;