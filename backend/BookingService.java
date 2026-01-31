
package com.luminagrand.booking.service;

import com.luminagrand.booking.entity.Booking;
import com.luminagrand.booking.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;

    @Transactional
    public Booking createBooking(Booking bookingRequest) {
        // Validate availability
        List<Booking> conflicts = bookingRepository.findOverlappingBookings(
            bookingRequest.getRoomId(), 
            bookingRequest.getCheckInDate(), 
            bookingRequest.getCheckOutDate()
        );

        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Room is already booked for the selected dates.");
        }

        bookingRequest.setStatus(Booking.BookingStatus.CONFIRMED);
        return bookingRepository.save(bookingRequest);
    }

    public List<Booking> getUserBookings(String userId) {
        return bookingRepository.findByUserId(userId);
    }

    @Transactional
    public void cancelBooking(String bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }
}
