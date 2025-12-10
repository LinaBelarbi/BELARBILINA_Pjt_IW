
package com.events.notification_service.service;

import com.events.notification_service.model.Notification;
import com.events.notification_service.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository repository;

    public NotificationService(NotificationRepository repository) {
        this.repository = repository;
    }

    public List<Notification> getAllNotifications() {
        return repository.findAll();
    }

    public Notification saveNotification(Notification n) {
        return repository.save(n);
    }

    public Notification getNotificationById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteNotification(Long id) {
        repository.deleteById(id);
    }
}
