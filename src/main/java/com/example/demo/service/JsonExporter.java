package com.example.demo.service;

import com.example.demo.domain.UserEntity;

import java.util.List;

public interface JsonExporter {

    String export(List<UserEntity> users);

}
