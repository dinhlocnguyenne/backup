package com.thesishiudsa.repository;

import com.thesishiudsa.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContentRepository extends JpaRepository<Content, Long> {
    Content findAllByContentIndexId(Long contentIndexId);
}
