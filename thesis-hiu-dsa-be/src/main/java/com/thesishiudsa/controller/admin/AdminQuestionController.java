package com.thesishiudsa.controller.admin;
import com.thesishiudsa.dto.QuestionDto;
import com.thesishiudsa.services.ContentIndex.ContentIndexService;
import com.thesishiudsa.services.Question.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminQuestionController {
    private final QuestionService questionService;
//    private final ContentIndexService contentIndexService;
    @PostMapping("/question/add-question")
    public ResponseEntity<QuestionDto> addQuestion(@ModelAttribute QuestionDto questionDto) throws IOException {
        questionDto.setImg(null);
        QuestionDto
            questionDto1    = questionService.addQuestion(questionDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(questionDto1);
    }
    @GetMapping("/question/search/{name}")
    public ResponseEntity<List<QuestionDto>> getQuestionByName(@PathVariable String name) {
        List<QuestionDto> questionDtos = questionService.getQuestionByName(name);
        return ResponseEntity.ok(questionDtos);
    }
    @DeleteMapping("/question/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        boolean deleted = questionService.deleteQuestion(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    @PutMapping("/question/update-question/{id}")
    public ResponseEntity<QuestionDto> updateProduct(@PathVariable Long id, @ModelAttribute QuestionDto questionDto) throws IOException {
        QuestionDto questionDto1 = questionService.updateQuestion(id, questionDto);
        return ResponseEntity.status(HttpStatus.OK).body(questionDto1);
    }
    @GetMapping("/question/contentIndex/{contentIndexId}")
    public ResponseEntity<List<QuestionDto>> getAllQuestionByContentIndexId(@PathVariable Long contentIndexId) {
        List<QuestionDto> questionDtos = questionService.getAllQuestionByContentIndexId(contentIndexId);
        return ResponseEntity.ok(questionDtos);
    }
    @GetMapping("/question/{id}")
    public ResponseEntity<QuestionDto> getQuestionById(@PathVariable Long id) {
        QuestionDto question = questionService.getQuestionById(id);
        if (question != null) {
            return ResponseEntity.ok(question);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
