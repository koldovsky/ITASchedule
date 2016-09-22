package com.ita.repository;

import com.ita.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path = "teachers")
public interface TeacherJpaRepository extends JpaRepository<Teacher, Long> {

}
