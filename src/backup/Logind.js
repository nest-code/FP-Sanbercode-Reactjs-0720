import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core/Dialog';

class Login extends Component {
  render() {
    return (
      <Dialog 
        open 
        onRequestClose=
        fullScreen=\
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send
            updates occationally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.toggleLogin} color="primary">
            Cancel
          </Button>
          <Button onClick={this.props.toggleLogin} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Login ;