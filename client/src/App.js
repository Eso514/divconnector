import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Furniture from './components/furniture/Furniture';
import AddFurniture from './components/furniture/AddFurniture';
import {Cart} from './components/layout/Cart';
import SearchFurnature from './components/furniture/SearchFurnature';
import Red from './components/red/Red';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth'
import setAuthToken from './utils/setAuthToken';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './script';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return(
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/home/:word" component={Dashboard} />
              <AdminRoute exact path="/furniture/add" component={AddFurniture} />
              <PrivateRoute exact path="/mycart" component={Cart} />
              <Route exact path="/furniture/:id" component={Furniture} />
              <Route exact path="/furniture/search/:word" component={SearchFurnature} />
              <Route exact path="/" component={Red} />
              <Route exact path="/:word" component={Red} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
