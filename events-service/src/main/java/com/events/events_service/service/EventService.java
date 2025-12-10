package com.events.events_service.service;

import com.events.events_service.model.Event;
import com.events.events_service.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository repository;

    public EventService(EventRepository repository) {
        this.repository = repository;
    }

    // Récupérer tous les événements
    public List<Event> getAllEvents() {
        return repository.findAll();
    }

    // Ajouter ou mettre à jour un événement
    public Event saveEvent(Event e) {
        return repository.save(e);
    }

    // Récupérer un événement par son ID
    public Event getEventById(Long id) {
        Optional<Event> event = repository.findById(id);
        return event.orElse(null);
    }

    // Supprimer un événement
    public void deleteEvent(Long id) {
        repository.deleteById(id);
    }
}
