package com.example.demo.repository;

import com.example.demo.domain.FactureEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FactureRepository extends JpaRepository<FactureEntity, Long> {
}
