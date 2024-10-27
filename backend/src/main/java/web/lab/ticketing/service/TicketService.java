package web.lab.ticketing.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.lab.ticketing.dto.TicketSummaryDTO;
import web.lab.ticketing.model.Ticket;
import web.lab.ticketing.repository.TicketRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.client.j2se.MatrixToImageWriter;

import java.io.ByteArrayOutputStream;
import java.util.stream.Collectors;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    @Autowired
    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public List<TicketSummaryDTO> getAllTicketSummaries() {
        return ticketRepository.findAll().stream()
                .map(ticket -> new TicketSummaryDTO(ticket.getId(), ticket.getCreatedAt(), ticket.getDeletedAt()))
                .collect(Collectors.toList());
    }

    public long getTicketCount() {
        return ticketRepository.count();
    }


    // Metoda za kreiranje nove ulaznice
    public Ticket createTicket(String vatin, String firstName, String lastName) {
        // Provjera broja postojećih ulaznica za OIB
        if (ticketRepository.countByVatin(vatin) >= 3) {
            throw new IllegalArgumentException("A maximum of 3 tickets per VATIN is allowed.");
        }
        // Spremanje nove ulaznice
        Ticket ticket = new Ticket(vatin, firstName, lastName);
        return ticketRepository.save(ticket);
    }

    // Dohvaća sve ulaznice za određeni VATIN
    public List<Ticket> getTicketsByVatin(String vatin) {
        return ticketRepository.findAllByVatin(vatin);
    }

    // U TicketService klasi
    public Optional<Ticket> getTicketById(UUID id) {
        return ticketRepository.findById(id);
    }

    public byte[] generateQrCode(String ticketUrl) throws Exception {
        BitMatrix bitMatrix = new MultiFormatWriter().encode(ticketUrl, BarcodeFormat.QR_CODE, 250, 250);
        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream);
        return pngOutputStream.toByteArray();
    }
}
