import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import axios from 'axios';

import AuthRoute from './routes/AuthRoute';
import Profile from './components/Profile';
import NavBar from './components/NavBar';

import LoginPage from './pages/LoginPage';
import ExpensePage from './pages/ExpensePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [user, setUser] = useState(null);
  let authenticated = user !== null;
  const login = ({userID, password}) => {
  
    // // #1 잘 동작하는 코드
    // setUser({name: 'testName', userID: 'testID'});

    // // #2 Promise를 넣었더니 로그인이 안 됨
    
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve();
    //     }, 1000);
    //   }).then(()=>{
    //     setUser({name: 'testNme', userID: 'testID'})
    //   });

    // #3 마찬가지로 Promise를 써야 하는 api에서 로그인이 안 됨
    axios.post("api/user/signin", {userID, password})
    .then((response) => {
      const user = response.data;
      if (user) {
        setUser(user);
        alert('로그인 되었습니다.');
      } else {
        throw new Error('로그인 실패!');
      }
    });

  };

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
