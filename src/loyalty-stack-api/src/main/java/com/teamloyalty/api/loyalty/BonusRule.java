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

@Entity
public class BonusRule {
	
	private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	@NotEmpty
	@Column(unique=true)
	private String bonusCode;
	private String bonusDescription;
	private EligibilityType eligibilityType;
	private BonusType bonusType;
	private Double minimumSpend;
	private String productCodes;
	private String productLevel;
	private String productLevelCodes;
	private String productBrands;
	private Long points;
	private Long pointsCap;
	private String status;
	private LocalDateTime startDate;
	private LocalDateTime endDate;
	
	public BonusRule() {}
	
	public BonusRule(String bonusCode, String bonusDescription, EligibilityType eligibilityType, BonusType bonusType, Double minimumSpend,
			String productCodes, String productLevel, String productLevelCodes, String productBrands, Long points, Long pointsCap, 
			String status, LocalDateTime startDate, LocalDateTime endDate) {
		this.bonusCode = bonusCode;
		this.bonusDescription = bonusDescription;
		this.eligibilityType = eligibilityType;
		this.bonusType = bonusType;
		this.minimumSpend = minimumSpend;
		this.productCodes = productCodes;
		this.productLevel = productLevel;
		this.productLevelCodes = productLevelCodes;
		this.productBrands = productBrands;
		this.points = points;
		this.pointsCap = pointsCap;
		this.status = status;
		this.startDate = startDate;
		this.endDate = endDate;
	}
	
	public Long getId() {
		return this.id;
	}
	
	public String getBonusCode() {
		return this.bonusCode;
	}
	
	public String getBonusDescription() {
		return this.bonusDescription;
	}
	
	public EligibilityType getEligibilityType() {
		return this.eligibilityType;
	}
	
	public BonusType getBonusType() {
		return this.bonusType;
	}
	
	public Double getMinimumSpend() {
		return this.minimumSpend;
	}
	
	public String getProductCodes() {
		return this.productCodes;
	}
	
	public String getProductLevel() {
		return this.productLevel;
	}
	
	public String getProductLevelCodes() {
		return this.productLevelCodes;
	}
	
	public String getProductBrands() {
		return this.productBrands;
	}
	
	public Long getPoints() {
		return this.points;
	}
	
	public Long getPointsCap() {
		return this.pointsCap;
	}
	
	public String getStatus() {
		return this.status;
	}
	
	public LocalDateTime getStartDate() {
		return this.startDate;
	}
	
	public LocalDateTime getEndDate() {
		return this.endDate;
	}
	
	public void setBonusCode(String bonusCode) {
		this.bonusCode = bonusCode;
	}
	
	public void setBonusDescription(String bonusDescription) {
		this.bonusDescription = bonusDescription;
	}
	
	public void setEligibilityType(EligibilityType eligibilityType) {
		this.eligibilityType = eligibilityType;
	}
	
	public void setBonusType(BonusType bonusType) {
		this.bonusType = bonusType;
	}
	
	public void setMinimumSpend(Double minimumSpend) {
		this.minimumSpend = minimumSpend;
	}
	
	public void setProductCodes(String productCodes) {
		this.productCodes = productCodes;
	}
	
	public void setProductLevel(String productLevel) {
		this.productLevel = productLevel;
	}
	
	public void setProductLevelCodes(String productLevelCodes) {
		this.productLevelCodes = productLevelCodes;
	}
	
	public void setProductBrands(String productBrands) {
		this.productBrands = productBrands;
	}
	
	public void setPoints(Long points) {
		this.points = points;
	}
	
	public void setPointsCap(Long pointsCap) {
		this.pointsCap = pointsCap;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
	public void setStartDate(LocalDateTime startDate) {
		this.startDate = startDate;
	}
	
	public void setEndDate(LocalDateTime endDate) {
		this.endDate = endDate;
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof BonusRule))
			return false;
		BonusRule br = (BonusRule)o;
		return Objects.equals(this.id, br.id) && Objects.equals(this.bonusCode, br.bonusCode) &&
				Objects.equals(this.bonusDescription, br.bonusDescription) && Objects.equals(this.eligibilityType, br.eligibilityType) &&
				Objects.equals(this.bonusType, br.bonusType) && Objects.equals(this.minimumSpend, br.minimumSpend) &&
				Objects.equals(this.productCodes, br.productCodes) && Objects.equals(this.productLevel,  br.productLevel) &&
				Objects.equals(this.productLevelCodes, br.productLevelCodes) && Objects.equals(this.productBrands, br.productBrands) &&
				Objects.equals(this.points, br.points) && Objects.equals(this.pointsCap, br.pointsCap) &&
				Objects.equals(this.status, br.status) && Objects.equals(this.startDate, br.startDate) && Objects.equals(this.endDate, br.endDate);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(this.id, this.bonusCode, this.bonusDescription, this.eligibilityType, this.bonusType, this.minimumSpend, this.productCodes,
				this.productLevel, this.productLevelCodes, this.productBrands, this.points, this.pointsCap, this.status, this.startDate, this.endDate);
	}
	
	@Override
	public String toString() {
		return "BonusRule(" + "id=" + this.id + ", bonusCode=" + this.bonusCode + ", bonusDescription='" + this.bonusDescription +
				"', eligibilityType=" + this.eligibilityType + ", bonusType=" + this.bonusType + ", minimumSpend=" + this.minimumSpend +
				", productCodes='" + this.productCodes + "', productLevel=" + this.productLevel + ", productLevelCodes='" + this.productLevelCodes + 
				"', productBrands='" + this.productBrands  + "', points=" + this.points + ", pointsCap=" + this.pointsCap + ", status=" + this.status + 
				", startDate=" + this.startDate + ", endDate=" + this.endDate + ")";
	}

}
