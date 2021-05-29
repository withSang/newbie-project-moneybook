import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import AuthRoute from './routes/AuthRoute';
import NavBar from './components/NavBar';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ExpensePage from './pages/ExpensePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [user, setUser] = useState(null);
  let authenticated = user !== null;
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
            render = {props => <ProfilePage user={user} setUser={setUser} {...props} />}
          />
          <AuthRoute
            exact path="/moneybook"
            authenticated = {authenticated}
            render = {props => <ExpensePage user={user} {...props} />}
          />
          <Route
            exact path="/login"
            render={props => (
              <LoginPage authenticated={authenticated} setUser={setUser} {...props} />
            )}
          />
          <Route
            exact path="/register"
            render={props => (
              <RegisterPage {...props}/>
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
