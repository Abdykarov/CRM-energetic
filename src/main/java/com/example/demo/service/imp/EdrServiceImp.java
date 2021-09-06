package com.example.demo.service.imp;

import com.example.demo.domain.RoleEntity;
import com.example.demo.domain.UserEntity;
import com.example.demo.dto.EdrRequestDto;
import com.example.demo.dto.EdrResponseDto;
import com.example.demo.mapper.EdrMapper;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.EdrService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.HashSet;
import java.util.Set;

@Slf4j
@Service(value = "edrService")
@AllArgsConstructor
public class EdrServiceImp implements EdrService {

    private final UserRepository userRepository;
    private final EdrMapper edrMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final RoleServiceImp roleService;

    @Override
    public EdrResponseDto registrateEdr(EdrRequestDto edrRequestDto) {

        final UserEntity user = userRepository.findById(edrRequestDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));

        if(userRepository.existsByUsername(edrRequestDto.getUsername())){
            throw new RuntimeException("User with such username exists");
        }

        user
                .setUsername(edrRequestDto.getUsername())
                .setPassword(passwordEncoder.encode(edrRequestDto.getPassword()));

        RoleEntity role = roleService.findByName("EDR");
        Set<RoleEntity> roleSet = new HashSet<>();
        roleSet.add(role);
        user.setRoles(roleSet);
        UserEntity save = userRepository.save(user);

        return edrMapper.toResponse(save);
    }
}
