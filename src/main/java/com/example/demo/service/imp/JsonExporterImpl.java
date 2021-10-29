package com.example.demo.service.imp;

import com.example.demo.domain.UserEntity;
import com.example.demo.service.JsonExporter;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JsonExporterImpl implements JsonExporter {
    @Override
    public String export(List<UserEntity> users) {
        Gson gson = new Gson();
        String userInJson = gson.toJson(users);
        return userInJson;
    }
}
