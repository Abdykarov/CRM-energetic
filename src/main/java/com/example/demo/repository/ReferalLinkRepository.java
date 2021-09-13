package com.example.demo.repository;

import com.example.demo.domain.ReferalLinkEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReferalLinkRepository extends JpaRepository<ReferalLinkEntity, Long> {
    boolean existsByReferalLink(String generateReferalLink);
}
