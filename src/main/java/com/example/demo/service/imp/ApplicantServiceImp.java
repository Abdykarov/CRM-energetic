package com.example.demo.service.imp;

import com.example.demo.domain.AreaEntity;
import com.example.demo.domain.RoleEntity;
import com.example.demo.domain.UserEntity;
import com.example.demo.dto.response.ApplicantResponseDto;
import com.example.demo.dto.response.LeadResponseDto;
import com.example.demo.mapper.ApplicantMapper;
import com.example.demo.mapper.LeadMapper;
import com.example.demo.repository.AreaRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ApplicantService;
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
public class ApplicantServiceImp implements ApplicantService {

    private final RoleRepository roleRepository;
    private final ApplicantMapper applicantMapper;
    private final UserRepository userRepository;
    private final AreaRepository areaRepository;

    @Override
    public InputStreamResource getLeadCsv() {
        final List<UserEntity> contacts = userRepository.findByRoles_Name("APPLICANT");

        final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);

        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
             CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {
            List<String> columns = Arrays.asList("Jméno","Příjmení","Stav","Email","Telefon","PSČ","Kontaktní osoba", "Kraj","OZ", "HW sun monitor stav", "Smlouva sysel stav", "Zapojená FVE stav", "Přihláška stav", "Stav faktury");
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
                        String.format("%s",user.getHwsunMonitorStatus() != null ? user.getHwsunMonitorStatus().toString() : "Žadný"),
                        String.format("%s",user.getSyselAgreementStatus() != null ? user.getSyselAgreementStatus().toString() : "Žadný"),
                        String.format("%s",user.getConnectedFveStatus() != null ? user.getConnectedFveStatus().toString() : "Žadný"),
                        String.format("%s",user.getRequestToEdrStatus() != null ? user.getRequestToEdrStatus().toString() : "Žadný"),
                        String.format("%s",user.getFactureStatus() != null ? user.getFactureStatus().toString() : "Žadný")
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

        pageUsers = userRepository.findByRoles_Name("APPLICANT", paging);

        users = pageUsers.getContent();
        final List<ApplicantResponseDto> applicantResponseDtos = applicantMapper.toListResponse(users);

        Map<String, Object> response = new HashMap<>();
        response.put("users", applicantResponseDtos);
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
            pageUsers = userRepository.findByRoles_NameOrderByNameAsc("APPLICANT", paging);
        }
        else if(filterType.equals("bySurname")) {
            pageUsers = userRepository.findByRoles_NameOrderBySurnameAsc("APPLICANT", paging);
        }
        else if(filterType.equals("byMale")) {
            pageUsers = userRepository.findByRoles_NameOrderByMaleAsc("APPLICANT", paging);
        }
        else if(filterType.equals("byEmail")) {
            pageUsers = userRepository.findByRoles_NameOrderByEmailAsc("APPLICANT", paging);
        }
        else if(filterType.equals("byArea")) {
            pageUsers = userRepository.findByRoles_NameOrderByAreaNameAsc("APPLICANT", paging);
        }
        else if(filterType.equals("bySalesman")) {
            pageUsers = userRepository.findByRoles_NameOrderBySalesman_NameAscSalesman_SurnameAsc("APPLICANT", paging);
        }
        else if(filterType.equals("byHwsunMonitorGenerated")) {
            pageUsers = userRepository.findByRoles_NameOrderByHwsunMonitorGeneratedDesc("APPLICANT", paging);
        }
        else if(filterType.equals("byHwsunMonitorSent")) {
            pageUsers = userRepository.findByRoles_NameOrderByHwsunMonitorSentDesc("APPLICANT", paging);
        }
        else if(filterType.equals("byHwsunMonitorSigned")) {
            pageUsers = userRepository.findByRoles_NameOrderByHwsunMonitorSignedDesc("APPLICANT", paging);
        }
        else if(filterType.equals("bySyselAgreementGenerated")) {
            pageUsers = userRepository.findByRoles_NameOrderBySyselAgreementGeneratedDesc("APPLICANT", paging);
        }
        else if(filterType.equals("bySyselAgreementSent")) {
            pageUsers = userRepository.findByRoles_NameOrderBySyselAgreementSentDesc("APPLICANT", paging);
        }
        else if(filterType.equals("bySyselAgreementSigned")) {
            pageUsers = userRepository.findByRoles_NameOrderBySyselAgreementSignedDesc("APPLICANT", paging);
        }
        else if(filterType.equals("byConnectedFveGenerated")) {
            pageUsers = userRepository.findByRoles_NameOrderByConnectedFveGeneratedDesc("APPLICANT", paging);
        }
        else if(filterType.equals("byConnectedFveSent")) {
            pageUsers = userRepository.findByRoles_NameOrderByConnectedFveSentDesc("APPLICANT", paging);
        }
        else if(filterType.equals("byConnectedFveSigned")) {
            pageUsers = userRepository.findByRoles_NameOrderByConnectedFveSignedDesc("APPLICANT", paging);
        }
        else if(filterType.equals("byRequestToEdrGenerated")) {
            pageUsers = userRepository.findByRoles_NameOrderByRequestToEdrGenerated("APPLICANT", paging);
        }
        else if(filterType.equals("byRequestToEdrSent")) {
            pageUsers = userRepository.findByRoles_NameOrderByRequestToEdrSent("APPLICANT", paging);
        }
        else if(filterType.equals("byRequestToEdrSigned")) {
            pageUsers = userRepository.findByRoles_NameOrderByRequestToEdrSigned("APPLICANT", paging);
        }
        else if(filterType.equals("byRequestToEdrAccepted")) {
            pageUsers = userRepository.findByRoles_NameOrderByRequestToEdrAccepted("APPLICANT", paging);
        }
        else if(filterType.equals("byFactureGenerated")) {
            pageUsers = userRepository.findByRoles_NameOrderByFactureGeneratedDesc("APPLICANT", paging);
        }
        else if(filterType.equals("byFactureSent")) {
            pageUsers = userRepository.findByRoles_NameOrderByFactureSentDesc("APPLICANT", paging);
        }
        else if(filterType.equals("byFacturePaid")) {
            pageUsers = userRepository.findByRoles_NameOrderByFacturePaidDesc("APPLICANT", paging);
        }
        else{
            pageUsers = userRepository.findByRoles_Name("APPLICANT", paging);
        }

        users = pageUsers.getContent();
        final List<ApplicantResponseDto> applicantResponseDtos = applicantMapper.toListResponse(users);

        Map<String, Object> response = new HashMap<>();
        response.put("users", applicantResponseDtos);
        response.put("currentPage", pageUsers.getNumber());
        response.put("totalItems", pageUsers.getTotalElements());
        response.put("totalPages", pageUsers.getTotalPages());

        return response;
    }
}
