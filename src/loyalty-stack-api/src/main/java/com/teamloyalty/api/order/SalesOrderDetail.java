package com.teamloyalty.api.order;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class SalesOrderDetail {
	
	private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	private Integer lineNumber;
	private String productCode;
	private String productName;
	private Double unitPrice;
	private Integer quantity;
	private Double lineNetAmount;
	private Double lineTaxAmount;
	private Double lineDiscountAmount;
	private Double lineGrossAmount;
	private String status;
	
	 @ManyToOne
	 @JoinColumn(name = "sales_order_id")
	 @JsonIgnore
	 private SalesOrder salesOrder;
	
	public SalesOrderDetail() {}
	
	public SalesOrderDetail(Integer lineNumber, String productCode, String productName, Double unitPrice,
			Integer quantity, Double lineNetAmount, Double lineTaxAmount, Double lineDiscountAmount, Double lineGrossAmount, String status) {
		this.lineNumber = lineNumber;
		this.productCode = productCode;
		this.productName = productName;
		this.unitPrice = unitPrice;
		this.quantity = quantity;
		this.lineNetAmount = lineNetAmount;
		this.lineTaxAmount = lineTaxAmount;
		this.lineDiscountAmount = lineDiscountAmount;
		this.lineGrossAmount = lineGrossAmount;
		this.status = status;
	}
	
	public Long getId() {
		return this.id;
	}
	
//	public Long getSalesOrderId() {
//		return this.salesOrderId;
//	}
	
	public SalesOrder getSalesOrder() {
		return this.salesOrder;
	}
	
	public Integer getLineNumber() {
		return this.lineNumber;
	}
	
	public String getProductCode() {
		return this.productCode;
	}
	
	public String getProductName() {
		return this.productName;
	}
	
	public Double getUnitPrice() {
		return this.unitPrice;
	}
	
	public Integer getQuantity() {
		return this.quantity;
	}
	
	public Double getLineNetAmount() {
		return this.lineNetAmount;
	}
	
	public Double getLineTaxAmount() {
		return this.lineTaxAmount;
	}
	
	public Double getLineDiscountAmount() {
		return this.lineDiscountAmount;
	}
	
	public Double getLineGrossAmount() {
		return this.lineGrossAmount;
	}
	
	public String getStatus() {
		return this.status;
	}
	
//	public void setSalesOrderId(Long salesOrderId) {
//		this.salesOrderId = salesOrderId;
//	}
	
	public void setSalesOrder(SalesOrder salesOrder) {
		this.salesOrder = salesOrder;
	}
	
	public void setLineNumber(Integer lineNumber) {
		this.lineNumber = lineNumber;
	}
	
	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}
	
	public void setProductName(String productName) {
		this.productName = productName;
	}
	
	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}
	
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	
	public void setLineNetAmount(Double lineNetAmount) {
		this.lineNetAmount = lineNetAmount;
	}
	
	public void setLineTaxAmount(Double lineTaxAmount) {
		this.lineTaxAmount = lineTaxAmount;
	}
	
	public void setLineDiscountAmount(Double lineDiscountAmount) {
		this.lineDiscountAmount = lineDiscountAmount;
	}
	
	public void setLineGrossAmount(Double lineGrossAmount) {
		this.lineGrossAmount = lineGrossAmount;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof SalesOrderDetail))
			return false;
		SalesOrderDetail orderDetail = (SalesOrderDetail)o;
		return Objects.equals(this.id, orderDetail.id) && //Objects.equals(this.salesOrderId, orderDetail.salesOrderId) && 
				Objects.equals(this.lineNumber, orderDetail.lineNumber) && Objects.equals(this.productCode, orderDetail.productCode) && 
				Objects.equals(this.productName, orderDetail.productName) && Objects.equals(this.unitPrice, orderDetail.unitPrice) && 
				Objects.equals(this.quantity, orderDetail.quantity) && Objects.equals(this.lineNetAmount, orderDetail.lineNetAmount) && 
				Objects.equals(this.lineTaxAmount, orderDetail.lineTaxAmount) && Objects.equals(this.lineDiscountAmount, orderDetail.lineDiscountAmount) && 
				Objects.equals(this.lineGrossAmount, orderDetail.lineGrossAmount) && Objects.equals(this.status, orderDetail.status);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(this.id, this.lineNumber, this.productCode, this.productName, this.unitPrice, this.quantity, //this.salesOrderId, 
				this.lineNetAmount, this.lineTaxAmount, this.lineDiscountAmount, this.lineGrossAmount, this.status);
	}
	
	@Override
	public String toString() {
		return "SalesOrderDetail(" + "id=" + this.id + ", lineNumber=" + this.lineNumber + ", productCode=" + this.productCode + // ", salesOrderId=" + this.salesOrderId + 
				", productName='" + this.productName + "', unitPrice=" + this.unitPrice + ", quantity=" + this.quantity + ", lineNetAmount=" + this.lineNetAmount + 
				", lineTaxAmount=" + this.lineTaxAmount + ", lineDiscountAmount=" + this.lineDiscountAmount + ", lineGrossAmount=" + this.lineGrossAmount + 
				", status=" + this.status + ")";
	}

}
