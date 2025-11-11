import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('deals', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
          model: 'users',
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
        allowNull: true,
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
