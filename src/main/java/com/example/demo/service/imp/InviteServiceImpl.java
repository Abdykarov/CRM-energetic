package com.example.demo.service.imp;

import com.example.demo.domain.*;
import com.example.demo.dto.request.InviteRequestDto;
import com.example.demo.dto.response.InviteResponseDto;
import com.example.demo.exception.UserStateControlException;
import com.example.demo.mapper.InviteMapper;
import com.example.demo.repository.InviteRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.InviteService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Properties;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class InviteServiceImpl implements InviteService {

    private final InviteRepository inviteRepository;
    private final InviteMapper inviteMapper;
    private final UserRepository userRepository;
    private final MailServiceImp mailServiceImp;
    @Autowired
    private final TemplateEngine templateEngine;
    private final JavaMailSender javaMailSender;
    @Override
    public List<InviteResponseDto> findAll() {
        return null;
    }

    @Override
    @Transactional
    public void deleteInvite(Long inviteId) {
        inviteRepository.deleteById(inviteId);
    }

    private String generateUniqueString(int stringLength){

        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(stringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        return generatedString;
    }


    @Override
    @Transactional
    public void createInvite(Long userId) {
        final UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        if(inviteRepository.existsByUserId(userId)){
            throw new UserStateControlException("Přihláška už existuje, odstrante existujicí", HttpStatus.CONFLICT);
        }

        // generate unique edr registration link
        String generateUniqueString = generateUniqueString(20);

        // check if registration link exists, if it is then call the function again
        if(inviteRepository.existsByUniqueCode(generateUniqueString)){
            createInvite(userId);
        }

        InviteEntity inviteEntity = new InviteEntity()
                .setUser(user)
                .setUniqueCode(generateUniqueString)
                .setInviteStatus(InviteStatus.GENERATED)
                .setCreatedAt(LocalDate.now());

        InviteEntity save = inviteRepository.save(inviteEntity);
        user.setRequestToEdrGenerated(true);
        user.setRequestToEdrStatus(DocumentStatus.GENERATED);
    }

    @Override
    @Transactional
    public void activateInvite(InviteRequestDto inviteRequestDto) {
        if (!inviteRepository.existsByUniqueCode(inviteRequestDto.getUniqueCode())) {
            throw new UserStateControlException("Registration link is incorrect", HttpStatus.CONFLICT);
        }
        InviteEntity inviteEntity = inviteRepository.findByUniqueCode(inviteRequestDto.getUniqueCode());
        if(inviteEntity.getInviteStatus().equals(InviteStatus.SIGNED)){
            throw new UserStateControlException("Registration link is depricated", HttpStatus.CONFLICT);
        }
        UserEntity user = inviteRepository.findByUniqueCode(inviteRequestDto.getUniqueCode()).getUser();
        user.setRequestToEdrSigned(true);
        user.setRequestToEdrStatus(DocumentStatus.SIGNED);
        inviteEntity.setInviteStatus(InviteStatus.SIGNED);
        inviteEntity.setArea(inviteRequestDto.getArea());
        inviteEntity.setEmail(inviteRequestDto.getEmail());
        inviteEntity.setBatteryCapacity(inviteRequestDto.getBatteryCapacity());
        inviteEntity.setFirmLeader(inviteRequestDto.getFirmLeader());
        inviteEntity.setFirmName(inviteRequestDto.getFirmName());
        inviteEntity.setDic(inviteRequestDto.getDic());
        inviteEntity.setFveArea1(inviteRequestDto.getFveArea1());
        inviteEntity.setFveStreet1(inviteRequestDto.getFveStreet1());
        inviteEntity.setFvePsc1(inviteRequestDto.getFvePsc1());
        inviteEntity.setFveArea2(inviteRequestDto.getFveArea2());
        inviteEntity.setFveStreet2(inviteRequestDto.getFveStreet2());
        inviteEntity.setFvePsc2(inviteRequestDto.getFvePsc2());
        inviteEntity.setFveArea3(inviteRequestDto.getFveArea3());
        inviteEntity.setFveStreet3(inviteRequestDto.getFveStreet3());
        inviteEntity.setFvePsc3(inviteRequestDto.getFvePsc3());
        inviteEntity.setFveArea4(inviteRequestDto.getFveArea4());
        inviteEntity.setFveStreet4(inviteRequestDto.getFveStreet4());
        inviteEntity.setFvePsc4(inviteRequestDto.getFvePsc4());
        inviteEntity.setIco(inviteRequestDto.getIco());
        inviteEntity.setName(inviteRequestDto.getName());
        inviteEntity.setSurname(inviteRequestDto.getSurname());
        inviteEntity.setTitul(inviteRequestDto.getTitul());
        inviteEntity.setStreet(inviteRequestDto.getStreet());
        inviteEntity.setRc(inviteRequestDto.getRc());
    }

    @Override
    public InviteResponseDto findByUser(Long userId) {
        InviteEntity inviteEntity = inviteRepository.findByUser_Id(userId);
        return inviteMapper.toResponse(inviteEntity);
    }

    @Override
    public InviteResponseDto findByLink(String code) {
        if(!inviteRepository.existsByUniqueCode(code)){
            return null;
        }
        InviteEntity inviteEntity = inviteRepository.findByUniqueCode(code);
        return inviteMapper.toResponse(inviteEntity);
    }

    @Override
    public void sendInvite(Long userId) throws MessagingException {

        InviteEntity inviteEntity = inviteRepository.findByUser_Id(userId);
        UserEntity user = inviteEntity.getUser();

        final String username = "crm@energetickedruzstvo.cz";  // like yourname@outlook.com
        final String password = "Foy37364";   // password here

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp-mail.outlook.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    @Override
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });
        session.setDebug(true);

        try {
            Context context = new Context();
            context.setVariable("user", user);
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(user.getEmail()));   // like inzi769@gmail.com
            message.setSubject("Online přihláška", "UTF-8");
            String processedHtml = templateEngine.process("inviteEmail", context);
            message.setContent(processedHtml, "text/html; charset=utf-8");

            Transport.send(message);
            user.setRequestToEdrStatus(DocumentStatus.SENT);
            user.setRequestToEdrSent(true);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }


    }
}
