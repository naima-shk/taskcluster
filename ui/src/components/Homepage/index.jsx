import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from 'mdi-react/AccountCircleIcon';
import Button from '../Button';
import Landing from '../Landing';
import SignInDialog from '../SignInDialog';

@withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 10,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit * 5,
    },
  },
  headline: {
    fontFamily: 'Roboto500',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing.double,
      fontSize: 40,
    },
  },
  actions: {
    marginTop: theme.spacing.triple,
  },
  divider: {
    margin: ${theme.spacing.unit * 10}px 0 ${theme.spacing.triple}px,
    [theme.breakpoints.down('sm')]: {
      margin: ${theme.spacing.unit * 5}px 0 ${theme.spacing.double}px,
    },
  },
  icon: {
    fill: theme.palette.common.white,
    marginRight: theme.spacing.unit,
  },
  text: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
}))
export default class HomePage extends Component {
  state = {
    signInDialogOpen: false,
  };

  handleCloseSignInDialog = () => {
    this.setState({ signInDialogOpen: false });
  };

  handleOpenSignInDialog = () => {
    this.setState({ signInDialogOpen: true });
  };

  render() {
    const { classes } = this.props;
    const { signInDialogOpen } = this.state;

    return (
      <Landing className={classes.root}>
        <Hidden xsDown implementation="css">
          <Typography variant="h1" className={classes.headline}>
            {window.env.APPLICATION_NAME}
          </Typography>
        </Hidden>
        <Hidden smUp implementation="css">
          <Typography variant="h2" className={classes.headline}>
            {window.env.APPLICATION_NAME}
          </Typography>
        </Hidden>
        <Typography variant="h5" className={classes.text}>
          A task execution framework that supports Mozilla&apos;s continuous
          integration and release processes.
        </Typography>
        <Divider className={classes.divider} />
        <div className={classes.actions}>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleOpenSignInDialog}>
            <AccountCircleIcon
              className={classes.icon}
            />
            Sign in
          </Button>
          <SignInDialog
            open={signInDialogOpen}
            onClose={this.handleCloseSignInDialog}
          />
        </div>
      </Landing>
    );
  }
}
