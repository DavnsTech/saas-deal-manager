import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('deals', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nomDeal: DataTypes.STRING,
      montant: DataTypes.DECIMAL(10, 2),
      devise: DataTypes.STRING,
      statut: DataTypes.STRING,
      etapeVente: DataTypes.ENUM(
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
      sourceLead: DataTypes.STRING,
      priorite: DataTypes.ENUM('Haute', 'Moyenne', 'Basse'),
      probabiliteClosing: DataTypes.INTEGER,
      dateCreation: DataTypes.DATE,
      dateCloturePrevue: DataTypes.DATE,
      responsableCommercial: DataTypes.STRING,
      clientEntreprise: DataTypes.STRING,
      contactPrincipal: DataTypes.STRING,
      email: DataTypes.STRING,
      telephone: DataTypes.STRING,
      secteurActivite: DataTypes.STRING,
      tailleEntreprise: DataTypes.STRING,
      canalAcquisition: DataTypes.STRING,
      besoinIdentifie: DataTypes.TEXT,
      solutionProposee: DataTypes.TEXT,
      typeContrat: DataTypes.STRING,
      dureeContrat: DataTypes.STRING,
      modePaiement: DataTypes.STRING,
      dateDerniereInteraction: DataTypes.DATE,
      commentairesInternes: DataTypes.TEXT,
      documentsJoints: DataTypes.STRING,
      suiviRelance: DataTypes.TEXT,
      scoreLead: DataTypes.INTEGER,
      valeurVieEstimee: DataTypes.DECIMAL(10, 2),
      regionPays: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('deals');
  },
};
