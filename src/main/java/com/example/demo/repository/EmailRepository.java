package com.example.demo.repository;

import com.example.demo.domain.EmailEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmailRepository extends JpaRepository<EmailEntity,Long> {

    List<EmailEntity> findAllByInboxTrue();

    List<EmailEntity> findAllByInboxFalse();

    List<EmailEntity> findAllByEmailFromOrEmailToOrderByEmailDateAsc(String emailFrom, String emailTo);

}
