package com.thesishiudsa.services.admin.Exam;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.thesishiudsa.dto.ExamDto;
import com.thesishiudsa.entity.Exam;
import com.thesishiudsa.entity.ExamDetail;
import com.thesishiudsa.entity.ExamDifficult;
import com.thesishiudsa.entity.Question;
import com.thesishiudsa.repository.ExamDetailRepository;
import com.thesishiudsa.repository.ExamDifficultRepository;
import com.thesishiudsa.repository.ExamRepository;
import com.thesishiudsa.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;




@Service
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamService {
    private final ExamRepository examRepository;
    private final ExamDifficultRepository examDifficultRepository;
    private final ExamDetailRepository examDetailRepository;
    private final QuestionRepository questionRepository;
    @Override
    public List<ExamDto> getAllExam() {
        List<Exam> examList = examRepository.findAll();
        return  examList.stream().map(Exam::getExamDto).collect(Collectors.toList());
    }

    @Override
    public List<ExamDto> getExamByName(String name) {
        List<Exam> exams = examRepository.findAllByNameContaining(name);
        return exams.stream().map(Exam::getExamDto).collect(Collectors.toList());
    }

    @Override
    public ExamDto getExamById(Long examId) {
        Optional<Exam> optionalExam = examRepository.findById(examId);
        if (optionalExam.isPresent()) {
            return optionalExam.get().getExamDto();
        }else {
            return null;
        }
    }

    @Override
    public boolean deleteExam(Long id) {
        Optional<Exam> optionalExam = examRepository.findById(id);
        if (optionalExam.isPresent()) {
            examRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public ExamDto addExam(ExamDto examDto) throws IOException {
        Exam exam = new Exam();
        exam.setName(examDto.getName());
        exam.setDate(examDto.getDate());
        exam.setTime(examDto.getTime());
        ExamDifficult examDifficult = examDifficultRepository.findById(examDto.getExamDifficultId()).orElseThrow();

        exam.setExamDifficult(examDifficult);
        return examRepository.save(exam).getExamDto();
    }
    @Override
    public ExamDto updateExam(Long examId, ExamDto examDto) throws IOException {
        Optional<Exam> optionalExam = examRepository.findById(examId);
        Optional<ExamDifficult> optionalExamDifficult = examDifficultRepository.findById(examId);
        if (optionalExam.isPresent()) {
            Exam exam = optionalExam.get();
            exam.setName(examDto.getName());
            exam.setExamDifficult(optionalExamDifficult.get());
            exam.setDate(examDto.getDate());
            exam.setTime(examDto.getTime());
            return examRepository.save(exam).getExamDto();
        }else {
            return null;
        }
    }
    private List<Question> selectQuestionsByDifficulty(String difficulty, int numberOfQuestions) {
        // Thực hiện logic để lấy câu hỏi từ cơ sở dữ liệu dựa trên độ khó và số lượng câu hỏi
        List<Question> questions = questionRepository.findAllByBloomTaxonomy(difficulty); // Ví dụ: findByDifficulty là phương thức trong QuestionRepository
        Collections.shuffle(questions); // Xáo trộn danh sách câu hỏi để chọn ngẫu nhiên
        return questions.subList(0, Math.min(numberOfQuestions, questions.size())); // Trả về danh sách câu hỏi đã chọn
    }
    private ExamDetail createExamDetail(Exam exam, Question question) {
        ExamDetail examDetail = new ExamDetail();
        examDetail.setExam(exam);
        examDetail.setQuestion(question);
        // Các thuộc tính khác của examDetail nếu có
        return examDetail;
    }
    @Override
    public void createExam(ExamDto examDto) {
        ExamDto examDto1 = new ExamDto();
        Exam exam = new Exam();
        exam.setName(examDto.getName());
        exam.setDate(examDto.getDate());
        exam.setTime(examDto.getTime());
        ExamDifficult examDifficult = examDifficultRepository.findById(examDto.getExamDifficultId()).orElseThrow();
        exam.setExamDifficult(examDifficult);
        examDto1 = examRepository.save(exam).getExamDto();
        // Lấy thông tin độ khó của bài thi từ bảng exam_difficulties





        // Fetch the exam difficulty
        ExamDifficult examDifficult1 = examDifficultRepository.findById(examDto.getExamDifficultId())
                .orElseThrow(() -> new IllegalArgumentException("Exam difficulty not found"));
        exam.setExamDifficult(examDifficult);

        // Calculate number of questions for each difficulty level
        int totalQuestions = examDto1.getSoluong().intValue();
        int rememberQuestions = (int) (totalQuestions * examDifficult1.getRatioRemember());
        int understandQuestions = (int) (totalQuestions * examDifficult1.getRatioUnderstand());
        int applyQuestions = (int) (totalQuestions * examDifficult1.getRatioApply());
        int analyzeQuestions = totalQuestions - rememberQuestions - understandQuestions - applyQuestions;
        // Lấy các câu hỏi từ cơ sở dữ liệu cho mỗi mức độ
        List<Question> rememberQuestionList = selectQuestionsByDifficulty("remember", rememberQuestions);
        List<Question> understandQuestionList = selectQuestionsByDifficulty("understand", understandQuestions);
        List<Question> applyQuestionList = selectQuestionsByDifficulty("apply", applyQuestions);
        List<Question> analyzeQuestionList = selectQuestionsByDifficulty("analyze", analyzeQuestions);

        // Tạo các chi tiết bài thi và lưu vào cơ sở dữ liệu
        List<ExamDetail> examDetails = new ArrayList<>();
        for (Question question : rememberQuestionList) {
            examDetails.add(createExamDetail(exam, question));
        }
        for (Question question : understandQuestionList) {
            examDetails.add(createExamDetail(exam, question));
        }
        for (Question question : applyQuestionList) {
            examDetails.add(createExamDetail(exam, question));
        }
        for (Question question : analyzeQuestionList) {
            examDetails.add(createExamDetail(exam, question));
        }

        examDetailRepository.saveAll(examDetails);
    }

}
