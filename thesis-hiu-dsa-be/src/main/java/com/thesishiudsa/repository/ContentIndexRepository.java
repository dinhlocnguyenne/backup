package com.thesishiudsa.repository;

import com.thesishiudsa.entity.ContentIndex;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ContentIndexRepository extends JpaRepository<ContentIndex, Long> {

}
