package com.example.demo.service.imp;

import com.example.demo.domain.*;
import com.example.demo.dto.request.ReferalContactRequestDto;
import com.example.demo.dto.request.*;
import com.example.demo.dto.response.*;
import com.example.demo.mapper.*;
import com.example.demo.repository.*;
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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service(value = "userService")
@AllArgsConstructor
@Slf4j
public class UserServiceImp implements UserDetailsService, UserService {

    private final ManagerMapper managerMapper;
    private final AreaMapper areaMapper;
    private final UserMapper userMapper;
    private final LeadMapper leadMapper;
    private final UserRepository userRepository;
    private final ContactMapper contactMapper;
    private final SalesmanMapper salesmanMapper;
    private final AccountMapper accountMapper;
    private final EdrMapper edrMapper;
    private final EdrLinkRepository edrLinkRepository;
    private final ReferalLinkRepository referalLinkRepository;
    private final AreaRepository areaRepository;
    private final AdminMapper adminMapper;
    private final ApplicantMapper applicantMapper;
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
    public void testData() {
        // admin
        final AdminRequestDto adminRequestDto = new AdminRequestDto()
                .setUsername("admin")
                .setPassword("123")
                .setName("Tomas")
                .setSurname("Pavlivec");
        saveAdmin(adminRequestDto);
        // manager
        final ManagerRequestDto managerRequestDto1 = new ManagerRequestDto()
                .setUsername("manager1")
                .setPassword("123")
                .setName("Tomas")
                .setSurname("Pavlivec");
        saveManager(managerRequestDto1);

        final ManagerRequestDto managerRequestDto2 = new ManagerRequestDto()
                .setUsername("manager2")
                .setPassword("123")
                .setName("Tomas")
                .setSurname("Pavlivec");
        saveManager(managerRequestDto2);

        // salesman
        final SalesmanRequestDto salesmanRequestDto1 = new SalesmanRequestDto()
                .setUsername("salesman")
                .setPassword("123")
                .setName("Pavel")
                .setSurname("Pavlivec")
                .setAreaId(1L);
        saveSalesman(salesmanRequestDto1);

        final SalesmanRequestDto salesmanRequestDto2 = new SalesmanRequestDto()
                .setUsername("salesman1")
                .setPassword("123")
                .setName("Tomas")
                .setSurname("Pavlivec")
                .setAreaId(2L);
        saveSalesman(salesmanRequestDto2);

        final EdrRequestDto edrRequestDto = new EdrRequestDto()
                .setUsername("edr")
                .setPassword("123");
        saveEdr(edrRequestDto);

        final EdrRequestDto edrRequestDto2 = new EdrRequestDto()
                .setUsername("edr1")
                .setPassword("123");
        saveEdr(edrRequestDto2);
    }

    @Override
    @Transactional
    public void setFveSigned(Long id) {
        log.info("Setting fve signed | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isConnectedFveSigned()){
            user.setConnectedFveSigned(false);
            user.setConnectedFveStatus(DocumentStatus.NONE);
        }else{
            user.setConnectedFveSigned(true);
            user.setConnectedFveStatus(DocumentStatus.SIGNED);
        }
        log.info("Setting fve signed | User fve connected : {}", user.isConnectedFveSigned());
    }

    @Override
    @Transactional
    public void setContractGenerated(Long id) {
        log.info("Setting contract generated | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isEdrContractGenerated()){
            user.setEdrContractGenerated(false);
            user.setEdrContractGeneratedDate(LocalDateTime.now());
        }else{
            user.setEdrContractGenerated(true);
            user.setEdrContractGeneratedDate(LocalDateTime.now());
        }
        log.info("Setting contract generated | User contract generated  : {}", user.isEdrContractGenerated());
    }

    @Transactional
    @Override
    public void setContractSent(Long id) {
        log.info("Setting contract sent | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isEdrContractSent()){
            user.setEdrContractSent(false);
            user.setEdrContractSentDate(LocalDateTime.now());
        }else{
            user.setEdrContractSent(true);
            user.setEdrContractSentDate(LocalDateTime.now());
        }
        log.info("Setting contract sent | User contract sent  : {}", user.isEdrContractSent());
    }

