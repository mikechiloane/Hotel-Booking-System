package com.faboda.bookingsystem.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingDto {
    private LocalDate checkIn;
    private  LocalDate checkOut;
    private String email;
    private String roomName;
}
