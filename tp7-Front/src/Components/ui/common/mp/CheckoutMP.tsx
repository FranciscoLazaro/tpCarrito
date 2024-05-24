import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useState, useEffect } from 'react';
import PreferenceMP from '../../../../types/mercadopago/PreferenceMP';
import { createPreferenceMP } from '../../../../service/BackendClient';

interface CheckoutMPProps {
  pedidoId: number;
  montoCarrito: number;
}

function CheckoutMP({ pedidoId, montoCarrito = 0 }: CheckoutMPProps) {
  const [idPreference, setIdPreference] = useState<string>('');

  useEffect(() => {
    const getPreferenceMP = async () => {
      if (montoCarrito > 0 && pedidoId) {
        try {
          const response: PreferenceMP = await createPreferenceMP({
            id: pedidoId,
            fechaPedido: new Date(),
            totalPedido: montoCarrito,
          });
          console.log("Preference id: " + response.id);
          if (response) setIdPreference(response.id);
        } catch (error) {
          console.error("Error al obtener la preferencia de Mercado Pago", error);
        }
      } else {
        alert("Agregue al menos un instrumento al carrito");
      }
    }

    getPreferenceMP();
  }, [montoCarrito, pedidoId]);

  // es la Public Key se utiliza generalmente en el frontend.
  initMercadoPago('TEST-5b58b558-60aa-484c-8fff-a76c3e78d96a', { locale: 'es-AR' });

  // redirectMode es optativo y puede ser self, blank o modal
  return (
    <div>
      <button onClick={() => {}} className='btMercadoPago'>COMPRAR con <br /> Mercado Pago</button>
      <div className={idPreference ? 'divVisible' : 'divInvisible'}>
        <Wallet initialization={{ preferenceId: idPreference, redirectMode: "blank" }} customization={{ texts: { valueProp: 'smart_option' } }} />
      </div>
    </div>
  );
}

export default CheckoutMP;
