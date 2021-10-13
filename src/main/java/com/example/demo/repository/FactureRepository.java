package com.example.demo.repository;

import com.example.demo.domain.FactureEntity;
import com.example.demo.domain.FactureStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface FactureRepository extends JpaRepository<FactureEntity, Long> {
    List<FactureEntity> findAllByFactureStatusAndDueDateGreaterThan(FactureStatus generated, LocalDate todayDate);

    List<FactureEntity> findAllByFactureStatus(FactureStatus generated);

    Page<FactureEntity> findAllByFactureStatusOrderByIdAsc(FactureStatus generated, Pageable pageable);

    Page<FactureEntity> findAllByFactureStatusOrderByIdDesc(FactureStatus generated, Pageable pageable);

    Page<FactureEntity> findAllByFactureStatusAndUserNameContainingIgnoreCaseOrFactureStatusAndUserSurnameContainingIgnoreCaseOrderByIdAsc(FactureStatus generated, String name, FactureStatus generated2, String surname, Pageable pageable);

    Page<FactureEntity> findByFactureStatusOrderByVarSymbolAsc(FactureStatus generated, Pageable pageable);

    Page<FactureEntity> findByFactureStatusOrderByVarSymbolDesc(FactureStatus generated, Pageable pageable);

    Page<FactureEntity> findByFactureStatusOrderByCreatedAtAsc(FactureStatus generated, Pageable pageable);

    Page<FactureEntity> findByFactureStatusOrderByCreatedAtDesc(FactureStatus generated, Pageable pageable);

    Page<FactureEntity> findByFactureStatusOrderByDueDateAsc(FactureStatus generated, Pageable pageable);

    Page<FactureEntity> findByFactureStatusOrderByDueDateDesc(FactureStatus generated, Pageable pageable);


    FactureEntity findByUserId(Long userId);
}
