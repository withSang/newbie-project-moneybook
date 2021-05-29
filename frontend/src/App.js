import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import signIn from './auth/auth';
// import axios from 'axios';

import AuthRoute from './routes/AuthRoute';
import Profile from './components/Profile';
import NavBar from './components/NavBar';

import LoginPage from './pages/LoginPage';
import ExpensePage from './pages/ExpensePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [user, setUser] = useState(null);
  let authenticated = user !== null;
  
  const login = ({userID, password}) => {signIn({userID, password}, setUser)};
  // const login = ({userID, password}) => {
  //   axios.post("api/user/signin", {userID, password})
  //   .then((response) => {
  //     const user = response.data;
  //     if (user) {
  //       setUser(user);
  //       alert(user);
  //     }
  //   });
  // };

  const logout = () => setUser(null);


  return (
    <Router>
      <header>
        <NavBar authenticated={authenticated} logout={logout}/>
      </header>

      <main>
        <Switch>
          <AuthRoute
            exact path="/profile"
            authenticated = {authenticated}
            render = {props => <Profile user={user} {...props} />}
          />
          <AuthRoute
            exact path="/moneybook"
            authenticated = {authenticated}
            render = {props => <ExpensePage user={user} {...props} />}
          />
          <Route
            exact path="/login"
            render={props => (
              <LoginPage authenticated={authenticated} login={login} {...props} />
            )}
          />
          <Route path="/">
            <NotFoundPage/>
          </Route>
        </Switch>
      </main>

    </Router>    
  );
}

export default App;
