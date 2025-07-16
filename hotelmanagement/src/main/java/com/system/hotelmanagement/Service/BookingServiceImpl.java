package com.system.hotelmanagement.Service;

import com.system.hotelmanagement.dto.*;
import com.system.hotelmanagement.Exception.ResourceNotFoundException;
import com.system.hotelmanagement.Model.Booking;
import com.system.hotelmanagement.Model.Guest;
import com.system.hotelmanagement.Model.Room;
import com.system.hotelmanagement.Repository.BookingRepository;
import com.system.hotelmanagement.Repository.GuestRepository;
import com.system.hotelmanagement.Repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {
    @Override
    public List<RevenueByRoomTypeDTO> getRevenueByRoomType() {
        return bookingRepository.findRevenueByRoomType();
    }


    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private GuestRepository guestRepository;

    @Override
    public List<BookingResponseDTO> findAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Booking> findBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    @Override
    public long countUpcomingBookings() {
        LocalDate today = LocalDate.now();
        LocalDate nextSevenDays = today.plusDays(7);
        return bookingRepository.countUpcomingBookings(today, nextSevenDays);
    }

    @Override
    @Transactional
    public Booking createBooking(BookingRequestDTO bookingRequestDTO) {
        Guest guest = guestRepository.findById(bookingRequestDTO.getGuestId())
                .orElseThrow(() -> new ResourceNotFoundException("Guest not found"));
        Room room = roomRepository.findById(bookingRequestDTO.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        if (!room.getStatus().equalsIgnoreCase("Available")) {
            throw new IllegalStateException("Room is not available for booking");
        }

        room.setStatus("Occupied");
        roomRepository.save(room);

        Booking newBooking = new Booking();
        newBooking.setGuest(guest);
        newBooking.setRoom(room);
        newBooking.setCheckInDate(bookingRequestDTO.getCheckInDate());
        newBooking.setCheckOutDate(bookingRequestDTO.getCheckOutDate());
        newBooking.setStatus("Confirmed");

        return bookingRepository.save(newBooking);
    }

    @Override
    @Transactional
    public BookingResponseDTO updateBooking(Long id, BookingRequestDTO bookingDetails) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));

        // Update fields that are allowed to change
        booking.setCheckInDate(bookingDetails.getCheckInDate());
        booking.setCheckOutDate(bookingDetails.getCheckOutDate());
        booking.setStatus(bookingDetails.getStatus());

        // Note: We are not allowing to change the guest or room for an existing booking for simplicity.

        Booking updatedBooking = bookingRepository.save(booking);
        return convertToDto(updatedBooking);
    }

    @Override
    @Transactional
    public void deleteBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));

        // Make the room available again only if the booking was confirmed or checked-in
        if (booking.getStatus().equalsIgnoreCase("Confirmed") || booking.getStatus().equalsIgnoreCase("Checked-In")) {
            Room room = booking.getRoom();
            if(room != null) {
                room.setStatus("Available");
                roomRepository.save(room);
            }
        }

        bookingRepository.delete(booking);
    }


    // Helper Method to convert Entity to DTO
    private BookingResponseDTO convertToDto(Booking booking) {
        BookingResponseDTO dto = new BookingResponseDTO();
        dto.setBookingId(booking.getBookingId());
        dto.setCheckInDate(booking.getCheckInDate());
        dto.setCheckOutDate(booking.getCheckOutDate());
        dto.setStatus(booking.getStatus());

        if (booking.getGuest() != null) {
            GuestDTO guestDto = new GuestDTO();
            guestDto.setGuestId(booking.getGuest().getGuestId());
            guestDto.setFirstName(booking.getGuest().getFirstName());
            guestDto.setLastName(booking.getGuest().getLastName());
            dto.setGuest(guestDto);
        }

        if (booking.getRoom() != null) {
            RoomDTO roomDto = new RoomDTO();
            roomDto.setRoomId(booking.getRoom().getRoomId());
            roomDto.setRoomNumber(booking.getRoom().getRoomNumber());
            dto.setRoom(roomDto);
        }

        return dto;
    }
}
