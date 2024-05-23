import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useState } from 'react';
import PreferenceMP from '../../../../types/mercadopago/PreferenceMP';
import { createPreferenceMP } from '../../../../service/BackendClient';
import './CheckoutMP.css';

function CheckoutMP({ montoCarrito = 0 }) {
  const [idPreference, setIdPreference] = useState<string>('');

  const getPreferenceMP = async () => {
    if (montoCarrito > 0) {
      const response: PreferenceMP = await createPreferenceMP({
        id: 0,
        fechaPedido: new Date(),
        totalPedido: montoCarrito
      });
      console.log("Preference id: " + response.id);
      if (response)
        setIdPreference(response.id);
    } else {
      alert("Agregue al menos un plato al carrito");
    }
  }

  // es la Public Key se utiliza generalmente en el frontend.
  initMercadoPago('TEST-5b58b558-60aa-484c-8fff-a76c3e78d96a', { locale: 'es-AR' });

  // redirectMode es optativo y puede ser self, blank o modal
  return (
    <div>
      <button onClick={getPreferenceMP} className='btMercadoPago'>COMPRAR con <br /> Mercado Pago</button>
      <div className={idPreference ? 'divVisible' : 'divInvisible'}>
        <Wallet initialization={{ preferenceId: idPreference, redirectMode: "blank" }} customization={{ texts: { valueProp: 'smart_option' } }} />
      </div>
    </div>
  );
}

export default CheckoutMP;
