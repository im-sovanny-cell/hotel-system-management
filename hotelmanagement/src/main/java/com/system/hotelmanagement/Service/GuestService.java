package com.system.hotelmanagement.Service;

import com.system.hotelmanagement.Model.Guest;
import java.util.List;
import java.util.Optional;

public interface GuestService {
    List<Guest> findAllGuests();
    Optional<Guest> findGuestById(Long id);
    Guest saveGuest(Guest guest);
    Guest updateGuest(Long id, Guest guestDetails);
    void deleteGuest(Long id);
}