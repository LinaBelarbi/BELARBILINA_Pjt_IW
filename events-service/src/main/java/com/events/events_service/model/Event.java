package com.events.events_service.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    private String description;
    private String lieu;
    private String date; // pour simplifier (format texte)

    // Nouveaux champs pour les médias
    private String imageUrl;
    private String documentUrl;
}
