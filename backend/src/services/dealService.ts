import Deal from '../models/Deal';
import User from '../models/User'; // Assuming Deal has a userId foreign key

// Interface for deal data, potentially including custom fields
interface DealData {
    name: string;
    description?: string;
    amount: number;
    stage: string;
    customerId?: number; // Example, could be a relation to a Customer model
    userId: number; // The user who owns the deal
    // Add other fields as needed, including custom ones
}

export const createDeal = async (dealData: DealData): Promise<Deal> => {
    try {
        // Basic validation
        if (!dealData.name || !dealData.amount || !dealData.stage || !dealData.userId) {
            throw new Error('Missing required deal fields: name, amount, stage, userId');
        }

        // Optional: Check if the userId actually exists
        const user = await User.findByPk(dealData.userId);
        if (!user) {
            throw new Error(`User with ID ${dealData.userId} not found.`);
        }

        const newDeal = await Deal.create(dealData);
        return newDeal;
    } catch (error: any) {
        console.error('Error creating deal:', error.message);
        throw new Error(`Failed to create deal: ${error.message}`);
    }
};

export const getAllDeals = async (userId: number): Promise<Deal[]> => {
    try {
        // Fetch deals associated with the logged-in user
        const deals = await Deal.findAll({
            where: { userId },
            include: [User], // Include user details if needed, but be mindful of data leakage
            order: [['createdAt', 'DESC']],
        });
        return deals;
    } catch (error: any) {
        console.error('Error fetching deals:', error.message);
        throw new Error(`Failed to fetch deals: ${error.message}`);
    }
};

export const getDealById = async (id: number, userId: number): Promise<Deal | null> => {
    try {
        const deal = await Deal.findOne({
            where: { id, userId }, // Ensure user can only access their own deals
            include: [User],
        });
        return deal;
    } catch (error: any) {
        console.error(`Error fetching deal with ID ${id}:`, error.message);
        throw new Error(`Failed to fetch deal with ID ${id}: ${error.message}`);
    }
};

export const updateDeal = async (id: number, userId: number, updatedDealData: Partial<DealData>): Promise<Deal | null> => {
    try {
        const deal = await Deal.findOne({ where: { id, userId } }); // Find the deal by ID and user
        if (!deal) {
            throw new Error(`Deal with ID ${id} not found or you do not have permission.`);
        }

        // Update only allowed fields
        const allowedUpdates = ['name', 'description', 'amount', 'stage', 'customerId'];
        const fieldsToUpdate: Partial<DealData> = {};
        for (const key in updatedDealData) {
            if (allowedUpdates.includes(key) && updatedDealData[key] !== undefined) {
                fieldsToUpdate[key as keyof DealData] = updatedDealData[key] as DealData[keyof DealData];
            }
        }

        if (Object.keys(fieldsToUpdate).length === 0) {
            return deal; // No valid fields to update
        }

        Object.assign(deal, fieldsToUpdate);
        await deal.save();
        return deal;
    } catch (error: any) {
        console.error(`Error updating deal with ID ${id}:`, error.message);
        throw new Error(`Failed to update deal with ID ${id}: ${error.message}`);
    }
};

export const deleteDeal = async (id: number, userId: number): Promise<number> => {
    try {
        // Ensure user owns the deal before deleting
        const deletedCount = await Deal.destroy({
            where: { id, userId },
        });
        if (deletedCount === 0) {
            throw new Error(`Deal with ID ${id} not found or you do not have permission.`);
        }
        return deletedCount;
    } catch (error: any) {
        console.error(`Error deleting deal with ID ${id}:`, error.message);
        throw new Error(`Failed to delete deal with ID ${id}: ${error.message}`);
    }
};
