package com.faboda.bookingsystem.Controllers;

import com.faboda.bookingsystem.Dto.TokenDto;
import com.faboda.bookingsystem.Dto.UserLoginDto;
import com.faboda.bookingsystem.Models.User;
import com.faboda.bookingsystem.Repositories.UserRepository;
import com.faboda.bookingsystem.Services.AuthService;
import com.faboda.bookingsystem.Services.JwtService;
import com.faboda.bookingsystem.Services.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    JwtService jwtService;

    @Autowired
    AuthService authService;

    @Autowired
    UserDetailService userDetailService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/auth/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        userDetailService.saveUser(user);
        return ResponseEntity.ok("Dpme");
    }

    @PostMapping("/getUserInfo")
    public User userInfo(@RequestBody TokenDto token){
        String userName = jwtService.extractUsername(token.getToken());
        User user = userRepository.findByEmail(userName);
        if(user==null){
            return null;
        }
        return user;
    }
    @PostMapping("/auth/login")
    public ResponseEntity<String> authenticateUser(@RequestBody  UserLoginDto userLoginDto) {

        return ResponseEntity.ok(authService.authenticateUserDetails(userLoginDto));
    }

}
