import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import {updateComplaint} from "../../../actions/complaintsActions";
import Radio from "@material-ui/core/Radio";
import {useDispatch} from "react-redux";


const StatusUpdate = ({complaintData}) => {
    const dispatch = useDispatch();

    const [status, setStatus] = useState(complaintData.status);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        dispatch(updateComplaint(complaintData._id, {...complaintData, status}));
        setOpen(false);
    };

    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    return (
        <div>
            <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
                Update Status
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Status</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please update the status of the complaint:
                    </DialogContentText>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Status</FormLabel>
                        <RadioGroup aria-label="status" name="status" value={status} onChange={handleChange}>
                            <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
                            <FormControlLabel value="Resolved" control={<Radio />} label="Resolved" />
                            <FormControlLabel value="Dismissed" control={<Radio />} label="Dismissed" />
                        </RadioGroup>
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default StatusUpdate;
