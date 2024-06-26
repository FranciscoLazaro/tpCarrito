package com.giulianoespejo.tp6.Controller;

import com.giulianoespejo.tp6.Entity.Dto.PedidoDto;
import com.giulianoespejo.tp6.Entity.Pedido;
import com.giulianoespejo.tp6.Entity.PedidoDetalle;
import com.giulianoespejo.tp6.Service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/pedido")
public class PedidoController {
    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(pedidoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        return ResponseEntity.ok(pedidoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody PedidoDto pedido){
        return ResponseEntity.ok(pedidoService.save(pedido));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@PathVariable Long id, @RequestBody Pedido pedido){
        return ResponseEntity.ok(pedidoService.update(pedido, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        return ResponseEntity.ok(pedidoService.delete(id));
    }
}
