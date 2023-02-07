package com.faboda.bookingsystem.Controllers;

import com.faboda.bookingsystem.Models.Booking;
import com.faboda.bookingsystem.Models.Refund;
import com.faboda.bookingsystem.Repositories.BookingRepository;
import com.faboda.bookingsystem.Repositories.RefundRepository;
import com.faboda.bookingsystem.Services.RefundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/refund/{id}")
public class RefundController {

    @Autowired
    RefundService refundService;
    @Autowired
    BookingRepository bookingRepository;

    @GetMapping
    public Refund makeRefund(@PathVariable("id") Integer id){
        
        return refundService.fileRefund(id);

    }
}
