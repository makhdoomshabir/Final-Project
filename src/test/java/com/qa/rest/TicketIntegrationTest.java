package com.qa.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qa.domain.Ticket;
import com.qa.dto.TicketDTO;
import com.qa.repo.TicketsRepository;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class TicketIntegrationTest {

    @Autowired
    private final ObjectMapper mapper = new ObjectMapper();
    // inject required objects
    @Autowired
    private MockMvc mock;
    @Autowired
    private TicketsRepository repo;
    @Autowired
    private ModelMapper modelMapper;
    // Define required objects
    private long id;

    private Ticket testTicket;

    private Ticket testTicketWithID;

    private TicketDTO ticketDTO;

    @Before
    public void init() {
//        this.repo.deleteAll();
//        this.testTicket = new Ticket("Barry", "blue", "pub");
//        this.testDuckWithID = this.repo.save(this.testDuck);
//        this.id = this.testDuckWithID.getId();
//        this.duckDTO = this.mapToDTO(testDuckWithID);
    }
}
