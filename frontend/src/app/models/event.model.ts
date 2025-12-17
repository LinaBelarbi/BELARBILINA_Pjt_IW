// Modèle Event
export interface Event {
    id?: number;
    titre: string;
    description: string;
    lieu: string;
    date: string;
    imageUrl?: string;
    documentUrl?: string;
}
