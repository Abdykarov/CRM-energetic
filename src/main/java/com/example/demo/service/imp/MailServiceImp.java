package com.example.demo.service.imp;

import com.example.demo.domain.EmailEntity;
import com.example.demo.service.MailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

@Service
@Slf4j
public class MailServiceImp implements MailService {

    // connect email bean imap-

    @Override
    public List<EmailEntity> getInbox() throws Exception {
        Properties props = System.getProperties();
        props.setProperty("mail.store.protocol", "imap");
        props.setProperty("mail.imap.ssl.enable", "true");
        props.setProperty("mail.imaps.partialfetch", "false");
        props.put("mail.mime.base64.ignoreerrors", "true");

        Session mailSession = Session.getInstance(props);
        mailSession.setDebug(true);
        Store store = mailSession.getStore("imap");
        store.connect("outlook.office365.com", "crm@energetickedruzstvo.cz", "Foy37364");


        Folder folder = store.getFolder("INBOX");
        folder.open(Folder.READ_ONLY);

        System.out.println("Total Message:" + folder.getMessageCount());
        System.out.println("Unread Message:" + folder.getUnreadMessageCount());

        final Message[] messages = folder.getMessages();
        List<EmailEntity> emailEntities = new ArrayList<>();

        for (Message mail : messages) {
//            EmailEntity emailEntity = new EmailEntity()
//                    .setEmailFrom(mail.getFrom()[0].toString())
//                            .setEmailTo(mail.)

            System.out.println("*********************************");
            System.out.println("MESSAGE : \n");

            System.out.println("Subject: " + mail.getSubject());
            System.out.println("From: " + mail.getFrom()[0]);
            System.out.println("To: " + mail.getAllRecipients()[0]);
            System.out.println("Date: " + mail.getReceivedDate());
            System.out.println("Size: " + mail.getSize());
            System.out.println("Flags: " + mail.getFlags());
            System.out.println("ContentType: " + mail.getContentType());
            System.out.println("Body: \n" + mail.getContent());
            System.out.println("*******************************");

        }
        return emailEntities;
    }

    @Override
    public List<EmailEntity> getOutbox() throws Exception{
        return null;
    }
}
