package com.system.hotelmanagement.Controller;

import com.system.hotelmanagement.dto.BookingRequestDTO;
import com.system.hotelmanagement.dto.BookingResponseDTO;
import com.system.hotelmanagement.Exception.ResourceNotFoundException;
import com.system.hotelmanagement.Model.Booking;
import com.system.hotelmanagement.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public List<BookingResponseDTO> getAllBookings() {
        return bookingService.findAllBookings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Booking booking = bookingService.findBookingById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/upcoming/count")
    public ResponseEntity<Map<String, Long>> getUpcomingBookingsCount() {
        long count = bookingService.countUpcomingBookings();
        return ResponseEntity.ok(Map.of("count", count));
    }

    @PostMapping
    public Booking createBooking(@RequestBody BookingRequestDTO bookingRequestDTO) {
        return bookingService.createBooking(bookingRequestDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingResponseDTO> updateBooking(@PathVariable Long id, @RequestBody BookingRequestDTO bookingDetails) {
        BookingResponseDTO updatedBooking = bookingService.updateBooking(id, bookingDetails);
        return ResponseEntity.ok(updatedBooking);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}
