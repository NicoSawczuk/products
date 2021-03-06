import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useAuth from '../hooks/useAuth'
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 550,
    },
});

export default function UsersTable({ rows, onEdit, onDelete }) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { isLogged } = useAuth()

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleEdit = (row) => {
        const data = {
            id: row.id.id,
            firstname: row.firstname,
            lastname: row.lastname,
            birthdate: row.birthdate
        }
        onEdit(data)
    }

    const handleDelete = (id) => {
        onDelete(id)
    }

    const castDate = (date) => {
        let datearray1 = date.split("-")
        return `${datearray1[2]}/${datearray1[1]}/${datearray1[0]}`
    }
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table aria-label="sticky table">
                    <TableHead style={ {backgroundColor: '#e0e0e0', borderTop: '2px'} }  >
                        <TableRow>
                            <TableCell style={{color: '#212121'}}>Nombre</TableCell>
                            <TableCell style={{color: '#212121'}} align="left">Apellido</TableCell>
                            <TableCell style={{color: '#212121'}} align="right">Fecha de nacimiento</TableCell>
                            {isLogged() ? <TableCell style={{color: '#212121'}} align="right">Opciones</TableCell> : null}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow key={row.id.id}>
                                    <TableCell component="th" scope="row">
                                        {row.firstname}
                                    </TableCell>
                                    <TableCell align="left">{row.lastname}</TableCell>
                                    <TableCell align="right">{castDate(row.birthdate)}</TableCell>
                                    {isLogged()
                                        ? <React.Fragment>
                                            <TableCell align="right">
                                                <IconButton
                                                    variant="contained"
                                                    color="default"
                                                    size="small"
                                                    className={classes.button}
                                                    style={{ marginRight: 2 }}
                                                    onClick={() => handleEdit(row)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    variant="contained"
                                                    color="secondary"
                                                    size="small"
                                                    className={classes.button}
                                                    style={{ marginLeft: 2 }}
                                                    onClick={() => handleDelete(row.id.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </React.Fragment>
                                        : null}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
