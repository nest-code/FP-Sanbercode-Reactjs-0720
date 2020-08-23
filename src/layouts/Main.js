import React from "react"
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header"
import Section from "./Section"
import Footer from "./Footer"
// import Sidebar from "./Sidebar"
import {Box} from '@material-ui/core';


const Main = () =>{
  return(
    <>
      <Router>    
        <Header/>
          <Box>
           {/* <Sidebar/> */}
            <Section/>
            <Footer/>
          </Box>
      </Router>
    </>
  )
}

export default Main