package com.qa.repo;

import com.qa.domain.Ticket;
import com.qa.dto.TicketDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface TicketsRepository extends JpaRepository<Ticket, Long> {
    @Query(value="select * from Ticket t where t.title like %:keyword%", nativeQuery = true )
    List<Ticket> findByKeyword(@Param("keyword") String keyword);

}