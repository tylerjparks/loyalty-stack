package com.teamloyalty.api;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.teamloyalty.api.customer.Customer;
import com.teamloyalty.api.customer.CustomerRepository;
import com.teamloyalty.api.loyalty.BonusRule;
import com.teamloyalty.api.loyalty.BonusRuleRepository;
import com.teamloyalty.api.loyalty.BonusType;
import com.teamloyalty.api.loyalty.EligibilityType;
import com.teamloyalty.api.loyalty.Enrollment;
import com.teamloyalty.api.loyalty.EnrollmentRepository;
import com.teamloyalty.api.order.SalesOrder;
import com.teamloyalty.api.order.SalesOrderDetail;
import com.teamloyalty.api.order.SalesOrderTender;
import com.teamloyalty.api.security.User;
import com.teamloyalty.api.security.UserRepository;
import com.teamloyalty.api.order.SalesOrderShippingAddress;
import com.teamloyalty.api.order.SalesOrderRepository;

@Configuration
@PropertySource("classpath:application.properties")
class LoadDatabase {

	private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);
	
	@Value("${my.cors.url}")
	private String CORS_URL;
	
	@Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
	
	@Bean
	WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				//registry.addMapping("/api-javaconfig").allowedOrigins("http://localhost:8080");
				//registry.addMapping("/**").allowedOrigins("http://localhost:3000");
				log.info("CORS_URL:  " + CORS_URL);
				registry.addMapping("/**").allowedOrigins(CORS_URL, "http://localhost:3000");
			}
		};
	}
	
	@Bean
	CommandLineRunner initDatabase(CustomerRepository customerRepository, EnrollmentRepository enrollmentRepository) {
		return args -> {
			customerRepository.save(new Customer("Brad", "Davis", "bradleydavis3@my.unt.edu", "123 Main", "Denton", "TX", "US", "76201", "214-555-5555", true));
			enrollmentRepository.save(new Enrollment(1L, "A", LocalDateTime.now(), "9876543210"));
			customerRepository.save(new Customer("Tyler", "Parks", "tylerparks@my.unt.edu", "321 Union", "Denton", "TX", "US", "76201", "214-555-1234", false));
			customerRepository.save(new Customer("Sandy", "Martinez-Echegoyen", "sandymartinez-echegoyen@my.unt.edu", "101 South St", "Denton", "TX", "US", "76201", "214-555-4321", false));
			customerRepository.save(new Customer("Vispendra", "Chahar", "vishpendrachahar@my.unt.edu", "500 Commerce St", "Denton", "TX", "US", "76201", "214-555-9999", false));
			customerRepository.save(new Customer("Rama Reddy", "Tamalampudi", "venkataramareddytamalampudi@my.unt.edu", "202 North Ave", "Denton", "TX", "US", "76201", "214-555-7777", false));
			
			customerRepository.findAll().forEach(customer -> log.info("Preloaded " + customer));
		};
	}
	
	@Bean
	CommandLineRunner initSalesOrder(SalesOrderRepository salesOrderRepository) {
		return args -> {
			SalesOrderDetail sod = new SalesOrderDetail(1, "CX2646", "Pac-Man", 6.0, 1, 6.0, 0.5, 0.0, 6.50, "A");
			SalesOrderTender sot = new SalesOrderTender("MC", 11.50, "4111111111111111", "Brad", "Davis", "76201", "ABC123", "1234567890");
			SalesOrderShippingAddress sosa = new SalesOrderShippingAddress("Brad", "Davis", "123 Main", "Denton", "TX", "US", "76201");
			// 2023-03-15T22:50:20.198267
			SalesOrder order = new SalesOrder(1L, LocalDateTime.now(), 11.50, 6.0, 0.5, 5.0, 0.0, "A");
			order.setSalesOrderDetails(new ArrayList<>(Arrays.asList(sod)));
			order.setSalesOrderTender(sot);
			order.setSalesOrderShippingAddress(sosa);
			
			SalesOrder newOrder = salesOrderRepository.save(order);
			log.info("Preloaded " + newOrder);
		};
	}
	
	@Bean
	CommandLineRunner initUsers(UserRepository users, PasswordEncoder passwordEncoder) {
		return args -> {
			User brad = new User("braddavis", passwordEncoder.encode("password123"), 1L);
			brad.setRoles(Arrays.asList("ROLE_USER", "ROLE_ADMIN"));
			User savedUser = users.save(brad);
			log.info("Preloaded " + savedUser.toString());
		};
	}
	
	@Bean
	CommandLineRunner initBonusRules(BonusRuleRepository ruleRepository) {
		return args -> {
			// Create the BASE bonus rule
			ruleRepository.save(new BonusRule(
					"BASE", 
					"Earn 10 loyalty base points per dollar spent on eligible games every day.", 
					EligibilityType.NET_SPEND,
					BonusType.POINTS_PER_DOLLAR,
					0.0, "", "", "", "", 
					10L, 1000000L, "A", 
					LocalDateTime.parse("2023-01-01T00:00:00"),
					LocalDateTime.parse("2099-01-01T00:00:00")));
			ruleRepository.save(new BonusRule(
					"ATARI_APRIL", 
					"Buy any Atari® brand title in the month of April and receive 100 bonus points for your purchase.", 
					EligibilityType.PRODUCT_BRAND,
					BonusType.FIXED_POINTS,
					0.0, "", "", "", "ATARI", 
					100L, 1000000L, "A", 
					LocalDateTime.parse("2023-04-01T00:00:00"),
					LocalDateTime.parse("2023-05-01T00:00:00")));
			ruleRepository.save(new BonusRule(
					"ATARI_MAY", 
					"Buy any Atari® brand title in the month of May and receive 100 bonus points for your purchase.", 
					EligibilityType.PRODUCT_BRAND,
					BonusType.FIXED_POINTS,
					0.0, "", "", "", "ATARI", 
					100L, 1000000L, "A", 
					LocalDateTime.parse("2023-05-01T00:00:00"),
					LocalDateTime.parse("2023-06-01T00:00:00")));
			ruleRepository.findAll().forEach(rule -> log.info("Preloaded " + rule));
			
		};
	}
}
