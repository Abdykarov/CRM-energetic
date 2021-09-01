package com.example.demo.service.imp;

import com.example.demo.domain.RoleEntity;
import com.example.demo.domain.UserEntity;
import com.example.demo.dto.*;
import com.example.demo.mapper.AccountMapper;
import com.example.demo.mapper.ContactMapper;
import com.example.demo.mapper.SalesmanMapper;
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
import javax.persistence.EntityNotFoundException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service(value = "userService")
@AllArgsConstructor
public class UserServiceImp implements UserDetailsService, UserService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final ContactMapper contactMapper;
    private final SalesmanMapper salesmanMapper;
    private final AccountMapper accountMapper;
    private final RoleServiceImp roleService;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    @Transactional
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
    @Transactional
    public AccountResponseDto saveManager(AuthRequestDto user) {
        UserEntity userEntity = new UserEntity()
                .setUsername(user.getUsername());

        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));

        RoleEntity role = roleService.findByName("MANAGER");
        Set<RoleEntity> roleSet = new HashSet<>();
        roleSet.add(role);
        userEntity.setRoles(roleSet);
        UserEntity save = userRepository.save(userEntity);

        return accountMapper.toResponse(save);
    }

    @Override
    @Transactional
    public SalesmanResponseDto saveSalesman(SalesmanRequestDto user) {
        UserEntity userEntity = salesmanMapper.toEntity(user);

        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));

        RoleEntity role = roleService.findByName("SALESMAN");
        Set<RoleEntity> roleSet = new HashSet<>();
        roleSet.add(role);
        userEntity.setRoles(roleSet);
        UserEntity save = userRepository.save(userEntity);

        return salesmanMapper.toResponse(save);
    }

    @Override
    @Transactional
    public ContactResponseDto saveContact(ContactRequestDto contactRequestDto) {
        UserEntity userEntity = contactMapper.toEntity(contactRequestDto);
        RoleEntity role = roleService.findByName("NEW");
        Set<RoleEntity> roleSet = new HashSet<>();
        roleSet.add(role);
        userEntity.setRoles(roleSet);
        UserEntity save = userRepository.save(userEntity);
        return contactMapper.toResponse(save);
    }

    @Override
    public List<ContactResponseDto> getContacts() {
        List<UserEntity> newContacts = userRepository.findByRoles_Name("NEW");
        List<UserEntity> oldContacts = userRepository.findByRoles_Name("OLD");
        List<ContactResponseDto> collectNew = newContacts.stream()
                .map(user -> contactMapper.toResponse(user))
                .collect(Collectors.toList());
        List<ContactResponseDto> collectOld = oldContacts.stream()
                .map(user -> contactMapper.toResponse(user))
                .collect(Collectors.toList());
        List<ContactResponseDto> collect = Stream.concat(collectNew.stream(), collectOld.stream())
                .collect(Collectors.toList());
        return collect;
    }

    @Override
    public List<ContactResponseDto> getSalesmanContacts(Long salesmanId) {
        return null;
    }

    @Override
    public ContactResponseDto getContact(Long contactId) {
        final UserEntity userEntity = userRepository.findById(contactId)
                .orElseThrow(() -> new EntityNotFoundException("Contact doesnt exist"));
        return contactMapper.toResponse(userEntity);
    }

    @Override
    public AccountResponseDto getAccountByUsername(String username) {
        final UserEntity userEntity = userRepository.findByUsername(username);

        return accountMapper.toResponse(userEntity);
    }

    @Override
    public UserResponseDto findById(Long userId) {
        final UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Not found"));
        return userMapper.toResponse(userEntity);
    }

}
