import React, { Fragment, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete'


const useStyles = makeStyles((theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        width: "100%",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    textField1: {
        width: "90%",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    dense: {
        marginTop: theme.spacing(6)
    },
    menu: {
        width: 200
    },
    row: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%"
    },
    column: {
        display: "flex",
        flexDirection: "column",
        flexBasis: "100%",
        flex: 1
    },

})));




const priority = [ "Low", "High", "Medium", "None" ];

const EditData = (props) => {

    console.log(props);
    const classes = useStyles(0);
    const [value, setValue] = React.useState(props.currentUser);
    console.log(value);

    useEffect(
        () => {
            setValue(props.currentUser)
        },
        [ props ]
      )

    const handleChange = (name) => (event) => {
        console.log('mydata');
        setValue({ ...value, [name]: event.target.value });
    };

    const handleSubmit = (id) =>{
        console.log(value);
        console.log(id)
        props.setEditing(true);
        props.EditDetails(id,value);
        props.handleClose();
    }

    return (
        <Fragment>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title"
            >           
                    <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Edit Task details</DialogContentText>
                        <label>Title</label>
                        <TextField
                            id="outlined-read-only-input"
                            label="Summary"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange('summary')}
                            value={value.summary}
                        />
                        <label>Description</label>
                        <TextField
                            id="outlined-read-only-input"
                            label="Description"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange('desc')}
                            value={value.desc}
                        />
                        <table>
                            <tr>
                                <td>
                                    <label>Due Date</label><br></br>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        id="outlined-read-only-input"
                                        label="Due Date"
                                        className={classes.textField1}
                                        margin="normal"
                                        variant="outlined"
                                         value={value.duedate}
                                        onChange={handleChange('duedate')}
                                        type="date"
                                    />
                                </td>
                                <td>
                                    <label >priority</label><br></br>
                                    <Autocomplete
                                        id="status"
                                        value={value.priority}
                                        options={priority}
                                        getOptionLabel={option => option}
                                        onChange={(event, priority) => {
                                            setValue({ ...value, priority });
                                        }}
                                        style={{ marginLeft: "10px", width: "220px" }}
                                        renderInput={params => <TextField {...params}
                                            label="Status"
                                            InputLabelProps={{ shrink: true }}
                                            margin="normal"
                                            variant="outlined"
                                            required={true}
                                        />}
                                    />
                                </td>
                            </tr>
                        </table>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose} variant="contained" color="primary">
                            Cancel
                        </Button>
                        <Button
                        onClick={()=> handleSubmit(props.users.id)}
                            variant="contained" color="secondary">
                            Save
                        </Button>
                    </DialogActions>
            </Dialog>
        </Fragment>
    );
}
export default EditData;