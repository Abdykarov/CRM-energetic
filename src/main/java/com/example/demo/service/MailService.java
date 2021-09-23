package com.example.demo.service;

import com.example.demo.domain.EmailEntity;

import java.util.List;

public interface MailService {

    List<EmailEntity> getInbox() throws Exception;

    List<EmailEntity> getOutbox() throws Exception;

}
