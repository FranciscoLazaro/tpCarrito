package com.giulianoespejo.tp6.Service;

import com.giulianoespejo.tp6.Entity.Dto.PedidoDto;
import com.giulianoespejo.tp6.Entity.Pedido;

import java.util.List;

public interface PedidoService {
    Pedido save(PedidoDto pedido);
    Pedido update(Pedido pedido, Long id);
    Pedido findById(Long id);
    List<Pedido> findAll();
    Boolean delete(Long id);
}
