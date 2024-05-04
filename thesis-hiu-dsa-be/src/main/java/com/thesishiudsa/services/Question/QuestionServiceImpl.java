package com.thesishiudsa.services.Question;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.thesishiudsa.dto.ExamDto;
import com.thesishiudsa.dto.QuestionDto;
import com.thesishiudsa.entity.Content;
import com.thesishiudsa.entity.ContentIndex;
import com.thesishiudsa.entity.Exam;
import com.thesishiudsa.entity.Question;
import com.thesishiudsa.repository.ContentIndexRepository;
import com.thesishiudsa.repository.ContentRepository;
import com.thesishiudsa.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;




@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;
    private final ContentIndexRepository contentIndexRepository;
    @Override
    public List<QuestionDto> getAllQuestionByContentIndexId(Long contentIndexId) {
        List<Question> questionList = questionRepository.findAllByContentIndexId(contentIndexId);
        return  questionList.stream().map(Question::getQuestionDto).collect(Collectors.toList());
    }
    @Override
    public List<QuestionDto> getQuestionByName(String name) {
        List<Question> questions = questionRepository.findAllByQuestionContaining(name);
        return questions.stream().map(Question::getQuestionDto).collect(Collectors.toList());
    }

    @Override
    public QuestionDto getQuestionById(Long id) {
        Optional<Question> optionalQuestion = questionRepository.findById(id);
        if (optionalQuestion.isPresent()) {
            return optionalQuestion.get().getQuestionDto();
        }else {
            return null;
        }

    }
    @Override
    public boolean deleteQuestion(Long id) {
        Optional<Question> optionalQuestion = questionRepository.findById(id);
        if (optionalQuestion.isPresent()) {
            questionRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public QuestionDto addQuestion(QuestionDto questionDto) throws IOException {
        Question question = new Question();
        question.setQuestion(questionDto.getQuestion());
        question.setAnswerA(questionDto.getAnswerA());
        question.setAnswerB(questionDto.getAnswerB());
        question.setAnswerC(questionDto.getAnswerC());
        question.setAnswerD(questionDto.getAnswerD());
        question.setCorrectAnswer(questionDto.getCorrectAnswer());
        question.setDF(questionDto.getDF());
        question.setDI(questionDto.getDI());
        question.setBloomTaxonomy(questionDto.getBloomTaxonomy());
        if (questionDto.getImg() != null) {
            question.setImg(questionDto.getImg().getBytes());
        }
        ContentIndex contentIndex = contentIndexRepository.findById(questionDto.getContentIndexId()).orElseThrow();

        question.setContentIndex(contentIndex);
        return questionRepository.save(question).getQuestionDto();
    }
    @Override
    public QuestionDto updateQuestion(Long questionId, QuestionDto questionDto) throws IOException {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Optional<ContentIndex> optionalContentIndex = contentIndexRepository.findById(questionDto.getContentIndexId());
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            question.setQuestion(questionDto.getQuestion());
            question.setAnswerA(questionDto.getAnswerA());
            question.setAnswerB(questionDto.getAnswerB());
            question.setAnswerC(questionDto.getAnswerC());
            question.setAnswerD(questionDto.getAnswerD());
            question.setCorrectAnswer(questionDto.getCorrectAnswer());
            question.setDF(questionDto.getDF());
            question.setDI(questionDto.getDI());
            question.setBloomTaxonomy(questionDto.getBloomTaxonomy());
            if (questionDto.getImg() != null) {
                question.setImg(questionDto.getImg().getBytes());
            }
            question.setContentIndex(optionalContentIndex.get());
            return questionRepository.save(question).getQuestionDto();
        }else {
            return null;
        }

    }
}
