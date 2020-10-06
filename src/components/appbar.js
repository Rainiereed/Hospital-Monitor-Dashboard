import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SimpleButtons from '../components/buttons';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import EmailIcon from '@material-ui/icons/Email';
import PublicIcon from '@material-ui/icons/Public';
import StarIcon from '@material-ui/icons/Star';
import InfoIcon from '@material-ui/icons/Info';
import { Auth } from "aws-amplify";
import config from './../config';
import SimpleTable from './table';
import AboutTab from './about';
import Contact from './forecast';
import axios from 'axios';
var lodash = require('lodash');

Auth.configure(config.awsmobile);

const styles = {
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  textField: {
    marginLeft: 20,
    marginRight: 20,
  },
};

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

function Table(props) {
  return (
    <div >
      <SimpleTable/>
    </div>
  );
}

function About(props) {
  return (
    <div >
    <AboutTab/>
  </div>
  );
}

function ContactTab(props) {
  return (
    <div >
    <Contact/>
  </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class ButtonAppBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      settingsOpen: false,
      hospital: 'x',
      username: '',
      secret: '',
      display: '',
      isAuthenticated: false,
      userHasAuthenticated: false,
      isAuthenticating: true,
      token: null,
      id: null,
      value: 0,
      left: false,
      newdisplay: '',
      newtotal: 0
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  async setInfo() {
    const self = this;
    let res = await axios.get(config.apiGateway.URL + '/space')
      .then(function(response) {
        console.log('whats wrong with res');
        console.log(response);
        console.log(self.state.id);
        var picked = lodash.filter(response.data, x => x.id === self.state.id);
        return picked;
      })
      .catch(function(error) {
        console.log(error);
      });

    console.log('whats wrong with res');
    console.log(res[0]);

    this.setState({
      display: res[0].name,
      newdisplay: res[0].name,
      newtotal: res[0].total
    });
  }

  async componentDidMount() {
    try {
      let session = await Auth.currentSession();
      this.setState({
        token: session.idToken.jwtToken,
        id: session.accessToken.payload.sub,
        isAuthenticated: true,
        value: 0
      });
      this.setInfo();
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    this.setState({
      isAuthenticating: false
    });
  }

  toggleDrawer = (open) => () => {
    this.setState({
      left: open,
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleSettingsOpen = () => {
    this.setState({ settingsOpen: true });
  };

  handleSettingsClose = () => {
    this.setState({ settingsOpen: false });
  };

  handleUpdate = async() => {
    let axiosConfig = {
      headers: {
        'Authorization': this.state.token
      }
    };
    await axios.post(config.apiGateway.URL + '/space/' + this.state.id, { "name": this.state.newdisplay, "total": this.state.newtotal }, axiosConfig)
      .catch(function(error) {
        console.log(error);
      });
    this.setState({ settingsOpen: false });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAuth = async(event) => {
    try {
      const user = await Auth.signIn(this.state.username, this.state.secret);

      this.setState({
        isAuthenticated: true,
        token: user.signInUserSession.idToken.jwtToken,
        id: user.attributes.sub,
        value: 0
      });
    }
    catch (e) {
      console.log('ooops, didnt work', e);
      alert(e.message);
    }
    this.setInfo();
    this.setState({
      open: false
    });
  };

  handleLogOut = async() => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;



    return (
      <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton className={classes.menuButton} onClick={this.toggleDrawer(true)} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Tabs  value={value} onChange={this.handleTabChange} color="inherit" >
            <Tab label="Förlossningskliniker Stockholm" />
            <Tab label="Prognos" />
            <Tab label="Om oss" />
          </Tabs>
          <Typography variant="h5" color="inherit" className={classes.grow}>
          </Typography>
          {this.state.isAuthenticated
          ? <Button color="inherit" onClick={this.handleLogOut} >Logga ut</Button>
          : <Button color="inherit" onClick={this.handleClickOpen} >Logga in</Button>}
        </Toolbar>
      </AppBar>

        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
      <div className={classes.list}>
        <List>
            <ListItem button key='Start' onClick={(e) => this.handleTabChange(e,0)}>
              <ListItemIcon>{<StarIcon/>}</ListItemIcon>
              <ListItemText primary='Start' />
            </ListItem>
            {this.state.isAuthenticated ?
              <ListItem button key='Inställningar' onClick={() => this.handleSettingsOpen()}>
                <ListItemIcon>{<SettingsIcon/>}</ListItemIcon>
                <ListItemText primary='Inställningar' />
              </ListItem>
            : null}
            <ListItem button key='Prognos' onClick={(e) => this.handleTabChange(e,1)}>
              <ListItemIcon>{<EmailIcon/>}</ListItemIcon>
              <ListItemText primary='Prognos' />
            </ListItem>
            <ListItem button key='Blog' onClick={()=> window.open("http://google.com", "_blank")}>
              <ListItemIcon>{<PublicIcon/>}</ListItemIcon>
              <ListItemText primary='Blog' />
            </ListItem>
            <ListItem button key='Om oss' onClick={(e) => this.handleTabChange(e,2)}>
              <ListItemIcon>{<InfoIcon/>}</ListItemIcon>
              <ListItemText primary='Om oss' />
            </ListItem>
        </List>
      </div>
          </div>
        </SwipeableDrawer>

      <div className = { classes.root } >
      {(this.state.isAuthenticated && this.state.value === 0)
          ? <SimpleButtons hospital={this.state.hospital} token={this.state.token} id={this.state.id} isAuthenticated={this.state.isAuthenticated} display={this.state.display}/>
          : null}
      </div>
       <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"

        >
          <DialogTitle id="form-dialog-title">Logga in</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ange användarnamn och lösenord för att logga in.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="username"
              label="Användarnamn"
              type="text"
              fullWidth
              variant="outlined"
              name = "username"
              value={ this.state.username }
              onChange={this.handleChange('username')}
            />
            <TextField
              required
              margin="dense"
              id="password"
              label="Lösenord"
              type="password"
              fullWidth
              variant="outlined"
              name = "secret"
              value={ this.state.secret }
              onChange={this.handleChange('secret')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Avbryt
            </Button>
            <Button onClick={this.handleAuth} color="primary">
              Logga in
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.settingsOpen}
          onClose={this.handleSettingsClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Inställningar</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Här kan du uppdatera namnet på kliniken samt det totala antalet vårdplatser.
            </DialogContentText>
            <TextField
              autoFocus
              id="outlined-uncontrolled"
              label='Namn'
              className={classes.textField}
              value={this.state.newdisplay}
              onChange={this.handleChange('newdisplay')}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-number"
              label="Antal platser"
              value={this.state.newtotal}
              onChange={this.handleChange('newtotal')}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSettingsClose} color="primary">
              Avbryt
            </Button>
            <Button onClick={this.handleUpdate} color="primary">
              Uppdatera
            </Button>
          </DialogActions>
        </Dialog>
        { value === 1 && <ContactTab/> }
        { value === 0 && <Table/> }
        { value === 2 && <About/> }
    </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);

