// Modèle Notification
export interface Notification {
    id?: number;
    message: string;
    recipientEmail: string;
    sent: boolean;
    participantId?: number;  // Référence vers le participant
    eventId?: number;        // Référence vers l'événement
}
