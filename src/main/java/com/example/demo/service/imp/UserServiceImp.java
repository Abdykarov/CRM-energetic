package com.example.demo.service.imp;

import com.example.demo.domain.RoleEntity;
import com.example.demo.domain.UserEntity;
import com.example.demo.dto.UserRequestDto;
import com.example.demo.dto.UserResponseDto;
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

    private final RoleServiceImp roleService;

    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        UserEntity user = userRepository.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("Username doesnt exist");
        }
        return new User(user.getEmail(), user.getPassword(), getAuthority(user));
    }

    private Set<SimpleGrantedAuthority> getAuthority(UserEntity user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
        return authorities;
    }

    @Override
    public UserResponseDto saveContact(UserRequestDto user) {
        UserEntity userEntity = userMapper.toEntity(user);
        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));

        RoleEntity role = roleService.findByName("New");

        userEntity.setRole(role);
        UserEntity save = userRepository.save(userEntity);

        return userMapper.toResponse(save);
    }

//    @Override
//    public UserResponseDto saveLead(UserRequestDto user) {
//        UserEntity userEntity = userMapper.toEntity(user);
//        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
//
//        RoleEntity role = roleService.findByName("Lead");
//        Set<Role> roleSet = new HashSet<>();
//        roleSet.add(role);
//
//        if(nUser.getEmail().split("@")[1].equals("admin.edu")){
//            role = roleService.findByName("ADMIN");
//            roleSet.add(role);
//        }
//
//        nUser.setRole(roleSet);
//        return userRepository.save(nUser);
//    }
//
//    @Override
//    public UserResponseDto saveManager(UserRequestDto user) {
//        UserEntity userEntity = userMapper.toEntity(user);
//        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
//
//        RoleEntity role = roleService.findByName("Manager");
//        Set<Role> roleSet = new HashSet<>();
//        roleSet.add(role);
//
//        if(nUser.getEmail().split("@")[1].equals("admin.edu")){
//            role = roleService.findByName("ADMIN");
//            roleSet.add(role);
//        }
//
//        nUser.setRole(roleSet);
//        return userRepository.save(nUser);
//    }
//
//    @Override
//    public UserResponseDto saveSalesman(UserRequestDto user) {
//        UserEntity userEntity = userMapper.toEntity(user);
//        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
//
//        RoleEntity role = roleService.findByName("New");
//        Set<Role> roleSet = new HashSet<>();
//        roleSet.add(role);
//
//        if(nUser.getEmail().split("@")[1].equals("admin.edu")){
//            role = roleService.findByName("ADMIN");
//            roleSet.add(role);
//        }
//
//        nUser.setRole(roleSet);
//        return userRepository.save(nUser);
//    }


    @Override
    public List<UserResponseDto> findAll() {
        List<UserEntity> all = userRepository.findAll();
        List<UserResponseDto> responseDtos = all.stream()
                .map(user -> userMapper.toResponse(user))
                .collect(Collectors.toList());
        return responseDtos;
    }

    @Override
    public UserResponseDto findByEmail(String email) {
        UserEntity userEntity = userRepository.findByEmail(email);
        return userMapper.toResponse(userEntity);
    }
}
