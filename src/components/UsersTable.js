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
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


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
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="left">Apellido</TableCell>
                            <TableCell align="right">Fecha de nacimiento</TableCell>
                            <TableCell align="right">Opciones</TableCell>
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
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="default"
                                            className={classes.button}
                                            style={{ marginRight: 2 }}
                                            onClick={()=>handleEdit(row)}
                                        >
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            style={{ marginLeft: 2 }}
                                            onClick={()=>handleDelete(row.id.id)}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
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
