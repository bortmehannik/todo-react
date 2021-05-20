import React, {useContext} from 'react';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {AlertContext} from "../context/alert/alertContext";
import {Container} from "@material-ui/core";

export const Alerts = () => {
    const {alert, hide} = useContext(AlertContext);

    if (!alert.visible) {
        return null;
    }

    return (
        <Container>
            <Alert
                variant="outlined"
                severity={alert.type || 'warning'}
                style={{marginTop: '20px'}}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={hide}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {alert.text}
            </Alert>
        </Container>
    );
}
