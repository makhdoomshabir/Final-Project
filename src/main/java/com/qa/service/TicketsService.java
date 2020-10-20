package com.qa.service;

import com.qa.domain.Ticket;
import com.qa.dto.TicketDTO;
import com.qa.exceptions.error404;
import com.qa.repo.TicketsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketsService {

    private final TicketsRepository tRepo;

    private final ModelMapper mapper;

    @Autowired
    public TicketsService(TicketsRepository tRepo, ModelMapper mapper) {
        this.tRepo = tRepo;
        this.mapper = mapper;
    }

    private TicketDTO mapToDTO(Ticket tickets) {
        return this.mapper.map(tickets, TicketDTO.class);
    }

    public List<TicketDTO> readTickets() {
        return this.tRepo.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public TicketDTO createTicket(Ticket ticket) {
        return this.mapToDTO(this.tRepo.save(ticket));
    }

    public TicketDTO findTicketById(Long id) {
        return this.mapToDTO(this.tRepo.findById(id)
                .orElseThrow(error404::new));
    }

    public TicketDTO updateTicket(Long id, Ticket ticket) {
        Ticket update = this.tRepo.findById(id)
                .orElseThrow(error404::new);
        update.setTitle(ticket.getTitle());
        update.setTicketDate(ticket.getTicketDate());
        update.setDescription(ticket.getDescription());
        update.setAuthor(ticket.getAuthor());
        update.setCohort(ticket.getCohort());
        update.setStatus(ticket.getStatus());
        update.setResolvedTime(ticket.getResolvedTime());
        update.setSolution(ticket.getSolution());
        return this.mapToDTO(this.tRepo.save(update));
    }

    public Boolean deleteTicketById(Long id) {
        if (!this.tRepo.existsById(id)) {
            throw new error404();
        }
        this.tRepo.deleteById(id);
        return this.tRepo.existsById(id);
    }
}
