import React, { useContext, useState } from "react"
import {UserContext} from "../context/UserContext"
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const Login = () =>{
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({username: "" , password: ""})
  const handleSubmit = (event) =>{
    event.preventDefault()
    if (input.username === "admin" && input.password === "admin"){
      setUser({username: input.username})
      localStorage.setItem("user", JSON.stringify({username: "admin", password: "admin"}))
      alert("Berhasil Login")
    }else{
      alert("username dan password gagal")
    }
  }

  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "username":{
        setInput({...input, username: value})
        break;
      }
      case "password":{
        setInput({...input, password: value})
        break;
      }
      default:{break;}
    }
  }

  return(
    <>

      <form className={useStyles.root}  noValidate autoComplete="off">
        <TextField id="standard-basic" label="Standard" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </form>

      <div class="login">

     
      <form onSubmit={handleSubmit}>

      <label>Username: </label>
      <input type="text" name="username" onChange={handleChange} value={input.username}/>
      <br/>

      <label>Password: </label>
      <input type="password" name="password" onChange={handleChange} value={input.password}/>
      <br/>


      <button class="btn">Login</button>
      <br/>
      <br/>


      <a href="https://www.w3schools.com">Lupa Akun ?</a> <br/><br/>
      <Link to="/users">Daftar Sekarang</Link>

      </form>

    </div>
    </>
  )
}




export default Login