import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import signIn from './auth/auth';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton'; 
import AuthRoute from './routes/AuthRoute';
import Profile from './components/Profile';

function App() {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const login = ({user_id, password}) => setUser(signIn({ user_id, password }));
  const logout = () => setUser(null);

  return (
    <Router>
      <header>
        {authenticated ? (
          <div>
            <LogoutButton logout={logout} />
            <Link to="/profile">
              <button>프로필</button>
            </Link> 
          </div>
          
        ) : (
          <Link to="/login">
            <button>로그인</button>
          </Link>
        )}
      </header>

      <Switch>
        <AuthRoute
          authenticated = {authenticated}
          path = "/profile"
          render = {props => <Profile user={user} {...props} />}
        />
        <Route
          path="/login"
          render={props => (
            <LoginForm authenticated={authenticated} login={login} {...props} />
          )}
        />
      </Switch>

    </Router>    
  );
}

export default App;
