package com.example.demo.service.imp.user;

import com.example.demo.domain.RoleEntity;
import com.example.demo.domain.UserEntity;
import com.example.demo.dto.request.*;
import com.example.demo.dto.response.*;
import com.example.demo.mapper.*;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service(value = "userService")
@AllArgsConstructor
@Slf4j
public class UserServiceImp implements UserDetailsService, UserService {

    private final ManagerMapper managerMapper;
    private final UserMapper userMapper;
    private final LeadMapper leadMapper;
    private final UserRepository userRepository;
    private final ContactMapper contactMapper;
    private final SalesmanMapper salesmanMapper;
    private final AccountMapper accountMapper;
    private final PotentialMapper potentialMapper;
    private final CurrentMapper currentMapper;
    private final AcceptedMapper acceptedMapper;
    private final EdrMapper edrMapper;
    private final AdminMapper adminMapper;
    private final RoleServiceImp roleService;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByUsername(username);
        if (user == null) {
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
    public AdminResponseDto saveAdmin(AdminRequestDto adminRequestDto) {
        log.info("Creating an admin | Admin request dto - {}", adminRequestDto);
        UserEntity user = adminMapper.toEntity(adminRequestDto);

        log.info("Creating an admin | Controlling if username is free");
        if (userRepository.existsByUsername(adminRequestDto.getUsername())) {
            throw new RuntimeException("Admin with such username exists");
        }
        user.setPassword(passwordEncoder.encode(adminRequestDto.getPassword()));

        RoleEntity role = roleService.findByName("ADMIN");
        log.info("Creating an new admin | Adding an admin role - {}", role);

        Set<RoleEntity> roleSet = new HashSet<>();
        roleSet.add(role);
        user.setRoles(roleSet);
        UserEntity save = userRepository.save(user);

        return adminMapper.toResponse(save);
    }

    @Override
    @Transactional
    public ManagerResponseDto saveManager(ManagerRequestDto managerRequestDto) {
        log.info("Creating a manager | Manager request dto - {}", managerRequestDto);
        UserEntity user = managerMapper.toEntity(managerRequestDto);

        log.info("Creating an admin | Controlling if username is free");
        if (userRepository.existsByUsername(managerRequestDto.getUsername())) {
            throw new RuntimeException("Manager with such username exists");
        }

        user.setPassword(passwordEncoder.encode(managerRequestDto.getPassword()));

        RoleEntity role = roleService.findByName("MANAGER");
        log.info("Creating a manager | Adding a manager role - {}", role);
        Set<RoleEntity> roleSet = new HashSet<>();
        roleSet.add(role);
        user.setRoles(roleSet);
        log.info("Creating a manager | Saving user - {}", user);
        UserEntity save = userRepository.save(user);

        return managerMapper.toResponse(save);
    }

    @Override
    @Transactional
    public SalesmanResponseDto saveSalesman(SalesmanRequestDto salesmanRequestDto) {
        UserEntity userEntity = salesmanMapper.toEntity(salesmanRequestDto);
        if (userRepository.existsByUsername(salesmanRequestDto.getUsername())) {
            throw new RuntimeException("Salesman with such username exists");
        }
        userEntity.setPassword(passwordEncoder.encode(salesmanRequestDto.getPassword()));

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
    public Integer getAdminCount() {
        List<UserEntity> adminEntities = userRepository.findByRoles_Name("ADMIN");
        return adminEntities.size();
    }

    @Override
    public Integer getManagerCount() {
        List<UserEntity> managerEntities = userRepository.findByRoles_Name("MANAGER");
        return managerEntities.size();
    }

    @Override
    public Integer getSalesmanCount() {
        List<UserEntity> salesmanEntities = userRepository.findByRoles_Name("SALESMAN");
        return salesmanEntities.size();
    }

    @Override
    public List<AdminResponseDto> getAdmins() {
        List<UserEntity> adminEntities = userRepository.findByRoles_Name("ADMIN");
        List<AdminResponseDto> collection = adminEntities.stream()
                .map(user -> adminMapper.toResponse(user))
                .collect(Collectors.toList());
        return collection;
    }

    @Override
    public List<ManagerResponseDto> getManagers() {
        List<UserEntity> managerEntities = userRepository.findByRoles_Name("MANAGER");
        List<ManagerResponseDto> collection = managerEntities.stream()
                .map(user -> managerMapper.toResponse(user))
                .collect(Collectors.toList());
        return collection;
    }

    @Override
    public List<SalesmanResponseDto> getSalesmans() {
        List<UserEntity> salesmanEntities = userRepository.findByRoles_Name("SALESMAN");
        List<SalesmanResponseDto> collection = salesmanEntities.stream()
                .map(user -> salesmanMapper.toResponse(user))
                .collect(Collectors.toList());
        return collection;
    }

    @Override
    public List<LeadResponseDto> getLeads() {
        List<UserEntity> leadEntities = userRepository.findByRoles_Name("LEAD");
        List<LeadResponseDto> collection = leadEntities.stream()
                .map(user -> leadMapper.toResponse(user))
                .collect(Collectors.toList());
        return collection;
    }

    @Override
    public List<PotentialResponseDto> getPotentials() {
        List<UserEntity> leadEntities = userRepository.findByRoles_Name("POTENTIAL");
        List<PotentialResponseDto> collection = leadEntities.stream()
                .map(user -> potentialMapper.toResponse(user))
                .collect(Collectors.toList());
        return collection;
    }

    @Override
    public List<CurrentResponseDto> getCurrents() {
        List<UserEntity> leadEntities = userRepository.findByRoles_Name("CURRENT");
        List<CurrentResponseDto> collection = leadEntities.stream()
                .map(user -> currentMapper.toResponse(user))
                .collect(Collectors.toList());
        return collection;
    }

    @Override
    public List<AcceptedResponseDto> getAccepted() {
        List<UserEntity> leadEntities = userRepository.findByRoles_Name("ACCEPTED");
        List<AcceptedResponseDto> collection = leadEntities.stream()
                .map(user -> acceptedMapper.toResponse(user))
                .collect(Collectors.toList());
        return collection;
    }

    @Override
    public List<EdrResponseDto> getEdr() {
        List<UserEntity> leadEntities = userRepository.findByRoles_Name("EDR");
        List<EdrResponseDto> collection = leadEntities.stream()
                .map(user -> edrMapper.toResponse(user))
                .collect(Collectors.toList());
        return collection;
    }

    @Override
    public UserResponseDto changeToLead(Long userId) {
        final UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        RoleEntity lead = roleService.findByName("LEAD");
        Set<RoleEntity> roleSet = new HashSet<>();
        roleSet.add(lead);
        userEntity.setRoles(roleSet);
        UserEntity save = userRepository.save(userEntity);
        return userMapper.toResponse(save);
    }

    @Override
    public UserResponseDto changeToPotential(Long userId) {
        final UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        RoleEntity lead = roleService.findByName("POTENTIAL");
        Set<RoleEntity> roleSet = new HashSet<>();
        roleSet.add(lead);
        userEntity.setRoles(roleSet);
        UserEntity save = userRepository.save(userEntity);
        return userMapper.toResponse(save);
    }


    @Override
    public UserResponseDto changeToCurrent(Long userId) {
        final UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        RoleEntity lead = roleService.findByName("CURRENT");
        Set<RoleEntity> roleSet = new HashSet<>();
        roleSet.add(lead);
        userEntity.setRoles(roleSet);
        UserEntity save = userRepository.save(userEntity);
        return userMapper.toResponse(save);
    }

    @Override
    public UserResponseDto changeToAccepted(Long userId) {
        final UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        RoleEntity lead = roleService.findByName("ACCEPTED");
        Set<RoleEntity> roleSet = new HashSet<>();
        roleSet.add(lead);
        userEntity.setRoles(roleSet);
        UserEntity save = userRepository.save(userEntity);
        return userMapper.toResponse(save);
    }

    @Override
    public UserResponseDto changeToEdr(Long userId) {
        final UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        RoleEntity lead = roleService.findByName("EDR");
        Set<RoleEntity> roleSet = new HashSet<>();
        roleSet.add(lead);
        userEntity.setRoles(roleSet);
        UserEntity save = userRepository.save(userEntity);
        return userMapper.toResponse(save);
    }

    //TODO find all contacts where salesman id == id
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


    @Override
    public EdrResponseDto registrateEdr(EdrRequestDto edrRequestDto) {

        final UserEntity user = userRepository.findById(edrRequestDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));

        if (userRepository.existsByUsername(edrRequestDto.getUsername())) {
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
