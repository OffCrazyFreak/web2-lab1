package web.lab.ticketing.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Onemogućeno CSRF za razvojne svrhe
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/tickets", "/api/tickets/count").permitAll() // Omogućite pristup GET i POST na /api/tickets
                        .requestMatchers("/api/tickets/{uuid}").hasAuthority("SCOPE_create:ticket") // Samo autorizirani korisnici s `create:ticket` dopuštenjem
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.decoder(jwtDecoder()))
                );

        return http.build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        // Zamijeni URI Auth0 domenom (https://your-tenant.auth0.com/.well-known/jwks.json)
        String jwkSetUri = "https://ticketingtenant.eu.auth0.com/.well-known/jwks.json";
        return NimbusJwtDecoder.withJwkSetUri(jwkSetUri).build();
    }
}
