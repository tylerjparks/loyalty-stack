package com.teamloyalty.api.order;

import java.time.LocalDateTime;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.teamloyalty.api.customer.Customer;

import java.util.List;
import java.util.ArrayList;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class SalesOrderShippingAddress {
	
	private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	
	@OneToOne
	@JoinColumn(name = "sales_order_id")
	@JsonIgnore
	private SalesOrder salesOrder;
	private String firstName;
	private String lastName;
	private String address;
	private String city;
	private String state;
	private String country;
	private String postal;
	
	public SalesOrderShippingAddress() {}
	
	public SalesOrderShippingAddress(String firstName, String lastName, String address, String city, String state, String country, String postal) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.address = address;
		this.city = city;
		this.state = state;
		this.country = country;
		this.postal = postal;
	}
	
	public Long getId() {
		return this.id;
	}
	
	public SalesOrder getSalesOrder() {
		return this.salesOrder;
	}
	
	public String getFirstName() {
		return this.firstName;
	}
	
	public String getLastName() {
		return this.lastName;
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
	
	public void setSalesOrder(SalesOrder salesOrder) {
		this.salesOrder = salesOrder;
	}
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public void setLastName(String lastName) {
		this.lastName = lastName;
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
	
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof SalesOrderShippingAddress))
			return false;
		SalesOrderShippingAddress orderShipping = (SalesOrderShippingAddress)o;
		return Objects.equals(this.id, orderShipping.id) && Objects.equals(this.firstName, orderShipping.firstName) &&
				Objects.equals(this.lastName, orderShipping.lastName) && Objects.equals(this.address, orderShipping.address) && 
				Objects.equals(this.city, orderShipping.city) && Objects.equals(this.state, orderShipping.state) && 
				Objects.equals(this.country,  orderShipping.country) && Objects.equals(this.postal, orderShipping.postal);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(this.id, this.firstName, this.lastName, this.address, this.city, this.state, this.country, this.postal);
	}
	
	@Override
	public String toString() {
		return "SalesOrderShippingAddress(" + "id=" + this.id + ", firstName=" + this.firstName + ", lastName=" + this.lastName +
				", address='" + this.address + "', city=" + this.city + ", state=" + this.state + ", country=" + this.country + 
				", postal=" + this.postal + ")";
	}
	

}
