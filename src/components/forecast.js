import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ReferenceLine, RadialBarChart, RadialBar, Legend } from 'recharts';
const data = [{ name: '12:00', uv: 12, pv: 2400, amt: 2400 },
  { name: '15:00', uv: 11, pv: 2400, amt: 2400 },
  { name: '18:00', uv: 15, pv: 2400, amt: 2400 },
  { name: '21:00', uv: 16, pv: 2400, amt: 2400 },
  { name: '00:00', uv: 14, pv: 2400, amt: 2400 },
  { name: '03:00', uv: 4, pv: 2400, amt: 2400 },
  { name: '06:00', uv: 5, pv: 2400, amt: 2400 },
  { name: '09:00', uv: 6, pv: 2400, amt: 2400 },
];
const data2 = [{ name: '12:00', uv: 32, pv: 2400, amt: 2400 },
  { name: '15:00', uv: 41, pv: 2400, amt: 2400 },
  { name: '18:00', uv: 45, pv: 2400, amt: 2400 },
  { name: '21:00', uv: 66, pv: 2400, amt: 2400 },
  { name: '21:00', uv: 68, pv: 2400, amt: 2400 },
  { name: '00:00', uv: 39, pv: 2400, amt: 2400 },
  { name: '03:00', uv: 29, pv: 2400, amt: 2400 },
  { name: '06:00', uv: 19, pv: 2400, amt: 2400 },
  { name: '09:00', uv: 14, pv: 2400, amt: 2400 },
];

const data3 = [
  { name: '<2 min', uv: 7, pv: 4800, fill: '#e80b0b' },
  { name: '3-5 min', uv: 14, pv: 3908, fill: '#f79618' },
  { name: '5-10 min', uv: 10, pv: 9800, fill: '#ffc658' },
  { name: 'irregular', uv: 19, pv: 4800, fill: '#d0ed57' }

];

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '90%',
    overflowX: 'auto',
    marginLeft: theme.spacing.unit * 2.5,
    marginRight: theme.spacing.unit * 2.5,
    marginTop: 20,
    //align: 'center'
  },
});

class About extends Component {

  render() {

    const { classes } = this.props;

    const style = {
      top: 0,
      //left: 350,
      left: 300,
      lineHeight: '24px'
    };

    return (
      <Grid container justify="center">

          <Paper className={classes.root}>
            <Grid container spacing={0} alignItems="center" justify="center">
                  <Grid item xs>
                  <Typography variant="h5" gutterBottom component="h2">
                    Rapporterad progress
                  </Typography>
                	<RadialBarChart width={600} height={300} cx={150} cy={150} innerRadius={20} outerRadius={150} barSize={60} data={data3}>
                    <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise={true} dataKey='uv'/>
                    <Legend iconSize={10} width={120} height={140} layout='vertical' wrapperStyle={style}/>
                    </RadialBarChart>
                </Grid>
              </Grid>
              </Paper>

      <Paper className = { classes.root } >
      <Grid container spacing={24}>
              <Grid item xs>
                  <Typography variant="h5" gutterBottom component="h2">
                    Beräknat antal inkomande patienter till Uppsala
                  </Typography>
                  <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ReferenceLine y={13} stroke="red" strokeDasharray="3 3" />
                  </LineChart>
                </Grid>
              </Grid>
            </Paper>

      <Paper className = { classes.root } >
      <Grid container spacing={24}>
          <Grid item xs>
              <Typography variant="h5" gutterBottom component="h2">
                    Beräknat antal inkomande patienter för regionen
              </Typography>
                <LineChart width={600} height={300} data={data2} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <ReferenceLine y={60} stroke="red" strokeDasharray="3 3" />
                  <YAxis />
                </LineChart>
                </Grid>
              </Grid>
            </Paper>
      </Grid>
    )
  }


}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
