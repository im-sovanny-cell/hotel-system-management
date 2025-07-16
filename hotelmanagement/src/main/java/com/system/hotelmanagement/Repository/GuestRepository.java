package com.system.hotelmanagement.Repository;

import com.system.hotelmanagement.Model.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestRepository extends JpaRepository<Guest,Long> {
}
