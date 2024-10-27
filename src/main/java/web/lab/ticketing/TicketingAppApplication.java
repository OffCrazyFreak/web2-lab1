package web.lab.ticketing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@EntityScan("web.lab.ticketing.model")
@SpringBootApplication(scanBasePackages = "web.lab.ticketing")
@EnableJpaRepositories(basePackages = "web.lab.ticketing.repository")
public class TicketingAppApplication {
	public static void main(String[] args) {
		SpringApplication.run(TicketingAppApplication.class, args);
	}
}
