package com.qa.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "notes"})
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId; // Done automatically do not implement on form!

    @Column
    private Date ticketDate; // Done automatically do not implement on form!

    @Column
    private String status = "unresolved"; // Done automatically do not implement on form!

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private String links;

    @Column
    private String author;

    @Column
    private String cohort;

    @Column
    private String solution;

    @Column
    private Date lastUpdated; // Done automatically do not implement on form!

    @Column
    private int stopwatch; // Done automatically do not implement on form!

    public Ticket() {

    }

    public Ticket(Long TicketId, Date ticketDate, String status, String title, String description, String links, String author, String cohort, String solution, Date lastUpdated, int stopwatch) {
        super();
        this.ticketId = ticketId;
        this.ticketDate = ticketDate;
        this.status = status;
        this.title = title;
        this.description = description;
        this.links = links;
        this.author = author;
        this.cohort = cohort;
        this.solution = solution;
        this.lastUpdated = lastUpdated;
        this.stopwatch = stopwatch;
    }


    public Ticket(Date ticketDate, String status, String title, String description, String links, String author, String cohort, String solution, Date lastUpdated, int stopwatch) {
        super();
        this.ticketDate = ticketDate;
        this.status = status;
        this.title = title;
        this.description = description;
        this.links = links;
        this.author = author;
        this.cohort = cohort;
        this.solution = solution;
        this.lastUpdated = lastUpdated;
        this.stopwatch = stopwatch;
    }

    public Long getTicketId() {
        return ticketId;
    }

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }

    public Date getTicketDate() {
        return ticketDate;
    }

    public void setTicketDate(Date ticketDate) {
        this.ticketDate = ticketDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLinks() {
        return links;
    }

    public void setLinks(String links) {
        this.links = links;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCohort() {
        return cohort;
    }

    public void setCohort(String cohort) {
        this.cohort = cohort;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public int getStopwatch() {
        return stopwatch;
    }

    public void setStopwatch(int stopwatch) {
        this.stopwatch = stopwatch;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }


}
