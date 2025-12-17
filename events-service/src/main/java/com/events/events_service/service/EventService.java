package com.events.events_service.service;

import com.events.events_service.model.Event;
import com.events.events_service.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.events.events_service.client.NotificationClient;
import com.events.events_service.client.ParticipantClient;
import com.events.events_service.dto.NotificationRequest;
import com.events.events_service.dto.ParticipantDto;

@Service
public class EventService {

    private final EventRepository repository;
    private final NotificationClient notificationClient;
    private final ParticipantClient participantClient;

    public EventService(EventRepository repository, NotificationClient notificationClient, ParticipantClient participantClient) {
        this.repository = repository;
        this.notificationClient = notificationClient;
        this.participantClient = participantClient;
    }

    // Récupérer tous les événements
    public List<Event> getAllEvents() {
        return repository.findAll();
    }

    // Ajouter ou mettre à jour un événement
    public Event saveEvent(Event e) {
        boolean isUpdate = e.getId() != null;
        Event saved = repository.save(e);
        
        if (isUpdate) {
            notifyParticipants(saved.getId(), "L'événement '" + saved.getTitre() + "' a été modifié. Consultez les détails !");
        }
        
        return saved;
    }

    // Récupérer un événement par son ID
    public Event getEventById(Long id) {
        Optional<Event> event = repository.findById(id);
        return event.orElse(null);
    }

    // Supprimer un événement
    public void deleteEvent(Long id) {
        Event event = getEventById(id);
        if (event != null) {
            notifyParticipants(id, "L'événement '" + event.getTitre() + "' a été annulé.");
        }
        repository.deleteById(id);
    }

    private void notifyParticipants(Long eventId, String message) {
        try {
            List<ParticipantDto> participants = participantClient.getParticipantsByEvent(eventId);
            for (ParticipantDto p : participants) {
                NotificationRequest notification = new NotificationRequest(
                    message,
                    p.getEmail(),
                    false,
                    p.getId(),
                    eventId
                );
                notificationClient.sendNotification(notification);
            }
        } catch (Exception e) {
            // On log l'erreur mais on ne bloque pas l'action principale
            System.err.println("Erreur lors de la notification des participants: " + e.getMessage());
        }
    }
}
