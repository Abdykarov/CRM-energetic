package com.example.demo.config;

import com.example.demo.domain.RoleEntity;
import com.example.demo.domain.UserEntity;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class DbInit {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @PostConstruct
    private void postConstruct() {
        UserEntity admin = new UserEntity()
                .setRole(roleRepository.findByName("Admin"))
                        .setEmail("admin@info.cz")
                                .setPassword("281001ilyas");
        userRepository.save(admin);
    }
}