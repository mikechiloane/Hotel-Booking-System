package com.faboda.bookingsystem.Controllers;

import com.faboda.bookingsystem.Dto.MessageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketController {

    @Autowired
    SimpMessagingTemplate template;

    @MessageMapping("/user-all")
    @SendTo("/topic/message")
    public MessageDto send(@Payload MessageDto message) {
        return message;
    }

    @PostMapping("/send")
    public ResponseEntity<Void> sendMessage(@RequestBody MessageDto messageDto) {
        template.convertAndSend("/topic/message", messageDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}