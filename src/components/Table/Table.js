import React, { Fragment } from 'react'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import EditData from '../AddToDoData/EditData';

const useStyles = makeStyles((theme => ({
    table: {
        columnWidth:20,
        Width: '30px',
     alignContent:'center'
    
    //    table-layout: fixed 
      },
    button: {
        margin: theme.spacing(1),
        width: 10,
        alignContent: 'center'
    },

})));


const Tabledata = (props) => {

    const classes = useStyles(0);
    const [open, setOpen] = React.useState(false);
    const initialFormState = { id: null, summary: '', desc: '', duedate: '', priority: '', status: false };
    const [currentUser, setCurrentUser] = React.useState(initialFormState);
    const [users, setUsers] = React.useState(props.todo);
    const [editing, setEditing] = React.useState(false);
  
    function handleClose() {
        setOpen(false);
    }
    
    //Edit function
    const EditDetails = (id, updateduser) => {
        props.updatedList(id,updateduser);
    }
     console.log(users);

     //update row function
    const updateRow = user => {
        console.log(user)
        setOpen(true);
        setEditing(true);
        setCurrentUser({
            summary: user.summary,
            desc: user.desc,
            duedate: user.duedate,
            priority: user.status,
            status: false
        });
    }

    return (
        <Fragment>
            <Paper>        
            <Table className={classes.table} >
              <TableBody>
                        <TableRow Row key={props.todo.id}>       
                            <TableCell align="center">{props.todo.summary}</TableCell>
                            <TableCell align="left"> {props.todo.desc}</TableCell>
                            <TableCell align="left"> {props.todo.duedate} </TableCell>
                            <TableCell align="right">{props.todo.priority}</TableCell>
                            <TableCell align="right">
                                <Button variant="contained" color="primary"
                                    onClick={() => updateRow(props.todo)}>
                                    <EditIcon />
                                </Button>
                                <Button
                                    variant="contained"
                                    color='inherit'
                                    className={props.className}
                                    checked={props.todo.status}
                                    onClick={() => props.taskDetails(props.todo.id)}>{!props.todo.status ? 'ReOpen' : 'Done'}</Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => props.deleteTask(props.todo.id)}
                                    className={classes.button}
                                    startIcon={<DeleteIcon />}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>

        {/* Call Edit Page , Sending Data to the Edit Page */}
             <EditData
                open={open}
                handleClose={handleClose}
                EditDetails={EditDetails}
                currentUser={currentUser}
                setOpen={setOpen}
                users={users}
                setEditing={setEditing}
            /> 
        </Fragment>
    );
}

export default Tabledata;









