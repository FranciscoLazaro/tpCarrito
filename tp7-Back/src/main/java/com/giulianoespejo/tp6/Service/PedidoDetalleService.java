package com.giulianoespejo.tp6.Service;

import com.giulianoespejo.tp6.Entity.Dto.PedidoDetalleDto;
import com.giulianoespejo.tp6.Entity.Instrumento;
import com.giulianoespejo.tp6.Entity.PedidoDetalle;

import java.util.List;

public interface PedidoDetalleService {
    PedidoDetalle save(PedidoDetalleDto pedidoDetalle);
    PedidoDetalle update(PedidoDetalle pedidoDetalle, Long id);
    PedidoDetalle findById(Long id);
    List<PedidoDetalle> findAll();
    Boolean delete(Long id);
}
