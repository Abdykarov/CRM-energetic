package com.example.demo.repository;

import com.example.demo.domain.ReferalEntity;
import com.example.demo.domain.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReferalRepository extends JpaRepository<ReferalEntity, Long> {
    List<ReferalEntity> findAllByLinkCreator(UserEntity linkCreator);
}