import Deal, { IDeal } from '../models/Deal';

export class DealService {
  async getAllDeals(filters?: {
    stage?: string;
    search?: string;
  }): Promise<IDeal[]> {
    const query: any = {};
    
    if (filters?.stage) {
      query.stage = filters.stage;
    }
    
    if (filters?.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { company: { $regex: filters.search, $options: 'i' } },
        { primaryContact: { $regex: filters.search, $options: 'i' } }
      ];
    }
    
    return await Deal.find(query).sort({ createdAt: -1 });
  }

  async getDealById(id: string): Promise<IDeal | null> {
    return await Deal.findById(id);
  }

  async createDeal(dealData: Partial<IDeal>): Promise<IDeal> {
    const deal = new Deal(dealData);
    return await deal.save();
  }

  async updateDeal(id: string, dealData: Partial<IDeal>): Promise<IDeal | null> {
    return await Deal.findByIdAndUpdate(id, dealData, { new: true });
  }

  async deleteDeal(id: string): Promise<boolean> {
    const result = await Deal.findByIdAndDelete(id);
    return result !== null;
  }
}
