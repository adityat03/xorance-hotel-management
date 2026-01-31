
package com.luminagrand.booking.repository;

import com.luminagrand.booking.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, String> {
    
    List<Booking> findByUserId(String userId);

    @Query("SELECT b FROM Booking b WHERE b.roomId = :roomId AND b.status != 'CANCELLED' " +
           "AND ((b.checkInDate <= :checkOut AND b.checkOutDate >= :checkIn))")
    List<Booking> findOverlappingBookings(
        @Param("roomId") String roomId, 
        @Param("checkIn") LocalDate checkIn, 
        @Param("checkOut") LocalDate checkOut
    );
}
