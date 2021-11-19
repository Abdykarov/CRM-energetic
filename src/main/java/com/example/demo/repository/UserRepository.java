package com.example.demo.repository;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.response.UserResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByEmail(String email);

    UserEntity findByUsername(String username);

    UserEntity findByIdAndRoles_Name(Long id, String rolesName);

    List<UserEntity> findByRoles_Name(String name);
    
    Page<UserEntity> findByRoles_Name(String name, Pageable paging);

    List<UserEntity> findByRoles_NameOrRoles_NameOrRoles_NameOrderByIdAsc(String name1, String name2, String name3);

    Page<UserEntity> findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameOrderByIdAsc(String aNew, String lost, String edr_cancelled, String deferred, Pageable paging);

    List<UserEntity> findByRoles_NameOrderByRoleChangedDateAsc(String name);

    boolean existsByUsername(String username);

    List<UserEntity> findBySalesmanId(Long salesmanId);

    List<UserEntity> findByRoles_NameOrderByRoleChangedDateDesc(String name);

    List<UserEntity> findTop10ByNameIgnoreCase(String name);

    List<UserEntity> findTop10ByNameIgnoreCaseAndSurnameIgnoreCase(String name, String surname);

    UserEntity findByRoles_NameAndNameAndSurname(String name, String s, String s1);

    Page<UserEntity> findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameOrderByNameAsc(String aNew, String lost, String edr_cancelled, String deferred, Pageable paging);

    Page<UserEntity> findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameOrderBySurnameAsc(String aNew, String lost, String edr_cancelled, String deferred, Pageable paging);

    Page<UserEntity> findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameOrderByMaleAsc(String aNew, String lost, String edr_cancelled, String deferred, Pageable paging);

    Page<UserEntity> findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameOrderByEmailAsc(String aNew, String lost, String edr_cancelled, String deferred, Pageable paging);

    Page<UserEntity> findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameOrderByArea_NameAsc(String aNew, String lost, String edr_cancelled, String deferred, Pageable paging);

    Page<UserEntity> findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameOrderBySalesman_NameAscSalesman_SurnameAsc(String aNew, String lost, String edr_cancelled, String deferred, Pageable paging);

    Page<UserEntity> findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameOrderByConcurrentFveInstalledAsc(String aNew, String lost, String edr_cancelled, String deferred, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByNameAsc(String contactState, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderBySurnameAsc(String contactState, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByMaleAsc(String contactState, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByEmailAsc(String contactState, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByAreaNameAsc(String contactState, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderBySalesman_NameAscSalesman_SurnameAsc(String contactState, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByConcurrentFveInstalledAsc(String contactState, Pageable paging);

    Page<UserEntity> findByNameAndRoles_NameOrNameAndRoles_NameOrNameAndRoles_NameOrNameAndRoles_NameOrderByNameAsc(
            String name1, String aNew, String name2, String lost, String name3, String edr_cancelled, String name4, String deferred, Pageable paging);

    Page<UserEntity> findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameAndNameOrderBySurnameAsc(String aNew, String lost, String edr_cancelled, String deferred, String surname, Pageable paging);

    Page<UserEntity> findByRoles_NameOrRoles_NameOrRoles_NameOrRoles_NameAndNameAndSurnameOrderBySurnameAsc(String aNew, String lost, String edr_cancelled, String deferred, String name, String surname, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByEdrContractGeneratedDesc(String lead, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByEdrContractSentDesc(String lead, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByEdrContractSignedDesc(String lead, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByHwsunMonitorGeneratedDesc(String applicant, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByHwsunMonitorSentDesc(String applicant, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByHwsunMonitorSignedDesc(String applicant, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderBySyselAgreementGeneratedDesc(String applicant, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderBySyselAgreementSentDesc(String applicant, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderBySyselAgreementSignedDesc(String applicant, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByConnectedFveGeneratedDesc(String applicant, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByConnectedFveSentDesc(String applicant, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByConnectedFveSignedDesc(String applicant, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByRequestToEdrGenerated(String applicant, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByRequestToEdrSent(String applicant, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByRequestToEdrSigned(String applicant, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByRequestToEdrAccepted(String applicant, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByFactureGeneratedDesc(String applicant, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByFactureSentDesc(String applicant, Pageable paging);

    Page<UserEntity> findByRoles_NameOrderByFacturePaidDesc(String applicant, Pageable paging);

}
