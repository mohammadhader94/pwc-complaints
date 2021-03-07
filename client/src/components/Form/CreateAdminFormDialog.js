import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch} from "react-redux";
import {createAdmin} from "../../actions/auth";
import Grid from "@material-ui/core/Grid";


const CreateAdminFormDialog = () => {

    const [userData, setUserData] = useState({
        email: '', password: '', firstName: '', lastName: ''
    });

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value});
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        dispatch(createAdmin({...userData, role: 'admin'}));
        setUserData({
            email: '', password: '', firstName: '', lastName: ''
        });
        setOpen(false);
    };

    return (
        <Grid container alignItems="center">
            <Grid item>
                <Button size="large" variant="contained" color="primary" onClick={handleClickOpen}>
                    Create Admin
                </Button>
            </Grid>
            <Grid item>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create new admin</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Here you can create an admin who have access to update user's complaints status
                        </DialogContentText>

                        <TextField
                            margin="dense"
                            autoFocus
                            id="firstName"
                            label="First Name"
                            type="text"
                            required
                            name="firstName"
                            variant="outlined"
                            value={userData.firstName}
                            onChange={handleChange}
                        />

                        <TextField
                            margin="dense"
                            id="lastName"
                            label="Last Name"
                            type="text"
                            required
                            name="lastName"
                            variant="outlined"
                            value={userData.lastName}
                            onChange={handleChange}
                        />

                        <TextField
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            required
                            name="email"
                            variant="outlined"
                            fullWidth
                            value={userData.email}
                            onChange={handleChange}
                        />

                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid>
    );
};

export default CreateAdminFormDialog;
