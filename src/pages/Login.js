import React, { useContext, useState } from "react"
import { TextField, Button, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import {LoginContext} from "../context/LoginContext"

const Login = props => {
    const [setLogin, setUserInfo] = [useContext(LoginContext)[1], useContext(LoginContext)[3]]
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [output, setOutput] = useState()
    const history = useHistory()

const handleChange = (x, event) => {
    x(event.target.value.trim())
}

const handleLogin = (event) => {
    event.preventDefault()
    setOutput()
    axios.post(' https://backendexample.sanbersy.com/api/login ', { username: username, password: password })
        .then(res => {
            if (username === res.data.username && password === res.data.password) {
                localStorage.setItem('login', true)
                setLogin(true)
                localStorage.setItem('userInfo', JSON.stringify(res.data))
                setUserInfo(res.data)
                setUsername("")
                setPassword("")
                console.log(res)
            } else {
                setOutput(<Typography variant="caption" color="secondary" style={{ width: "300px" }}> <br /> Username or password is incorrect! <br /> </Typography>)
            }
        })
}


  return(
    <>
        <div class="login">
            <form autoComplete="off"  onSubmit={handleLogin}>
                <TextField required label="Username" value={username} onChange={(e) => handleChange(setUsername, e)} autoFocus /> <br />
                <TextField required label="Password" type="password" autoComplete="off" value={password} onChange={(e) => handleChange(setPassword, e)} />                     
                <Button type="submit" variant="outlined"> Login </Button>
                {output}
                <Link to="/users">Don't have account, Register Now</Link>
            </form>
        </div>
    </>
  )
}

export default Login