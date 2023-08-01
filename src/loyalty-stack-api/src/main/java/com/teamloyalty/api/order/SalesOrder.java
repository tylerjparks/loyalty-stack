package com.teamloyalty.api.order;

import java.time.LocalDateTime;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.teamloyalty.api.loyalty.Points;

import java.util.List;
import java.util.ArrayList;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotNull;

@Entity
public class SalesOrder {
	
	private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	private Long customerId;
	private LocalDateTime orderDate;
	private Double grossAmount;
	private Double netAmount;
	private Double taxAmount;
	private Double shippingAndHandling;
	private Double discountAmount;
	private String status;
	
	@OneToMany(mappedBy = "salesOrder", cascade = CascadeType.ALL)
    private List<SalesOrderDetail> salesOrderDetails = new ArrayList<>();
	
	@OneToOne(mappedBy = "salesOrder", cascade = CascadeType.ALL)
	@NotNull
	private SalesOrderTender salesOrderTender;
	
	@OneToOne(mappedBy = "salesOrder", cascade = CascadeType.ALL)
	@NotNull
	private SalesOrderShippingAddress salesOrderShippingAddress;
	
	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Transient
	private List<Points> points;
	
	public SalesOrder() {}
	
	public SalesOrder(Long customerId, LocalDateTime date, Double grossAmount, Double netAmount, Double taxAmount, Double shippingAndHandling,
			Double discountAmount, String status) {
		this.customerId = customerId;
		this.orderDate = date;
		this.grossAmount = grossAmount;
		this.netAmount = netAmount;
		this.taxAmount = taxAmount;
		this.shippingAndHandling = shippingAndHandling;
		this.discountAmount = discountAmount;
		this.status = status;
	}
	
	public Long getId() {
		return this.id;
	}
	
	public Long getCustomerId() {
		return this.customerId;
	}
	
	public LocalDateTime getDate() {
		return this.orderDate;
	}
	
	public Double getGrossAmount() {
		return this.grossAmount;
	}
	
	public Double getNetAmount() {
		return this.netAmount;
	}
	
	public Double getTaxAmount() {
		return this.taxAmount;
	}
	
	public Double getShippingAndHandling() {
		return this.shippingAndHandling;
	}
	
	public Double getDiscountAmount() {
		return this.discountAmount;
	}
	
	public String getStatus() {
		return this.status;
	}
	
	public List<SalesOrderDetail> getSalesOrderDetails() {
		return this.salesOrderDetails;
	}
	
	public SalesOrderTender getSalesOrderTender() {
		return this.salesOrderTender;
	}
	
	public SalesOrderShippingAddress getSalesOrderShippingAddress() {
		return this.salesOrderShippingAddress;
	}
	
	public List<Points> getPoints() {
		return this.points;
	}
	
	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}
	
	public void setDate(LocalDateTime date) {
		this.orderDate = date;
	}
	
	public void setGrossAmount(Double grossAmount) {
		this.grossAmount = grossAmount;
	}
	
	public void setNetAmounts(Double netAmount) {
		this.netAmount = netAmount;
	}
	
	public void setTaxAmounts(Double taxAmount) {
		this.taxAmount = taxAmount;
	}
	
	public void setShippingAndHandling(Double shippingAndHandling) {
		this.shippingAndHandling = shippingAndHandling;
	}
	
	public void setDiscountAmount(Double discountAmount) {
		this.discountAmount = discountAmount;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
	public void setSalesOrderDetails(List<SalesOrderDetail> salesOrderDetails) {
		this.salesOrderDetails = salesOrderDetails;
		
		for (SalesOrderDetail sod: salesOrderDetails) {
			sod.setSalesOrder(this);
		}
	}
	
	public void setSalesOrderTender(SalesOrderTender salesOrderTender) {
		this.salesOrderTender = salesOrderTender;
		this.salesOrderTender.setSalesOrder(this);
	}
	
	public void setSalesOrderShippingAddress(SalesOrderShippingAddress salesOrderShippingAddress) {
		this.salesOrderShippingAddress = salesOrderShippingAddress;
		this.salesOrderShippingAddress.setSalesOrder(this);
	}
	
	public void setPoints(List<Points> points) {
		this.points = points;
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof SalesOrder))
			return false;
		SalesOrder order = (SalesOrder)o;
		return Objects.equals(this.id, order.id) && Objects.equals(this.customerId, order.customerId) && Objects.equals(this.grossAmount, order.grossAmount) &&
				Objects.equals(this.netAmount, order.netAmount) && Objects.equals(this.taxAmount, order.taxAmount) &&
				Objects.equals(this.shippingAndHandling, order.shippingAndHandling) && Objects.equals(this.discountAmount, order.discountAmount) &&
				Objects.equals(this.status, order.status) && Objects.equals(this.orderDate, order.orderDate);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(this.id, this.customerId, this.orderDate, this.grossAmount, this.netAmount, this.taxAmount, this.shippingAndHandling, 
				this.discountAmount, this.status);
	}
	
	@Override
	public String toString() {
		return "SalesOrder(" + "id=" + this.id + ", customerId=" + this.customerId + ", grossAmount=" + this.grossAmount + ", netAmount=" + this.netAmount +
				", taxAmount=" + this.taxAmount + ", shippingAndHandling=" + this.shippingAndHandling + ", discountAmount=" + this.discountAmount + 
				", status=" + this.status + ")";
	}

}
