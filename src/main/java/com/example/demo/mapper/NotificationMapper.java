package com.example.demo.mapper;

import com.example.demo.domain.NotificationEntity;
import com.example.demo.dto.response.NotificationResponseDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = UserMapper.class)
public interface NotificationMapper {
    List<NotificationResponseDto> toResponseList(List<NotificationEntity> notificationEntities);
}
