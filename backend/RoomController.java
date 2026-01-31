
package com.luminagrand.rooms.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("/available")
    public ResponseEntity<List<RoomDTO>> getAvailableRooms(
            @RequestParam String checkIn,
            @RequestParam String checkOut) {
        return ResponseEntity.ok(roomService.findAvailableRooms(checkIn, checkOut));
    }

    @PostMapping("/{roomId}/book")
    public ResponseEntity<BookingResponse> bookRoom(
            @PathVariable String roomId,
            @RequestBody BookingRequest request) {
        return ResponseEntity.ok(roomService.createBooking(roomId, request));
    }
}
