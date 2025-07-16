package com.system.hotelmanagement.Service;

import com.system.hotelmanagement.dto.BookingRequestDTO;
import com.system.hotelmanagement.dto.BookingResponseDTO;
import com.system.hotelmanagement.dto.RevenueByRoomTypeDTO;
import com.system.hotelmanagement.Model.Booking;
import java.util.List;
import java.util.Optional;

public interface BookingService {
    List<BookingResponseDTO> findAllBookings();
    Optional<Booking> findBookingById(Long id);
    Booking createBooking(BookingRequestDTO bookingRequestDTO);
    BookingResponseDTO updateBooking(Long id, BookingRequestDTO bookingDetails);
    void deleteBooking(Long id);
    long countUpcomingBookings();
    List<RevenueByRoomTypeDTO> getRevenueByRoomType(); // <-- Add this method
}