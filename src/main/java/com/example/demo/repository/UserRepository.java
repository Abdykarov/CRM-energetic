package com.example.demo.repository;

import com.example.demo.domain.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByEmail(String email);

    UserEntity findByUsername(String username);

    UserEntity findByIdAndRoles_Name(Long id, String rolesName);

    List<UserEntity> findByRoles_Name(String name);

    List<UserEntity> findByRoles_NameOrderByRoleChangedDateAsc(String name);

    boolean existsByUsername(String username);

    List<UserEntity> findBySalesmanId(Long salesmanId);
}
