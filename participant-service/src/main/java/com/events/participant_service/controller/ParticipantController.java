
package com.events.participant_service.controller;

import com.events.participant_service.model.Participant;
import com.events.participant_service.service.ParticipantService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/participants")
public class ParticipantController {

    private final ParticipantService service;

    public ParticipantController(ParticipantService service) {
        this.service = service;
    }

    @GetMapping
    public List<Participant> getAll() {
        return service.getAllParticipants();
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
}
