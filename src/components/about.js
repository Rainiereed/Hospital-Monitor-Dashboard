import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

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

    let { mode, height, width, style, ...props } = this.props;
    let src = 'https://s3-eu-west-1.amazonaws.com/pictures.obtrax.net/team.png';
    let modes = {
      'fill': 'cover',
      'fit': 'contain'
    };
    let size = modes[mode] || 'contain';

    let defaults = {
      height: height || 300,
      width: width || 300,
      backgroundColor: 'gray'
    };

    let important = {
      backgroundImage: `url("${src}")`,
      backgroundSize: size,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto'
    };

    return (
      <Grid container justify="center">
        <Paper className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs>
                <Typography component="h2" variant="h2" align='left' gutterBottom>
                  Hej!
                </Typography>
                <Typography variant = "h4" gutterBottom align='left'>
                Vi vill förenkla ko-ordinering av vårdplatser i Stockholm.
                </Typography>
                <Typography variant="body1" gutterBottom align='left'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </Typography>
                </Grid>
                  <Grid item xs>
                    <div { ...props } style = { { ...defaults, ...style, ...important } }/>
                 <Typography variant="overline" gutterBottom>
                  Hayley, Tina och Sini
                </Typography>
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
