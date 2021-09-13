package com.example.demo.repository;

import com.example.demo.domain.EdrLinkEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EdrLinkRepository extends JpaRepository<EdrLinkEntity, Long> {
    EdrLinkEntity findByRegistrationLink(String registrationLink);

    boolean existsByRegistrationLink(String registrationLink);
}
