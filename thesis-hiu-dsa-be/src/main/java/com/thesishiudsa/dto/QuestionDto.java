package com.thesishiudsa.dto;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
@Data
public class QuestionDto {
    private Long id;
    private String question;
    private String answerA;
    private String answerB;
    private String answerC;
    private String answerD;
    private String correctAnswer;
    private float DF; //độ khó
    private float DI; //độ co giãn
    private String bloomTaxonomy;
    private byte[] byteImg;
    private MultipartFile img;
    private Long contentIndexId;

}
