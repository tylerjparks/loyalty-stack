/*
 * package com.teamloyalty.api.security;
 * 
 * import java.util.Objects;
 * 
 * 
 * This code, with minor modifications borrowed from
 * "Protect REST APIs with Spring Security and JWT" sample project
 * 
 * by Hantsy Bai
 * 
 * https://github.com/hantsy/spring-webmvc-jwt-sample
 * 
 * 
 * 
 * import org.springframework.boot.context.properties.ConfigurationProperties;
 * 
 * @ConfigurationProperties(prefix = "jwt") public class JwtProperties {
 * 
 * private String secretKey = "rzxlszyykpbgqcflzxsqcysyhljt";
 * 
 * // validity in milliseconds private long validityInMs = 3600000; // 1h
 * 
 * public JwtProperties() {}
 * 
 * public JwtProperties(String secretKey, long validityInMs) { this.secretKey =
 * secretKey; this.validityInMs = validityInMs; }
 * 
 * public String getSecretKey() { return this.secretKey; }
 * 
 * public long getValidityInMs() { return this.validityInMs; }
 * 
 * public void setSecretKey(String secretKey) { this.secretKey = secretKey; }
 * 
 * public void setValidityInMs(long validityInMs) { this.validityInMs =
 * validityInMs; }
 * 
 * @Override public boolean equals(Object o) { if (this == o) return true; if
 * (!(o instanceof JwtProperties)) return false; JwtProperties prop =
 * (JwtProperties)o; return Objects.equals(this.secretKey, prop.secretKey) &&
 * Objects.equals(this.validityInMs, prop.validityInMs); }
 * 
 * @Override public int hashCode() { return Objects.hash(this.secretKey,
 * this.validityInMs); }
 * 
 * @Override public String toString() { return "JwtProperties(" + "secretKey=" +
 * this.secretKey + ", validityInMs=" + this.validityInMs + ")"; }
 * 
 * }
 */