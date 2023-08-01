package com.teamloyalty.api.loyalty;

import java.time.LocalDateTime;
import java.util.Objects;

import com.teamloyalty.api.customer.Customer;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
public class Points {
	
	private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	@NotNull
	private Long customerId;
	private ActivityType activityType;
	private String bonusCode;
	private String redemptionCode;
	private Long amount;
	private Long orderId;
	private LocalDateTime date;
	
	Points() {}
	
	public Points(Long customerId, ActivityType activityType, String bonusCode, String redemptionCode, Long amount, Long orderId, LocalDateTime date) {
		this.customerId = customerId;
		this.activityType = activityType;
		this.bonusCode = bonusCode;
		this.redemptionCode = redemptionCode;
		this.amount = amount;
		this.orderId = orderId;
		this.date = date;
	}
	
	public Long getId() {
		return this.id;
	}
	
	public Long getCustomerId() {
		return this.customerId;
	}
	
	public ActivityType getActivityType() {
		return this.activityType;
	}
	
	public String getBonusCode() {
		return this.bonusCode;
	}
	
	public String getRedemptionCode() {
		return this.redemptionCode;
	}
	
	public Long getAmount() {
		return this.amount;
	}
	
	public Long getOrderId() {
		return this.orderId;
	}
	
	public LocalDateTime getDate() {
		return this.date;
	}
	
	public void setCustomerId(Long customerId ) {
		this.customerId = customerId;
	}
	
	public void setActivityType(ActivityType activityType) {
		this.activityType = activityType;
	}
	
	public void setBonusCode(String bonusCode) {
		this.bonusCode = bonusCode;
	}
	
	public void setRedemptionCode(String redemptionCode) {
		this.redemptionCode = redemptionCode;
	}
	
	public void setAmount(Long amount) {
		this.amount = amount;
	}
	
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}
	
	public void setDate(LocalDateTime date) {
		this.date = date;
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof Points))
			return false;
		Points points = (Points)o;
		return Objects.equals(this.id, points.id) && Objects.equals(this.customerId, points.customerId) &&
				Objects.equals(this.activityType, points.activityType) && Objects.equals(this.bonusCode, points.bonusCode) &&
				Objects.equals(this.redemptionCode, points.redemptionCode) && Objects.equals(this.amount, points.amount) &&
				Objects.equals(this.orderId, points.orderId) && Objects.equals(this.date,  points.date);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(this.id, this.customerId, this.activityType, this.bonusCode, this.redemptionCode, this.amount, this.orderId, this.date);
	}
	
	@Override
	public String toString() {
		return "Points(" + "id=" + this.id + ", customerId=" + this.customerId + ", activityType=" + this.activityType +
				", bonusCode=" + this.bonusCode + ", redemptionCode=" + this.redemptionCode + ", amount=" + this.amount +
				", orderId=" + this.orderId + ", date=" + this.date + ")";
	}
	

}
