import Pedido from "../types/Pedido";
import PreferenceMP from "../types/mercadopago/PreferenceMP";
import { AbstractBackendClient } from "./AbstractBackendClient";

export default abstract class BackendClient<T> extends AbstractBackendClient<T> {
  protected async request(path: string, options: RequestInit): Promise<T | undefined> {
    try {
      const response = await fetch(path, options);

      if (!response.ok) {
        console.error("Error en la solicitud:", response.statusText);
        throw new Error(response.statusText);
      }

      if (response.status === 204 || response.headers.get("Content-Length") === "0") {
        return undefined; // O algún otro valor predeterminado
      }

      return response.json();
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return Promise.reject(error);
    }
  }

  protected async requestAll(path: string, options: RequestInit): Promise<T[]> {
    try {
      const response = await fetch(path, options);

      if (!response.ok) {
        console.error("Error en la solicitud:", response.statusText);
        throw new Error(response.statusText);
      }

      return response.json();
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return Promise.reject(error);
    }
  }

  async get(url: string, id: number): Promise<T> {
    const path = `${url}/${id}`;
    const options: RequestInit = {
      method: "GET",
    };
    return this.request(path, options) as Promise<T>;
  }

  async getAll(url: string): Promise<T[]> {
    const path = url;
    const options: RequestInit = {
      method: "GET",
    };
    return this.requestAll(path, options);
  }

  async post(url: string, data: T): Promise<T> {
    const path = url;
    const options: RequestInit = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    return this.request(path, options) as Promise<T>;
  }

  async put(url: string, id: number, data: T): Promise<T> {
    const path = `${url}/${id}`;
    const options: RequestInit = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    return this.request(path, options) as Promise<T>;
  }

  async delete(url: string, id: number): Promise<void> {
    const path = `${url}/${id}`;
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    await this.request(path, options);
  }
}

export async function createPreferenceMP(pedido: Pedido): Promise<PreferenceMP> {
  const urlServer = 'http://localhost:8080/apiMp';
  const method = "POST";
  const response = await fetch(urlServer, {
    method: method,
    body: JSON.stringify(pedido),
    headers: {
      "Content-Type": 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Error al crear la preferencia de Mercado Pago: ${response.statusText}`);
  }

  return await response.json() as PreferenceMP;
}