    @Transactional
    @Override
    public void setContractSigned(Long id) {
        log.info("Setting contract signed | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isEdrContractSigned()){
            user.setEdrContractSigned(false);
            user.setEdrContractSignedDate(LocalDateTime.now());
        }else{
            user.setEdrContractSigned(true);
            user.setEdrContractSignedDate(LocalDateTime.now());
        }
        log.info("Setting contract signed | User contract signed  : {}", user.isEdrContractSigned());
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
        log.info("Saving a new salesman | Request dto {}", salesmanRequestDto);
        UserEntity userEntity = salesmanMapper.toEntity(salesmanRequestDto);
        if (userRepository.existsByUsername(salesmanRequestDto.getUsername())) {
            throw new RuntimeException("Salesman with such username exists");
        }
        final AreaEntity area = areaRepository.findById(salesmanRequestDto.getAreaId())
                        .orElseThrow(() -> new EntityNotFoundException("Area doesnt exist"));
        userEntity.setArea(area);
        userEntity.setPassword(passwordEncoder.encode(salesmanRequestDto.getPassword()));

        RoleEntity role = roleService.findByName("SALESMAN");
        Set<RoleEntity> roleSet = new HashSet<>();
        roleSet.add(role);
        userEntity.setRoles(roleSet);
        UserEntity save = userRepository.save(userEntity);
        final SalesmanResponseDto responseDto = salesmanMapper.toResponse(save);
        log.info("Saving a new salesman | Response dto: {}", responseDto);

        return responseDto;
    }

    @Override
    @Transactional
    public ContactResponseDto saveContact(ContactRequestDto contactRequestDto) {
        final UserEntity salesmanEntity = userRepository.findByIdAndRoles_Name(contactRequestDto.getSalesmanId(), "SALESMAN");
        UserEntity edrEntity = null;
        if(!(contactRequestDto.getEdrId() == 6666L)){
            edrEntity = userRepository.findByIdAndRoles_Name(contactRequestDto.getEdrId(), "EDR");
        }
        final AreaEntity area = areaRepository.findById(contactRequestDto.getAreaId())
                .orElseThrow(() -> new EntityNotFoundException("Area id doesnt exist"));
        UserEntity userEntity = contactMapper.toEntity(contactRequestDto);
        RoleEntity role = roleService.findByName("NEW");
        if(contactRequestDto.isConcurrentFveInstalled()){
            role = roleService.findByName("DEFERRED");
        }
        Set<RoleEntity> roleSet = new HashSet<>();
        roleSet.add(role);
        userEntity.setRoles(roleSet);
        userEntity.setEdrContractStatus(DocumentStatus.NONE);
        userEntity.setConnectedFveStatus(DocumentStatus.NONE);
        userEntity.setHwsunMonitorStatus(DocumentStatus.NONE);
        userEntity.setRequestToEdrStatus(DocumentStatus.NONE);
        userEntity.setSyselAgreementStatus(DocumentStatus.NONE);
        userEntity.setFactureStatus(DocumentStatus.NONE);
        userEntity.setArea(area);
        userEntity.setRoleChangedDate(LocalDateTime.now());
        userEntity.setSalesman(salesmanEntity);
        userEntity.setReferal(edrEntity);
        UserEntity save = userRepository.save(userEntity);
        return contactMapper.toResponse(save);
    }

    @Override
    public ContactResponseDto saveReferalContact(ReferalContactRequestDto referalContactRequestDto) {
        UserEntity userEntity = contactMapper.referalToEntity(referalContactRequestDto);
        RoleEntity role = roleService.findByName("NEW");
        Set<RoleEntity> roleSet = new HashSet<>();
        roleSet.add(role);
        userEntity.setRoles(roleSet);
        UserEntity save = userRepository.save(userEntity);
        return contactMapper.toResponse(save);
    }

