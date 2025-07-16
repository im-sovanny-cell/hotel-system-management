package com.system.hotelmanagement.Repository;

import com.system.hotelmanagement.dto.RevenueByRoomTypeDTO;
import com.system.hotelmanagement.Model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.status = 'Confirmed' AND b.checkInDate BETWEEN :startDate AND :endDate")
    long countUpcomingBookings(LocalDate startDate, LocalDate endDate);

    // This query calculates the total revenue for each room type from completed bookings.
    // It multiplies the room's price per night by the number of days stayed.
    // Note: DATEDIFF function might vary between databases. This is for SQL Server.
    @Query("SELECT new com.system.hotelmanagement.dto.RevenueByRoomTypeDTO(r.type, SUM(r.pricePerNight * DATEDIFF(day, b.checkInDate, b.checkOutDate))) " +
            "FROM Booking b JOIN b.room r " +
            "WHERE b.status = 'Checked-Out' " +
            "GROUP BY r.type")
    List<RevenueByRoomTypeDTO> findRevenueByRoomType();
}
