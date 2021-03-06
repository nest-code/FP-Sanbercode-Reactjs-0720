// LoginContext.js

import React, { createContext, useState, useEffect } from 'react';

export const LoginContext = createContext();

export const LoginProvider = props => {
    const [login, setLogin] = useState(localStorage.getItem('login') == 'true')
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))

    useEffect(() => {
        if (localStorage.getItem('login') === null) {
            setLogin(false)
        }
    }, [])

    return (
        <LoginContext.Provider value={[login, setLogin, userInfo, setUserInfo]}>
            {props.children}
        </LoginContext.Provider>
    )
}
