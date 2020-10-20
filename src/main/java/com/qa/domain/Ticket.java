package com.qa.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.xml.soap.Text;
import java.util.ArrayList;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "notes"})
public class Ticket {

    @Id
    @GeneratedValue
    private Long ticketId;

    @Column
    private String ticketDate;

    @Column
    private String status = "Not Solved";

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private String author;

    @Column
    private String cohort;

    @Column
    private String solution;

    @Column
    private String resolvedTime;

    public Ticket() {

    }

    public Ticket(String ticketDate, String status, String title, String description, String author, String cohort, String solution, String resolveTime) {
        this.ticketDate = ticketDate;
        this.status = status;
        this.title = title;
        this.description = description;
        this.author = author;
        this.cohort = cohort;
        this.solution = solution;
        this.resolvedTime = resolveTime;
    }

    public Long getTicketId() {
        return ticketId;
    }

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }

    public String getTicketDate() {
        return ticketDate;
    }

    public void setTicketDate(String ticketDate) {
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

    public String getResolvedTime() {
        return resolvedTime;
    }

    public void setResolvedTime(String resolvedTime) {
        this.resolvedTime = resolvedTime;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }


}
