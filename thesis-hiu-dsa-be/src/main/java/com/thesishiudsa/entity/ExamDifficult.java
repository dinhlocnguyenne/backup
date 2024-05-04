package com.thesishiudsa.entity;

import com.thesishiudsa.dto.ExamDifficultDto;
import com.thesishiudsa.dto.ExamDto;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "examdifficult")
public class ExamDifficult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private float ratioRemember;
    private float ratioUnderstand;
    private float ratioApply;
    private float ratioAnalyze;

    public ExamDifficultDto getExamDifficultDto() {
        ExamDifficultDto examDifficultDto = new ExamDifficultDto();
        examDifficultDto.setId(id);
        examDifficultDto.setName(name);
        examDifficultDto.setRatioRemember(ratioRemember);
        examDifficultDto.setRatioUnderstand(ratioUnderstand);
        examDifficultDto.setRatioApply(ratioApply);
        examDifficultDto.setRatioAnalyze(ratioAnalyze);
        return examDifficultDto;
    }
}
