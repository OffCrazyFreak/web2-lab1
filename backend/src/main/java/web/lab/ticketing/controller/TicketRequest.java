package web.lab.ticketing.controller;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class TicketRequest {

    @NotBlank(message = "VATIN is required")
    @Size(min = 11, max = 11, message = "VATIN must be exactly 11 characters")
    private String vatin;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    // Getters and Setters
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
}
