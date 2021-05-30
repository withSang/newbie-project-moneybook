import React from 'react';
import {Route, Redirect} from 'react-router-dom';

// 로그인을 해야 볼 수 있는 컴포넌트들은 이 route를 거치도록 한다.

function AuthRoute({ authenticated, component: Component, render, ...rest}) {
    return (
        <Route
            {...rest}
            render = {(props) =>
                authenticated ? (
                    render ? (
                        render(props)
                    ) : (
                        <Component {...props}/>
                    )
                ) : (
                    <Redirect
                        //from 속성을 넘기는 이유는 로그인 후 원래 위치로 돌아가기 위해서.
                        to={{ pathname: "/login", state: { from: props.location } }}
                    />
                )
            }
        />
    )
}

export default AuthRoute;