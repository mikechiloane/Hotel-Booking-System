package com.faboda.bookingsystem.Repositories;

import com.faboda.bookingsystem.Models.Booking;
import com.faboda.bookingsystem.Models.Room;
import com.faboda.bookingsystem.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findBookingByCheckInBetween(LocalDate checkIn , LocalDate checkOut);
    List<Booking> findAllByRoom(Room room);
    List<Booking> findBookingsByUser(User user);
}
