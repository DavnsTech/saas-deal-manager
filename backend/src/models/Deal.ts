import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface DealAttributes {
  id: string;
  name: string;
  amount: number;
  currency: string;
  status: string;
  stage: string;
  source: string;
  priority: string;
  probability: number;
  createdAt: Date;
  closeDate: Date;
  responsible: string;
  client: string;
  contact: string;
  email: string;
  phone: string;
  sector: string;
  companySize: string;
  acquisitionChannel: string;
  identifiedNeed: string;
  proposedSolution: string;
  contractType: string;
  contractDuration: string;
  paymentMode: string;
  lastInteraction: Date;
  internalComments: string;
  attachedDocuments: string;
  followUpReminder: Date;
  leadScore: number;
  lifetimeValue: number;
  region: string;
  updatedAt: Date;
}

export class Deal extends Model<DealAttributes> implements DealAttributes {
  public id!: string;
  public name!: string;
  public amount!: number;
  public currency!: string;
  public status!: string;
  public stage!: string;
  public source!: string;
  public priority!: string;
  public probability!: number;
  public readonly createdAt!: Date;
  public closeDate!: Date;
  public responsible!: string;
  public client!: string;
  public contact!: string;
  public email!: string;
  public phone!: string;
  public sector!: string;
  public companySize!: string;
  public acquisitionChannel!: string;
  public identifiedNeed!: string;
  public proposedSolution!: string;
  public contractType!: string;
  public contractDuration!: string;
  public paymentMode!: string;
  public lastInteraction!: Date;
  public internalComments!: string;
  public attachedDocuments!: string;
  public followUpReminder!: Date;
  public leadScore!: number;
  public lifetimeValue!: number;
  public region!: string;
  public readonly updatedAt!: Date;
}

Deal.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stage: {
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
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'),
      allowNull: true,
    },
    probability: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    closeDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    responsible: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    client: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
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
    sector: {
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
    lastInteraction: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    internalComments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    attachedDocuments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    followUpReminder: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    leadScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lifetimeValue: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Deal',
    tableName: 'deals',
    timestamps: true,
  }
);
