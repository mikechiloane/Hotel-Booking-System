package com.faboda.bookingsystem.Repositories;

import com.faboda.bookingsystem.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
  User findByEmailAndPassword(String email, String password);

}