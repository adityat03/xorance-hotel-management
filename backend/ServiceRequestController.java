
package com.luminagrand.services.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/service-requests")
public class ServiceRequestController {

    @PostMapping
    public ResponseEntity<ServiceResponse> createRequest(@RequestBody ServiceRequestDTO request) {
        // Logic for food, laundry, or maintenance requests
        return ResponseEntity.ok(new ServiceResponse("Service scheduled successfully"));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable String id, @RequestParam String status) {
        // ADMIN or STAFF role only
        return ResponseEntity.noContent().build();
    }
}
