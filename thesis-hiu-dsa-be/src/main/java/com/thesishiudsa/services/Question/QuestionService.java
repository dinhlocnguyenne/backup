package com.thesishiudsa.services.Question;

import com.thesishiudsa.dto.ExamDto;
import com.thesishiudsa.dto.QuestionDto;

import java.io.IOException;
import java.util.List;

public interface QuestionService {
    List<QuestionDto> getAllQuestionByContentIndexId(Long contentIndexId);

    List<QuestionDto> getQuestionByName(String name);


    boolean deleteQuestion(Long id);

    QuestionDto addQuestion(QuestionDto questionDto) throws IOException;

    QuestionDto updateQuestion(Long questionId, QuestionDto questionDto) throws IOException;

    QuestionDto getQuestionById(Long id);
}
