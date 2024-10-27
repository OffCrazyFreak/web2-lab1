package web.lab.ticketing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "web.lab.ticketing")
public class TicketingAppApplication {
	public static void main(String[] args) {
		SpringApplication.run(TicketingAppApplication.class, args);
	}
}
