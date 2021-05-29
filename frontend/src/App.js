import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import AuthRoute from './routes/AuthRoute';
import Profile from './components/Profile';
import NavBar from './components/NavBar';

import LoginPage from './pages/LoginPage';
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
              <LoginPage authenticated={authenticated} user={user} setUser={setUser} {...props} />
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
