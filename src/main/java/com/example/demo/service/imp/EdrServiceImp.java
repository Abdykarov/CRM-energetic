package com.example.demo.service.imp;

import com.example.demo.domain.EdrLinkEntity;
import com.example.demo.domain.ReferalLinkEntity;
import com.example.demo.domain.RoleEntity;
import com.example.demo.domain.UserEntity;
import com.example.demo.dto.request.EdrRequestDto;
import com.example.demo.dto.response.EdrResponseDto;
import com.example.demo.exception.UserStateControlException;
import com.example.demo.mapper.EdrMapper;
import com.example.demo.repository.EdrLinkRepository;
import com.example.demo.repository.ReferalLinkRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.EdrService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.persistence.EntityNotFoundException;
import java.util.HashSet;
import java.util.Properties;
import java.util.Random;
import java.util.Set;

@Service
@Slf4j
@AllArgsConstructor
public class EdrServiceImp implements UserDetailsService,EdrService {

    private final UserRepository userRepository;
    private final RoleServiceImp roleService;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EdrMapper edrMapper;
    private final EdrLinkRepository edrLinkRepository;
    private final ReferalLinkRepository referalLinkRepository;

    /**
     * Generate referal link which is reffered to edr user
     * Create referal link entity with link, edr user
     * Return generated referal link
     * @param Edr user id
     * @return Generated Referal link
     */
    @Override
    public String createReferalLink(String email, Long id) {

        // generate unique referal link
        String generateReferalLink = generateUniqueString(20);

        // find edr user by id
        final UserEntity edrEntity = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Edr user not found"));

        // check if referal link exists, if it is then call the function again
        if(referalLinkRepository.existsByReferalLink(generateReferalLink)){
            createReferalLink(email,id);
        }

        // create new referal link entity, with edr user, new referal link
        ReferalLinkEntity referalLinkEntity = new ReferalLinkEntity()
                .setEdr(edrEntity)
                .setReferalLink(generateReferalLink);

        // save referal link entity
        ReferalLinkEntity save = referalLinkRepository.save(referalLinkEntity);

        // email send string TODO
        log.info("Generated ref link : {}", generateReferalLink);

        final String username = "crm@energetickedruzstvo.cz";  // like yourname@outlook.com
        final String password = "Foy37364";   // password here

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp-mail.outlook.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    @Override
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });
        session.setDebug(true);

        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(email));   // like inzi769@gmail.com
            message.setSubject("Registrace do systému, registrační formulář");
            message.setText("Dobrý den, posíláme Vám váš registrační odkaz do registračního formulářu " + "http://localhost:3000/registration/referal/" + generateReferalLink + " .Vás doporučil/a pan̈́/paní " +
                    edrEntity.getName() + " " + edrEntity.getSurname());

            Transport.send(message);

            log.info("Registrační odkaz byl odeslan");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
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
        if(!edrLinkRepository.existsByRegistrationLink(edrLink)){
            throw new UserStateControlException("Registrační odkáz je neplatný", HttpStatus.CONFLICT);
        }
        // Get entity by edr link
        final EdrLinkEntity edrLinkEntity = edrLinkRepository.findByRegistrationLink(edrLink);
        // get current id from edr link entity, then fetch user by current id
        final UserEntity user = userRepository.findById(edrLinkEntity.getCurrent().getId())
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        // check if username already exists
        if(user.getUsername() != null){
            throw new UserStateControlException("Edr already exists", HttpStatus.CONFLICT);
        }
        // check if such username exists
        if (userRepository.existsByUsername(edrRequestDto.getUsername())) {
            throw new UserStateControlException("User with such username exists", HttpStatus.CONFLICT);
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
        String generateUniqueString = generateUniqueString(20);

        // find current user by id
        final UserEntity currentEntity = userRepository.findById(currentId)
                .orElseThrow(() -> new EntityNotFoundException("User with such id doesnt exist"));
        if(!currentEntity.isRequestToEdrAccepted()){
            throw new UserStateControlException("Musíte schválit kontakt předtím", HttpStatus.CONFLICT);
        }
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
        log.info("Generated ref link : {}", generateUniqueString);

        final String username = "crm@energetickedruzstvo.cz";  // like yourname@outlook.com
        final String password = "Foy37364";   // password here

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp-mail.outlook.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    @Override
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });
        session.setDebug(true);

        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(currentEntity.getEmail()));   // like inzi769@gmail.com
            message.setSubject("Registrace do systému, registrační odkaz");
            message.setText("Dobrý den, posíláme Vám váš registrační odkaz do systému " + "http://localhost:3000/edr/registrate/" + generateUniqueString);

            Transport.send(message);

            log.info("Registrační odkaz byl odeslan");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
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

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return null;
    }
}
