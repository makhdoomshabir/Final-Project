package com.qa.rest;

import com.qa.domain.Ticket;
import com.qa.dto.TicketDTO;
import com.qa.service.TicketsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TicketController {

    private final TicketsService ticketsService;

    @Autowired
    public TicketController(TicketsService ticketsService) {
        this.ticketsService = ticketsService;
    }

    @GetMapping(value = "/allTickets")
    public ResponseEntity<List<TicketDTO>> getAllNotSolvedTickets() {
        return ResponseEntity.ok(this.ticketsService.readTickets());
    }

    @PostMapping(value = "/createTicket")
    public ResponseEntity<TicketDTO> createProduct(@RequestBody Ticket ticket) {
        return new ResponseEntity<>(this.ticketsService.createTicket(ticket), HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/deleteTicket/{id}")
    public ResponseEntity<?> deleteTicketById(@PathVariable Long id) {
        return this.ticketsService.deleteTicketById(id)
                ? ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
                : ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/getTicketById/{id}")
    public ResponseEntity<TicketDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(this.ticketsService.findTicketById(id));
    }

    @PutMapping(value = "/updateTicket/{id}")
    public ResponseEntity<TicketDTO> updateProduct(@PathVariable Long id, @RequestBody Ticket tickets) {
        return ResponseEntity.ok(this.ticketsService.updateTicket(id, tickets));
    }
}
