package com.example.demo.service.imp;

import com.example.demo.domain.AreaEntity;
import com.example.demo.domain.RoleEntity;
import com.example.demo.domain.UserEntity;
import com.example.demo.dto.response.ContactResponseDto;
import com.example.demo.dto.response.LeadResponseDto;
import com.example.demo.mapper.ContactMapper;
import com.example.demo.mapper.LeadMapper;
import com.example.demo.repository.AreaRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.LeadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.*;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class LeadServiceImp implements LeadService {

    private final RoleRepository roleRepository;
    private final LeadMapper leadMapper;
    private final UserRepository userRepository;
    private final AreaRepository areaRepository;

    @Override
    public InputStreamResource getLeadCsv() {
        final List<UserEntity> contacts = userRepository.findByRoles_Name("LEAD");

        final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);

        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
             CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {
            List<String> columns = Arrays.asList("Jméno","Příjmení","Stav","Email","Telefon","PSČ","Kontaktní osoba", "Kraj","OZ", "Supersmlouva stav");
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
                                user.getSalesman() != null ? user.getSalesman().getSurname() : ""),
                        String.format("%s",user.getEdrContractStatus() != null ? user.getEdrContractStatus().toString() : "Žadný")
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
    @Transactional(readOnly = true)
    public Map<String, Object> findAll(int page, int size) {
        List<UserEntity> users = new ArrayList<UserEntity>();
        Pageable paging = PageRequest.of(page, size);
        log.info("Find all");
        Page<UserEntity> pageUsers;

        pageUsers = userRepository.findByRoles_Name("LEAD", paging);

        users = pageUsers.getContent();
        final List<LeadResponseDto> leadResponseDtos = leadMapper.toListResponse(users);

        Map<String, Object> response = new HashMap<>();
        response.put("users", leadResponseDtos);
        response.put("currentPage", pageUsers.getNumber());
        response.put("totalItems", pageUsers.getTotalElements());
        response.put("totalPages", pageUsers.getTotalPages());

        return response;
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
    public Map<String, Object> queryFilter(String filterType,
                                           String name, String surname, int page, int size) {
        List<UserEntity> users = new ArrayList<UserEntity>();
        Pageable paging = PageRequest.of(page, size);
        log.info("Filtering contacts");
        Page<UserEntity> pageUsers;

        if(filterType.equals("byName")) {
            pageUsers = userRepository.findByRoles_NameOrderByNameAsc("LEAD", paging);
        }
        else if(filterType.equals("bySurname")) {
            pageUsers = userRepository.findByRoles_NameOrderBySurnameAsc("LEAD", paging);
        }
        else if(filterType.equals("byMale")) {
            pageUsers = userRepository.findByRoles_NameOrderByMaleAsc("LEAD", paging);
        }
        else if(filterType.equals("byEmail")) {
            pageUsers = userRepository.findByRoles_NameOrderByEmailAsc("LEAD", paging);
        }
        else if(filterType.equals("byArea")) {
            pageUsers = userRepository.findByRoles_NameOrderByAreaNameAsc("LEAD", paging);
        }
        else if(filterType.equals("bySalesman")) {
            pageUsers = userRepository.findByRoles_NameOrderBySalesman_NameAscSalesman_SurnameAsc("LEAD", paging);
        }
        else if(filterType.equals("byEdrContractGenerated")) {
            pageUsers = userRepository.findByRoles_NameOrderByEdrContractGeneratedDesc("LEAD", paging);
        }
        else if(filterType.equals("byEdrContractSent")) {
            pageUsers = userRepository.findByRoles_NameOrderByEdrContractSentDesc("LEAD", paging);
        }
        else if(filterType.equals("byEdrContractSigned")) {
            pageUsers = userRepository.findByRoles_NameOrderByEdrContractSignedDesc("LEAD", paging);
        }
        else{
            pageUsers = userRepository.findByRoles_Name("LEAD", paging);
        }

        users = pageUsers.getContent();
        final List<LeadResponseDto> leadResponseDtos = leadMapper.toListResponse(users);

        Map<String, Object> response = new HashMap<>();
        response.put("users", leadResponseDtos);
        response.put("currentPage", pageUsers.getNumber());
        response.put("totalItems", pageUsers.getTotalElements());
        response.put("totalPages", pageUsers.getTotalPages());

        return response;
    }
}
