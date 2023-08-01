package com.teamloyalty.api.security;

/*
 *  This code, with new additions and customizations, borrowed from "Protect REST APIs with Spring Security and JWT" sample project
 *   
 *   by Hantsy Bai
 *   
 *   https://github.com/hantsy/spring-webmvc-jwt-sample
 *   
 */

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain springWebFilterChain(HttpSecurity http,
                                             JwtTokenProvider tokenProvider) throws Exception {
        return http
        		.cors().and()
                .httpBasic(AbstractHttpConfigurer::disable)
                .csrf().disable()
                .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(c -> c.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .authorizeHttpRequests(authorize -> authorize
                			.anyRequest().permitAll()
//                        .requestMatchers("/auth/signin").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/products").anonymous()
//                        .requestMatchers(HttpMethod.GET, "/product").anonymous()
//                        .requestMatchers(HttpMethod.GET, "/customers/**").permitAll()
//                        .requestMatchers(HttpMethod.POST, "/customers/**").permitAll()
//                        .requestMatchers(HttpMethod.PUT, "/customers/**").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/orders").permitAll()
//                        .requestMatchers(HttpMethod.POST, "/orders").permitAll()
//                        .anyRequest().authenticated()
                //.csrf(AbstractHttpConfigurer::disable)		
                )
                .addFilterBefore(new JwtTokenFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class)
                .build();
    }
    
    // Need this to re-enable access to H2 database console
    @Bean
    WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers(AntPathRequestMatcher.antMatcher("/h2-console/**"));
    }

    @Bean
    UserDetailsService customUserDetailsService(UserRepository users) {
        return (username) -> users.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username: " + username + " not found"));
    }

    @Bean
    AuthenticationManager customAuthenticationManager(UserDetailsService userDetailsService, PasswordEncoder encoder) {
        return authentication -> {
            String username = authentication.getPrincipal() + "";
            String password = authentication.getCredentials() + "";

            UserDetails user = userDetailsService.loadUserByUsername(username);

            if (!encoder.matches(password, user.getPassword())) {
                throw new BadCredentialsException("Bad credentials");
            }

            if (!user.isEnabled()) {
                throw new DisabledException("User account is not active");
            }

            return new UsernamePasswordAuthenticationToken(username, null, user.getAuthorities());
        };
    }

}