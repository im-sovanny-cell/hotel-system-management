package com.system.hotelmanagement.dto;

// DTO នេះសម្រាប់ផ្ទុកข้อมูล Room ที่จำเป็น
public class RoomDTO {
    private Long roomId;
    private String roomNumber;

    // Getters and Setters
    public Long getRoomId() { return roomId; }
    public void setRoomId(Long roomId) { this.roomId = roomId; }
    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
}