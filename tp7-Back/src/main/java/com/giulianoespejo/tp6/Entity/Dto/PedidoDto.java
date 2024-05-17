package com.giulianoespejo.tp6.Entity.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class PedidoDto {

    private Double totalPedido;

    private Set<Long> pedidosDetalle = new HashSet<>();
}
