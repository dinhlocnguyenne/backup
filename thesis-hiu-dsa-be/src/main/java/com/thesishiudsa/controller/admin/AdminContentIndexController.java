package com.thesishiudsa.controller.admin;
import com.thesishiudsa.dto.ContentIndexDto;
import com.thesishiudsa.services.ContentIndex.ContentIndexService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminContentIndexController {
    private final ContentIndexService contentIndexService;
    @GetMapping("/content-index/{level}")
    public ResponseEntity<?> getAllContentIndexWithLevel(@PathVariable int level) {
        List<ContentIndexDto> contentIndexDtos = contentIndexService.getAllContentIndexWithLevel(level);
        return ResponseEntity.status(HttpStatus.OK).body(contentIndexDtos);
    }

}
