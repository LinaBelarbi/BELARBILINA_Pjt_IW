package com.events.notification_service.controlleur;

import com.events.notification_service.model.Notification;
import com.events.notification_service.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService service;

    public NotificationController(NotificationService service) {
        this.service = service;
    }

    @GetMapping
    public List<Notification> getAll() {
        return service.getAllNotifications();
    }

    @PostMapping
    public Notification add(@RequestBody Notification n) {
        return service.saveNotification(n);
    }

    @GetMapping("/{id}")
    public Notification getById(@PathVariable Long id) {
        return service.getNotificationById(id);
    }

    @PutMapping("/{id}")
    public Notification update(@PathVariable Long id, @RequestBody Notification n) {
        n.setId(id);
        return service.saveNotification(n);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteNotification(id);
    }
}
