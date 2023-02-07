package com.faboda.bookingsystem.Repositories;

import com.faboda.bookingsystem.Models.Refund;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefundRepository extends JpaRepository<Refund, Integer> {
}