import { Deal } from '../models/Deal';
import { User } from '../models/User';

export const dealService = {
  async getDealsByUser(userId: number) {
    return await Deal.findAll({
      where: { assignedUserId: userId },
      include: [{ model: User, as: 'assignedUser', attributes: ['username'] }],
    });
  },

  async getDealById(id: number, userId: number) {
    return await Deal.findOne({
      where: { id, assignedUserId: userId },
      include: [{ model: User, as: 'assignedUser', attributes: ['username'] }],
    });
  },

  async createDeal(dealData: any) {
    return await Deal.create(dealData);
  },

  async updateDeal(id: number, updateData: any, userId: number) {
    const [affectedCount] = await Deal.update(updateData, {
      where: { id, assignedUserId: userId },
    });
    if (affectedCount === 0) return null;
    return await Deal.findByPk(id);
  },

  async deleteDeal(id: number, userId: number) {
    const affectedCount = await Deal.destroy({
      where: { id, assignedUserId: userId },
    });
    return affectedCount > 0;
  },
};
