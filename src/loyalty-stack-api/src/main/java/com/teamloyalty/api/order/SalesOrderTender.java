package com.teamloyalty.api.order;

import java.time.LocalDateTime;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
public class SalesOrderTender {
	
	private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	
	@OneToOne
	@JoinColumn(name = "sales_order_id")
	@JsonIgnore
	private SalesOrder salesOrder;
	private String codeTender;
	private Double amount;
	private String paymentCardNumber;
	private String paymentCardFirstName;
	private String paymentCardLastName;
	private String paymentCardZip;
	private String codeAuth;
	private String codeRef;
	
	public SalesOrderTender() {	}
	
	public SalesOrderTender(String codeTender, Double amount, String paymentCardNumber, String paymentCardFirstName, String paymentCardLastName,
			String paymentCardZip, String codeAuth, String codeRef) {
		this.codeTender = codeTender;
		this.amount = amount;
		this.paymentCardNumber = paymentCardNumber;
		this.paymentCardFirstName = paymentCardFirstName;
		this.paymentCardLastName = paymentCardLastName;
		this.paymentCardZip = paymentCardZip;
		this.codeAuth = codeAuth;
		this.codeRef = codeRef;
	}
	
	public Long getId() {
		return this.id;
	}
	
	public SalesOrder getSalesOrder() {
		return this.salesOrder;
	}
	
	public String getCodeTender() {
		return this.codeTender;
	}
	
	public Double getAmount() {
		return this.amount;
	}
	
	public String getPaymentCardNumber() {
		return this.paymentCardNumber;
	}
	
	public String getPaymentCardFirstName() {
		return this.paymentCardFirstName;
	}
	
	public String getPaymentCardLastName() {
		return this.paymentCardLastName;
	}
	
	public String getPaymentCardZip() {
		return this.paymentCardZip;
	}
	
	public String getCodeAuth() {
		return this.codeAuth;
	}
	
	public String getCodeRef() {
		return this.codeRef;
	}
	
	public void setSalesOrder(SalesOrder salesOrder) {
		this.salesOrder = salesOrder;
	}
	
	public void setCodeTender(String codeTender) {
		this.codeTender = codeTender;
	}
	
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	
	public void setPaymentCardNumber(String paymentCardNumber) {
		this.paymentCardNumber = paymentCardNumber;
	}
	
	public void setPaymentCardFirstName(String paymentCardFirstName) {
		this.paymentCardFirstName = paymentCardFirstName;
	}
	
	public void setPaymentCardLastName(String paymentCardLastName) {
		this.paymentCardLastName = paymentCardLastName;
	}
	
	public void setPaymentCardZip(String paymentCardZip) {
		this.paymentCardZip = paymentCardZip;
	}
	
	public void setCodeAuth(String codeAuth) {
		this.codeAuth = codeAuth;
	}
	
	public void setCodeRef(String codeRef) {
		this.codeRef = codeRef;
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof SalesOrderTender))
			return false;
		SalesOrderTender orderTender = (SalesOrderTender)o;
		return Objects.equals(this.id, orderTender.id) && 
				Objects.equals(this.codeTender, orderTender.codeTender) && Objects.equals(this.amount, orderTender.amount) && 
				Objects.equals(this.paymentCardNumber, orderTender.paymentCardNumber) && Objects.equals(this.paymentCardFirstName, orderTender.paymentCardFirstName) && 
				Objects.equals(this.paymentCardLastName, orderTender.paymentCardLastName) && Objects.equals(this.paymentCardZip, orderTender.paymentCardZip) && 
				Objects.equals(this.codeAuth, orderTender.codeAuth) && Objects.equals(this.codeRef, orderTender.codeRef);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(this.id, this.codeTender, this.amount, this.paymentCardNumber, this.paymentCardFirstName, this.paymentCardLastName,  
				this.paymentCardZip, this.codeAuth, this.codeRef);
	}
	
	@Override
	public String toString() {
		return "SalesOrderTender(" + "id=" + this.id + ", codeTender=" + this.codeTender + ", amount=" + this.amount +  
				", paymentCardNumber='" + this.paymentCardNumber + "', paymentCardFirstName='" + this.paymentCardFirstName + 
				"', paymentCardLastName='" + this.paymentCardLastName + "', paymentCardZip=" + this.paymentCardZip + 
				", codeAuth=" + this.codeAuth + ", codeRef=" + this.codeRef + ")";
	}

}
