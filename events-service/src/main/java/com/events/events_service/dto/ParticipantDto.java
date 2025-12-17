package com.events.events_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParticipantDto {
    private Long id;
    private String nom;
    private String email;
    private String statut;
    private Long eventId;
}
