import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categoria from './Components/screens/Categoria/Categoria';
import Home from './Components/screens/Home/Home';
import Instrumento from './Components/screens/Instrumento/Instrumento';
import Navbar from './Components/ui/common/NavBar/NavBar';
import InstrumentoType from './types/Instrumento';
import CheckoutMP from './Components/ui/common/mp/CheckoutMP';

const App: React.FC = () => {
  const [carrito, setCarrito] = useState<InstrumentoType[]>([]);

  const handleAddToCart = (instrumento: InstrumentoType) => {
    setCarrito((prevCarrito) => [...prevCarrito, instrumento]);
  };

  return (
    <Router>
      <Navbar carrito={carrito} />
      <Routes>
        <Route path="/" element={<Home handleAddToCart={handleAddToCart} />} />
        <Route path="/categorias" element={<Categoria />} />
        <Route path="/instrumentos" element={<Instrumento />} />
        <Route path="/mercadopago" element={<CheckoutMP />} />
        <Route path="*" element={<Home handleAddToCart={handleAddToCart} />} />                            
      </Routes>
    </Router>
  );
};

export default App;
