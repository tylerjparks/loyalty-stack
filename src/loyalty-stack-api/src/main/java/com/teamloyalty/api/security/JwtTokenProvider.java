package com.teamloyalty.api.security;

/*
 *  This code, with minor modifications borrowed from "Protect REST APIs with Spring Security and JWT" sample project
 *   
 *   by Hantsy Bai
 *   
 *   https://github.com/hantsy/spring-webmvc-jwt-sample
 *   
 */

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;

import static java.util.stream.Collectors.joining;

@Component
public class JwtTokenProvider {
    
    private static final String AUTHORITIES_KEY = "roles";
    private static final Logger log = LoggerFactory.getLogger(JwtTokenProvider.class);
    
    private final UserRepository users;
    
    //private final JwtProperties jwtProperties;
    
    private String secretKeyString = "rzxlszyykpbgqcflzxsqcysyhljt";

    // validity in milliseconds
    private long validityInMs = 3600000; // 1h
    
    private SecretKey secretKey;
    
    public JwtTokenProvider(UserRepository users) {
    	this.users = users;
    }
    
    @PostConstruct
    public void init() {
        var secret = Base64.getEncoder().encodeToString(secretKeyString.getBytes());
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
    
    public String createToken(Authentication authentication) {
        
        String username = authentication.getName();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Claims claims = Jwts.claims().setSubject(username);
        if (!authorities.isEmpty()) {
            claims.put(AUTHORITIES_KEY, authorities.stream().map(GrantedAuthority::getAuthority).collect(joining(",")));
        }
        
        Date now = new Date();
        Date validity = new Date(now.getTime() + this.validityInMs);
        
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(this.secretKey, SignatureAlgorithm.HS256)
                .compact();
        
    }
    
    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(this.secretKey).build().parseClaimsJws(token).getBody();
        
        Object authoritiesClaim = claims.get(AUTHORITIES_KEY);
        
        Collection<? extends GrantedAuthority> authorities = authoritiesClaim == null ? AuthorityUtils.NO_AUTHORITIES
                : AuthorityUtils.commaSeparatedStringToAuthorityList(authoritiesClaim.toString());
        
        //User principal = new User(claims.getSubject(), "", authorities);
        // Use my custom principal
        Optional<com.teamloyalty.api.security.User> myUser = users.findByUsername(claims.getSubject());
        
        return new UsernamePasswordAuthenticationToken(myUser.get(), token, authorities);
    }
    
    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts
                    .parserBuilder().setSigningKey(this.secretKey).build()
                    .parseClaimsJws(token);
            //  parseClaimsJws will check expiration date. No need do here.
            log.info("expiration date: {}", claims.getBody().getExpiration());
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        }
        return false;
    }
    
}
