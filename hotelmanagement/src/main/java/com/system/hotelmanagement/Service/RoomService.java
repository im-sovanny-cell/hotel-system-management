package com.system.hotelmanagement.Service;

import com.system.hotelmanagement.Model.Room;

import java.util.List;
import java.util.Optional;

public interface RoomService {
    List<Room> findAllRooms();
    Optional<Room> findRoomById(Long id);
    Room saveRoom(Room room);
    Room updateRoom(Long id, Room roomDetails);
    void deleteRoom(Long id);
}
