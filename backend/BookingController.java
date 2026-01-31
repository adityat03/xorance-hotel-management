
package com.luminagrand.booking.controller;

import com.luminagrand.booking.entity.Booking;
import com.luminagrand.booking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking bookingRequest, Authentication auth) {
        // In a real scenario, extract userId from Authentication object (JWT)
        // bookingRequest.setUserId(auth.getName());
        return ResponseEntity.ok(bookingService.createBooking(bookingRequest));
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<List<Booking>> getMyBookings(@RequestParam String userId) {
        return ResponseEntity.ok(bookingService.getUserBookings(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelBooking(@PathVariable String id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.noContent().build();
    }
}
