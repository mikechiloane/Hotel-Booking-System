package com.faboda.bookingsystem.Services;

import com.faboda.bookingsystem.Dto.UserLoginDto;
import com.faboda.bookingsystem.Models.User;
import com.faboda.bookingsystem.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtService jwtService;

    public String authenticateUserDetails(UserLoginDto userLoginDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userLoginDto.getEmail(), userLoginDto.getPassword()
                    )
            );

            return "Bearer "+jwtService.generateToken(userLoginDto.getEmail());
        }
        catch (Exception e){
            return "false";
        }
    }
}
