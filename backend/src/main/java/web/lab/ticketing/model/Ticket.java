package web.lab.ticketing.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class Ticket {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, length = 11)
    private String vatin;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime deletedAt; // Atribut za soft delete

    // Konstruktori
    public Ticket() {
        this.createdAt = LocalDateTime.now();
    }

    public Ticket(String vatin, String firstName, String lastName) {
        this.vatin = vatin;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createdAt = LocalDateTime.now();
        this.deletedAt = null; // Inicijalno null, što znači da ulaznica nije obrisana
    }

    // Getteri i setteri
    public UUID getId() {
        return id;
    }

    public String getVatin() {
        return vatin;
    }

    public void setVatin(String vatin) {
        this.vatin = vatin;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(LocalDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }
}
