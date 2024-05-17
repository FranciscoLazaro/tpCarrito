package com.giulianoespejo.tp6.Entity.Dto;

import com.giulianoespejo.tp6.Entity.PedidoDetalle;
import com.giulianoespejo.tp6.Service.InstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoDetalleConverter {

    @Autowired
    private InstrumentoService instrumentoService;

    public PedidoDetalle toEntity(PedidoDetalleDto pd){
        PedidoDetalle pedidoDetalle = new PedidoDetalle();
        pedidoDetalle.setCantidad(pd.getCantidad());
        pedidoDetalle.setInstrumento(instrumentoService.findById(pd.getIdInstrumento()));
        return pedidoDetalle;
    }

}
