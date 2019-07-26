import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  fab: {
    border:'transparent',
    backgroundColor:'#78c0d3;'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingActionButtons(props) {
  const classes = useStyles();


  return (
    <div>
      <Fab color="primary" aria-label="Add" style={{marginTop:'-30px',boxShadow:'none', border:'5px solid rgb(255, 255, 255)'}} className={classes.fab}>
        <AddIcon onClick={props.onClick}/>
      </Fab>
    </div>
  );
}