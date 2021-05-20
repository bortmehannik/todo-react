import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {NavLink} from "react-router-dom";
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    menuLink: {
        marginRight: theme.spacing(2),
        color: '#ffffff',
        fontWeight: 'bold',
        textDecoration: 'none',
        '&.active': {
            textDecoration: 'underline'
        }
    },
    customToolbar: {
        padding: '0'
    }
}));

export const Navbar = () => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Container>
                <Toolbar className={classes.customToolbar}>
                    <NavLink
                        to={'/'}
                        className={classes.menuLink}
                        exact
                    >
                        ToDo with backend
                    </NavLink>
                    <NavLink
                        to={'/local'}
                        className={classes.menuLink}
                    >
                        ToDo with local
                    </NavLink>
                </Toolbar>
            </Container>
        </AppBar>
    )
};
