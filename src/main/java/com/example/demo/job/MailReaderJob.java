package com.example.demo.job;

import com.example.demo.service.imp.MailServiceImp;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MailReaderJob {

    private final MailServiceImp mailService;

    @Scheduled(cron = "0 */15 * ? * *")
    private void cleanCarts() throws Exception {
        mailService.readInbox();
    }
}
