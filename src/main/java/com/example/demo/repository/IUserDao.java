package com.example.demo.repository;

import com.example.demo.domain.SearchCriteria;
import com.example.demo.domain.UserEntity;

import java.util.List;

public interface IUserDao {
    List<UserEntity> searchUser(List<SearchCriteria> params);

    void save(UserEntity entity);
}
