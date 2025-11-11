import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './User';

interface DealAttributes {
  id: number;
  name: string;
  amount: number;
  currency: string;
  status: string;
  stage: string;
  sourceLead: string;
  priority: string;
  probabilityClosing: number;
  createdAt?: Date;
  updatedAt?: Date;
  closingDate?: Date;
  assignedUserId: number;
  clientEnterprise: string;
  contactPrincipal: string;
  email: string;
  phone: string;
  activitySector: string;
  companySize: string;
  acquisitionChannel: string;
  identifiedNeed: string;
  proposedSolution: string;
  contractType: string;
  contractDuration: string;
  paymentMode: string;
  lastInteractionDate?: Date;
  internalComments: string;
  attachedDocuments: string; // JSON string or URL
  followUpReminder: string;
  leadScore: number;
  lifetimeValue: number;
  regionCountry: string;
}

export class Deal extends Model<DealAttributes> implements DealAttributes {
  public id!: number;
  public name!: string;
  public amount!: number;
  public currency!: string;
  public status!: string;
  public stage!: string;
  public sourceLead!: string;
  public priority!: string;
  public probabilityClosing!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public closingDate?: Date;
  public assignedUserId!: number;
  public clientEnterprise!: string;
  public contactPrincipal!: string;
  public email!: string;
  public phone!: string;
  public activitySector!: string;
  public companySize!: string;
  public acquisitionChannel!: string;
  public identifiedNeed!: string;
  public proposedSolution!: string;
  public contractType!: string;
  public contractDuration!: string;
  public paymentMode!: string;
  public lastInteractionDate?: Date;
  public internalComments!: string;
  public attachedDocuments!: string;
  public followUpReminder!: string;
  public leadScore!: number;
  public lifetimeValue!: number;
  public regionCountry!: string;

  public readonly assignedUser?: User;
}

Deal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USD',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
    stage: {
      type: DataTypes.ENUM('Prospection', 'Qualification', 'Prise de contact', 'Découverte', 'Proposition de valeur', 'Négociation', 'Closing', 'Livraison/Onboarding', 'Fidélisation/Upsell/Cross-sell'),
      allowNull: false,
      defaultValue: 'Prospection',
    },
    sourceLead: {
      type: DataTypes.STRING,
      allowNull: true,
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
    },
    closingDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    assignedUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    clientEnterprise: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactPrincipal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
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
      type: DataTypes.TEXT,
      allowNull: true, // Could store URLs or JSON
    },
    followUpReminder: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    leadScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    lifetimeValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
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

Deal.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });
