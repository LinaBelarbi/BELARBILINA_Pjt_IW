
package com.events.participant_service.controller;

import com.events.participant_service.model.Participant;
import com.events.participant_service.service.ParticipantService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/participants")
@CrossOrigin("*")
public class ParticipantController {

    private final ParticipantService service;

    public ParticipantController(ParticipantService service) {
        this.service = service;
    }

    @GetMapping
    public List<Participant> getAll() {
        return service.getAllParticipants();
    }

    @GetMapping("/event/{eventId}")
    public List<Participant> getByEvent(@PathVariable Long eventId) {
        return service.getParticipantsByEvent(eventId);
    }

    @GetMapping("/count/event/{eventId}")
    public long countByEvent(@PathVariable Long eventId) {
        return service.countParticipantsByEvent(eventId);
    }

    @PostMapping
    public Participant add(@RequestBody Participant p) {
        return service.saveParticipant(p);
    }

    @GetMapping("/{id}")
    public Participant getById(@PathVariable Long id) {
        return service.getParticipantById(id);
    }

    @PutMapping("/{id}")
    public Participant update(@PathVariable Long id, @RequestBody Participant p) {
        p.setId(id);
        return service.saveParticipant(p);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteParticipant(id);
    }

    @PostMapping("/login")
    public Participant login(@RequestBody Participant loginRequest) {
        // Simple authentication logic for demo
        Participant participant = service.getParticipantByEmail(loginRequest.getEmail());
        if (participant != null && participant.getPassword() != null && participant.getPassword().equals(loginRequest.getPassword())) {
            return participant;
        }
        return null; // Or throw exception
    }
}
