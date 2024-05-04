package com.thesishiudsa.entity;
import com.thesishiudsa.dto.ExamDetailDto;
import com.thesishiudsa.dto.ExamDto;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "exam")
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;


    private Date date;
    private Date time;
    private Long soluong;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "examDifficultId", nullable = false)
    private ExamDifficult examDifficult;
    public ExamDto getExamDto() {
        ExamDto examDto = new ExamDto();
        examDto.setId(id);
        examDto.setName(name);
        examDto.setDate(date);
        examDto.setTime(time);
        examDto.setSoluong(soluong);
        examDto.setExamDifficultId(examDifficult.getId());
        return examDto;
    }
}
