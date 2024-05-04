package com.thesishiudsa.entity;

import com.thesishiudsa.dto.ExamDetailDto;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "examdetail")
public class ExamDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "examId", nullable = false)
    private Exam exam;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "questionId", nullable = false)
    private Question question;
    public ExamDetailDto getExamDetailDto() {
        ExamDetailDto examDetailDto = new ExamDetailDto();
        examDetailDto.setId(id);
        examDetailDto.setExamId(exam.getId());
        examDetailDto.setQuestionId(question.getId());
        return examDetailDto;
    }
}
