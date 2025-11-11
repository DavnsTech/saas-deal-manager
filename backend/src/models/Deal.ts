import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database';

interface DealAttributes {
  id: number;
  nomDeal: string;
  montant: number;
  devise: string;
  statut: string;
  etapeVente: string;
  sourceLead: string;
  priorite: string;
  probabiliteClosing: number;
  dateCreation: Date;
  dateCloturePrevue: Date;
  responsableCommercial: string;
  clientEntreprise: string;
  contactPrincipal: string;
  email: string;
  telephone: string;
  secteurActivite: string;
  tailleEntreprise: string;
  canalAcquisition: string;
  besoinIdentifie: string;
  solutionProposee: string;
  typeContrat: string;
  dureeContrat: string;
  modePaiement: string;
  dateDerniereInteraction: Date;
  commentairesInternes: string;
  documentsJoints: string;
  suiviRelance: string;
  scoreLead: number;
  valeurVieEstimee: number;
  regionPays: string;
  userId: number;
}

class Deal extends Model<DealAttributes> implements DealAttributes {
  public id!: number;
  public nomDeal!: string;
  public montant!: number;
  public devise!: string;
  public statut!: string;
  public etapeVente!: string;
  public sourceLead!: string;
  public priorite!: string;
  public probabiliteClosing!: number;
  public dateCreation!: Date;
  public dateCloturePrevue!: Date;
  public responsableCommercial!: string;
  public clientEntreprise!: string;
  public contactPrincipal!: string;
  public email!: string;
  public telephone!: string;
  public secteurActivite!: string;
  public tailleEntreprise!: string;
  public canalAcquisition!: string;
  public besoinIdentifie!: string;
  public solutionProposee!: string;
  public typeContrat!: string;
  public dureeContrat!: string;
  public modePaiement!: string;
  public dateDerniereInteraction!: Date;
  public commentairesInternes!: string;
  public documentsJoints!: string;
  public suiviRelance!: string;
  public scoreLead!: number;
  public valeurVieEstimee!: number;
  public regionPays!: string;
  public userId!: number;
}

Deal.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomDeal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  montant: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  devise: {
    type: DataTypes.STRING,
    defaultValue: 'EUR',
  },
  statut: {
    type: DataTypes.STRING,
    defaultValue: 'Ouvert',
  },
  etapeVente: {
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
    defaultValue: 'Prospection',
  },
  sourceLead: DataTypes.STRING,
  priorite: {
    type: DataTypes.ENUM('Haute', 'Moyenne', 'Basse'),
    defaultValue: 'Moyenne',
  },
  probabiliteClosing: {
    type: DataTypes.INTEGER,
    defaultValue: 50,
  },
  dateCreation: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
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
  },
}, {
  sequelize: database,
  tableName: 'deals',
});

// Associations
import { User } from './User';
Deal.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Deal, { foreignKey: 'userId' });

export { Deal };
