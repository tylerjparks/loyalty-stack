package com.teamloyalty.api.customer;

import java.time.LocalDateTime;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.teamloyalty.api.loyalty.Enrollment;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;

@Entity
public class Customer {
	
	private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	private String firstName;
	private String lastName;
	@Column(unique=true)
	private String emailAddress;
	private String address;
	private String city;
	private String country;
	private String state;
	private String postal;
	private String phone;
	private Boolean joinLoyalty = false;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Transient
	private Enrollment enrollment;
	private LocalDateTime createDate;
	private LocalDateTime updateDate;
	
	public Customer() {
		this.createDate = LocalDateTime.now();
		this.updateDate = LocalDateTime.now();
	}
	
	public Customer(String firstName, String lastName, String emailAddress, 
			String address, String city, String state, String country, String postal, String phone, Boolean joinLoyalty) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailAddress = emailAddress;
		this.address = address;
		this.city = city;
		this.state = state;
		this.country = country;
		this.postal = postal;
		this.phone = phone;
		this.joinLoyalty = joinLoyalty;
		this.createDate = LocalDateTime.now();
		this.updateDate = LocalDateTime.now();
	}
	
	public Long getId() {
		return this.id;
	}
	
	public String getName() {
		return this.firstName + " " + this.lastName;
	}
	
	public String getFirstName() {
		return this.firstName;
	}
	
	public String getLastName() {
		return this.lastName;
	}
	
	public String getEmailAddress() {
		return this.emailAddress;
	}
	
	public String getAddress() {
		return this.address;
	}
	
	public String getCity() {
		return this.city;
	}
	
	public String getCountry() {
		return this.country;
	}
	
	public String getState() {
		return this.state;
	}
	
	public String getPostal() {
		return this.postal;
	}
	
	public String getPhone() {
		return this.phone;
	}
	
	public Boolean getJoinLoyalty() {
		return this.joinLoyalty;
	}
	
	public Enrollment getEnrollment() {
		return this.enrollment;
	}
	
	public LocalDateTime getCreateDate() {
		return this.createDate;
	}
	
	public LocalDateTime getUpdateDate() {
		return this.updateDate;
	}
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}
	
	public void setAddress(String address) {
		this.address = address;
	}
	
	public void setCity(String city) {
		this.city = city;
	}
	
	public void setState(String state) {
		this.state = state;
	}
	
	public void setCountry(String country) {
		this.country = country;
	}
	
	public void setPostal(String postal) {
		this.postal = postal;
	}
	
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public void setJoinLoyalty(Boolean joinLoyalty) {
		this.joinLoyalty = joinLoyalty;
	}
	
	public void setEnrollment(Enrollment enrollment) {
		this.enrollment = enrollment;
	}
	
	public void setUpdateDate(LocalDateTime updateDate) {
		this.updateDate = updateDate;
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof Customer))
			return false;
		Customer customer = (Customer)o;
		return Objects.equals(this.id, customer.id) && Objects.equals(this.firstName, customer.firstName) &&
				Objects.equals(this.lastName, customer.lastName) && Objects.equals(this.emailAddress, customer.emailAddress) &&
				Objects.equals(this.address, customer.address) && Objects.equals(this.city, customer.city) &&
				Objects.equals(this.state, customer.state) && Objects.equals(this.country,  customer.country)&&
				Objects.equals(this.postal, customer.postal) && Objects.equals(this.phone, customer.phone);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(this.id, this.firstName, this.lastName, this.emailAddress, this.address, this.city, 
				this.state, this.country, this.postal, this.phone);
	}
	
	@Override
	public String toString() {
		return "Customer(" + "id=" + this.id + ", firstName=" + this.firstName + ", lastName=" + this.lastName +
				", emailAddress=" + this.emailAddress + ", address='" + this.address + "', city=" + this.city +
				", state=" + this.state + ", country=" + this.country + ", postal=" + this.postal + ", phone=" + this.phone  + ")";
	}

}
