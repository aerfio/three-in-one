import React from "react";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      flexGrow: 1,
      textAlign: "center",
    },
  }),
);

const Footer: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div>
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.footer}>
          Three in one dla Dr Domańskiego :)
        </Typography>
      </Toolbar>
    </div>
  )
}

export default Footer;
