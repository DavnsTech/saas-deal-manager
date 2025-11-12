import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('deals', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
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
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('deals');
  },
};
