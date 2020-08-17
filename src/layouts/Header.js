import React, { useContext } from "react"
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import {AppBar, Toolbar, Tabs,Tab} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';


const Headers =() =>{
  const [user, setUser] = useContext(UserContext)
  const handleLogout = () =>{
    setUser(null)
    localStorage.removeItem("user")
    alert("Berhasil Logout")
  }

  return(    
    <header>
      <AppBar position="static">
            <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" to='/' component={Link} >
            MOVIE & GAME
            </IconButton>
            <Tabs>
              <Tab label="List Movie" to='/' component={Link} />
              <Tab label="List Game" to='/home2' component={Link} />
              { user && <Tab label="Movie List Editor" to='/movies' component={Link} />}
              { user && <Tab label="Game List Editor" to='/games' component={Link} />}
              { user === null && <Tab label="Login" to='/login' component={Link} />}
              { user && <Tab label="Logout" onClick={handleLogout} />}
            </Tabs>
            </Toolbar>
      </AppBar>
    </header>
  )
}

export default Headers