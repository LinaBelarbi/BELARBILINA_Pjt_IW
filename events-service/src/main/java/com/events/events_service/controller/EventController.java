package com.events.events_service.controller;

import com.events.events_service.model.Event;
import com.events.events_service.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
@CrossOrigin("*")
public class EventController {

    private final EventService service;

    public EventController(EventService service) {
        this.service = service;
    }

    @GetMapping
    public List<Event> getAll() {
        return service.getAllEvents();
    }

    @PostMapping
    public Event add(@RequestBody Event e) {
        return service.saveEvent(e);
    }

    @GetMapping("/{id}")
    public Event getById(@PathVariable Long id) {
        return service.getEventById(id);
    }

    @PutMapping("/{id}")
    public Event update(@PathVariable Long id, @RequestBody Event e) {
        e.setId(id);
        return service.saveEvent(e);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteEvent(id);
    }
}
