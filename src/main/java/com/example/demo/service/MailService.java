package com.example.demo.service;

import com.example.demo.domain.EmailEntity;

import java.util.List;

public interface MailService {

    List<EmailEntity> getInbox() throws Exception;

    void readInbox() throws Exception;

    List<EmailEntity> getOutbox() throws Exception;

    List<EmailEntity> getCommunication(Long contactId);

    List<EmailEntity> fetchAllOutbox();

    List<EmailEntity> fetchAllInbox();
}
