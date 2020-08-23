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
import Users from "../pages/Users"
import NotFound404 from '../pages/404';
import {LoginContext} from "../context/LoginContext"
import {Container} from '@material-ui/core';

const Section = () =>{
const [login] = useContext(LoginContext)
const PrivateRoute = ({user, ...props }) => {
  if (user) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};

  return(    
      <Switch>
        <Container maxWidth="lg" component="div" style={{ backgroundColor: '#fff',   margin:'18px auto 15px auto', padding: '25px'}} >
          <Route exact path="/" user={login} component={Home}/>
          <Route exact path="/home" user={login} component={Home}/>
          <Route exact path="/users"  user={login} component={Users}/>
          <Route exact path="/home2" user={login} component={Home2}/>
          <Route exact path="/login" user={login} component={Login}/>
          <PrivateRoute exact path="/login" user={login} component={Login}/>
          <PrivateRoute exact path="/users" user={login} component={Movies}/>
          <PrivateRoute exact path="/movies" user={login} component={Movies}/>
          <PrivateRoute exact path="/games" user={login} component={Games}/>
          <Route path='/404' component={NotFound404} />

          
      </Container>
      </Switch>
  )
}

export default Section