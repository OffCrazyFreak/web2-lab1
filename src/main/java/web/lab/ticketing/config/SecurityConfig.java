package web.lab.ticketing.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Onemogućite CSRF za razvojne svrhe
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/tickets", "/api/tickets/").permitAll() // Omogućite pristup GET i POST na /api/tickets
                        .requestMatchers("/api/tickets/{uuid}").authenticated() // Pristup na /api/tickets/{uuid} zahtijeva prijavu
                        .anyRequest().authenticated()
                )
                .httpBasic(withDefaults()); // Basic Authentication za prijavljene korisnike

        return http.build();
    }
}
