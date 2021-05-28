import axios from 'axios';
import { APIBaseUrl } from '../settings';

// const users = [
//     { name : 'hello', userID : 'helloid', password : 'hellopwd'},
//     { name : 'good', userID : 'goodid', password : 'goodpwd'},
//     { name : 'morning', userID : 'morningid', password : 'morningpwd'},
// ];
// 
// function signIn_fake({userID, password}) {
//     const user = users.find(
//         (user) => user.userID === userID && user.password === password
//     );
//     if (user === undefined) throw new Error('No users found.');
//     return user;
// };


function signIn({userID, password}) {
    axios.get(APIBaseUrl + "/user/signin",
    {
        userID: userID,
        password: password
    }).then((response) => {
        const user = response.data;
        if (!user) {
            throw new Error('Login failed');
        }
        return user;
    })
    return;
}


export default signIn;