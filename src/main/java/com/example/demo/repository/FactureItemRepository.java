package com.example.demo.repository;

import com.example.demo.domain.FactureItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FactureItemRepository extends JpaRepository<FactureItemEntity, Long> {
}
