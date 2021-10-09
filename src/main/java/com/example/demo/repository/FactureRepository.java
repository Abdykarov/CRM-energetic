package com.example.demo.repository;

import com.example.demo.domain.FactureEntity;
import com.example.demo.domain.FactureStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface FactureRepository extends JpaRepository<FactureEntity, Long> {
    List<FactureEntity> findAllByFactureStatusAndDueDateGreaterThan(FactureStatus generated, LocalDate todayDate);

    List<FactureEntity> findAllByFactureStatus(FactureStatus generated);
}
