package com.example.demo.repository;

import com.example.demo.domain.NotificationEntity;
import com.example.demo.dto.response.NotificationResponseDto;
import org.mapstruct.Mapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
    List<NotificationEntity> findAllByOrderByCreatedAtDesc();
}
