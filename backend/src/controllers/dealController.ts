import { Request, Response } from 'express';
import * as dealService from '../services/dealService';
import { DealStage } from '../models/Deal'; // Import enum for validation

export const createDeal = async (req: Request, res: Response) => {
  // Ensure the authenticated user's ID is used as the owner
  const ownerId = req.user?.id;
  if (!ownerId) {
    return res.status(401).json({ message: 'Authentication required to create a deal.' });
  }

  const { name, company, value, stage } = req.body;

  // Basic input validation
  if (!name || !company || value === undefined || !stage) {
    return res.status(400).json({ message: 'Name, company, value, and stage are required fields.' });
  }
  if (typeof value !== 'number' || value < 0) {
    return res.status(400).json({ message: 'Value must be a non-negative number.' });
  }
  if (!Object.values(DealStage).includes(stage)) {
    return res.status(400).json({ message: `Invalid deal stage. Please choose from: ${Object.values(DealStage).join(', ')}.` });
  }

  try {
    const newDeal = await dealService.createDeal({
      name,
      company,
      value,
      stage,
      ownerId, // Assign the authenticated user as the owner
      customFields: req.body.customFields, // Allow custom fields to be passed
    });
    res.status(201).json(newDeal);
  } catch (error: any) {
    console.error('Create Deal Error:', error);
    // Handle specific service errors
    if (error.message.includes('not found')) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to create deal.', error: error.message });
  }
};

export const getDeals = async (req: Request, res: Response) => {
  const ownerId = req.query.ownerId as string | undefined; // Allow filtering by owner if needed, or default to authenticated user

  // If ownerId is not provided in query, default to the authenticated user's ID for their own deals
  const userIdToFetch = ownerId || req.user?.id;

  if (!userIdToFetch) {
    return res.status(401).json({ message: 'Authentication required to view deals.' });
  }

  try {
    const deals = await dealService.getAllDeals(userIdToFetch);
    res.status(200).json(deals);
  } catch (error: any) {
    console.error('Get Deals Error:', error);
    res.status(500).json({ message: 'Failed to retrieve deals.', error: error.message });
  }
};

export const getDealById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Deal ID is required.' });
  }

  try {
    const deal = await dealService.getDealById(id);
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found.' });
    }
    // Optional: Check if the logged-in user is the owner or has permission to view this deal
    if (deal.ownerId !== req.user?.id) {
      // In a real app, you'd have more sophisticated authorization logic
      return res.status(403).json({ message: 'Forbidden: You do not have permission to view this deal.' });
    }
    res.status(200).json(deal);
  } catch (error: any) {
    console.error('Get Deal By ID Error:', error);
    res.status(500).json({ message: 'Failed to retrieve deal.', error: error.message });
  }
};

export const updateDeal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Deal ID is required.' });
  }

  try {
    // Fetch the deal first to check ownership before allowing update
    const existingDeal = await dealService.getDealById(id);
    if (!existingDeal) {
      return res.status(404).json({ message: 'Deal not found.' });
    }
    if (existingDeal.ownerId !== req.user?.id) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to update this deal.' });
    }

    // Basic validation for fields that can be updated and might cause issues
    if (updateData.value !== undefined && typeof updateData.value !== 'number' || (updateData.value !== undefined && updateData.value < 0)) {
      return res.status(400).json({ message: 'Value must be a non-negative number.' });
    }
    if (updateData.stage && !Object.values(DealStage).includes(updateData.stage)) {
      return res.status(400).json({ message: `Invalid deal stage. Please choose from: ${Object.values(DealStage).join(', ')}.` });
    }

    const updatedDeal = await dealService.updateDeal(id, updateData);
    if (!updatedDeal) {
      // This case should ideally not happen if getDealById succeeded, but for safety.
      return res.status(404).json({ message: 'Deal not found after attempting update.' });
    }
    res.status(200).json(updatedDeal);
  } catch (error: any) {
    console.error('Update Deal Error:', error);
    res.status(500).json({ message: 'Failed to update deal.', error: error.message });
  }
};

export const deleteDeal = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Deal ID is required.' });
  }

  try {
    // Verify ownership before deletion
    const existingDeal = await dealService.getDealById(id);
    if (!existingDeal) {
      return res.status(404).json({ message: 'Deal not found.' });
    }
    if (existingDeal.ownerId !== req.user?.id) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this deal.' });
    }

    const deleted = await dealService.deleteDeal(id);
    if (deleted) {
      res.status(204).send(); // No content to send back on successful deletion
    } else {
      // This case is unlikely if existingDeal was found, but good for robustness.
      res.status(404).json({ message: 'Deal not found (deletion failed).' });
    }
  } catch (error: any) {
    console.error('Delete Deal Error:', error);
    res.status(500).json({ message: 'Failed to delete deal.', error: error.message });
  }
};
