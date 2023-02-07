package com.faboda.bookingsystem.Repositories;

import com.faboda.bookingsystem.Models.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Integer> {

    Room findRoomByRoomName(String roomName);
}