# Bienvenido a Cocoa 👋

Esta aplicación fue desarrollada en React Native con [`Expo`](https://www.npmjs.com/package/create-expo-app) y TypeScript. 
Su objetivo es permitir la visualización y gestión de información de instrumentos financieros y el portafolio de un usuario, interactuando con varios endpoints de una API externa. 

1. **/Instruments**  
   - Muestra un listado de instrumentos financieros, donde cada uno muestra:
     - **Ticker**
     - **Nombre**
     - **Último precio**
     - **Retorno** (calculado usando el último precio y el precio de cierre proporcionado en la respuesta).

2. **/Portfolio**  
   - Muestra los activos en el portafolio de un usuario:
     - **Ticker**
     - **Cantidad de la posición**
     - **Valor de mercado** (calculado como `cantidad * último precio`)
     - **Ganancia absoluta ($)**
     - **Rendimiento total (%)** (utilizando `avg_cost_price` como el precio de compra).

3. **/Search**  
   - Un buscador que permite buscar activos por su ticker.

4. **/Orders**  
   - Permite al usuario enviar órdenes de compra o venta a través de un formulario modal:
     - El tipo de orden puede ser **BUY** o **SELL**.
     - El tipo de orden puede ser **MARKET** o **LIMIT**.
     - La cantidad de acciones puede ser ingresada directamente o, si es una orden **LIMIT**, también se puede ingresar un monto total de inversión en pesos (calculando la cantidad de acciones posibles con el último precio).
     - El estado de la orden puede ser:
       - **PENDING**: cuando la orden LIMIT es enviada.
       - **FILLED**: cuando una orden MARKET es ejecutada.
       - **REJECTED**: cuando la orden no cumple los requisitos del mercado (por ejemplo, un monto mayor al disponible).
      
   ### Endpoints Utilizados
   - GET https://dummy-api-topaz.vercel.app/portfolio
   - GET https://dummy-api-topaz.vercel.app/instruments
   - GET https://dummy-api-topaz.vercel.app/search?query=DYC
   - POST https://dummy-api-topaz.vercel.app/orders

---

## Tecnologías

- **React Native**: Framework para crear aplicaciones móviles nativas.
- **Expo**: Herramienta que permite desarrollar, compilar y ejecutar aplicaciones de React Native.
- **TypeScript**: Superset de JavaScript que añade tipado estático y facilita el desarrollo con seguridad y mantenimiento del código.

---

## Instalación

Para comenzar a trabajar con esta aplicación en tu entorno local, sigue estos pasos:

1. Clonar repositorio:

   https://github.com/adivianahd/cocoa-app

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npm run start
   ```

3. scanear el codigo QR desde la app de Expo.

## Preview de la app


https://github.com/user-attachments/assets/cae0707e-77f7-41c7-8f50-363014f46173

