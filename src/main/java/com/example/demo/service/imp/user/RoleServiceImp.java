package com.example.demo.service.imp.user;

import com.example.demo.domain.RoleEntity;
import com.example.demo.repository.RoleRepository;
import com.example.demo.service.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service(value = "roleService")
public class RoleServiceImp implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public RoleEntity findByName(String role) {
        return roleRepository.findByName(role);
    }
}
