package com.ita.repository;


import com.ita.entity.ITAGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RepositoryRestResource(path = "groups")
public interface ITAGroupRepository extends JpaRepository<ITAGroup, Long> {

    /*@Query
    public List<ITAGroup> findPage();*/
}
