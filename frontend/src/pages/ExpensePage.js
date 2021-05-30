import React from 'react';

function ExpensePage({ user }) {
    const { name } = user || {}; //user가 undefined, null 등이면 새 빈 오브젝트를 만든다.
    return (
        <h1>{name}의 가계부 페이지</h1>
    );
}

export default ExpensePage;
