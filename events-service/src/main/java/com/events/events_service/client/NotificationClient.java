package com.events.events_service.client;

import com.events.events_service.dto.NotificationRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * Client Feign pour communiquer avec le notification-service
 * Utilise Eureka pour la découverte du service
 */
@FeignClient(name = "notification-service")
public interface NotificationClient {

    @PostMapping("/notifications")
    Object sendNotification(@RequestBody NotificationRequest notification);
}
