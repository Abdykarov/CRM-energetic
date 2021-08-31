package com.example.demo.service.imp;

import com.example.demo.domain.RoleEntity;
import com.example.demo.domain.UserEntity;
import com.example.demo.dto.*;
import com.example.demo.mapper.AccountMapper;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.management.relation.Role;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service(value = "userService")
@AllArgsConstructor
public class UserServiceImp implements UserDetailsService, UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final AccountMapper accountMapper;

    private final RoleServiceImp roleService;

    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        UserEntity user = userRepository.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("Username doesnt exist");
        }
        return new User(user.getUsername(), user.getPassword(), getAuthority(user));
    }

    private Set<SimpleGrantedAuthority> getAuthority(UserEntity user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
        });
        return authorities;
    }

    @Override
    @Transactional
    public AccountResponseDto saveAdmin(AuthRequestDto user) {
        UserEntity userEntity = new UserEntity()
                .setUsername(user.getUsername());

        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));

        RoleEntity role = roleService.findByName("ADMIN");
        Set<RoleEntity> roleSet = new HashSet<>();
        roleSet.add(role);
        userEntity.setRoles(roleSet);
        UserEntity save = userRepository.save(userEntity);

        return accountMapper.toResponse(save);
    }

    @Override
    public AccountResponseDto saveManager(AuthRequestDto user) {
        return null;
    }

    @Override
    public SalesmanRequestDto saveSalesman(SalesmanRequestDto user) {
        return null;
    }

    @Override
    public UserResponseDto saveNewContact(SalesmanRequestDto user) {
        return null;
    }

}
