import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {makeStyles, useTheme} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {useDispatch} from "react-redux";
import {createComplaint} from "../../actions/complaintsActions";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const categories = [
    'Harassment',
    'Bullying',
    'Body Shaming',
    'Violence',
    'Death threats'
];

const getStyles = (category, categories, theme) => {
    return {
        fontWeight:
            categories.indexOf(category) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
};

const ComplaintFormDialog = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    const [complaintData, setComplaintData] = useState({
        title: '',
        locationOfIncidence: '',
        dateOfIncidence: new Date(),
        hasReportedBefore: false,
        applicableCategories: [],
        description: '',
        creatorName: user?.result?.name
    });

    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setComplaintData({...complaintData, [event.target.name]: value});
    };

    const handleDateChange = (date) => {
        setComplaintData({...complaintData, dateOfIncidence: date});
    };

    const handleCategoryChange = (event) => {
        setComplaintData({...complaintData, applicableCategories: event.target.value});
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        dispatch(createComplaint (complaintData));
        setComplaintData({
            title: '',
            locationOfIncidence: '',
            dateOfIncidence: new Date(),
            hasReportedBefore: false,
            applicableCategories: [],
            description: ''
        });
        setOpen(false);
    };

    return (
        <div>
            <Button size="large" variant="contained" color="primary" onClick={handleClickOpen}>
                Add Complaint
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new Complaint</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        We are sorry you went through a hard time in PWC. Feel free to submit a complaint about whatever
                        is bothering you.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        required
                        name="title"
                        value={complaintData.title}
                        onChange={handleChange}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            clearable
                            value={complaintData.dateOfIncidence}
                            placeholder="MM/dd/yyyy"
                            onChange={date => handleDateChange(date)}
                            format="MM/dd/yyyy"
                        />
                    </MuiPickersUtilsProvider>

                    <TextField
                        margin="dense"
                        id="location-of-incidence"
                        label="Location of incidence"
                        type="text"
                        fullWidth
                        required
                        name="locationOfIncidence"
                        value={complaintData.locationOfIncidence}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        multiline
                        rows={4}
                        placeholder="Describe here"
                        variant="outlined"
                        fullWidth
                        name="description"
                        value={complaintData.description}
                        onChange={handleChange}
                    />

                    <div>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id="categories-label">Categories</InputLabel>
                            <Select
                                labelId="categories-label"
                                id="categories"
                                multiple
                                value={complaintData.applicableCategories}
                                onChange={handleCategoryChange}
                                input={<Input id="select-multiple-chip"/>}
                                renderValue={(selected) => (
                                    <div className={classes.chips}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} className={classes.chip}/>
                                        ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}
                                              style={getStyles(category, complaintData.applicableCategories, theme)}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <FormControlLabel
                        control={<Checkbox checked={complaintData.hasReportedBefore} onChange={handleChange}
                                           name="hasReportedBefore"/>}
                        label="Is this a recurring issue?"
                        labelPlacement="start"

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
        </div>
    );
};

export default ComplaintFormDialog;
