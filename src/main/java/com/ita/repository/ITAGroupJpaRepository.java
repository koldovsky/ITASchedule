package com.ita.repository;


import com.ita.entity.ITAGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path="groups")
public interface ITAGroupJpaRepository extends JpaRepository<ITAGroup, Long>{

}
