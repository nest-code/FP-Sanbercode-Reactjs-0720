import React, { useContext, useState } from "react"
import {UserContext} from "../context/UserContext"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Login = () =>{
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({username: "" , password: ""})

  const handleSubmit = (event) =>{
    event.preventDefault()
    if (input.username === "admin" && input.password === "admin"){
      setUser({username: input.username})
      localStorage.setItem("user", JSON.stringify({username: "admin", password: "admin"}))
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
      <form onSubmit={handleSubmit}>

        <label>Username: </label>
        <input type="text" name="username" onChange={handleChange} value={input.username}/>
        <br/>
        <label>Password: </label>
        <input type="password" name="password" onChange={handleChange} value={input.password}/>
        <br/>
        <button>Login</button>
      </form>

      <Card >
        <CardContent>
          
          <Typography color="textSecondary" gutterBottom>
            Word of the Day
          </Typography>

          <Typography variant="h5" component="h2">
          </Typography>

          <Typography color="textSecondary">
            adjective
          </Typography>

          <Typography variant="body2" component="p">
            well meaning and kindly.
          </Typography>

        </CardContent>

        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>

      </Card>
      
    </>
  )
}




export default Login