    //TODO find all contacts where salesman id == id
    @Override
    public List<ContactResponseDto> getSalesmanContacts(Long salesmanId) {
        List<UserEntity> all = userRepository.findBySalesmanId(salesmanId);
        return all.stream().map(contactMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<ContactResponseDto> getContacts() {
        List<UserEntity> newContacts = userRepository.findByRoles_Name("NEW");
        List<UserEntity> oldContacts = userRepository.findByRoles_Name("OLD");
        List<UserEntity> lostContacts = userRepository.findByRoles_Name("LOST");
        List<UserEntity> deferredContacts = userRepository.findByRoles_Name("DEFERRED");
        List<UserEntity> edrCancelledContacts = userRepository.findByRoles_Name("EDR_CANCELLED");

        List<ContactResponseDto> collectNew = newContacts.stream()
                .map(contactMapper::toResponse)
                .collect(Collectors.toList());
        List<ContactResponseDto> collectOld = oldContacts.stream()
                .map(contactMapper::toResponse)
                .collect(Collectors.toList());
        List<ContactResponseDto> collectLost = lostContacts.stream()
                .map(contactMapper::toResponse)
                .collect(Collectors.toList());
        List<ContactResponseDto> collectDeferred = deferredContacts.stream()
                .map(contactMapper::toResponse)
                .collect(Collectors.toList());
        List<ContactResponseDto> collectEdrCancelled = edrCancelledContacts.stream()
                .map(contactMapper::toResponse)
                .collect(Collectors.toList());

        List<ContactResponseDto> collect = Stream.concat(
                        collectNew.stream(),
                        collectOld.stream())
                .collect(Collectors.toList());

        List<ContactResponseDto> collect2 = Stream.concat(
                        collect.stream(),
                        collectLost.stream())
                .collect(Collectors.toList());

        List<ContactResponseDto> collect3 = Stream.concat(
                        collect2.stream(),
                        collectDeferred.stream())
                .collect(Collectors.toList());

        List<ContactResponseDto> collect4 = Stream.concat(
                        collect3.stream(),
                        collectEdrCancelled.stream())
                .collect(Collectors.toList());

        return collect4;
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
    public List<ApplicantResponseDto> getApplicants() {
        List<UserEntity> applicantEntities = userRepository.findByRoles_Name("APPLICANT");
        List<ApplicantResponseDto> collection = applicantEntities.stream()
                .map(user -> applicantMapper.toResponse(user))
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
        userEntity.setRoleChangedDate(LocalDateTime.now());
        UserEntity save = userRepository.save(userEntity);
        return userMapper.toResponse(save);
    }

    @Override
    public UserResponseDto changeToApplicant(Long userId) {
        final UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(!userEntity.isEdrContractSigned()){
            throw new RuntimeException("Musíte na začatku podepsat smlouvu");
        }
        log.info("Updating status to applicant, id {}", userId);
        RoleEntity lead = roleService.findByName("APPLICANT");
        Set<RoleEntity> roleSet = new HashSet<>();
        roleSet.add(lead);
        userEntity.setRoles(roleSet);
        UserEntity save = userRepository.save(userEntity);
        return userMapper.toResponse(save);
    }

    @Override
    @Transactional
    public void setHwDocumentGenerated(Long id) {
        log.info("Setting hw generated | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isHwsunMonitorGenerated()){
            user.setHwsunMonitorGenerated(false);
            user.setHwsunMonitorGeneratedDate(LocalDateTime.now());
        }else{
            user.setHwsunMonitorGenerated(true);
            user.setHwsunMonitorGeneratedDate(LocalDateTime.now());
        }
        log.info("Setting hw generated | User hw generated  : {}", user.isHwsunMonitorGenerated());
    }

    @Override
    @Transactional
    public void setHwDocumentSent(Long id) {
        log.info("Setting hw sent | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isHwsunMonitorSent()){
            user.setHwsunMonitorSent(false);
            user.setHwsunMonitorSentDate(LocalDateTime.now());
        }else{
            user.setHwsunMonitorSent(true);
            user.setHwsunMonitorSentDate(LocalDateTime.now());
        }
        log.info("Setting hw sent | User hw generated  : {}", user.isHwsunMonitorSent());
    }

    @Override
    @Transactional
    public void setHwDocumentSigned(Long id) {
        log.info("Setting hw signed | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isHwsunMonitorSigned()){
            user.setHwsunMonitorSigned(false);
            user.setHwsunMonitorSignedDate(LocalDateTime.now());
        }else{
            user.setHwsunMonitorSigned(true);
            user.setHwsunMonitorSignedDate(LocalDateTime.now());
        }
        log.info("Setting hw signed | User hw signed  : {}", user.isHwsunMonitorSigned());
    }

    @Override
    @Transactional
    public void setSyselDocumentGenerated(Long id) {
        log.info("Setting sysel generated | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isSyselAgreementGenerated()){
            user.setSyselAgreementGenerated(false);
            user.setSyselAgreementGeneratedDate(LocalDateTime.now());
        }else{
            user.setSyselAgreementGenerated(true);
            user.setSyselAgreementGeneratedDate(LocalDateTime.now());
        }
        log.info("Setting sysel generated | User sysel generated  : {}", user.isSyselAgreementGenerated());
    }

    @Override
    @Transactional
    public void setSyselDocumentSent(Long id) {
        log.info("Setting sysel sent | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isSyselAgreementSent()){
            user.setSyselAgreementSent(false);
            user.setSyselAgreementSentDate(LocalDateTime.now());
        }else{
            user.setSyselAgreementSent(true);
            user.setSyselAgreementSentDate(LocalDateTime.now());
        }
        log.info("Setting sysel sent | User sysel sent  : {}", user.isSyselAgreementSent());
    }

    @Override
    @Transactional
    public void setSyselDocumentSigned(Long id) {
        log.info("Setting sysel signed | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isSyselAgreementSigned()){
            user.setSyselAgreementSigned(false);
            user.setSyselAgreementSignedDate(LocalDateTime.now());
        }else{
            user.setSyselAgreementSigned(true);
            user.setSyselAgreementSignedDate(LocalDateTime.now());
        }
        log.info("Setting sysel signed | User sysel signed  : {}", user.isSyselAgreementSigned());
    }

    @Override
    @Transactional
    public void setFveDocumentGenerated(Long id) {
        log.info("Setting fve generated | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isConnectedFveGenerated()){
            user.setConnectedFveGenerated(false);
            user.setConnectedFveGeneratedDate(LocalDateTime.now());
        }else{
            user.setConnectedFveGenerated(true);
            user.setConnectedFveGeneratedDate(LocalDateTime.now());
        }
        log.info("Setting fve generated | User fve generated : {}", user.isConnectedFveGenerated());
    }

    @Override
    @Transactional
    public void setFveDocumentSent(Long id) {
        log.info("Setting fve sent | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isConnectedFveSent()){
            user.setConnectedFveSent(false);
            user.setConnectedFveSentDate(LocalDateTime.now());
        }else{
            user.setConnectedFveSent(false);
            user.setConnectedFveSentDate(LocalDateTime.now());
        }
        log.info("Setting fve sent | User fve sent : {}", user.isConnectedFveSent());
    }

    @Override
    @Transactional
    public void setFveDocumentSigned(Long id) {
        log.info("Setting fve signed | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isConnectedFveSigned()){
            user.setConnectedFveSigned(false);
            user.setConnectedFveSignedDate(LocalDateTime.now());
        }else{
            user.setConnectedFveSigned(true);
            user.setConnectedFveSignedDate(LocalDateTime.now());
        }
        log.info("Setting fve signed | User fve signed : {}", user.isConnectedFveSigned());
    }

    @Override
    @Transactional
    public void setFactureDocumentGenerated(Long id) {
        log.info("Setting facture generated | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isFactureGenerated()){
            user.setFactureGenerated(false);
            user.setFactureGeneratedDate(LocalDateTime.now());
        }else{
            user.setFactureGenerated(true);
            user.setFactureGeneratedDate(LocalDateTime.now());
        }
        log.info("Setting facture generated | User facture generated : {}", user.isFactureGenerated());
    }

    @Override
    @Transactional
    public void setFactureDocumentSent(Long id) {
        log.info("Setting facture sent | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isFactureSent()){
            user.setFactureSent(false);
            user.setFactureSentDate(LocalDateTime.now());
        }else{
            user.setFactureSent(true);
            user.setFactureSentDate(LocalDateTime.now());
        }
        log.info("Setting facture sent | User facture sent : {}", user.isFactureGenerated());
    }

    @Override
    @Transactional
    public void setEdrRequestDocumentGenerated(Long id) {
        log.info("Setting edr request generated | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isRequestToEdrGenerated()){
            user.setRequestToEdrGenerated(false);
            user.setRequestToEdrGeneratedDate(LocalDateTime.now());
        }else{
            user.setRequestToEdrGenerated(true);
            user.setRequestToEdrGeneratedDate(LocalDateTime.now());
        }
        log.info("Setting edr request generated | User edr request generated : {}", user.isRequestToEdrGenerated());
    }

    @Override
    public String getDocumentState(Long id, String document) {
        log.info("Fetching document state | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(document.equals("edrContract")){
            return user.getEdrContractStatus().name();
        }
        return "";
    }

    @Transactional
    public void changeEdrContractState(UserEntity user, String status){
        if(status.equals("GENERATED")){
            user.setEdrContractStatus(DocumentStatus.GENERATED);
        }else if (status.equals("SENT")){
            user.setEdrContractStatus(DocumentStatus.SENT);
        }else if (status.equals("SIGNED")){
            user.setEdrContractStatus(DocumentStatus.SIGNED);
        }else if (status.equals("NONE")){
            user.setEdrContractStatus(DocumentStatus.NONE);
        }
    }

    @Override
    @Transactional
    public void setDocumentState(Long id, String document, String status) {
        log.info("Changing document state | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(document.equals("edrContract")){
            changeEdrContractState(user, status);
        } else if (document.equals("hwSunMonitor")){
            changeHwSunMonitorState(user, status);
        } else if (document.equals("syselAgreement")){
            changeSyselAgreementState(user, status);
        } else if (document.equals("connectedFve")){
            changeConnectedFveState(user, status);
        } else if (document.equals("requestToEdr")){
            changeReqestToEdrState(user, status);
        } else if (document.equals("facture")){
            changeFactureState(user, status);
        }
    }
    @Transactional
    public void changeSyselAgreementState(UserEntity user, String status) {
        if(status.equals("GENERATED")){
            user.setSyselAgreementStatus(DocumentStatus.GENERATED);
        }else if (status.equals("SENT")){
            user.setSyselAgreementStatus(DocumentStatus.SENT);
        }else if (status.equals("SIGNED")){
            user.setSyselAgreementSigned(true);
            user.setSyselAgreementSignedDate(LocalDateTime.now());
            user.setSyselAgreementStatus(DocumentStatus.SIGNED);
        }else if (status.equals("NONE")){
            user.setSyselAgreementStatus(DocumentStatus.NONE);
        }
    }
    @Transactional
    public void changeReqestToEdrState(UserEntity user, String status) {
        if(status.equals("GENERATED")){
            user.setRequestToEdrGenerated(true);
            user.setRequestToEdrSigned(false);
            user.setRequestToEdrGeneratedDate(LocalDateTime.now());
            user.setRequestToEdrStatus(DocumentStatus.GENERATED);
        }else if (status.equals("SENT")){
            user.setRequestToEdrSigned(false);
            user.setRequestToEdrSent(true);
            user.setRequestToEdrSentDate(LocalDateTime.now());
            user.setRequestToEdrStatus(DocumentStatus.SENT);
        }else if (status.equals("SIGNED")){
            user.setRequestToEdrSigned(true);
            user.setRequestToEdrSignedDate(LocalDateTime.now());
            user.setRequestToEdrStatus(DocumentStatus.SIGNED);
        }else if (status.equals("NONE")){
            user.setRequestToEdrStatus(DocumentStatus.NONE);
        }else if (status.equals("ACCEPTED")){
            log.info("Changing edr request state to accepted!");
                if(user.isHwsunMonitorSigned() && user.isFacturePaid() && user.isSyselAgreementSigned() && user.isConnectedFveSigned()){
                user.setRequestToEdrStatus(DocumentStatus.ACCEPTED);
                user.setRequestToEdrAcceptedDate(LocalDateTime.now());
            }else{
                throw new RuntimeException("Nesplneny všechny podminky!");
            }
        }
    }
    @Transactional
    public void changeHwSunMonitorState(UserEntity user, String status) {
        if(status.equals("GENERATED")){
            user.setHwsunMonitorStatus(DocumentStatus.GENERATED);
        }else if (status.equals("SENT")){
            user.setHwsunMonitorStatus(DocumentStatus.SENT);
        }else if (status.equals("SIGNED")){
            user.setHwsunMonitorSigned(true);
            user.setHwsunMonitorSignedDate(LocalDateTime.now());
            user.setHwsunMonitorStatus(DocumentStatus.SIGNED);
        }else if (status.equals("NONE")){
            user.setHwsunMonitorStatus(DocumentStatus.NONE);
        }
    }
    @Transactional
    public void changeConnectedFveState(UserEntity user, String status) {
        if(status.equals("GENERATED")){
            user.setConnectedFveStatus(DocumentStatus.GENERATED);
        }else if (status.equals("SENT")){
            user.setConnectedFveStatus(DocumentStatus.SENT);
        }else if (status.equals("SIGNED")){
            user.setConnectedFveSigned(true);
            user.setConnectedFveSignedDate(LocalDateTime.now());
            user.setConnectedFveStatus(DocumentStatus.SIGNED);
        }else if (status.equals("NONE")){
            user.setConnectedFveStatus(DocumentStatus.NONE);
        }
    }
    @Transactional
    public void changeFactureState(UserEntity user, String status) {
        if(status.equals("GENERATED")){
            user.setFactureStatus(DocumentStatus.GENERATED);
        }else if (status.equals("SENT")){
            user.setFactureStatus(DocumentStatus.SENT);
        }else if (status.equals("PAID")){
            user.setFacturePaid(true);
            user.setFacturePaidDate(LocalDateTime.now());
            user.setFactureStatus(DocumentStatus.PAID);
        }else if (status.equals("NONE")){
            user.setFactureStatus(DocumentStatus.NONE);
        }
    }

    @Override
    @Transactional
    public void setEdrRequestDocumentSent(Long id) {
        log.info("Setting edr request sent | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isRequestToEdrSent()){
            user.setRequestToEdrSent(false);
            user.setRequestToEdrSentDate(LocalDateTime.now());
        }else{
            user.setRequestToEdrSent(true);
            user.setRequestToEdrSentDate(LocalDateTime.now());
        }
        log.info("Setting edr request sent | User edr request sent : {}", user.isRequestToEdrSent());
    }

    @Override
    @Transactional
    public void setEdrRequestDocumentSigned(Long id) {
        log.info("Setting edr request signed | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isRequestToEdrSigned()){
            user.setRequestToEdrSigned(false);
            user.setRequestToEdrSignedDate(LocalDateTime.now());
        }else{
            user.setRequestToEdrSigned(true);
            user.setRequestToEdrSignedDate(LocalDateTime.now());
        }
        log.info("Setting edr request signed | User edr request signed : {}", user.isRequestToEdrSigned());
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

    /**
     * Generate referal link which is reffered to edr user
     * Create referal link entity with link, edr user
     * Return generated referal link
     * @param edrId Edr user id
     * @return Generated Referal link
     */
    @Override
    public String createReferalLink(Long edrId) {

        // generate unique referal link
        String generateReferalLink = generateUniqueString(10);

        // find edr user by id
        final UserEntity edrEntity = userRepository.findById(edrId)
                .orElseThrow(() -> new EntityNotFoundException("Edr user not found"));

        // check if referal link exists, if it is then call the function again
        if(referalLinkRepository.existsByReferalLink(generateReferalLink)){
            createReferalLink(edrId);
        }

        // create new referal link entity, with edr user, new referal link
        ReferalLinkEntity referalLinkEntity = new ReferalLinkEntity()
                .setEdr(edrEntity)
                .setReferalLink(generateReferalLink);

        // save referal link entity
        ReferalLinkEntity save = referalLinkRepository.save(referalLinkEntity);

        return generateReferalLink;
    }

    /**
     * Potential edr user sends the request with registration link, username, password.
     * Checking if reg link exists or not, if yes then set new username and password
     * @param edrRequestDto
     * @return
     */
    @Override
    public EdrResponseDto registrateEdr(EdrRequestDto edrRequestDto) {
        // Edr registration unique link
        final String edrLink = edrRequestDto.getEdrLink();
        // Get entity by edr link
        final EdrLinkEntity edrLinkEntity = edrLinkRepository.findByRegistrationLink(edrLink);
        // get current id from edr link entity, then fetch user by current id
        final UserEntity user = userRepository.findById(edrLinkEntity.getCurrent().getId())
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        // check if username already exists
        if(user.getUsername() != null){
            throw new RuntimeException("Edr already exists");
        }
        // check if such username exists
        if (userRepository.existsByUsername(edrRequestDto.getUsername())) {
            throw new RuntimeException("User with such username exists");
        }
        // set password and username
        user
                .setUsername(edrRequestDto.getUsername())
                .setPassword(passwordEncoder.encode(edrRequestDto.getPassword()));

        // set roles
        RoleEntity role = roleService.findByName("EDR");
        Set<RoleEntity> roleSet = new HashSet<>();
        roleSet.add(role);
        user.setRoles(roleSet);
        // save user with password and entity
        UserEntity save = userRepository.save(user);

        return edrMapper.toResponse(save);
    }

    /**
     * Generate registration link, create Edr Registration entity, send to the current user by his email
     * @param currentId Id of user with current role
     * @return Generated unique link
     */
    @Override
    public String createRegistrationLink(Long currentId) {

        // generate unique edr registration link
        String generateUniqueString = generateUniqueString(10);

        // find current user by id
        final UserEntity currentEntity = userRepository.findById(currentId)
                .orElseThrow(() -> new EntityNotFoundException("User with such id doesnt exist"));

        // check if registration link exists, if it is then call the function again
        if(edrLinkRepository.existsByRegistrationLink(generateUniqueString)){
            createRegistrationLink(currentId);
        }

        // create new edr link entity, set found user and generated edr reg link
        EdrLinkEntity edrLinkEntity = new EdrLinkEntity()
                .setCurrent(currentEntity)
                .setRegistrationLink(generateUniqueString);

        // save edr reg link
        EdrLinkEntity save = edrLinkRepository.save(edrLinkEntity);

        // email send string TODO

        return generateUniqueString;
    }

    @Override
    public EdrResponseDto saveEdr(EdrRequestDto edrRequestDto) {
        UserEntity user = edrMapper.toEntity(edrRequestDto);

        if (userRepository.existsByUsername(edrRequestDto.getUsername())) {
            throw new RuntimeException("Edr with such username exists");
        }
        user.setPassword(passwordEncoder.encode(edrRequestDto.getPassword()));

        RoleEntity role = roleService.findByName("EDR");

        Set<RoleEntity> roleSet = new HashSet<>();
        roleSet.add(role);
        user.setRoles(roleSet);
        UserEntity save = userRepository.save(user);

        return edrMapper.toResponse(save);
    }

    private String generateUniqueString(int stringLength){

        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(stringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        return generatedString;
    }



}
