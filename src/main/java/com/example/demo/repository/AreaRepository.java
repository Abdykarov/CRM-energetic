package com.example.demo.repository;

import com.example.demo.domain.AreaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AreaRepository extends JpaRepository<AreaEntity, Long> {
    AreaEntity findByName(String area);
}
