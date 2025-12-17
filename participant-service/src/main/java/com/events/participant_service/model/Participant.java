package com.events.participant_service.model;

// Imports Lombok
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

// Imports JPA
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String email;
    private String statut;
    private String password;
    
    // Référence vers l'événement (stocke l'ID de l'événement)
    private Long eventId;
}
