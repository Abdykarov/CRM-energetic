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

    @Scheduled(cron = "0 */15 * ? * *")
    private void readFactures(){
        factureService.readFioFactures();
    }
    @Scheduled(cron = "0 0 0 * * ?")
    private void checkExpiredFactures() {
        factureService.checkExpiredFactures();
    }
}
