package com.thesishiudsa.dto;
import lombok.Data;
import java.util.Date;
@Data
public class ExamDto {
    private Long id;
    private String name;
    private Long examDifficultId;
    private Date date;
    private Date time;
    private Long soluong;
}
