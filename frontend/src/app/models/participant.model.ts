// Modèle Participant
export interface Participant {
    id?: number;
    nom: string;
    email: string;
    statut: string;
    eventId?: number;  // Référence vers l'événement
}
