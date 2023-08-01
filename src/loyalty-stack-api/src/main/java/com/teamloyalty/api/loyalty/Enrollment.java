package com.teamloyalty.api.loyalty;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Random;
import java.util.stream.IntStream;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
public class Enrollment {
	
	private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	@NotNull
	private Long customerId;
	private String status;
	private LocalDateTime joinDate;
	@NotEmpty
	private String accountNumber;
	
	public Enrollment() {}
	
	public Enrollment(Long customerId, String status, LocalDateTime joinDate, String accountNumber) {
		this.customerId = customerId;
		this.status = status;
		this.joinDate = joinDate;
		this.accountNumber = accountNumber;
	}
	
	public Long getId() {
		return this.id;
	}
	
	public Long getCustomerId() {
		return this.customerId;
	}
	
	public String getStatus() {
		return this.status;
	}
	
	public LocalDateTime getJoinDate() {
		return this.joinDate;
	}
	
	public String getAccountNumber() {
		return this.accountNumber;
	}
	
	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
	public void setJoinDate(LocalDateTime joinDate) {
		this.joinDate = joinDate;
	}
	
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof Enrollment))
			return false;
		Enrollment enrollment = (Enrollment)o;
		return Objects.equals(this.id, enrollment.id) && Objects.equals(this.customerId, enrollment.customerId) && Objects.equals(this.status, enrollment.status) &&
				Objects.equals(this.joinDate, enrollment.joinDate) && Objects.equals(this.accountNumber, enrollment.accountNumber);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(this.id, this.customerId, this.status, this.joinDate, this.accountNumber);
	}
	
	@Override
	public String toString() {
		return "Enrollment(" + "id=" + this.id + ", customerId=" + this.customerId + ", status=" + this.status + ", joinDate=" + this.joinDate +
				", accountNumber=" + this.accountNumber + ")";
	}
	
	public static String generateCardNumber() {
		// For now randomly generate a 10-digit card number string
		// This should be sufficiently duplicate-free for demo purposes
		Random rn = new Random();
		String cardNo = "";
		for (int i=0; i < 10; i++) {
			Integer digit = rn.nextInt(10);
			cardNo = cardNo.concat(digit.toString());
		}
		return cardNo;
	}

}
