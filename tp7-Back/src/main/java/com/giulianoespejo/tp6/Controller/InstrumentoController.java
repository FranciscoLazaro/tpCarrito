package com.giulianoespejo.tp6.Controller;

import com.giulianoespejo.tp6.Entity.Categoria;
import com.giulianoespejo.tp6.Entity.Instrumento;
import com.giulianoespejo.tp6.Service.CategoriaService;
import com.giulianoespejo.tp6.Service.InstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/instrumento")
@CrossOrigin("*")
public class InstrumentoController {
    @Autowired
    private InstrumentoService instrumentoService;

    @GetMapping
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(instrumentoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        return ResponseEntity.ok(instrumentoService.findById(id));
    }

    @GetMapping("/byCategoria/{id}")
    public ResponseEntity<?> findByCategoria(@PathVariable Long id){
        return ResponseEntity.ok(instrumentoService.findByCategoriaId(id));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Instrumento instrumento){
        return ResponseEntity.ok(instrumentoService.save(instrumento));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@PathVariable Long id, @RequestBody Instrumento instrumento){
        return ResponseEntity.ok(instrumentoService.update(instrumento, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        return ResponseEntity.ok(instrumentoService.delete(id));
    }
}
