import React, { useContext, useState } from "react"
import {UserContext} from "../context/UserContext"
import { Link } from "react-router-dom";



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
      <a href="https://www.w3schools.com">Lupa Akun ?</a> <br/>
      <Link to="/users">Daftar Sekarang</Link>

      </form>

    </div>
    </>
  )
}




export default Login