package com.teamloyalty.api.security;

/*
 *  This code, with minor modifications borrowed from "Protect REST APIs with Spring Security and JWT" sample project
 *   
 *   by Hantsy Bai
 *   
 *   https://github.com/hantsy/spring-webmvc-jwt-sample
 *   
 */

import java.io.Serializable;
import java.util.Objects;

public class AuthenticationRequest implements Serializable {
	
	private static final long serialVersionUID = -6986746375915710855L;
  	private String username;
    private String password;
    
    public AuthenticationRequest() {}
    
    public AuthenticationRequest(String username, String password) {
    	this.username = username;
    	this.password = password;
    }
    
    public String getUsername() {
    	return this.username;
    }
    
    public String getPassword() {
    	return this.password;
    }
    
    public void setUsername(String username) {
    	this.username = username;
    }
    
    public void setPassword(String password) {
    	this.password = password;
    }
    
    @Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof AuthenticationRequest))
			return false;
		AuthenticationRequest authReq = (AuthenticationRequest)o;
		return Objects.equals(this.username, authReq.username);
	}
    
    @Override
	public int hashCode() {
		return Objects.hash(this.username);
	}
	
	@Override
	public String toString() {
		return "AuthenticationRequest(" + "username=" + this.username + ")";
	}
}
