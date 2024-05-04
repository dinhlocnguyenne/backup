package com.thesishiudsa.repository;
import com.thesishiudsa.entity.ExamDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ExamDetailRepository extends JpaRepository<ExamDetail, Long> {
}
