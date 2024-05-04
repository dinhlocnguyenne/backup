package com.thesishiudsa.entity;

import com.thesishiudsa.dto.ExamDetailDto;
import com.thesishiudsa.dto.ResultDto;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "result")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "examId", nullable = false)
    private Exam exam;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    private float scores;
    public ResultDto getResultDto() {
        ResultDto resultDto = new ResultDto();
        resultDto.setId(id);
        resultDto.setExamId(exam.getId());
        resultDto.setUserId(user.getId());
        resultDto.setScores(scores);
        return resultDto;
    }
}
