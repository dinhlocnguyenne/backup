package com.thesishiudsa.repository;
import com.thesishiudsa.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findAllByQuestionContaining(String question);

    List<Question> findAllByContentIndexId(Long contentIndexId);

    List<Question> findAllByBloomTaxonomy(String bloomTaxonomy);
}
