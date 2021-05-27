import React from 'react';
import {Route, Redirect} from 'react-router-dom';

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