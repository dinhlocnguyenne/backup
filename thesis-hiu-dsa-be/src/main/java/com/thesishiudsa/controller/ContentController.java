package com.thesishiudsa.controller;

import com.thesishiudsa.dto.ContentDto;
import com.thesishiudsa.dto.ContentIndexDto;
import com.thesishiudsa.entity.Content;
import com.thesishiudsa.services.Content.ContentService;
import com.thesishiudsa.services.ContentIndex.ContentIndexService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@RequestMapping("/content")
@RequiredArgsConstructor
public class ContentController {
    private final ContentService contentService;

    @GetMapping
    public ResponseEntity<?> getAllContent() {
        List<ContentDto> contentDtos = contentService.getAllContent();
        return ResponseEntity.status(HttpStatus.OK).body(contentDtos);
    }
    @GetMapping("/{contentIndexId}")
    public ResponseEntity<Content> getContentByContentIndexId(@PathVariable Long contentIndexId) {
        Content content = contentService.getContentByContentIndexId(contentIndexId);
        if (content != null) {
            return ResponseEntity.ok(content);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}