package com.example.demo.service.imp;

import com.example.demo.domain.EdrLinkEntity;
import com.example.demo.domain.ReferalLinkEntity;
import com.example.demo.domain.RoleEntity;
import com.example.demo.domain.UserEntity;
import com.example.demo.dto.request.EdrRequestDto;
import com.example.demo.dto.response.EdrResponseDto;
import com.example.demo.mapper.EdrMapper;
import com.example.demo.repository.EdrLinkRepository;
import com.example.demo.repository.ReferalLinkRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.EdrService;
import com.example.demo.service.RoleService;
import com.example.demo.service.imp.user.RoleServiceImp;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

@Service
@Slf4j
@AllArgsConstructor
public class EdrServiceImp implements EdrService {

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
    public EdrRequestDto saveEdr(EdrRequestDto edrRequestDto) {
        return null;
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
