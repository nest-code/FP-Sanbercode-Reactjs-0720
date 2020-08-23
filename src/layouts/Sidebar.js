import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 00,
  },
}));

const Sidebar = () =>{

  const classes = useStyles();

  return (
    <div >
      <Grid container spacing={3}>
      <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
      
      </Grid>
    </div>
  );
}
export default Sidebar