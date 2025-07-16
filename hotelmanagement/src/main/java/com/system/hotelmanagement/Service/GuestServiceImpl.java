package com.system.hotelmanagement.Service;

import com.system.hotelmanagement.Exception.ResourceNotFoundException;
import com.system.hotelmanagement.Model.Guest;
import com.system.hotelmanagement.Repository.GuestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuestServiceImpl implements GuestService {

    @Autowired
    private GuestRepository guestRepository;

    @Override
    public List<Guest> findAllGuests() {
        return guestRepository.findAll();
    }

    @Override
    public Optional<Guest> findGuestById(Long id) {
        return guestRepository.findById(id);
    }

    @Override
    public Guest saveGuest(Guest guest) {
        return guestRepository.save(guest);
    }

    @Override
    public Guest updateGuest(Long id, Guest guestDetails) {
        Guest guest = guestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guest not found with id: " + id));

        guest.setFirstName(guestDetails.getFirstName());
        guest.setLastName(guestDetails.getLastName());
        guest.setEmail(guestDetails.getEmail());
        guest.setPhoneNumber(guestDetails.getPhoneNumber());

        return guestRepository.save(guest);
    }

    @Override
    public void deleteGuest(Long id) {
        Guest guest = guestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guest not found with id: " + id));
        guestRepository.delete(guest);
    }
}