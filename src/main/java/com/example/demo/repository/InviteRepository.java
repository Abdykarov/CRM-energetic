package com.example.demo.repository;

import com.example.demo.domain.InviteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InviteRepository extends JpaRepository<InviteEntity, Long> {
    boolean existsByUserId(Long userId);

    InviteEntity findByUser_Id(Long userId);

    boolean existsByUniqueCode(String generateUniqueString);

    InviteEntity findByUniqueCode(String uniqueCode);
}
