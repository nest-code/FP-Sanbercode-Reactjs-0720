import React, { useContext } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import {AppBar, Toolbar, Tabs,Tab,Typography, Button} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(6),
  },
  title: {
    flexGrow: 1,
  },
}));

const Headers =() =>{
  const [user, setUser] = useContext(UserContext)
  const handleLogout = () =>{
    setUser(null)
    localStorage.removeItem("user")
  }

  return(    
    <header>
      <AppBar position="static">
            <Toolbar>
            <IconButton edge="start" className={useStyles.menuButton} color="inherit" aria-label="menu">
            MOVIE & GAME
            </IconButton>
            {/* <Tabs>
              <Tab label="Item 1" /><Link>List Movie</Link>
              <Tab label="Item 2" />
              <Tab label="Item 3" />
              <Tab label="Item 4" />

              
            </Tabs> */}
                <Link to="/">List Movie</Link>
                <Link to="/home2">List Game</Link>
                { user && <Link to="/movies">Movie List Editor </Link>}
                { user && <Link to="/games">Game List Editor</Link>}
                { user === null && <Link to="/login">Login </Link>}
                { user && <a style={{cursor: "pointer"}} onClick={handleLogout}>Logout </a>}
            </Toolbar>
      </AppBar>
    </header>
  )
}

export default Headers