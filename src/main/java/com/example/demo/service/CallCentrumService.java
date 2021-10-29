package com.example.demo.service;

import com.example.demo.dto.request.CallCentrumRequestDto;
import com.example.demo.dto.response.CallCentrumResponseDto;

import java.util.List;

public interface CallCentrumService {

    List<CallCentrumResponseDto> findAll();

    CallCentrumResponseDto createCallCentrum(CallCentrumRequestDto callCentrumRequestDto);

}
