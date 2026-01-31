
package com.luminagrand.booking.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String roomId;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private LocalDate checkInDate;

    @Column(nullable = false)
    private LocalDate checkOutDate;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private Double totalPrice;

    public enum BookingStatus {
        PENDING, CONFIRMED, CANCELLED, COMPLETED
    }
}
