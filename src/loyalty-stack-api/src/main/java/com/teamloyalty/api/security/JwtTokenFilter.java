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

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;

public class JwtTokenFilter extends GenericFilterBean {
    
    public static final String HEADER_PREFIX = "Bearer ";
    private static final Logger log = LoggerFactory.getLogger(JwtTokenFilter.class);
    
    private final JwtTokenProvider jwtTokenProvider;
    
    public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
    	this.jwtTokenProvider = jwtTokenProvider;
    }
    
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain)
            throws IOException, ServletException {
        
        String token = resolveToken((HttpServletRequest) req);
        log.info("Extracting token from HttpServletRequest: {}", token);
        
        if (token != null && jwtTokenProvider.validateToken(token)) {
            Authentication auth = jwtTokenProvider.getAuthentication(token);
            
            if (auth != null && !(auth instanceof AnonymousAuthenticationToken)) {
                SecurityContext context = SecurityContextHolder.createEmptyContext();
                context.setAuthentication(auth);
                SecurityContextHolder.setContext(context);
            }
        }
        
        filterChain.doFilter(req, res);
    }
    
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(HEADER_PREFIX)) {
            return bearerToken.substring(7);
        }
        return null;
    }
    
}

