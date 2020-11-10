package com.qa.rest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;

import com.qa.dto.TicketDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qa.domain.Ticket;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Sql(scripts = {"classpath:tickets-schema.sql", "classpath:tickets-data.sql"}, executionPhase = ExecutionPhase.BEFORE_TEST_METHOD)
public class TicketIntegrationTest {

    @Autowired
    // Object provided by the Spring testing dependency to allow for easy
    // integration testing
    private MockMvc mockMVC;

    @Autowired
    // Object Spring uses to convert objects sent from/to the @Controller's to and
    // from JSON
    private ObjectMapper mapper;

    @Test
    public void testDelete() throws Exception {
        this.mockMVC.perform(delete("/deleteTicket/1")).andExpect(status().isOk());
    }

    @Test
    public void testCreate() throws Exception {
        // Create the request body
        Ticket testTicket = new Ticket(1l, new Date(), "unresolved", "Ticket System", "fds", "sfdfs", "BBC", "fewgfsdgsf", "dfsfsdf", new Date(), 0);
        // Convert request body to JSON
        String ticketAsJSON = this.mapper.writeValueAsString(testTicket);

        // Create EXPECTED response body
        Ticket expectedTicket = new Ticket(
                testTicket.getTicketId(),
                testTicket.getTicketDate(),
                testTicket.getStatus(),
                testTicket.getTitle(),
                testTicket.getDescription(),
                testTicket.getLinks(),
                testTicket.getAuthor(),
                testTicket.getCohort(),
                testTicket.getSolution(),
                testTicket.getLastUpdated(),
                testTicket.getStopwatch());
        // Convert it to JSON
        String expectedTicketAsJSON = this.mapper.writeValueAsString(expectedTicket);
        // BUILD THE TEST REQUEST
        RequestBuilder request = post("/createTicket").content(ticketAsJSON).contentType(MediaType.APPLICATION_JSON);
        // TEST THE STATUS
        // For a create method it should be 201 (CREATED)
        ResultMatcher checkStatus = status().isCreated();
        ResultMatcher checkBody = content().json(expectedTicketAsJSON);
        this.mockMVC.perform(request).andExpect(checkStatus).andExpect(checkBody);
    }

    @Test
    public void testUpdate() throws Exception {
//        TicketDTO testTicket = new TicketDTO(new Date(), "unresolved", "Ticket System", "fds", "sfdfs", "BBC", "fewgfsdgsf", "dfsfsdf", new Date(), 0);
//        String ticketAsJSON = this.mapper.writeValueAsString(testTicket);
//        Ticket expectedTicket = new Ticket(
//                testTicket.getTicketId(),
//                testTicket.getTicketDate(),
//                testTicket.getTitle(),
//                testTicket.getCohort(),
//                testTicket.getDescription(),
//                testTicket.getAuthor(),
//                testTicket.getLinks(),
//                testTicket.getSolution(),
//                testTicket.getStatus(),
//                testTicket.getLastUpdated(),
//                testTicket.getStopwatch());
//        String expectedTicketAsJSON = this.mapper.writeValueAsString(expectedTicket);
//
//        this.mockMVC.perform(put("/updateTicket/" + 1).content(ticketAsJSON).contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isAccepted()).andExpect(content().json(expectedTicketAsJSON));
        TicketDTO newTicket = new TicketDTO(new Date(), "unresolved", "Ticket System", "fds", "sfdfs", "BBC", "fewgfsdgsf", "dfsfsdf", new Date(), 0);

    }

    @Test
    public void testReadTicket() throws Exception {
        List<Ticket> testTickets = new ArrayList<>();
        testTickets.add(new Ticket(2l, new Date(), "unresolved", "Ticket System", "fds", "sfdfs", "BBC", "fewgfsdgsf", "dfsfsdf", new Date(), 0));
        String testTicketsAsJSON = this.mapper.writeValueAsString(testTickets);

        this.mockMVC.perform(get("/allTickets")).andExpect(status().isOk()).andExpect(content().json(testTicketsAsJSON));
    }

}