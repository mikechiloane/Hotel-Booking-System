package com.faboda.bookingsystem.Services;

import com.faboda.bookingsystem.Models.Room;
import com.faboda.bookingsystem.Repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomService {

    @Autowired
    RoomRepository roomRepository;


    
    public String createRoom(Room room){
        roomRepository.save(room);
        return  "Room adeded";
    }



}
