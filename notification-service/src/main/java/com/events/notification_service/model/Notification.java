
package com.events.notification_service.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;
    private String recipientEmail;
    private boolean sent;
    
    // Référence vers le participant (stocke l'ID du participant)
    private Long participantId;
    
    // Référence vers l'événement (stocke l'ID de l'événement)
    private Long eventId;
}
