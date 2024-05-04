package com.thesishiudsa.controller.admin;
import com.thesishiudsa.dto.ExamDto;
import com.thesishiudsa.repository.ExamRepository;
import com.thesishiudsa.services.admin.Exam.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminExamController {
    private final ExamService examService;
//    @PostMapping("/exam/add-question")
//    public ResponseEntity<ExamDto> addExam(@RequestBody ExamDto examDto) throws IOException {
//        ExamDto examDto1 = examService.addExam(examDto);
//        return ResponseEntity.status(HttpStatus.CREATED).body(examDto1);
//    }
    @GetMapping("/exam/search/{name}")
    public ResponseEntity<List<ExamDto>> getExamByName(@PathVariable String name) {
        List<ExamDto> questionDtos = examService.getExamByName(name);
        return ResponseEntity.ok(questionDtos);
    }
    @DeleteMapping("/exam/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        boolean deleted = examService.deleteExam(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    @PutMapping("/exam/update-question/{id}")
    public ResponseEntity<ExamDto> updateProduct(@PathVariable Long id, @ModelAttribute ExamDto examDto) throws IOException {
        ExamDto questionDto1 = examService.updateExam(id, examDto);
        return ResponseEntity.status(HttpStatus.OK).body(questionDto1);
    }
    @GetMapping("/exam/{id}")
    public ResponseEntity<ExamDto> getQuestionById(@PathVariable Long id) {
        ExamDto question = examService.getExamById(id);
        if (question != null) {
            return ResponseEntity.ok(question);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/exam/add-exam")
    public ResponseEntity<ExamDto> createExam(@RequestBody ExamDto examDto) throws IOException {
        examService.createExam(examDto);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

}
