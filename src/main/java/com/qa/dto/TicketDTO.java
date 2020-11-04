package com.qa.dto;

import java.util.*;

public class TicketDTO {

    private Long ticketId;
    private Date ticketDate;
    private String status = "Unresolved";
    private String title;
    private String description;
    private String author;
    private String cohort;
    private String solution;
    private Date lastUpdated;
    private String stopwatch;

    public TicketDTO() {
    }

    public TicketDTO(Date ticketDate, String status, String title, String description, String author, String cohort, String solution, Date lastUpdated, String stopwatch) {
        this.ticketDate = ticketDate;
        this.status = status;
        this.title = title;
        this.description = description;
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

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}