import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Deal extends Model {
  public id!: number;
  public nom_du_deal!: string;
  public montant!: number;
  public devise!: string;
  public statut!: string;
  public etape_de_vente!: string;
  public source_du_lead!: string;
  public priorite!: string;
  public probabilite_de_closing!: number;
  public date_de_creation!: Date;
  public date_de_cloture_prevue!: Date;
  public responsable_commercial!: string;
  public client_entreprise!: string;
  public contact_principal!: string;
  public email!: string;
  public telephone!: string;
  public secteur_d_activite!: string;
  public taille_de_l_entreprise!: string;
  public canal_d_acquisition!: string;
  public besoin_identifie!: string;
  public solution_proposee!: string;
  public type_de_contrat!: string;
  public duree_du_contrat!: string;
  public mode_de_paiement!: string;
  public date_de_derniere_interaction!: Date;
  public commentaires_internes!: string;
  public documents_joints!: string[];
  public suivi_de_relance!: string;
  public score_du_lead!: number;
  public valeur_a_vie_estimee!: number;
  public region_pays!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Deal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom_du_deal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    montant: {
      type: DataTypes.FLOAT,
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
    etape_de_vente: {
      type: DataTypes.ENUM,
      values: ['Prospection', 'Qualification', 'Prise de contact', 'Découverte', 'Proposition de valeur', 'Négociation', 'Closing', 'Livraison/Onboarding', 'Fidélisation/Upsell/Cross-sell'],
      allowNull: false,
    },
    source_du_lead: {
      type: DataTypes.STRING,
    },
    priorite: {
      type: DataTypes.STRING,
      defaultValue: 'Moyenne',
    },
    probabilite_de_closing: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    date_de_creation: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    date_de_cloture_prevue: {
      type: DataTypes.DATE,
    },
    responsable_commercial: {
      type: DataTypes.STRING,
    },
    client_entreprise: {
      type: DataTypes.STRING,
    },
    contact_principal: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    telephone: {
      type: DataTypes.STRING,
    },
    secteur_d_activite: {
      type: DataTypes.STRING,
    },
    taille_de_l_entreprise: {
      type: DataTypes.STRING,
    },
    canal_d_acquisition: {
      type: DataTypes.STRING,
    },
    besoin_identifie: {
      type: DataTypes.TEXT,
    },
    solution_proposee: {
      type: DataTypes.TEXT,
    },
    type_de_contrat: {
      type: DataTypes.STRING,
    },
    duree_du_contrat: {
      type: DataTypes.STRING,
    },
    mode_de_paiement: {
      type: DataTypes.STRING,
    },
    date_de_derniere_interaction: {
      type: DataTypes.DATE,
    },
    commentaires_internes: {
      type: DataTypes.TEXT,
    },
    documents_joints: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    suivi_de_relance: {
      type: DataTypes.TEXT,
    },
    score_du_lead: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    valeur_a_vie_estimee: {
      type: DataTypes.FLOAT,
    },
    region_pays: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Deal',
    tableName: 'deals',
    timestamps: true,
  }
);

Deal.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Deal, { foreignKey: 'userId' });

export default Deal;
