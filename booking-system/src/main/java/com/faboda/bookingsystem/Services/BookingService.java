package com.faboda.bookingsystem.Services;

import com.faboda.bookingsystem.Dto.BookingDto;
import com.faboda.bookingsystem.Models.Booking;
import com.faboda.bookingsystem.Models.Room;
import com.faboda.bookingsystem.Models.User;
import com.faboda.bookingsystem.Repositories.BookingRepository;
import com.faboda.bookingsystem.Repositories.RefundRepository;
import com.faboda.bookingsystem.Repositories.RoomRepository;
import com.faboda.bookingsystem.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    RefundService refundService;
    @Autowired
    RoomRepository roomRepository;
    @Autowired
    private RefundRepository refundRepository;
    @Autowired
    private UserRepository userRepository;

    public Boolean validateBooking(LocalDate from, LocalDate to, String roomName) throws Exception {
        List<Booking> allBookings = getAllBookingsByRoomName(roomName);
        if (allBookings.stream().count() == 0) {
            return true;
        }
        for (Booking booking : allBookings) {
            if (from.isBefore(booking.getCheckIn()) && to.isBefore(booking.getCheckIn())) {
                return true;
            }
            if (from.isAfter(booking.getCheckIn()) && to.isAfter(booking.getCheckOut())) {
                return true;
            }
        }

        return false;

    }

    public Optional<Booking> rescheduleBooking(Integer id, BookingDto bookingDto) {
        Optional<Booking> clientBooking = bookingRepository.findById(id);
        clientBooking.map(

                booking -> {
                    System.out.println(bookingDto.getCheckOut());
                    booking.setCheckIn(bookingDto.getCheckIn());
                    booking.setCheckOut(bookingDto.getCheckOut());
                    booking.setDays(calculateDays(bookingDto.getCheckIn(), bookingDto.getCheckOut()));
                    booking.setAmount(calculateBookingAmount(booking.getDays()));
                    System.out.println(booking.getAmount());
                    System.out.println(booking.getCheckIn());
                    return bookingRepository.save(booking);
                }
        );

        return clientBooking;
    }


    public List<Booking> getAllBookingsByRoomName(String roomName) {
        Room room = roomRepository.findRoomByRoomName(roomName);
        return bookingRepository.findAllByRoom(room);
    }


    public Long calculateDays(LocalDate from, LocalDate to) {
        var days = Duration.between(from.atStartOfDay(), to.atStartOfDay()).toDays();
        return days;
    }

    public List<Booking> findBookingsByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return findAllBookingsByUser(user);
    }
    public List<Booking> findAllBookingsByUser(User user) {
        return bookingRepository.findBookingsByUser(user);
    }


    @Async
    public void cancelBooking(Integer id) {
        var booking = bookingRepository.findById(id).get();
        bookingRepository.delete(booking);
        refundService.fileRefund(id);
    }


    public List<Room> findAllAvailableRooms(LocalDate from, LocalDate to) throws Exception {
        List<Room> allRooms = roomRepository.findAll();
        List<Room> toRemove = new ArrayList<>();
        try {
            for (Room room : allRooms) {
                if (!validateBooking(from, to, room.getRoomName())) {
                    toRemove.add(room);
                    System.out.println(room.getRoomName());
                }
            }
            allRooms.removeAll(toRemove);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return allRooms;

    }

    public Long calculateBookingAmount(Long days) {
        return days * 120;
    }

    public List<Booking> getALlBookings() {
        return bookingRepository.findAll();
    }

    public Booking createBooking(Booking booking, Integer roomId, Integer userId) {
        Long days = calculateDays(booking.getCheckIn(), booking.getCheckOut());
        Long amount = calculateBookingAmount(days);
        Optional<User> user = userRepository.findById(userId);

        System.out.println(user.get().getFirstName());
        try {
            if(validateBooking(booking.getCheckIn(),booking.getCheckOut(),booking.getRoom().getRoomName())){
                return roomRepository.findById(roomId).map(
                        room -> {
                            booking.setRoom(room);
                            booking.setDays(days);
                            booking.setAmount(amount);
                            booking.setUser(user.get());
                            System.out.println(booking.toString());
                            return bookingRepository.save(booking);
                        }
                ).orElseThrow(() -> new RuntimeException());
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return null;

    }

}
