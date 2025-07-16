package com.system.hotelmanagement.Controller;

import com.system.hotelmanagement.Exception.ResourceNotFoundException;
import com.system.hotelmanagement.Model.Room;
import com.system.hotelmanagement.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin(origins = "http://localhost:3000") // อนุญาตให้ React (port 3000) เรียกใช้ได้
public class RoomController {

    @Autowired
    private RoomService roomService;

    // API: Get All Rooms
    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.findAllRooms();
    }

    // API: Create a new Room
    @PostMapping
    public Room createRoom(@RequestBody Room room) {
        return roomService.saveRoom(room);
    }

    // API: Get a single Room by ID
    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
        Room room = roomService.findRoomById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));
        return ResponseEntity.ok(room);
    }

    // API: Update a Room
    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable Long id, @RequestBody Room roomDetails) {
        Room updatedRoom = roomService.updateRoom(id, roomDetails);
        return ResponseEntity.ok(updatedRoom);
    }

    // API: Delete a Room
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}
