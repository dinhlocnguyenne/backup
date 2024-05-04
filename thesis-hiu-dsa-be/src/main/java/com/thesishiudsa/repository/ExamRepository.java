package com.thesishiudsa.repository;
import com.thesishiudsa.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findAllByNameContaining(String name);

   // List<Exam> FindAllByExamDifficultId(Long examDifficultId);
}
