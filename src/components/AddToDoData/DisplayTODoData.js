import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import AddIcon from '@material-ui/icons/AddCircle';
import Tabledata from './../Table/Table';
import AddData from "./AddData";
import { TextField } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { makeStyles } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Autocomplete from '@material-ui/lab/Autocomplete';
import './styles.css';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


//sorting function
const useSortableData = (items, config = null) => {

    const [sortConfig, setSortConfig] = React.useState(config);
    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);
   
    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };
    return { items: sortedItems, requestSort, sortConfig };
};


const useStyles = makeStyles((theme => ({
    buttonp: {
        margin: theme.spacing(1),
        width: 30,
        alignContent: 'center',
        fontSize: 8,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'blue'
    },
    buttonc: {
        margin: theme.spacing(1),
        width: 14,
        fontSize: 10,
        alignContent: 'center',
        color: 'white',
        backgroundColor: 'green'
    },
    button: {
        margin: theme.spacing(2),
        width: 18,
        fontSize: 9,
        alignContent: 'center',
    },
    addbutton: {
        marginTop: theme.spacing(6),
        marginRight: theme.spacing(2)
    },
    textField: {
        width: "70%",
        marginLeft: theme.spacing(8),
        marginRight: theme.spacing(1)
    },
    p1: {
        marginLeft: theme.spacing(2),
        width: 420,
        color: "black",
        fontSize: 20,
        fontWeight: "bold"

    },
    textField1: {
        width: "120%",
        fontSize: 20,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    p2: {
        fontWeight: "bold",
        color: "black",
        fontSize: 20,
        width: 400,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(70)
    },
    buttonBorder: {
        borderColor: 'blue'
    }
})));

//const priorityTable  = ["High" , "Medium" , "Low" , "None"];

const DisplayToDoData = () => {

    const classes = useStyles(0);
    const [users, setUsers] = React.useState(
        [
            {
                id: 1,
                summary: 'Purchase NoteBook',
                desc: 'Reading NoteBook',
                duedate: '04/19/2029',
                priority: 'Low',
                status: true
            },
            {
                id: 2,
                summary: 'Prepare Presentation',
                desc: 'Paper Presentation',
                duedate: '04/24/2020',
                priority: 'None',
                status: false
            },
            {
                id: 3,
                summary: 'Play badmintation',
                desc: 'Playing Cricket ',
                duedate: '4/21/2020',
                priority: 'High',
                status: false
            },
             {
                id: 4,
                summary:'Buy groceries',
                desc: ' groceries for Cooking',
                duedate: '04/22/2020',
                priority: 'Medium',
                status: true
            },
        ]
    );

    const [open, setOpen] = React.useState(false);
    const [editing, setEditing] = React.useState(false);
    const [searchName, setSearchName] = React.useState('');
    const [allTask, setAllTask] = React.useState(false);
    const [pendingTask, setpendingTask] = React.useState(false);
    const [completedTask, setcompletedTask] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    //Showing All Task
    const showAllTask = () => {
        setAllTask(true);
        setcompletedTask(false);
        setpendingTask(false);
    }

    //Showing Pending Task
    const showPendingTask = () => {
        setpendingTask(true);
        setAllTask(false);
        setcompletedTask(false);
    }

    //Showing Completed Task
    const showCompletedTask = () => {
        setcompletedTask(true);
        setpendingTask(false);
        setAllTask(false);
    }

    //onChange from search textfield
    const handleInput = (e) => {
        console.log(e.target.value);
        setSearchName(e.target.value);
    }

    //Add Task
    const addTask = user => {
        console.log(user);
        user.id = users.length + 1;
        setUsers([...users, user]);
    }

    //Delete Task
    const deleteTask = id => {
        setEditing(false)
        setUsers(users.filter(user => user.id !== id))
    }

    //  TaskDetails
    const done = [];
    const array = [];
    const taskDetails = (id) => {
        console.log(id);
        array.push(users.filter(user => user.id === id));
        console.log(array);
        setUsers(users.filter(user => user.id !== id));
        done.push({
            id: array[0][0].id,
            summary: array[0][0].summary,
            desc: array[0][0].desc,
            duedate: array[0][0].duedate,
            priority: array[0][0].priority,
            status: false
        });
        setUsers(
            users.map(user => {
                if (user.id === id) return { ...user, status: !user.status };
                return user;
            })
        );
    };

    //Updated Task
    const data = [];
    const updatedList = (id, updatedUser) => {
        console.log(updatedUser);
        console.log(id)
        setEditing(true);
        data.push(users.filter(user => user.id !== id));
        data[0].push(updatedUser);
        setUsers([...data[0]]);
        setOpen(false)
    }

    //Filter for search priority
    const filterData = users.filter(user => {
        return (user.priority.toLowerCase().includes(searchName.toLowerCase()));
    })

    const { items, requestSort, sortConfig } = useSortableData(filterData);

    //sorting function
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    //AutoCompleted DropDown Grouping
    const arrayData = [];
    const autoChangeFun = (event, newValue) => {
        arrayData.push(newValue);
        console.log(newValue[0].priority)
        console.log(arrayData);
    }



    return (
        <Fragment>
            <div className="mainContent">

                <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                    <Button variant="contained" className={classes.addbutton} color="primary" onClick={handleClickOpen}>
                        <AddIcon />
                    </Button>
                </Grid>

                <Fragment>
                    <AddData
                        open={open}
                        handleClose={handleClose}
                        addTask={addTask}
                        handleClickOpen={handleClickOpen} />
                </Fragment>

                <Fragment>
                    <table>
                        <tr>
                            <td>
                                <label><p className={classes.p1}>GroupBy Priority</p> </label>
                                <Autocomplete
                                    search
                                    selection
                                    options={users}
                                    disableCloseOnSelect
                                    getOptionLabel={option => option.priority}
                                    renderOption={(option, { selected }) => (
                                        <Fragment>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.priority}
                                        </Fragment>
                                    )}
                                    onChange={autoChangeFun}
                                    id="status"
                                    className={classes.p1}
                                    renderInput={(params) => (
                                        <TextField {...params} variant="outlined" label="Select Priority" placeholder="Select Priority" />
                                    )}
                                    multiple
                                />
                            </td>
                            <td>
                                <label><p className={classes.p2}><Search />Search</p></label>
                                <TextField
                                    type="text"
                                    label="Search By Priority"
                                    className={classes.p2}
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleInput}
                                />
                            </td>
                        </tr>
                    </table>
                </Fragment>

                <DialogTitle><b>To Do App</b></DialogTitle>
                <Button color="primary" variant="contained" className={classes.button} onClick={showAllTask}><b>All</b></Button>
                <Button color="primary" variant="contained" className={classes.button} onClick={showPendingTask}><b>Pending</b></Button>
                <Button color="primary" variant="contained" className={classes.button} onClick={showCompletedTask}><b>Completed</b></Button>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><b>Primary</b></TableCell>
                            <TableCell align="center"><b>Description</b></TableCell>
                            <TableCell align="center"><b>Due Date</b></TableCell>
                            <TableCell align="center">
                                <Button
                                    color="inherit" variant="contained"
                                    type="button"
                                    onClick={() => requestSort('priority')}
                                    className={getClassNamesFor('priority')}>priority</Button>
                            </TableCell>
                            <TableCell align="center"><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>

                {allTask ?
                    (items
                        .map(todo => (
                            <Tabledata
                                todo={todo}
                                deleteTask={deleteTask}
                                taskDetails={taskDetails}
                                users={users}
                                className={!todo.status === true ? classes.buttonp : classes.buttonc}
                                updatedList={updatedList}
                            />))) : null
                }

                {pendingTask ?
                    (items
                        .filter(todo => todo.status === false)
                        .map(todo => (
                            <Tabledata
                                todo={todo}
                                deleteTask={deleteTask}
                                taskDetails={taskDetails}
                                className={classes.buttonp}
                                users={users}
                                updatedList={updatedList}
                            />
                        ))) : null
                }

                {completedTask ?
                    (items
                        .filter(todo => todo.status === true)
                        .map(todo => (
                            <Tabledata
                                todo={todo}
                                deleteTask={deleteTask}
                                taskDetails={taskDetails}
                                className={classes.buttonc}
                                users={users}
                                updatedList={updatedList}
                            />
                        ))) : null
                }
            </div>
        </Fragment>
    );
};

export default DisplayToDoData;
