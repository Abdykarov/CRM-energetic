package com.example.demo.service.imp;

import com.example.demo.domain.EmailEntity;
import com.example.demo.service.MailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class MailServiceImp implements MailService {

    // connect email bean imap

    @Override
    public List<EmailEntity> getInbox() {

        return null;
    }

    @Override
    public List<EmailEntity> getOutbox() {
        return null;
    }
}
