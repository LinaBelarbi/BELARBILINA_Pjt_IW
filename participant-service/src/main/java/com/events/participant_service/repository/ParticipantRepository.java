package com.events.participant_service.repository;

import com.events.participant_service.model.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    Participant findByEmail(String email);
    java.util.List<Participant> findByEventId(Long eventId);
    long countByEventId(Long eventId);
}
