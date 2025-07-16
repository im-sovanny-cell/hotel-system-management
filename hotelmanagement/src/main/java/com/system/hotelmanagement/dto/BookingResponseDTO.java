package com.system.hotelmanagement.dto;

import java.time.LocalDate;

// DTO នេះគឺជារបស់ที่เราจะส่งไปให้ Front-End
public class BookingResponseDTO {
    private Long bookingId;
    private GuestDTO guest; // <-- ឥឡូវនេះវានឹងមានข้อมูล Guest
    private RoomDTO room;   // <-- และข้อมูล Room
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String status;

    // Getters and Setters
    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }
    public GuestDTO getGuest() { return guest; }
    public void setGuest(GuestDTO guest) { this.guest = guest; }
    public RoomDTO getRoom() { return room; }
    public void setRoom(RoomDTO room) { this.room = room; }
    public LocalDate getCheckInDate() { return checkInDate; }
    public void setCheckInDate(LocalDate checkInDate) { this.checkInDate = checkInDate; }
    public LocalDate getCheckOutDate() { return checkOutDate; }
    public void setCheckOutDate(LocalDate checkOutDate) { this.checkOutDate = checkOutDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}