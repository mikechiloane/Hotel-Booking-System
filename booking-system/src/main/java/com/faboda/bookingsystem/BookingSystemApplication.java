package com.faboda.bookingsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class BookingSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookingSystemApplication.class, args);
    }

}
