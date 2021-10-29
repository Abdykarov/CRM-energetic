package com.example.demo.service.imp;

import com.example.demo.domain.AreaEntity;
import com.example.demo.domain.RoleEntity;
import com.example.demo.domain.UserEntity;
import com.example.demo.dto.request.CallCentrumRequestDto;
import com.example.demo.dto.request.SalesmanRequestDto;
import com.example.demo.dto.response.CallCentrumResponseDto;
import com.example.demo.dto.response.SalesmanResponseDto;
import com.example.demo.mapper.CallCentrumMapper;
import com.example.demo.repository.AreaRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.CallCentrumService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class CallCentrumServiceImpl implements CallCentrumService {

    private final AreaRepository areaRepository;
    private final UserRepository userRepository;
    private final CallCentrumMapper callCentrumMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final RoleServiceImp roleService;

    @Override
    public List<CallCentrumResponseDto> findAll() {
        final List<UserEntity> cc = userRepository.findByRoles_Name("CC");
        return cc.stream()
                .map(callCentrumMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CallCentrumResponseDto createCallCentrum(CallCentrumRequestDto callCentrumRequestDto) {
        log.info("Saving a new call centrum | Request dto {}", callCentrumRequestDto);
        UserEntity userEntity = callCentrumMapper.toEntity(callCentrumRequestDto);
        if (userRepository.existsByUsername(callCentrumRequestDto.getUsername())) {
            throw new RuntimeException("Call centrum with such username exists");
        }
        final AreaEntity area = areaRepository.findById(callCentrumRequestDto.getAreaId())
                .orElseThrow(() -> new EntityNotFoundException("Area doesnt exist"));
        userEntity.setArea(area);
        userEntity.setPassword(passwordEncoder.encode(callCentrumRequestDto.getPassword()));

        RoleEntity role = roleService.findByName("CC");
        Set<RoleEntity> roleSet = new HashSet<>();
        roleSet.add(role);
        userEntity.setRoles(roleSet);
        UserEntity save = userRepository.save(userEntity);
        final CallCentrumResponseDto callCentrumResponseDto = callCentrumMapper.toResponse(save);
        log.info("Saving a new call centrum | Response dto: {}", callCentrumResponseDto);

        return callCentrumResponseDto;
    }
}
