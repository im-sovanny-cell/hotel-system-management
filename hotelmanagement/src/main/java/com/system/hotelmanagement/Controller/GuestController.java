package com.system.hotelmanagement.Controller;

import com.system.hotelmanagement.Model.Guest;
import com.system.hotelmanagement.Service.GuestService;
import com.system.hotelmanagement.Exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/guests")
@CrossOrigin(origins = "http://localhost:3000")
public class GuestController {

    @Autowired
    private GuestService guestService;

    // Endpoint: ดึงข้อมูลភ្ញៀវទាំងអស់
    @GetMapping
    public List<Guest> getAllGuests() {
        return guestService.findAllGuests();
    }

    // Endpoint: สร้างភ្ញៀវថ្មី
    @PostMapping
    public Guest createGuest(@RequestBody Guest guest) {
        return guestService.saveGuest(guest);
    }

    // Endpoint: ดึงข้อมูลភ្ញៀវម្នាក់តាម ID
    @GetMapping("/{id}")
    public ResponseEntity<Guest> getGuestById(@PathVariable Long id) {
        Guest guest = guestService.findGuestById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guest not found with id: " + id));
        return ResponseEntity.ok(guest);
    }

    // Endpoint: កែប្រែข้อมูลភ្ញៀវ
    @PutMapping("/{id}")
    public ResponseEntity<Guest> updateGuest(@PathVariable Long id, @RequestBody Guest guestDetails) {
        Guest updatedGuest = guestService.updateGuest(id, guestDetails);
        return ResponseEntity.ok(updatedGuest);
    }

    // Endpoint: លុបភ្ញៀវ
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGuest(@PathVariable Long id) {
        guestService.deleteGuest(id);
        return ResponseEntity.noContent().build();
    }
}