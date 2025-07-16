import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, IconButton, Tooltip, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const getStatusChip = (status) => {
    const lowerCaseStatus = status ? status.toLowerCase() : '';
    let color = 'default';
    if (lowerCaseStatus === 'confirmed') color = 'primary';
    if (lowerCaseStatus === 'checked-in') color = 'success';
    if (lowerCaseStatus === 'checked-out') color = 'secondary';
    if (lowerCaseStatus === 'cancelled') color = 'error';
    return <Chip label={status} color={color} size="small" sx={{ fontWeight: 'bold' }}/>;
};

const BookingList = ({ bookings, onEdit, onDelete }) => (
    <TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Guest Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Room</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Check-in</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Check-out</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Array.isArray(bookings) && bookings.map((booking) => (
                    <TableRow key={booking.bookingId} hover>
                        <TableCell>{booking.guest?.firstName} {booking.guest?.lastName}</TableCell>
                        <TableCell>{booking.room?.roomNumber}</TableCell>
                        <TableCell>{booking.checkInDate}</TableCell>
                        <TableCell>{booking.checkOutDate}</TableCell>
                        <TableCell>{getStatusChip(booking.status)}</TableCell>
                        <TableCell align="right">
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Tooltip title="Edit Booking">
                                    <IconButton color="primary" onClick={() => onEdit(booking)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Booking">
                                    <IconButton color="error" onClick={() => onDelete(booking.bookingId)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default BookingList;