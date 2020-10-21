package com.qa.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.awt.*;
import java.util.ArrayList;
import java.util.Date;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "notes"})
public class Ticket {

    @Id
    @GeneratedValue
    private Long ticketId; // Done automatically do not implement on form!

    @Column
    private Date ticketDate; // Done automatically do not implement on form!

    @Column
    private String status = "Not Solved"; // Done automatically do not implement on form!

    @Column
    private String title;

    @Column
    private String description;

//    @Column
//    private List links = new List();

    @Column
    private String author;

    @Column
    private String cohort;

    @Column
    private String solution;

    @Column
    private Date lastUpdated; // Done automatically do not implement on form!

    @Column
    private Float stopwatch; // Done automatically do not implement on form!

    public Ticket() {

    }

    public Ticket(Date ticketDate, String status, String title, String description, String author, String cohort, String solution, Date lastUpdated, Float stopwatch) {
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

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public Float getStopwatch() {
        return stopwatch;
    }

    public void setStopwatch(Float stopwatch) {
        this.stopwatch = stopwatch;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }


}
