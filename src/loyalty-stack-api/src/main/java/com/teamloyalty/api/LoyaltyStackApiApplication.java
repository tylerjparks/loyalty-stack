package com.teamloyalty.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Loyalty Stack API", version = "1.0", description = "eCommerce Loyalty Solution"))
public class LoyaltyStackApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoyaltyStackApiApplication.class, args);
	}

}
