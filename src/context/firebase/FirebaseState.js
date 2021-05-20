import React, {useReducer} from 'react';
import axios from 'axios';
import {FirebaseContext} from "./firebaseContext";
import {firebaseReduser} from "./firebaseReducer";
import {ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER, HIDE_LOADER} from "../types";

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({children}) => {
    const initialState = {
        notes: [],
        loading: false
    }
    const [state, dispatch] = useReducer(firebaseReduser, initialState);
    const showLoader = () => dispatch({type: SHOW_LOADER});
    const hideLoader = () => dispatch({type: HIDE_LOADER});

    const fetchNotes = async () => {
        showLoader();
        const res = await axios.get(`${url}/notes.json`);
        if (!res.data) {
            hideLoader();
        } else {
            const payload = Object.keys(res.data).map(key => {
                return {
                    ...res.data[key],
                    id: key
                }
            });
            dispatch({type: FETCH_NOTES, payload});
        }
    }

    const addNote = async title => {
        const note = {
            title,
            completed: false
        }

        try {
            const res = await axios.post(`${url}/notes.json`, note);
            const payload = {
                ...note,
                id: res.data.name
            }
            dispatch({type: ADD_NOTE, payload});
        } catch (e) {
            throw new Error(e.message);
        }
    }

    const changeNote = async (id, title, state) => {
        await axios.put(`${url}/notes/${id}.json`, {
            title: title,
            completed: state
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            });
        fetchNotes();
    }

    const removeNote = async id => {
        await axios.delete(`${url}/notes/${id}.json`);

        dispatch({
            type: REMOVE_NOTE,
            payload: id
        });
    }

    return (
        <FirebaseContext.Provider value={{
            showLoader, fetchNotes, addNote, removeNote, changeNote,
            loading: state.loading,
            notes: state.notes
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}
