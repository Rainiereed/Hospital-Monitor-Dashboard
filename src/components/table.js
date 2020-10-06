import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import config from './../config';

const styles = theme => ({
  root: {
    width: '90%',
    marginTop: theme.spacing.unit * 1,
    overflowX: 'auto',
    marginLeft: theme.spacing.unit * 2.5,
    marginRight: theme.spacing.unit * 2.5,
  },
  table: {
    minWidth: 700,
    align: 'center'
  },
});

class SimpleTable extends Component {

  static refreshInterval = config.REFRESH_INTERVAL;

  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      current: null,
      errorMessage: null,
      data: []
    };
    this.intervalRef = null;
  }

  componentDidMount() {
    this.handleChange();
    this.initialiseTimer();
  }

  componentWillUnmount() {
    this.cancelTimer();
  }

  handleChange = async() => {
    let res = await axios.get(config.apiGateway.URL + '/space')
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({ data: res });
  }

  initialiseTimer() {
    this.intervalRef = setInterval(this.handleChange.bind(this), SimpleTable.refreshInterval);
  }

  cancelTimer() {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
    }
  }

  render() {
    return (
      <Grid container justify="center">
      <Paper className={this.props.classes.root}>
      <Table>
      <TableHead>
          <TableRow>
            <TableCell>Förlossningsklinik</TableCell>
            <TableCell align="right">Antal lediga platser</TableCell>
            <TableCell align="right">Totalt antal platser</TableCell>
            <TableCell align="right">Andel lediga platser</TableCell>
          </TableRow>
        </TableHead>
      <TableBody>{this.state.data.map(function(item, key) {
               return (
                  <TableRow key = {key}>
                        <TableCell align="right"> {item.name} </TableCell>
                        <TableCell align="right">{item.free}</TableCell>
                        <TableCell align="right">{item.total}</TableCell>
                        <TableCell align="right">{(100-(item.free/item.total*100)).toFixed() + '%'}</TableCell>
                  </TableRow>
                );

             })}
      </TableBody>
       </Table>
      </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(SimpleTable);
