package com.events.participant_service.service;

import com.events.participant_service.client.NotificationClient;
import com.events.participant_service.dto.NotificationRequest;
import com.events.participant_service.model.Participant;
import com.events.participant_service.repository.ParticipantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticipantService {

    private final ParticipantRepository repository;
    private final NotificationClient notificationClient;

    public ParticipantService(ParticipantRepository repository, NotificationClient notificationClient) {
        this.repository = repository;
        this.notificationClient = notificationClient;
    }

    public List<Participant> getAllParticipants() {
        return repository.findAll();
    }

    public Participant getParticipantById(Long id) {
        return repository.findById(id).orElse(null);
    }

    /**
     * Sauvegarde un participant et envoie une notification automatique
     */
    public Participant saveParticipant(Participant p) {
        Participant saved = repository.save(p);
        
        // Envoi automatique d'une notification lors de l'inscription
        try {
            NotificationRequest notification = new NotificationRequest(
                "Bienvenue " + saved.getNom() + "! Votre inscription a été confirmée.",
                saved.getEmail(),
                false,
                saved.getId(),       // participantId - référence vers le participant
                saved.getEventId()   // eventId - référence vers l'événement
            );
            notificationClient.sendNotification(notification);
        } catch (Exception e) {
            // Log l'erreur mais ne bloque pas la sauvegarde
            System.err.println("Erreur lors de l'envoi de la notification: " + e.getMessage());
        }
        
        return saved;
    }

    public void deleteParticipant(Long id) {
        repository.deleteById(id);
    }
}
