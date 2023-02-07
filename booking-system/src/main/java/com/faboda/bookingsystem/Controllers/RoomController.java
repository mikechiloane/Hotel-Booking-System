package com.faboda.bookingsystem.Controllers;

import com.faboda.bookingsystem.Models.Room;
import com.faboda.bookingsystem.Repositories.RoomRepository;
import com.faboda.bookingsystem.Services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/room")
public class RoomController {

    @Autowired
    RoomService roomService;
    @PostMapping
    public String createRoom(@RequestBody Room room){

        return roomService.createRoom(room);

    }

}
