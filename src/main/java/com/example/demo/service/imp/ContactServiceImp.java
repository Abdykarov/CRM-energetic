package com.example.demo.service.imp;

import com.example.demo.domain.AreaEntity;
import com.example.demo.domain.RoleEntity;
import com.example.demo.domain.UserEntity;
import com.example.demo.dto.response.ContactResponseDto;
import com.example.demo.mapper.ContactMapper;
import com.example.demo.repository.AreaRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ContactService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.*;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContactServiceImp implements ContactService {

    private final RoleRepository roleRepository;
    private final ContactMapper contactMapper;
    private final UserRepository userRepository;
    private final AreaRepository areaRepository;

    @Override
    public InputStreamResource getContactsCsv() {
        final List<UserEntity> contacts = userRepository.findByRoles_NameOrRoles_NameOrRoles_NameOrderByIdAsc("NEW", "DEFERRED", "LOST");

        final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);

        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
             CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {
            List<String> columns = Arrays.asList("Jméno","Příjmení","Stav","Email","Telefon","PSČ","Kontaktní osoba", "Kraj","OZ");
            csvPrinter.printRecord(columns);
            for (UserEntity user : contacts) {
                List<String> data = Arrays.asList(
                        user.getName(),
                        user.getSurname(),
                        user.getRoles().stream().findFirst().get().getName(),
                        user.getEmail(),
                        user.getPhone(),
                        user.getIco(),
                        user.getContactPerson(),
                        user.getArea().getName(),
                        String.format("%s %s", user.getSalesman() != null ? user.getSalesman().getName() : "",
                                user.getSalesman() != null ? user.getSalesman().getSurname() : "")
                );

                csvPrinter.printRecord(data);
            }

            csvPrinter.flush();
            return new InputStreamResource(new ByteArrayInputStream(out.toByteArray()));
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to CSV file: " + e.getMessage());
        }
    }

    public  static File multipartToFile(MultipartFile multipart, String fileName) throws IllegalStateException, IOException {
        File convFile = new File(System.getProperty("java.io.tmpdir")+"/"+fileName);
        multipart.transferTo(convFile);
        return convFile;
    }


    @Override
    @Transactional
    public void importCsv(MultipartFile file, Long userId) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("Please select a file to upload");
        }

        try {
            File newFile = multipartToFile(file, file.getName());
            Reader reader = new FileReader(newFile);
            CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT);
            for (CSVRecord csvRecord : csvParser) {
                // Accessing Values by Column Index
                String name = csvRecord.get(0);
                String surname = csvRecord.get(1);
                String role = csvRecord.get(2);
                String email = csvRecord.get(3);
                String phone = csvRecord.get(4);
                String ico = csvRecord.get(5);
                String contactPerson = csvRecord.get(6);
                String area = csvRecord.get(7);
                String salesman = csvRecord.get(8);
                final UserEntity user = new UserEntity();
                user.setName(name);
                user.setSurname(surname);
                user.setPhone(phone);
                user.setEmail(email);
                final RoleEntity roleEntity = roleRepository.findByName(role);
                Set<RoleEntity> roleSet = new HashSet<>();
                roleSet.add(roleEntity);
                user.setRoles(roleSet);
                user.setIco(ico);
                String[] oz = salesman.split(" ");
                final UserEntity salesmanEntity = userRepository.findByRoles_NameAndNameAndSurname("SALESMAN", oz[0], oz[1]);
                user.setSalesman(salesmanEntity);
                user.setContactPerson(contactPerson);
                final AreaEntity areaEntity = areaRepository.findByName(area);
                user.setArea(areaEntity);
                userRepository.save(user);
                log.info("Reading csv record {}", csvRecord);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> queryFilter(String orderType, String contactState, String filterType,
                                                String name, String surname, int page, int size) {
            List<UserEntity> users = new ArrayList<UserEntity>();
            Pageable paging = PageRequest.of(page, size);
            log.info("Filtering contacts");
            Page<UserEntity> pageUsers;
            if (contactState.equals("ALL") && filterType.equals("byId") && name == null && surname == null) {
                pageUsers = userRepository.findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameOrderByIdAsc("NEW","LOST","EDR_CANCELLED", "DEFERRED", paging);
            }else if(name != null && surname == null){
                pageUsers = userRepository.findByNameAndRoles_NameOrNameAndRoles_NameOrNameAndRoles_NameOrNameAndRoles_NameOrderByNameAsc(name, "NEW", name,"LOST", name,"EDR_CANCELLED", name,"DEFERRED", paging);
            }else if(surname != null && name == null){
                pageUsers = userRepository.findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameAndNameOrderBySurnameAsc("NEW","LOST","EDR_CANCELLED", "DEFERRED", surname, paging);
            }else if(surname != null && name != null){
                pageUsers = userRepository.findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameAndNameAndSurnameOrderBySurnameAsc("NEW","LOST","EDR _CANCELLED", "DEFERRED", name, surname, paging);
            }
            else if(contactState.equals("ALL") && filterType.equals("byName")){
                pageUsers = userRepository.findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameOrderByNameAsc("NEW","LOST","EDR_CANCELLED", "DEFERRED", paging);
            }
            else if(contactState.equals("ALL") && filterType.equals("bySurname")){
                pageUsers = userRepository.findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameOrderBySurnameAsc("NEW","LOST","EDR_CANCELLED", "DEFERRED", paging);
            }
            else if(contactState.equals("ALL") && filterType.equals("byMale")){
                pageUsers = userRepository.findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameOrderByMaleAsc("NEW","LOST","EDR_CANCELLED", "DEFERRED", paging);
            }
            else if(contactState.equals("ALL") && filterType.equals("byEmail")){
                pageUsers = userRepository.findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameOrderByEmailAsc("NEW","LOST","EDR_CANCELLED", "DEFERRED", paging);
            }
            else if(contactState.equals("ALL") && filterType.equals("byArea")){
                pageUsers = userRepository.findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameOrderByArea_NameAsc("NEW","LOST","EDR_CANCELLED", "DEFERRED", paging);
            }
            else if(contactState.equals("ALL") && filterType.equals("bySalesman")){
                pageUsers = userRepository.findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameOrderBySalesman_NameAscSalesman_SurnameAsc("NEW","LOST","EDR_CANCELLED", "DEFERRED", paging);
            }
            else if(contactState.equals("ALL") && filterType.equals("byConcurrentFve")){
                pageUsers = userRepository.findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameOrderByConcurrentFveInstalledAsc("NEW","LOST","EDR_CANCELLED", "DEFERRED", paging);
            }
            else {
                if(filterType.equals("byName")) {
                    pageUsers = userRepository.findByRoles_NameOrderByNameAsc(contactState, paging);
                }
                else if(filterType.equals("bySurname")) {
                    pageUsers = userRepository.findByRoles_NameOrderBySurnameAsc(contactState, paging);
                }
                else if(filterType.equals("byMale")) {
                    pageUsers = userRepository.findByRoles_NameOrderByMaleAsc(contactState, paging);
                }
                else if(filterType.equals("byEmail")) {
                    pageUsers = userRepository.findByRoles_NameOrderByEmailAsc(contactState, paging);
                }
                else if(filterType.equals("byArea")) {
                    pageUsers = userRepository.findByRoles_NameOrderByAreaNameAsc(contactState, paging);
                }
                else if(filterType.equals("bySalesman")) {
                    pageUsers = userRepository.findByRoles_NameOrderBySalesman_NameAscSalesman_SurnameAsc(contactState, paging);
                }
                else if(filterType.equals("byConcurrentFve")) {
                    pageUsers = userRepository.findByRoles_NameOrderByConcurrentFveInstalledAsc(contactState, paging);
                }
                else{
                    pageUsers = userRepository.findByRoles_Name(contactState, paging);
                }

            }

            users = pageUsers.getContent();
        final List<ContactResponseDto> contactResponseDtos = contactMapper.toListResponse(users);

        Map<String, Object> response = new HashMap<>();
            response.put("users", contactResponseDtos);
            response.put("currentPage", pageUsers.getNumber());
            response.put("totalItems", pageUsers.getTotalElements());
            response.put("totalPages", pageUsers.getTotalPages());

            return response;
    }
}
