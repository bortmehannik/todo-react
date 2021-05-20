import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
        '& > * + *': {
            marginTop: theme.spacing(2)
        },
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '40px'
    },
}));

export const Loader = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <LinearProgress />
        </div>
    )
}
