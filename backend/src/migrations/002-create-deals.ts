import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('deals', {
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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      followupTracking: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      leadScore: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      estimatedLifetimeValue: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
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
