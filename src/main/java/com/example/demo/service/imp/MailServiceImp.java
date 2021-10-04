package com.example.demo.service.imp;

import com.example.demo.domain.EmailEntity;
import com.example.demo.domain.UserEntity;
import com.example.demo.repository.EmailRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.ContentType;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.search.FlagTerm;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@RequiredArgsConstructor
@Service
@Slf4j
public class MailServiceImp implements MailService {

    // connect email bean imap-
    private Folder inbox;
    private final UserRepository userRepository;
    private final EmailRepository emailRepository;

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
    public void readInbox() throws Exception {
        log.info("Inside MailReader()...");
        final String SSL_FACTORY = "javax.net.ssl.SSLSocketFactory";
        Properties props = System.getProperties();
        // Set manual Properties
        props.setProperty("mail.imaps.socketFactory.class", SSL_FACTORY);
        props.setProperty("mail.imaps.socketFactory.fallback", "false");
        props.setProperty("mail.imaps.port", "993");
        props.setProperty("mail.imaps.socketFactory.port", "993");
        props.put("mail.imaps.host", "outlook.office365.com");


        try {
            /* Create the session and get the store for read the mail. */

            Session session = Session.getDefaultInstance(System.getProperties(), null);
            Store store = session.getStore("imaps");

            store.connect("outlook.office365.com", 993, "crm@energetickedruzstvo.cz", "Foy37364");

            /* Mention the folder name which you want to read. */

            inbox = store.getFolder("INBOX");

            /* Open the inbox using store. */

            //inbox.open(Folder.READ_ONLY);
            inbox.open(Folder.READ_WRITE);

            Message messages[] = inbox.search(new FlagTerm(new Flags(
                    Flags.Flag.ANSWERED), false));
            //Message[] msgs = inbox.getMessages();

            final int inboxMessageCount = inbox.getMessageCount();
            final int lastEmailId = emailRepository.findAllByInboxTrue().size();
            if(!(inboxMessageCount - 1 > lastEmailId)){
                log.info("no new messages");
                return;
            }

            FetchProfile fp = new FetchProfile();
            fp.add(FetchProfile.Item.ENVELOPE);

            inbox.fetch(messages, fp);

            try {
                for (int i = inboxMessageCount - 1; i > -1; i--) {

                    if( i > lastEmailId){

                            Address[] a;
                            String from = messages[i].getFrom()[0].toString();
                            String fromAddress = from.substring(from.indexOf("<")+1);
                            fromAddress.trim();
                            fromAddress = fromAddress.replace(">","");

                            String subject = messages[i].getSubject();

                            Date sentDate = messages[i].getSentDate();

                            String to = messages[i].getAllRecipients()[0].toString();
                            String toAddress = to.substring(to.indexOf("<")+1);
                            toAddress.trim();
                            toAddress = toAddress.replace(">","");

                            String messageContent = getTextFromMessage(messages[i]);

                            final EmailEntity emailEntity = new EmailEntity()
                                    .setEmailTo(toAddress)
                                    .setEmailDate(sentDate)
                                    .setEmailFrom(fromAddress)
                                    .setInbox(true)
                                    .setBody(messageContent)
                                    .setSubject(subject);

                            emailRepository.save(emailEntity);


                    }
                    else{
                        break;
                    }
                }

                inbox.close(true);
                store.close();

            } catch (Exception ex) {
                log.error("Exception arise at the time of read mail");
                ex.printStackTrace();
            }

        } catch (MessagingException e) {
            log.error("Exception while connecting to server: " + e.getLocalizedMessage());
            e.printStackTrace();
            System.exit(2);
        }
    }

    private String getTextFromMessage(Message message) throws IOException, MessagingException {
        String result = "";
        if (message.isMimeType("text/plain")) {
            String s = message.getContent().toString();
            s = s.replace("<br>", "<br/>");
            result = s;
        } else if (message.isMimeType("multipart/*")) {
            MimeMultipart mimeMultipart = (MimeMultipart) message.getContent();
            result = getTextFromMimeMultipart(mimeMultipart);
        }
        else if (message.isMimeType("text/html")){
            String html = (String) message.getContent();
            html = html.replace("<br>", "secretBrTag");
            result = result + "\n" + org.jsoup.Jsoup.parse(html).text();
            result = result.replace("secretBrTag", "<br/>");
        }
        return result;
    }

    private String getTextFromMimeMultipart(
            MimeMultipart mimeMultipart) throws IOException, MessagingException {

        int count = mimeMultipart.getCount();
        if (count == 0)
            throw new MessagingException("Multipart with no body parts not supported.");
        boolean multipartAlt = new ContentType(mimeMultipart.getContentType()).match("multipart/alternative");
        if (multipartAlt)
            // alternatives appear in an order of increasing
            // faithfulness to the original content. Customize as req'd.
            return getTextFromBodyPart(mimeMultipart.getBodyPart(count - 1));
        String result = "";
        for (int i = 0; i < count; i++) {
            BodyPart bodyPart = mimeMultipart.getBodyPart(i);
            result += getTextFromBodyPart(bodyPart);
        }
        return result;
    }

    private String getTextFromBodyPart(
            BodyPart bodyPart) throws IOException, MessagingException {

        String result = "";
        if (bodyPart.isMimeType("text/plain")) {
            result = (String) bodyPart.getContent();
        } else if (bodyPart.isMimeType("text/html")) {
            String html = (String) bodyPart.getContent();
            html = html.replace("<br>", "secretBrTag");
            result = org.jsoup.Jsoup.parse(html).text();
            result = result.replace("secretBrTag", "<br/>");
        } else if (bodyPart.getContent() instanceof MimeMultipart){
            result = getTextFromMimeMultipart((MimeMultipart)bodyPart.getContent());
        }
        return result;
    }

    @Override
    public List<EmailEntity> getOutbox() throws Exception{
        return null;
    }

    @Override
    public List<EmailEntity> getCommunication(Long contactId) {
        final UserEntity user = userRepository.findById(contactId)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        return emailRepository.findAllByEmailFromOrEmailToOrderByEmailDateAsc(user.getEmail(), user.getEmail());
    }

    @Override
    public List<EmailEntity> fetchAllInbox() {
        return emailRepository.findAllByInboxTrue();
    }

    @Override
    public List<EmailEntity> fetchAllOutbox() {
        return emailRepository.findAllByInboxFalse();
    }


}
