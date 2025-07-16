package com.system.hotelmanagement.Repository;

import com.system.hotelmanagement.Model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
