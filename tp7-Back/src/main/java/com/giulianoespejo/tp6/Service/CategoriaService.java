package com.giulianoespejo.tp6.Service;

import com.giulianoespejo.tp6.Entity.Categoria;

import java.util.List;

public interface CategoriaService {
    Categoria save(Categoria categoria);
    Categoria update(Categoria categoria, Long id);
    Categoria findById(Long id);
    List<Categoria> findAll();
    Boolean delete(Long id);
}
