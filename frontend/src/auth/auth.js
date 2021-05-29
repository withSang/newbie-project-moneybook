import axios from 'axios';

// const users = [
//     { name : 'hello', userID : 'helloid', password : 'hellopwd'},
//     { name : 'good', userID : 'goodid', password : 'goodpwd'},
//     { name : 'morning', userID : 'morningid', password : 'morningpwd'},
// ];

// function signIn({userID, password}) {
//     const user = users.find(
//         (user) => user.userID === userID && user.password === password
//     );
//     if (user === undefined) throw new Error('No users found.');
//     return user;
// };


const signIn = ({userID, password}, setUser) => {
  // setUser({ name : 'hello', userID : 'helloid', password : 'hellopwd'}); return;
  axios.post("api/user/signin", {userID, password})
  .then((response) => {
    const user = response.data;
    if (user) {
      setUser(user);
    }
  });
};

export default signIn;