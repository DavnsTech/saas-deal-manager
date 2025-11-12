export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Deal {
  id: number;
  nom_du_deal: string;
  montant: number;
  devise: string;
  statut: string;
  etape_de_vente: string;
  source_du_lead: string;
  priorite: string;
  probabilite_de_closing: number;
  date_de_creation: Date;
  date_de_cloture_prevue: Date;
  responsable_commercial: string;
  client_entreprise: string;
  contact_principal: string;
  email: string;
  telephone: string;
  secteur_d_activite: string;
  taille_de_l_entreprise: string;
  canal_d_acquisition: string;
  besoin_identifie: string;
  solution_proposee: string;
  type_de_contrat: string;
  duree_du_contrat: string;
  mode_de_paiement: string;
  date_de_derniere_interaction: Date;
  commentaires_internes: string;
  documents_joints: string[];
  suivi_de_relance: string;
  score_du_lead: number;
  valeur_a_vie_estimee: number;
  region_pays: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface DealCreateRequest {
  nom_du_deal: string;
  montant: number;
  devise: string;
  statut: string;
  etape_de_vente: string;
  source_du_lead: string;
  priorite: string;
  probabilite_de_closing: number;
  date_de_cloture_prevue: Date;
  responsable_commercial: string;
  client_entreprise: string;
  contact_principal: string;
  email: string;
  telephone: string;
  secteur_d_activite: string;
  taille_de_l_entreprise: string;
  canal_d_acquisition: string;
  besoin_identifie: string;
  solution_proposee: string;
  type_de_contrat: string;
  duree_du_contrat: string;
  mode_de_paiement: string;
  date_de_derniere_interaction: Date;
  commentaires_internes: string;
  documents_joints: string[];
  suivi_de_relance: string;
  score_du_lead: number;
  valeur_a_vie_estimee: number;
  region_pays: string;
}
