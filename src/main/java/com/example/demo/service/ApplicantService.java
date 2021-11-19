package com.example.demo.service;

import org.springframework.core.io.InputStreamResource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface ApplicantService {

    void importCsv(MultipartFile file, Long userId) throws IOException;

    Map<String, Object> queryFilter(String filterType, String name, String surname, int page, int size);

    Map<String, Object> findAll(int page, int size);

    InputStreamResource getLeadCsv();

}
