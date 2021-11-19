package com.example.demo.service.imp;

import com.example.demo.domain.NotificationDescType;
import com.example.demo.domain.NotificationEntity;
import com.example.demo.domain.UserEntity;
import com.example.demo.dto.response.NotificationResponseDto;
import com.example.demo.mapper.NotificationMapper;
import com.example.demo.repository.NotificationRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    @Override
    public List<NotificationResponseDto> getAllNotifications() {
        log.info("Finding all notifications");
        final List<NotificationEntity> all = notificationRepository.findAllByOrderByCreatedAtDesc();
        return notificationMapper.toResponseList(all);
    }

    @Override
    @Transactional
    public void createNotification(Long activeUser, Long passiveUser, String text, NotificationDescType notificationDescType) {
        log.info("Creating new notification");
        UserEntity activeUserEntity = null;
        UserEntity passiveUserEntity = null;
        if(activeUser != null){
           activeUserEntity = userRepository.findById(activeUser)
                    .orElseThrow(() -> new EntityNotFoundException("Active user doesnt exist"));
        }
        if(passiveUser != null){
            passiveUserEntity = userRepository.findById(passiveUser)
                    .orElseThrow(() -> new EntityNotFoundException("Passive user doesnt exist"));
        }
        final NotificationEntity notificationEntity = new NotificationEntity()
                .setActiveUser(activeUserEntity)
                .setText(text)
                .setPassiveUser(passiveUserEntity)
                .setCreatedAt(LocalDateTime.now())
                .setNotificationDescType(notificationDescType);
        notificationRepository.save(notificationEntity);
        log.info("Notification successfully created");
    }
}
