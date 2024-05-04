package com.thesishiudsa.entity;


import com.thesishiudsa.dto.ContentIndexDto;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "content_index")
public class ContentIndex {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "parentId", nullable = true)
    private ContentIndex contentIndex;
    public ContentIndexDto getContentIndexDto() {
        ContentIndexDto contentIndexDto = new ContentIndexDto();
        contentIndexDto.setId(id);
        contentIndexDto.setTitle(title);
        if (contentIndex != null) {
            contentIndexDto.setParentId(contentIndex.getId());
        }
        return contentIndexDto;
    }

    // Constructors, getters, and setters
}
