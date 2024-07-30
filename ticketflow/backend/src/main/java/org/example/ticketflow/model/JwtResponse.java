package org.example.ticketflow.model;

import java.util.List;
import java.util.Set;

public record JwtResponse(String jwt, String username, List<String> roles) {
}
