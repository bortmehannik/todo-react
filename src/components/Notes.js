import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {FirebaseContext} from "../context/firebase/firebaseContext";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        margin: '0 auto',
        backgroundColor: theme.palette.background.paper,
    },
}));

export const Notes = ({notes, onRemove}) => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);
    const firebase = useContext(FirebaseContext);
    const [value, setValue] = useState('');

    const handleToggle = (note) => () => {
        const currentIndex = checked.indexOf(note);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(note);
        } else {
            newChecked.splice(currentIndex, 1);
            console.log('unchecked');
        }

        setChecked(newChecked);
        firebase.changeNote(note.id, note.title, !note.completed);
    };

    const submitHandler = (note) => event => {
        event.preventDefault();
        firebase.changeNote(note.id, value, note.completed);
    }

    return (
        <List className={classes.root}>
            {notes.sort((a, b) => a.title.localeCompare(b.title)).map((note) => {
                const labelId = `checkbox-list-label-${note}`;

                return (
                    <ListItem
                        key={note.id}
                        role={undefined}
                        dense
                        button
                    >
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={note.completed}
                                tabIndex={-1}
                                inputProps={{ 'aria-labelledby': labelId }}
                                onClick={handleToggle(note)}
                            />
                        </ListItemIcon>
                        <form
                            noValidate
                            autoComplete="off"
                            onSubmit={submitHandler(note)}
                            style={{width: '100%'}}
                        >
                            <TextField
                                id={note.id}
                                primary={note.title}
                                defaultValue={note.title}
                                className={note.completed ? 'completed no-border' : 'no-border'}
                                fullWidth
                                margin="normal"
                                onChange={e => setValue(e.target.value)}
                            />
                        </form>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => onRemove(note.id)}>
                                <DeleteForeverIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
}
