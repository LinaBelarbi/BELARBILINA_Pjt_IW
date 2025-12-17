package com.events.events_service.client;

import com.events.events_service.dto.ParticipantDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "participant-service")
public interface ParticipantClient {

    @GetMapping("/participants/event/{eventId}")
    List<ParticipantDto> getParticipantsByEvent(@PathVariable("eventId") Long eventId);
}
