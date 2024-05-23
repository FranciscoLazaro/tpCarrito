import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Instrumento from '../../../../types/Instrumento';
import { PedidoPost } from '../../../../types/PedidoPost';
import { PedidoDetallePost } from '../../../../types/PedidoDetallePost';
import PedidoDetalleService from '../../../../service/PedidoDetalleService';
import PedidoService from '../../../../service/PedidoService';
import Swal from 'sweetalert2';
import CheckoutMP from '../mp/CheckoutMP';

interface CarritoProps {
  carrito: Instrumento[];
}

const Carrito: React.FC<CarritoProps> = ({ carrito }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cantidadItems, setCantidadItems] = useState<{ [key: number]: number }>({});
  const [totalPedido, setTotalPedido] = useState(0);
  const pedidoDetalleService = new PedidoDetalleService();
  const pedidoService = new PedidoService();
  const url = import.meta.env.VITE_API_URL;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAgregarCantidad = (id: number) => {
    setCantidadItems(prevState => ({
      ...prevState,
      [id]: (prevState[id] || 0) + 1
    }));
  };

  const handleQuitarCantidad = (id: number) => {
    setCantidadItems(prevState => ({
      ...prevState,
      [id]: Math.max((prevState[id] || 0) - 1, 0)
    }));
  };

  const handleFinalizarCompra = async () => {
    for (const item of carrito) {
      const cantidad = cantidadItems[item.id] || 0;
      if (cantidad > 0) {
        const pedidoDetalle: PedidoDetallePost = {
          cantidad,
          idInstrumento: item.id
        };
        await pedidoDetalleService.post(url + '/pedidoDetalle', pedidoDetalle);
      }
    }

    const totalPedido = carrito.reduce((total, item) => total + (item.precio * (cantidadItems[item.id] || 0)), 0);
    setTotalPedido(totalPedido);

    const pedidosDetalle = carrito.map(item => item.id);
    const pedido: PedidoPost = {
      totalPedido,
      pedidosDetalle
    };

    await pedidoService.post(url + '/pedido', pedido);

    setCantidadItems({});
    handleClose();

    Swal.fire({
      icon: 'success',
      title: 'Pedido realizado exitosamente',
      showConfirmButton: false,
      timer: 1500
    });
  };

  useEffect(() => {
    const calculatedTotal = carrito.reduce((total, item) => total + (item.precio * (cantidadItems[item.id] || 0)), 0);
    setTotalPedido(calculatedTotal);
  }, [cantidadItems, carrito]);

  return (
    <div>
      <IconButton
        aria-label="Carrito de Compras"
        aria-controls="menu-carrito"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <ShoppingCartIcon />
      </IconButton>
      <Menu
        id="menu-carrito"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {carrito && carrito.length === 0 ? (
          <MenuItem onClick={handleClose}>El carrito está vacío</MenuItem>
        ) : (
          carrito?.map((item, index) => (
            <MenuItem key={index}>
              {item.instrumento} - ${item.precio} x 
              <button onClick={() => handleQuitarCantidad(item.id)}>-</button>
              {cantidadItems[item.id] || 0}
              <button onClick={() => handleAgregarCantidad(item.id)}>+</button>
            </MenuItem>
          ))
        )}
        <MenuItem onClick={handleFinalizarCompra}>Finalizar Compra</MenuItem>
      </Menu>
      <br></br>
      <CheckoutMP montoCarrito={totalPedido} />
    </div>
  );
};

export default Carrito;
