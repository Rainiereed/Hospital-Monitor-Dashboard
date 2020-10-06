import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';
import config from './../config';
var lodash = require('lodash');

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 8,
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginLeft: theme.spacing.unit * 2.5,
    marginRight: theme.spacing.unit * 2.5,
  }
});

class SimpleButtons extends Component {

  constructor(props) {
    super(props);
    this.state = {
      beds: null,
      display: null
    };
  }

  componentDidMount() {
    this.handleChange();
  }

  handleChange = async event => {
    const propid = this.props.id;
    let res = await axios.get(config.apiGateway.URL + '/space')
      .then(function(response) {
        var picked = lodash.filter(response.data, x => x.id === propid);
        return picked;
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({ beds: res[0].free });
    this.setState({ display: res[0].name });
  };

  handleDecrease = async() => {
    let axiosConfig = {
      headers: {
        'Authorization': this.props.token
      }
    };
    let free = this.state.beds - 1;
    let res = await axios.post(config.apiGateway.URL + '/space/' + this.props.id, { "free": free }, axiosConfig)
      .then(function(response) {
        return response.data.free;
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({ beds: res });
  };

  handleIncrease = async() => {
    let axiosConfig = {
      headers: {
        'Authorization': this.props.token
      }
    };
    let free = this.state.beds + 1;
    let res = await axios.post(config.apiGateway.URL + '/space/' + this.props.id, { "free": free }, axiosConfig)
      .then(function(response) {
        return response.data.free;
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({ beds: res });
  };



  render() {
    let spots;

    if (!this.state.beds) {
      spots = ""
    }
    else {
      spots = this.state.beds
    }
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="subtitle1" gutterBottom className={classes.button}>
          Uppdatera antal tillgängliga platser på {this.state.display}
        </Typography>
      <div >
      <Fab color="primary" aria-label="Remove" className={classes.margin} onClick={this.handleDecrease}>
          <RemoveIcon />
        </Fab>
      <Typography component="h1" variant="h1" inline>
        {spots}
      </Typography>
      <Fab color = "primary"
      aria-label = "Add"
      className = { classes.margin } onClick = { this.handleIncrease }>
      <AddIcon />
      </Fab>
      </div>
            </div>
    );
  }
}

export default withStyles(styles)(SimpleButtons);
