package com.thesishiudsa.services.admin.Exam;

import com.thesishiudsa.dto.ExamDto;


import java.io.IOException;
import java.util.List;

public interface ExamService {
    List<ExamDto> getAllExam();

        public void createExam(ExamDto examDto);

    List<ExamDto> getExamByName(String name);

    ExamDto getExamById(Long examId);

    boolean deleteExam(Long id);

    ExamDto addExam(ExamDto examDto) throws IOException;

    ExamDto updateExam(Long examId, ExamDto examDto) throws IOException;

}
