package com.thesishiudsa.entity;

import com.thesishiudsa.dto.QuestionDto;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@Table(name = "question")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    private byte[] img;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "contentIndexId", nullable = false)
    private ContentIndex contentIndex;
    public QuestionDto getQuestionDto() {
        QuestionDto questionDto = new QuestionDto();
        questionDto.setId(id);
        questionDto.setQuestion(question);
        questionDto.setAnswerA(answerA);
        questionDto.setAnswerB(answerB);
        questionDto.setAnswerC(answerC);
        questionDto.setAnswerD(answerD);
        questionDto.setCorrectAnswer(correctAnswer);
        questionDto.setDF(DF);
        questionDto.setDI(DI);
        questionDto.setBloomTaxonomy(bloomTaxonomy);
        questionDto.setContentIndexId(contentIndex.getId());
        questionDto.setByteImg(img);
        return questionDto;
    }
}
