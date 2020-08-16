import React, {useContext} from "react"
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from "../pages/Home"
import Home2 from "../pages/Home2"
import Movies from "../pages/Movies"
import Games from "../pages/Games"
import Login from "../pages/Login"
import Modal from "../pages/Modal"
import Users from "../pages/Users"


import {UserContext} from "../context/UserContext"
import {Container} from '@material-ui/core';



const Section = () =>{

  const [user] = useContext(UserContext);

  const PrivateRoute = ({user, ...props }) => {
    if (user) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const LoginRoute = ({user, ...props }) =>
  user ? <Redirect to="/" /> : <Route {...props} />;


  return(    
      <Switch>
        <Container maxWidth="lg" component="div" style={{ backgroundColor: '#fff',   margin:'18px auto 15px auto', padding: '25px'}} >
          <Route exact path="/" user={user} component={Home}/>
          <Route exact path="/modal" user={user} component={Modal}/>
          <Route exact path="/users"  user={user} component={Users}/>


          <Route exact path="/home2" user={user} component={Home2}/>
          <LoginRoute exact path="/login" user={user} component={Login}/>
          <PrivateRoute exact path="/users" user={user} component={Movies}/>

          <PrivateRoute exact path="/movies" user={user} component={Movies}/>
          <PrivateRoute exact path="/games" user={user} component={Games}/>
      </Container>
      </Switch>
  )
}

export default Section