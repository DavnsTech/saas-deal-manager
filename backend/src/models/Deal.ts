import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User';

interface DealAttributes {
  id: string;
  name: string;
  amount: number;
  currency: string;
  status: string;
  salesStage: string;
  sourceLead: string;
  priority: 'Low' | 'Medium' | 'High';
  probabilityClosing: number;
  createdDate: Date;
  expectedClosingDate?: Date;
  assignedUserId: string;
  company: string;
  contactPrincipal: string;
  email: string;
  phone?: string;
  activitySector?: string;
  companySize?: string;
  acquisitionChannel?: string;
  identifiedNeed?: string;
  proposedSolution?: string;
  contractType?: string;
  contractDuration?: string;
  paymentMode?: string;
  lastInteractionDate?: Date;
  internalComments?: string;
  attachedDocuments?: string; // JSON string or file paths
  followupTracking?: string;
  leadScore?: number;
  estimatedLifetimeValue?: number;
  regionCountry?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Deal extends Model<DealAttributes> implements DealAttributes {
  public id!: string;
  public name!: string;
  public amount!: number;
  public currency!: string;
  public status!: string;
  public salesStage!: string;
  public sourceLead!: string;
  public priority!: 'Low' | 'Medium' | 'High';
  public probabilityClosing!: number;
  public createdDate!: Date;
  public expectedClosingDate?: Date;
  public assignedUserId!: string;
  public company!: string;
  public contactPrincipal!: string;
  public email!: string;
  public phone?: string;
  public activitySector?: string;
  public companySize?: string;
  public acquisitionChannel?: string;
  public identifiedNeed?: string;
  public proposedSolution?: string;
  public contractType?: string;
  public contractDuration?: string;
  public paymentMode?: string;
  public lastInteractionDate?: Date;
  public internalComments?: string;
  public attachedDocuments?: string;
  public followupTracking?: string;
  public leadScore?: number;
  public estimatedLifetimeValue?: number;
  public regionCountry?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association
  public readonly assignedUser?: User;
}

Deal.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'USD',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Active',
    },
    salesStage: {
      type: DataTypes.ENUM(
        'Prospection',
        'Qualification',
        'Prise de contact',
        'Découverte',
        'Proposition de valeur',
        'Négociation',
        'Closing',
        'Livraison/Onboarding',
        'Fidélisation/Upsell/Cross-sell'
      ),
      allowNull: false,
      defaultValue: 'Prospection',
    },
    sourceLead: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'),
      allowNull: false,
      defaultValue: 'Medium',
    },
    probabilityClosing: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 50,
      validate: {
        min: 0,
        max: 100,
      },
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    expectedClosingDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    assignedUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactPrincipal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activitySector: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companySize: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    acquisitionChannel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    identifiedNeed: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    proposedSolution: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contractType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contractDuration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paymentMode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastInteractionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    internalComments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    attachedDocuments: {
      type: DataTypes.TEXT, // Store as JSON string or file URLs
      allowNull: true,
    },
    followupTracking: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    leadScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 100,
      },
    },
    estimatedLifetimeValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    regionCountry: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Deal',
    tableName: 'deals',
  }
);

// Define associations
Deal.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });
User.hasMany(Deal, { foreignKey: 'assignedUserId', as: 'assignedDeals' });

export default Deal;
