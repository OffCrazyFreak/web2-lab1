// src/main/java/web/lab/ticketing/dto/TicketSummaryDTO.java
package web.lab.ticketing.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class TicketSummaryDTO {
    private UUID id;
    private LocalDateTime createdAt;
    private LocalDateTime deletedAt;

    public TicketSummaryDTO(UUID id, LocalDateTime createdAt, LocalDateTime deletedAt) {
        this.id = id;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }

    // Getteri
    public UUID getId() {
        return id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }
}
