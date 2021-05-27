// Todo: DB 연동
// sample authentication code (frontend)


const users = [
    { name : 'hello', user_id : 'helloid', password : 'hellopwd'},
    { name : 'good', user_id : 'goodid', password : 'goodpwd'},
    { name : 'morning', user_id : 'morningid', password : 'morningpwd'},
];

export default function signIn({user_id, password}) {
    const user = users.find(
        (user) => user.user_id === user_id && user.password === password
    );
    if (user === undefined) throw new Error('No users found.');
    return user;
};