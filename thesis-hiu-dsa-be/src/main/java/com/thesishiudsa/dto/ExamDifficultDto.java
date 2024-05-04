package com.thesishiudsa.dto;
import lombok.Data;
@Data
public class ExamDifficultDto {
    private Long id;
    private String name;
    private float ratioRemember;
    private float ratioUnderstand;

    private float ratioApply;

    private float ratioAnalyze;

}
