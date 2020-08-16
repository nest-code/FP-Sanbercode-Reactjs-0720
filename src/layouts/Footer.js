import React from "react"
import {Paper, Tabs} from '@material-ui/core';
import {Tab} from '@material-ui/core';

const Footer = () =>{
  return (
    <Paper>
      <Tabs
        indicatorColor="danger"
        textColor="danger"
        centered
      >
        Haloo
          
        <Tab label="Footer" />
      </Tabs>
    </Paper>
  )
}

export default Footer