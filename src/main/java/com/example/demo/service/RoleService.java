package com.example.demo.service;

import com.example.demo.domain.RoleEntity;

public interface RoleService {
    RoleEntity findByName(String role);
}
