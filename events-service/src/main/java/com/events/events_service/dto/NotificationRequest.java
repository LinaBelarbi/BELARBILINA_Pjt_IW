package com.events.events_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour envoyer une notification au notification-service
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationRequest {
    private String message;
    private String recipientEmail;
    private boolean sent;
    private Long participantId;
    private Long eventId;
}
