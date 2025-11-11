class DealService {
  // Unified method that handles both B2B and B2C
  async createDeal(dealData: DealCreateInput): Promise<Deal> {
    // Common validation
    this.validateCommonFields(dealData);
    
    // Type-specific validation
    if (dealData.dealType === 'B2B') {
      this.validateB2BFields(dealData);
    } else {
      this.validateB2CFields(dealData);
    }
    
    // Create deal
    const deal = await DealModel.create(dealData);
    
    // Type-specific post-processing
    if (dealData.dealType === 'B2B') {
      await this.handleB2BDealCreation(deal);
    }
    
    return deal;
  }
  
  private validateB2BFields(dealData: DealCreateInput) {
    if (!dealData.companyId) {
      throw new Error('Company ID is required for B2B deals');
    }
    // Additional B2B validations
  }
  
  private validateB2CFields(dealData: DealCreateInput) {
    // Additional B2C validations
  }
  
  private async handleB2BDealCreation(deal: Deal) {
    // Update company deal count
    await CompanyModel.updateOne(
      { _id: deal.companyId },
      { $push: { dealIds: deal._id } }
    );
    
    // Notify account manager
    // ...
  }
}
