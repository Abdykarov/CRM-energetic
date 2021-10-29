package com.example.demo.repository;

import com.example.demo.domain.SearchCriteria;
import com.example.demo.domain.UserEntity;
import com.example.demo.util.UserSearchQueryCriteriaConsumer;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

@Repository
public class UserDao implements IUserDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<UserEntity> searchUser(List<SearchCriteria> params) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<UserEntity> query = builder.createQuery(UserEntity.class);
        Root r = query.from(UserEntity.class);

        Predicate predicate = builder.conjunction();

        UserSearchQueryCriteriaConsumer searchConsumer =
                new UserSearchQueryCriteriaConsumer(predicate, builder, r);
        params.stream().forEach(searchConsumer);
        predicate = searchConsumer.getPredicate();
        query.where(predicate);

        List<UserEntity> result = entityManager.createQuery(query).getResultList();
        return result;
    }

    @Override
    public void save(UserEntity entity) {
        entityManager.persist(entity);
    }
}
