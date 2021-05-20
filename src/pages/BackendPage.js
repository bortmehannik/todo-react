import React, {Fragment, useContext, useEffect} from 'react'
import {Form} from "../components/Form";
import {Notes} from "../components/Notes";
import {Container} from "@material-ui/core";
import {FirebaseContext} from "../context/firebase/firebaseContext";
import {Loader} from "../components/Loader";

export const BackendPage = () => {
    const {loading, notes, fetchNotes, removeNote} = useContext(FirebaseContext);

    useEffect(() => {
        fetchNotes();
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <Container>
                <Form />
                {loading
                    ? <Loader />
                    : <Notes notes={notes} onRemove={removeNote} />
                }
            </Container>
        </Fragment>
    )
}
