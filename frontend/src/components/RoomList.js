import React from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    IconButton,
    Tooltip // Import Tooltip for showing text on hover
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// Import icons for different statuses
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import BuildIcon from '@mui/icons-material/Build';

// Helper function to return a status icon with a tooltip
const getStatusIndicator = (status) => {
    const lowerCaseStatus = status.toLowerCase();
    switch (lowerCaseStatus) {
        case 'available':
            return (
                <Tooltip title="Available">
                    <CheckCircleIcon color="success" />
                </Tooltip>
            );
        case 'occupied':
            return (
                <Tooltip title="Occupied">
                    <WarningIcon color="warning" />
                </Tooltip>
            );
        case 'maintenance':
             return (
                <Tooltip title="Maintenance">
                    <BuildIcon color="action" />
                </Tooltip>
            );
        default:
            return status; // Fallback to text if status is unknown
    }
};

const RoomList = ({ rooms, onEdit, onDelete }) => (
    <TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Room Number</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell> {/* Shortened Header */}
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Array.isArray(rooms) && rooms.map((room) => (
                    <TableRow key={room.roomId} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{room.roomNumber}</TableCell>
                        <TableCell>{room.type}</TableCell>
                        <TableCell>${parseFloat(room.pricePerNight).toFixed(2)}</TableCell>
                        <TableCell>
                            {/* Display the status as a colored icon with a tooltip */}
                            {getStatusIndicator(room.status)}
                        </TableCell>
                        <TableCell align="right">
                            <IconButton color="primary" onClick={() => onEdit(room)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error" onClick={() => onDelete(room.roomId)}>
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default RoomList;
