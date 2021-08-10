package com.example.demo.repository;

import com.example.demo.domain.EdrMemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EdrMemberRepository extends JpaRepository<EdrMemberEntity, Long> {
}
