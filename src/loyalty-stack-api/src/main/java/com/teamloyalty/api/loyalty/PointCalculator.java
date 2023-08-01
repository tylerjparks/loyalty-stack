package com.teamloyalty.api.loyalty;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.ArrayList;

import com.teamloyalty.api.order.SalesOrder;
import com.teamloyalty.api.order.SalesOrderDetail;
import com.teamloyalty.api.product.Product;
import com.teamloyalty.api.product.ProductRepository;

public class PointCalculator {
	
	private final List<BonusRule> bonusRules;
	private final ProductRepository productRepository;
	
	public PointCalculator(List<BonusRule> bonusRules, ProductRepository productRepository) {
		this.bonusRules = bonusRules;
		this.productRepository = productRepository;
	}
	
	public List<Points> evaluateSalesOrder(SalesOrder order) {
		List<Points> pointAwards = new ArrayList<Points>();
		for (BonusRule rule : this.bonusRules) {
			// If the rule is active and has a start/end date range that includes the order date
			// TODO: tighten this up a little around date range start/end, and filter the collection of rules for Active only
			if (rule.getStatus() == "A" && rule.getStartDate().isBefore(order.getDate()) && rule.getEndDate().isAfter(order.getDate())) {
				boolean eligible = false;
				Double eligibleRevenue = 0.0;
				// First we check for eligibility
				// TODO: Refactor this into its own method
				switch(rule.getEligibilityType()) {
				case NET_SPEND:
					if (order.getNetAmount() >= rule.getMinimumSpend()) {
						eligible = true;
						eligibleRevenue = order.getNetAmount();
					}
					break;
				case PRODUCT_CODE:
					for (SalesOrderDetail detail : order.getSalesOrderDetails()) {
						if (rule.getProductCodes().contains(detail.getProductCode())) {
							eligible = true;
							eligibleRevenue += detail.getLineNetAmount();
						}
					}
					break;
				case PRODUCT_CATEGORY:
					for (SalesOrderDetail detail : order.getSalesOrderDetails()) {
						// Need to get the full Product record from db, 
						// Check the LevelCode for the corresponding order.getProductLevel() matches 
						// This is inefficient, because we may retrieve this Product data multiple times evaluating multiple rules.  Refactor later.
						Optional<Product> op = this.productRepository.findByCode(detail.getProductCode());
						if (op.isPresent()) {
							Product p = op.get();
							String levelCode = rule.getProductLevel();
							if (levelCode == "1") {
								if (rule.getProductLevelCodes().contains(p.getLevel1())) {
									eligible = true;
									eligibleRevenue += detail.getLineNetAmount();
								}
							}
							else if (levelCode == "2") {
								if (rule.getProductLevelCodes().contains(p.getLevel2())) {
									eligible = true;
									eligibleRevenue += detail.getLineNetAmount();
								}
							}
						}
					}
					break;
				case PRODUCT_BRAND:
					for (SalesOrderDetail detail : order.getSalesOrderDetails()) {
						Optional<Product> op = this.productRepository.findByCode(detail.getProductCode());
						if (op.isPresent()) {
							Product p = op.get();
							if (rule.getProductBrands().contains(p.getCodeBrand())) {
								eligible = true;
								eligibleRevenue += detail.getLineNetAmount();
							}
						}
					}
					break;
				}
				if (eligible && eligibleRevenue < rule.getMinimumSpend())
					//  Really need to clean up the logic above.  Can probably just check if eligible revenue > 0.0 before setting eligible = true above
					eligible = false;
				
				// If the SalesOrder is "eligible" for the rule then calculate the Points outcome and add to the output collection
				if (eligible) {
					Long pointsAmount;
					Points p = null;
					switch(rule.getBonusType()) {
					case POINTS_PER_DOLLAR:
						// TODO: round DOWN to whole point, implement points cap
						pointsAmount = Math.round(eligibleRevenue * rule.getPoints());
						p = new Points(
								order.getCustomerId(), 
								ActivityType.POINTS_EARN, 
								rule.getBonusCode(), 
								null, 
								pointsAmount, 
								order.getId(), 
								LocalDateTime.now());
						break;
					case FIXED_POINTS:
						// TODO: Implement points cap
						pointsAmount = rule.getPoints();
						p = new Points(
								order.getCustomerId(), 
								ActivityType.POINTS_EARN, 
								rule.getBonusCode(), 
								null, 
								pointsAmount, 
								order.getId(), 
								LocalDateTime.now());
						break;
					}
					if (p != null)
						pointAwards.add(p);
				}
				
			}
		}
		
		return pointAwards;
	}

}
