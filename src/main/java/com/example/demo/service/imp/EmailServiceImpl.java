package com.example.demo.service.imp;

import com.example.demo.domain.CustomerEntity;
import com.example.demo.domain.EmailEntity;
import com.example.demo.dto.EmailRequestDto;
import com.example.demo.dto.EmailResponseDto;
import com.example.demo.mapper.EmailMapper;
import com.example.demo.repository.EmailRepository;
import com.example.demo.service.EmailService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final EmailRepository emailRepository;
    private final JavaMailSender emailSender;
    private final EmailMapper emailMapper;

    @Override
    public List<EmailResponseDto> getEmails(){
        List<EmailEntity> entities = emailRepository.findAll();
        return entities.stream().map(p -> emailMapper.toResponse(p))
                .collect(Collectors.toList());
    }

    @Override
    public EmailResponseDto getEmail(Long emailId) {
        return null;
    }

    @Override
    public EmailResponseDto sendEmail(EmailRequestDto emailRequestDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(emailRequestDto.getFrom());
        message.setTo(emailRequestDto.getTarget());
        message.setSubject(emailRequestDto.getSubject());
        message.setText(emailRequestDto.getText());
        try{
            emailSender.send(message);
        }
        catch(MailException ex) {
            //log it and go on
            log.error("Didnt send");
        }

        EmailEntity emailEntity = emailMapper.toEntity(emailRequestDto);

        EmailEntity save = emailRepository.save(emailEntity);

        return emailMapper.toResponse(save);
    }
}
