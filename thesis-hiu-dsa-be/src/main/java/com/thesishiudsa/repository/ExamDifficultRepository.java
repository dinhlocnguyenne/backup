package com.thesishiudsa.repository;
import com.thesishiudsa.entity.ExamDifficult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ExamDifficultRepository extends JpaRepository<ExamDifficult, Long>{

}
