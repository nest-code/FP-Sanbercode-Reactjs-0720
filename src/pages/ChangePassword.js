import React, { useState, useContext } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { LoginContext } from './LoginContext';
import axios from 'axios';
import './css/style.css';

const ChangePassword = () => {
    const [userInfo, setUserInfo] = [useContext(LoginContext)[2], useContext(LoginContext)[3]]
    const [password, setPassword] = useState("")
    const [output, setOutput] = useState(<> </>)

    const formStyle = {
        width: "50%",
        height: "50%",
        transform: "translate(-50%, -50%)",
        top: "60%",
        left: "50%",
        position: "relative"
    }

    const handleChange = (x, event) => {
        x(event.target.value)
    }

    const handleChangePassword = (event) => {
        event.preventDefault()
        let newPass = { password: password }

        if (userInfo.password !== newPass.password) {
            axios.put(` https://backendexample.sanbersy.com/api/users/${userInfo.id} `, newPass)
                .then(res => {
                    console.log(res)
                    localStorage.setItem('userInfo', JSON.stringify(res.data))
                    setUserInfo(res.data)
                    setPassword("")
                    setOutput(<Typography variant="caption" color="primary"> <br /> Success! </Typography>)
                })
        } else {
            setOutput(<Typography variant="caption" color="secondary"> <br /> Old Password and New Password cannot be same! </Typography>)
        }
    }

    return (
        <>
            <section>
                <form autoComplete="off" noValidate style={formStyle} onSubmit={handleChangePassword}>
                    <TextField id="standard-password-input" label="New Password" type="password" autoComplete="off" value={password} onChange={(e) => handleChange(setPassword, e)} /> <br /> <br />
                    <Button type="submit" variant="outlined"> Change </Button> <br />
                    {output}
                </form>
            </section>
        </>
    )
}

export default ChangePassword
