package com.thesishiudsa.controller;

import com.thesishiudsa.dto.ContentIndexDto;
import com.thesishiudsa.services.ContentIndex.ContentIndexService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
@RequiredArgsConstructor
public class ContentIndexController {
    private final ContentIndexService contentIndexService;

    @GetMapping("/content-index")
    public ResponseEntity<?> getAllContentIndex() {
        List<ContentIndexDto> contentIndexDtos = contentIndexService.getAllContentIndex();
        return ResponseEntity.status(HttpStatus.OK).body(contentIndexDtos);
    }
    @GetMapping("/content-index/{level}")
    public ResponseEntity<?> getAllContentIndexWithLevel(int level) {
        List<ContentIndexDto> contentIndexDtos = contentIndexService.getAllContentIndexWithLevel(level);
        return ResponseEntity.status(HttpStatus.OK).body(contentIndexDtos);
    }
}
