package com.example.demo.service.imp.user;

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
                .setUsername("salesman1")
                .setPassword("123")
                .setName("Tomas")
                .setSurname("Pavlivec")
                .setAreaId(1L);
        saveSalesman(salesmanRequestDto1);

        final SalesmanRequestDto salesmanRequestDto2 = new SalesmanRequestDto()
                .setUsername("salesman2")
                .setPassword("123")
                .setName("Tomas")
                .setSurname("Pavlivec")
                .setAreaId(2L);
        saveSalesman(salesmanRequestDto2);

        // contacts
        final ContactRequestDto contactRequestDto = new ContactRequestDto()
                .setName("Ilias")
                .setSurname("Abdykarov")
                .setEmail("ilias.abdykarov@gmail.com")
                .setPhone("+420792254131")
                .setSalesmanId(4L)
                .setAreaId(1L);
        saveContact(contactRequestDto);
    }

    @Override
    @Transactional
    public void setFveSigned(Long id) {
        log.info("Setting fve signed | User id : {}", id);
        final UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isConnectedFveSigned()){
            user.setConnectedFveSigned(false);
        }else{
            user.setConnectedFveSigned(true);
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
        userEntity.setArea(area);
        userEntity.setSalesman(salesmanEntity);
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
        UserEntity save = userRepository.save(userEntity);
        return userMapper.toResponse(save);
    }

    @Override
    public UserResponseDto changeToApplicant(Long userId) {
        final UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        RoleEntity lead = roleService.findByName("APPLICANT");
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
