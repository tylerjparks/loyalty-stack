package com.teamloyalty.api.security;

/*
 *  Some portions of this code, with minor modifications borrowed from "Protect REST APIs with Spring Security and JWT" sample project
 *   
 *   by Hantsy Bai
 *   
 *   https://github.com/hantsy/spring-webmvc-jwt-sample
 *   
 */

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.ResponseEntity.ok;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    
    private final AuthenticationManager authenticationManager;
    
    private final JwtTokenProvider jwtTokenProvider;
    
    private final PasswordEncoder passwordEncoder;
    
    private final UserRepository users;
    
    public AuthenticationController(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, 
    		UserRepository userRepository, PasswordEncoder passwordEncoder) {
    	this.authenticationManager = authenticationManager;
    	this.jwtTokenProvider = jwtTokenProvider;
    	this.users = userRepository;
    	this.passwordEncoder = passwordEncoder;
    }
    
    @PostMapping("/signin")
    public ResponseEntity signin(@RequestBody AuthenticationRequest data) {
        
        try {
            String username = data.getUsername();
            var authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, data.getPassword()));
            String token = jwtTokenProvider.createToken(authentication);
            Map<Object, Object> model = new HashMap<>();
            model.put("username", username);
            model.put("token", token);
            return ok(model);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password supplied");
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody User newUser) {
    	String password = newUser.getPassword();
    	newUser.setPassword(passwordEncoder.encode(password));
    	users.save(newUser);
    	return ok("New User Created");
    }
    
}