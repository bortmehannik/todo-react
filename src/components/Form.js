import React, {useState, useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import {Container, makeStyles} from "@material-ui/core";
import {AlertContext} from "../context/alert/alertContext";
import {FirebaseContext} from "../context/firebase/firebaseContext";

const useStyles = makeStyles((theme) => ({
    noteTitle: {
        marginTop: theme.spacing(2)
    }
}));

export const Form = () => {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const alert = useContext(AlertContext);
    const firebase = useContext(FirebaseContext);

    const submitHandler = event => {
        event.preventDefault();

        if (value.trim()) {
            firebase.addNote(value.trim()).then(() => {
                alert.show('Note added successfully', 'success');
            }).catch((e) => {
                console.log(e.message);
                alert.show('Something went wrong', 'error');
            });
            setValue('');
        } else {
            alert.show('Enter note title', 'error');
        }
    }

    return (
        <Container>
            <form
                noValidate
                autoComplete="off"
                onSubmit={submitHandler}
            >
                <TextField
                    id="standard-basic"
                    label="Enter a title for the note"
                    fullWidth
                    className={classes.noteTitle}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </form>
        </Container>
    )
}
