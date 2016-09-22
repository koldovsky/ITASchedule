package com.ita.repository;


import com.ita.entity.Ita_group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path="groups")
public interface Ita_groupJpaRepository extends JpaRepository<Ita_group, Long>{

}
