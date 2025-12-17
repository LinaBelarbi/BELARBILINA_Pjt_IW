// Modèle Participant
export interface Participant {
    id?: number;
    nom: string;
    email: string;
    statut: string;
    password?: string; // Mot de passe pour l'authentification
    eventId?: number;  // Référence vers l'événement
}
