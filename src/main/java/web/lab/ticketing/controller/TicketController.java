package web.lab.ticketing.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.lab.ticketing.model.Ticket;
import web.lab.ticketing.service.TicketService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // Endpoint za dohvaćanje svih ulaznica (samo UUID i vrijeme izrade)
    @GetMapping
    public List<TicketSummary> getAllTickets() {
        return ticketService.getAllTickets().stream()
                .map(ticket -> new TicketSummary(ticket.getId(), ticket.getCreatedAt()))
                .collect(Collectors.toList());
    }

    // Endpoint za generiranje nove ulaznice
    @PostMapping
    public ResponseEntity<?> createTicket(@RequestBody TicketRequest ticketRequest) {
        try {
            Ticket ticket = ticketService.createTicket(
                    ticketRequest.getVatin(),
                    ticketRequest.getFirstName(),
                    ticketRequest.getLastName()
            );

            // Kreira URL za QR kod (ovdje treba biti format "/api/tickets/{uuid}")
            String ticketUrl = "http://localhost:8080/api/tickets/" + ticket.getId();

            // Generira QR kod
            byte[] qrCodeImage = ticketService.generateQrCode(ticketUrl);

            // Vraća QR kod kao PNG sliku
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);
            return ResponseEntity.ok().headers(headers).body(qrCodeImage);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Došlo je do greške pri generiranju QR koda.");
        }
    }

    // Endpoint za dohvaćanje ulaznice prema UUID-u
    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable UUID id) {
        return ticketService.getTicketById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint za dohvaćanje svih ulaznica za dani OIB (VATIN)
    @GetMapping("/vatin/{vatin}")
    public ResponseEntity<List<Ticket>> getTicketsByVatin(@PathVariable String vatin) {
        List<Ticket> tickets = ticketService.getTicketsByVatin(vatin);
        return ResponseEntity.ok(tickets);
    }

    // Pomoćna klasa za prikaz osnovnih podataka o ulaznicama
    public static class TicketSummary {
        private UUID id;
        private LocalDateTime createdAt;

        public TicketSummary(UUID id, LocalDateTime createdAt) {
            this.id = id;
            this.createdAt = createdAt;
        }

        // Getteri
        public UUID getId() {
            return id;
        }

        public LocalDateTime getCreatedAt() {
            return createdAt;
        }
    }
}
