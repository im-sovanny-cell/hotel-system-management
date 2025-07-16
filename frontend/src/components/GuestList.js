import React from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    IconButton 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const GuestList = ({ guests, onEdit, onDelete }) => (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {/* We check if 'guests' is an array before attempting to map over it.
                  This prevents runtime errors if the prop is not yet available. */}
                {Array.isArray(guests) && guests.map((guest) => (
                    <TableRow key={guest.guestId}>
                        <TableCell>{guest.firstName} {guest.lastName}</TableCell>
                        <TableCell>{guest.email}</TableCell>
                        <TableCell>{guest.phoneNumber}</TableCell>
                        <TableCell align="right">
                            <IconButton color="primary" onClick={() => onEdit(guest)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error" onClick={() => onDelete(guest.guestId)}>
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default GuestList;
