package com.system.hotelmanagement.dto;

import java.math.BigDecimal;

public class RevenueByRoomTypeDTO {
    private String roomType;
    private BigDecimal totalRevenue;

    // This constructor will be used by the JPA query
    public RevenueByRoomTypeDTO(String roomType, BigDecimal totalRevenue) {
        this.roomType = roomType;
        this.totalRevenue = totalRevenue;
    }

    // Getters and Setters
    public String getRoomType() { return roomType; }
    public void setRoomType(String roomType) { this.roomType = roomType; }
    public BigDecimal getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; }
}
