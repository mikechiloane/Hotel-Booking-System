package com.faboda.bookingsystem.Models;

import com.faboda.bookingsystem.Models.ModelProps.RefundStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "refund")
public class Refund {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "amount", nullable = false)
    private Integer amount;

    @OneToOne(orphanRemoval = false)
    @JoinColumn(name = "booking_id")
    private Booking booking;



}