package com.example.demo.job;

import com.example.demo.service.imp.FactureServiceImp;
import com.example.demo.service.imp.MailServiceImp;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FactureReaderJob {

    private final FactureServiceImp factureService;

    @Scheduled(cron = "0 */1 * ? * *")
    private void readFactures() throws Exception {
        factureService.readFioFactures();
    }
}
