package web.lab.ticketing.repository;

import web.lab.ticketing.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface TicketRepository extends JpaRepository<Ticket, UUID> {

    // Metoda koja broji broj ulaznica po VATIN-u (OIB-u)
    int countByVatin(String vatin);

    // Dohvaća sve ulaznice za određeni VATIN
    List<Ticket> findAllByVatin(String vatin);

    List<Ticket> findAllByVatinAndDeletedAtIsNull(String vatin);
}
