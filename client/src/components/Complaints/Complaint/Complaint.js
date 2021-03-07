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
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

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
    readOnly: true,
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

const Complaint = ({complaintData}) => {

    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getStatusChip = (status) => {
        if(status === "Dismissed") {
            return <Chip label="Dismissed" color="secondary"/>
        } else if (status === "Resolved"){
            return <Chip label="Resolved" color="primary" />
        } else {
            return <Chip label="Pending"/>
        }
    };

    return (
        <Container>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                View Complaint
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">View Complaint</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        We are sorry you went through a hard time in PWC. Here is your detailed complaint:
                    </DialogContentText>
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        required
                        name="title"
                        variant="outlined"
                        value={complaintData.title}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disabled={true}
                            value={complaintData.dateOfIncidence}
                            placeholder="MM/dd/yyyy"
                            format="MM/dd/yyyy"
                        />
                    </MuiPickersUtilsProvider>

                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                        margin="dense"
                        id="location-of-incidence"
                        label="Location of incidence"
                        type="text"
                        fullWidth
                        required
                        name="locationOfIncidence"
                        value={complaintData.locationOfIncidence}
                    />

                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                        margin="dense"
                        id="description"
                        label="Description"
                        multiline
                        rows={4}
                        placeholder="Describe here"
                        fullWidth
                        name="description"
                        value={complaintData.description}
                    />

                    <div>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id="categories-label">Categories</InputLabel>
                            <Select
                                labelId="categories-label"
                                id="categories"
                                multiple
                                value={complaintData.applicableCategories}
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
                        control={<Checkbox checked={complaintData.hasReportedBefore}
                                           name="hasReportedBefore"/>}
                        label="Is this a recurring issue?"
                        labelPlacement="start"
                        disabled={true}

                    />

                    <Container>
                        <Grid container justify="center" alignItems="flex-start" >
                            <Grid item>
                                <Typography variant="h3" >
                                    Status:
                                </Typography>
                            </Grid>
                            <Grid item >
                                <Typography variant="h3">
                                    {getStatusChip(complaintData.status)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Complaint;
