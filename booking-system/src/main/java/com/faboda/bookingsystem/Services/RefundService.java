package com.faboda.bookingsystem.Services;

import com.faboda.bookingsystem.Models.Booking;
import com.faboda.bookingsystem.Models.ModelProps.RefundStatus;
import com.faboda.bookingsystem.Models.Refund;
import com.faboda.bookingsystem.Repositories.BookingRepository;
import com.faboda.bookingsystem.Repositories.RefundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RefundService {

    @Autowired
    RefundRepository refundRepository;

    @Autowired
    BookingRepository bookingRepository;

    public Refund fileRefund(Integer id){

        Optional<Booking> booking= bookingRepository.findById(id);
        Refund refund = new Refund();
        return booking.map(
                booking1 -> {
                    refund.setBooking(booking1);
                    refund.setAmount((int) (booking1.getAmount()*0.2));
                    return refundRepository.save(refund);
                }
        ).orElseThrow(()->new RuntimeException());
    }
}
